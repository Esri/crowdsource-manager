///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'exports',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/has',
    'dojo/Deferred',
    'esri/lang',
    'esri/dijit/PopupTemplate'
], function (
    exports,
    lang,
    array,
    html,
    has,
    Deferred,
    esriLang,
    PopupTemplate
) {
    /*
     ** filename String no file extension
     ** datas Object[]
     ** columns Object[]
     */
    exports.exportCSV = function (filename, datas, columns) {
      return exports._createCSVStr(datas, columns).then(function (content) {
        return exports._download(filename + '.csv', content);
      });
    };

    /*
     ** filename String no file extension
     ** layer FeatureLayer or LayerDefinition Object; if is FeatureLayer, layer.loaded must be true
     ** options Object
     ** options: {
     **   datas: Array of feature.attributes; if not null only exported this datas to CSV
     **   outFields: Array of Field; if null export all fields of layer
     **   filterExpression: set where clause from featureService
     **   formatNumber: Boolean. if true localize number type field
     **   formatDate: Boolean. if true localize date type field
     **   formatCodedValue: Boolean. if true use description instead of codedvalue
     **   popupInfo: https://developers.arcgis.com/javascript/jshelp/intro_popuptemplate.html
     ** }
     */
    exports.exportCSVFromFeatureLayer = function (filename, layer, options) {
      options = options || {};
      var exportOptions = {
        datas: options.datas,
        objectIds: options.objectIds,
        withGeometry: options.withGeometry,
        outFields: options.outFields,
        filterExpression: options.filterExpression,
        outSpatialReference: options.outSpatialReference
      };
      return exports._getExportData(layer, exportOptions).then(function (result) {
        var formattedOptions = {
          formatNumber: options.formatNumber,
          formatDate: options.formatDate,
          formatCodedValue: options.formatCodedValue,
          richText: {
            clearFormat: options.richTextFieldsToClear && !!options.richTextFieldsToClear.length,
            fieldsToClear: options.richTextFieldsToClear || []
          },
          popupInfo: options.popupInfo
        };
        return exports._formattedData(layer, result, formattedOptions)
          .then(function (formattedResult) {
            return exports.exportCSV(filename, formattedResult.datas, formattedResult.columns);
          });
      });
    };

    /*
     ** filename String no file extension
     ** definition LayerDefinition Object
     ** attributes Array of graphic.attributes
     ** options: {
     **   datas: Array of feature.attributes; if not null only exported this datas to CSV
     **   outFields: Array of Field; if null export all fields of layer
     **   filterExpression: set where clause from featureService
     **   formatNumber: Boolean. if true localize number type field
     **   formatDate: Boolean. if true localize date type field
     **   formatCodedValue: Boolean. if true use description instead of codedvalue
     **   popupInfo: https://developers.arcgis.com/javascript/jshelp/intro_popuptemplate.html
     ** }
     */
    exports.exportCSVByAttributes = function (filename, definition, attributes, options) {
      options = lang.mixin({}, options);
      options.datas = attributes;
      return exports.exportCSVFromFeatureLayer(filename, definition, options);
    };

    /*
     ** filename String no file extension
     ** definition LayerDefinition Object
     ** graphics Array of graphic
     ** options: {
     **   datas: Array of feature.attributes; if not null only exported this datas to CSV
     **   outFields: Array of Field; if null export all fields of layer
     **   filterExpression: set where clause from featureService
     **   formatNumber: Boolean. if true localize number type field
     **   formatDate: Boolean. if true localize date type field
     **   formatCodedValue: Boolean. if true use description instead of codedvalue
     **   popupInfo: https://developers.arcgis.com/javascript/jshelp/intro_popuptemplate.html
     ** }
     */
    exports.exportCSVByGraphics = function (filename, definition, graphics, options) {
      var attributes = array.map(graphics, function (graphic) {
        return graphic.attributes;
      });
      return exports.exportCSVByAttributes(filename, definition, attributes, options);
    };

    exports._createCSVStr = function (datas, columns) {
      var def = new Deferred();
      var textField = '"';
      var content = "";
      var len = 0,
        n = 0,
        comma = "",
        value = "";
      try {
        columns = array.map(columns, function (f) {
          if (typeof f === 'string') {
            return {
              name: f
            };
          } else {
            return f;
          }
        });
        array.forEach(columns, function (_field) {
          var _fieldText = _field.alias || _field.name;
          // append "" to fields that include commas
          if (_fieldText.toString().indexOf(",") > -1) {
            _fieldText = '"' + _fieldText + '"';
          }
          content = content + comma + _fieldText;
          comma = ",";
        });

        content = content + "\r\n";
        len = datas.length;
        n = columns.length;
        for (var i = 0; i < len; i++) {
          comma = "";
          for (var m = 0; m < n; m++) {
            var _field = columns[m];
            value = datas[i][_field.name];
            if (!value && typeof value !== "number") {
              value = "";
            }
            if (value && /[",\r\n]/g.test(value)) {
              value = textField + value.replace(/(")/g, '""') + textField;
            }
            content = content + comma + value;
            comma = ",";
          }
          content = content + "\r\n";
        }
        def.resolve(content);
      } catch (err) {
        console.error(err);
        def.resolve("");
      }

      return def;
    };

    exports._isIE11 = function () {
      return exports.has('ie') === 11;
    };

    exports._isEdge = function () {
      return exports.has('edge');
    };

    exports._getDownloadUrl = function (text) {
      var BOM = "\uFEFF";
      // Add BOM to text for open in excel correctly
      if (window.Blob && window.URL && window.URL.createObjectURL) {
        var csvData = new Blob([BOM + text], {
          type: 'text/csv'
        });
        return URL.createObjectURL(csvData);
      } else {
        return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(text);
      }
    };

    exports._download = function (filename, text) {
      var def = new Deferred();
      try {
        if (has('ie') && has('ie') < 10) {
          // has module unable identify ie11 and Edge
          var oWin = window.top.open("about:blank", "_blank");
          oWin.document.write('sep=,\r\n' + text);
          oWin.document.close();
          oWin.document.execCommand('SaveAs', true, filename);
          oWin.close();
        } else if (has("ie") === 10 || exports._isIE11() || exports._isEdge()) {
          var BOM = "\uFEFF";
          var csvData = new Blob([BOM + text], {
            type: 'text/csv'
          });
          navigator.msSaveBlob(csvData, filename);
        } else {
          var link = html.create("a", {
            href: exports._getDownloadUrl(text),
            target: '_blank',
            download: filename
          }, document.body);
          if (has('safari')) {
            // # First create an event
            var click_ev = document.createEvent("MouseEvents");
            // # initialize the event
            click_ev.initEvent("click", true /* bubble */ , true /* cancelable */ );
            // # trigger the evevnt/
            link.dispatchEvent(click_ev);
          } else {
            link.click();
          }

          html.destroy(link);
        }
        def.resolve();
      } catch (e) {
        def.reject(e);
      }
      return def;
    };

    exports._getExportData = function (layer, options) {
      var def = new Deferred();
      var _outFields = null;
      var _queryOutFields = [];
      var data = options.datas;
      var withGeometry = options.withGeometry;

      _outFields = options.outFields;
      if (!_outFields || !_outFields.length) {
        _outFields = layer.fields;
      }
      _outFields = lang.clone(_outFields);

      if (withGeometry && !(data && data.length > 0)) { // only for fromClient or server
        // data is null, we should retrieve data from server.
        // for query params, here we clone _outFields to _queryOutFields before x and y appended to _outFields,
        // because the fields of service might not contain field x or field y.
        _queryOutFields = lang.clone(_outFields);

        var name = "";
        if (_outFields.indexOf('x') !== -1) {
          name = '_x';
        } else {
          name = 'x';
        }
        _outFields.push({
          'name': name,
          alias: name,
          format: {
            'digitSeparator': false,
            'places': 6
          },
          show: true,
          type: "esriFieldTypeDouble"
        });
        if (_outFields.indexOf('y') !== -1) {
          name = '_y';
        } else {
          name = 'y';
        }
        _outFields.push({
          'name': name,
          alias: name,
          format: {
            'digitSeparator': false,
            'places': 6
          },
          show: true,
          type: "esriFieldTypeDouble"
        });
      }

      if (data && data.length > 0) {
        def.resolve({
          'data': data || [],
          'outFields': _outFields
        });
      }

      return def;
    };

    exports._formattedData = function (layer, dataOptions, formattedOptions) {
      var def = new Deferred();
      var formattedDatas = [];

      var datas = dataOptions.data;
      var outFields = dataOptions.outFields;

      for (var i = 0, len = datas.length; i < len; i++) {
        var aliasData = {};
        for (var j = 0; j < outFields.length; j++) {
          var _field = outFields[j];
          aliasData[_field.name] = exports._getExportValue(
            datas[i][_field.name],
            _field,
            layer.objectIdField,
            layer.typeIdField,
            datas[i][layer.typeIdField],
            layer.types,
            formattedOptions
          );
        }
        formattedDatas.push(aliasData);
      }

      var columns = array.map(outFields, function (oField) {
        return {
          alias: oField.alias,
          name: oField.name
        };
      });

      def.resolve({
        datas: formattedDatas,
        columns: columns
      });
      return def;
    };

    exports._getExportValue = function (data, field, pk, typeIdField,
      typeData, types, formattedOptions) {
      var pInfos = formattedOptions.popupInfo;

      function getFormatInfo(fieldName) {
        if (pInfos && esriLang.isDefined(pInfos.fieldInfos)) {
          for (var i = 0, len = pInfos.fieldInfos.length; i < len; i++) {
            var f = pInfos.fieldInfos[i];
            if (f.fieldName === fieldName) {
              return f.format;
            }
          }
        }

        return null;
      }
      var fieldsToClear = formattedOptions.richText.fieldsToClear;

      function isRichTextField(fieldName) {
        for (var i = 0, len = fieldsToClear.length; i < len; i++) {
          var f = fieldsToClear[i];
          if (f.fieldName === fieldName) {
            return true;
          }
        }
        return false;
      }
      var isDomain = !!field.domain && formattedOptions.formatCodedValue;
      var isDate = field.type === "esriFieldTypeDate" && formattedOptions.formatDate;
      var isOjbectIdField = pk && (field.name === pk);
      var isTypeIdField = typeIdField && (field.name === typeIdField);
      var isRichTextField = field.type === "esriFieldTypeString" && formattedOptions.richText.clearFormat && isRichTextField(field.name); //ignore jslint

      if (isDate) {
        return exports.getFormattedDate(data, getFormatInfo(field.name));
      }
      if (isTypeIdField) {
        return exports.getTypeName(data, types);
      }
      if (isDomain) {
        return exports.getCodedValue(field.domain, data);
      }
      if (isRichTextField) {
        if (data) {
          var d = document.createElement('span');
          d.innerHTML = data;
          return d.textContent || d.innerText || '';
        } else {
          return data;
        }
      }
      if (!isDomain && !isDate && !isOjbectIdField && !isTypeIdField && !isRichTextField) {
        var codeValue = null;
        if (pk && types && types.length > 0) {
          var typeChecks = array.filter(types, function (item) {
            // value of typeIdField has been changed above
            return item.id === typeData;
          });
          var typeCheck = typeChecks && typeChecks[0];

          if (typeCheck && typeCheck.domains &&
            typeCheck.domains[field.name] && typeCheck.domains[field.name].codedValues) {
            codeValue = exports.getCodedValue(
              typeCheck.domains[field.name],
              data
            );
          }
        }
        return codeValue !== null ? codeValue : data;
      }

      return data;
    };

    exports.has = function (browserName) {
      function _isIE11() {
        var iev = 0;
        var ieold = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));
        var trident = !!navigator.userAgent.match(/Trident\/7.0/);
        var rv = navigator.userAgent.indexOf("rv:11.0");

        if (ieold) {
          iev = Number(RegExp.$1);
        }
        if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
          iev = 10;
        }
        if (trident && rv !== -1) {
          iev = 11;
        }

        return iev === 11;
      }

      function _isEdge() {
        return navigator.userAgent.split('Edge/')[1];
      }
      var v = has(browserName);
      if (!v) {
        if (browserName.toLowerCase() === 'ie') {
          return (_isIE11() && 11) || v;
        } else if (browserName.toLowerCase() === 'edge') {
          return _isEdge() || v;
        }
      } else {
        return v;
      }
    };

    exports.getFormattedDate = function (timeNumber, format) {
      if (typeof timeNumber === 'number' || timeNumber instanceof Date) {
        timeNumber = exports.localizeDateByFieldInfo(timeNumber, {
          'format': format
        });
      }
      return timeNumber || "";
    };

    exports.getTypeName = function (value, types) {
      var len = types.length;
      for (var i = 0; i < len; i++) {
        if (value === types[i].id) {
          var typeName;
          typeName = types[i].name;
          if (types[i].hasOwnProperty("templates") &&
            types[i].templates.length > 0 &&
            types[i].templates[0].hasOwnProperty("name")) {
            typeName = types[i].templates[0].name;
          }
          return typeName;
        }
      }
      return value;
    };

    exports.getCodedValue = function (domain, v) {
      if (domain && domain.codedValues) {
        for (var i = 0, len = domain.codedValues.length; i < len; i++) {
          var cv = domain.codedValues[i];
          if (esriLang.isDefined(v) && lang.exists('code', cv) &&
            v.toString() === cv.code.toString()) {
            return cv.name;
          }
        }
        return v;
      } else {
        return v || null;
      }
    };

    exports.localizeDateByFieldInfo = function (d, fieldInfo) {
      var fd = null;
      try {
        var data = {
          date: d instanceof Date ? d.getTime() : d
        };
        var dateFormat = lang.exists('format.dateFormat', fieldInfo) ?
          fieldInfo.format.dateFormat : 'longMonthDayYear';

        var substOptions = {
          dateFormat: {
            properties: ['date'],
            formatter: 'DateFormat' + PopupTemplate.prototype._dateFormats[dateFormat]
          }
        };
        fd = esriLang.substitute(data, '${date}', substOptions);
      } catch (err) {
        console.error(err);
        fd = d;
      }
      return fd;
    };
});