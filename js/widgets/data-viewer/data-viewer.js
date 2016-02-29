/*global define,dojo,alert,moment,$,setTimeout */
/*jslint sloppy:true */
/*
| Copyright 2014 Esri
|
| Licensed under the Apache License, Version 2.0 (the "License");
| you may not use this file except in compliance with the License.
| You may obtain a copy of the License at
|
|    http://www.apache.org/licenses/LICENSE-2.0
|
| Unless required by applicable law or agreed to in writing, software
| distributed under the License is distributed on an "AS IS" BASIS,
| WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
| See the License for the specific language governing permissions and
| limitations under the License.
*/
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/text!./templates/data-viewer.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/on",
    "esri/layers/GraphicsLayer",
    "esri/tasks/query",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "esri/geometry/Point",
    "esri/SpatialReference",
    "esri/graphic",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/dijit/PopupTemplate",
    "esri/symbols/SimpleFillSymbol",
    "widgets/filter/filter",
    "dojo/dom-style",
    "dojo/query",
    "dojo/_base/array",
    "dojo/domReady!"
], function (
    declare,
    domConstruct,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang,
    domClass,
    domAttr,
    on,
    GraphicsLayer,
    Query,
    FeatureLayer,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    Color,
    Point,
    SpatialReference,
    Graphic,
    Polyline,
    Polygon,
    PopupTemplate,
    SimpleFillSymbol,
    Filter,
    domStyle,
    query,
    array
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _table: null,
        _filterWidgetObj: null, // to store object of filter widget
        _selectedOperationalLayer: null, // store object of feature layer that is selected by user
        _selectRowGraphicsLayer: null, // store object of graphics layer needed for highlighting point feature
        _displayColumn: [], // store columns that needs to be displayed
        _isPointLayer: false, // keep track whether operational layer that is selected by user if of type point or polygon or polyline etc...
        _features: [], // store features that are selected
        _featureObjectID: null, // store objectid of feature selected
        _isRowFound: false, // keeps track whether row is available in grid when user selects feature from map

        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/data-viewer/details-helper
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is used to create UI for web map list.
        * @param{boolean} whether new operational layer is selected or not
        * @memberOf widgets/data-viewer/data-viewer
        */
        startup: function (operationalLayerSelected) {
            this._createDataViewerUI(operationalLayerSelected);
        },

        /**
        * This function is used to create UI for Data Viewer.
        * @param{boolean} whether new operational layer is selected or not
        * @memberOf widgets/data-viewer/data-viewer
        */
        _createDataViewerUI: function (operationalLayerSelected) {
            domConstruct.empty(this.dataViewerContainer);
            // If a new operational layer is selected than reset panel & clear selected records etc...
            if (operationalLayerSelected) {
                this._selectedOperationalLayer = this.map.getLayer(this.selectedOperationalLayerID);
                // Add a graphic layer on a map which used in highlighting feature
                this._addDataViewerGraphicsLayer();
                // If selected operational exists.
                if (this._selectedOperationalLayer) {
                    // Determines whether the newly selected operational layer is a point layer or other geometry layer like polygon/polyline etc...
                    if (this._selectedOperationalLayer.graphics.length > 0) {
                        // If the layer has a point geometry.
                        if (this._selectedOperationalLayer.geometryType === "esriGeometryPoint") {
                            this._isPointLayer = true;
                        } else {
                            this._isPointLayer = false;
                        }
                    }
                }
            }
            // If selected operational exists.
            if (this._selectedOperationalLayer) {
                this._features = this._selectedOperationalLayer.graphics;
                // Display data-viewer if features are available in current map extent
                if (this._features.length > 0) {
                    this._createDataViewerPanel();
                } else {
                    // Display message if no feature is available in current map extent for display
                    domClass.remove(this.noFeatureDiv, "esriCTHidden");
                    domClass.add(this.dataViewerContainer, "esriCTHidden");
                    this.noFeatureDiv.innerHTML = this.appConfig.i18n.dataviewer.noIssuesReported;
                    this.appUtils.hideLoadingIndicator();
                }
            }
        },

        /**
        * This function is used to add graphic layer on map
        * @memberOf widgets/data-viewer/data-viewer
        */
        _addDataViewerGraphicsLayer: function () {
            this._selectRowGraphicsLayer = this.map.getLayer("selectedRowGraphicsLayer");
            // if graphic layer is available than clear it else create it and add on map
            if (this._selectRowGraphicsLayer) {
                this._selectRowGraphicsLayer.clear();
            } else {
                this._selectRowGraphicsLayer = new GraphicsLayer({
                    "id": "selectedRowGraphicsLayer"
                });
                this.attachEventToGraphicsLayer(this._selectRowGraphicsLayer);
                // Create and add a graphic layer on the map
                this.map.addLayer(this._selectRowGraphicsLayer);
            }
        },

        /**
        * This function is used to attach events to the graphics layer
        * @param{object} graphics layer in which selected graphics are added
        * @memberOf widgets/data-viewer/data-viewer
        */
        attachEventToGraphicsLayer: function (graphicsLayer) {
            return graphicsLayer;
        },

        /**
        * This function is used to maintain array of column that needs to be displayed
        * @memberOf widgets/data-viewer/data-viewer
        */
        _getFieldProperties: function () {
            var i, j, obj;
            this._displayColumn = [];
            // to fetch type from layer
            // to fetch label from popup info
            // to fetch editable status from popup info
            // to fetch date format from popup info
            for (i = 0; i < this.popupInfo.fieldInfos.length; i++) {
                for (j = 0; j < this._selectedOperationalLayer.fields.length; j++) {
                    if (this._selectedOperationalLayer.fields[j].name === this.popupInfo.fieldInfos[i].fieldName) {
                        // If fields are editable or visible than only display it.
                        if ((this.popupInfo.fieldInfos[i].visible) || (this.popupInfo
                                .fieldInfos[i].fieldName.toLowerCase() === this._selectedOperationalLayer
                                .objectIdField.toLowerCase()) || (this.popupInfo.fieldInfos[i].isEditable)) {
                            obj = {};
                            obj.type = this._selectedOperationalLayer.fields[j].type;
                            obj.displayField = true;
                            obj.label = this.popupInfo.fieldInfos[i].label || this.popupInfo
                                .fieldInfos[i].fieldName;
                            // Tracks whether a field is editable or not
                            if (this.popupInfo.fieldInfos[i].isEditable) {
                                obj.isFieldEditable = true;
                            } else {
                                obj.isFieldEditable = false;
                            }
                            // Tracks whether a date format is applied or not
                            if ((this.popupInfo.fieldInfos[i].format) && (this.popupInfo
                                    .fieldInfos[i].format.dateFormat)) {
                                obj.format = this.popupInfo.fieldInfos[i].format.dateFormat;
                            }
                            // Tracks whether a coded domain value is applied or not
                            if (this._selectedOperationalLayer.fields[j].domain) {
                                if (this._selectedOperationalLayer.fields[j].domain.codedValues) {
                                    obj.codedValues = this._selectedOperationalLayer.fields[j].domain.codedValues;
                                } else {
                                    obj.domain = this._selectedOperationalLayer.fields[j].domain;
                                }
                            }
                            // Tracks whether a number formatter is applied or not
                            if ((this.popupInfo.fieldInfos[i].format) && (this.popupInfo
                                    .fieldInfos[i].format.digitSeparator) && (this.popupInfo
                                    .fieldInfos[i].format.places)) {
                                // If places is applied to number formatter.
                                if (this.popupInfo.fieldInfos[i].format.places > 0) {
                                    obj.numberFormat = this.popupInfo.fieldInfos[i].format;
                                }
                            }
                            obj.length = this._selectedOperationalLayer.fields[j].length;
                            obj.fieldName = this.popupInfo.fieldInfos[i].fieldName;
                            obj.nullable = this._selectedOperationalLayer.fields[j]
                                .nullable;
                            // Tracks whether a type is applied or not
                            if (this._selectedOperationalLayer.typeIdField === this.popupInfo.fieldInfos[i].fieldName) {
                                obj.types = this._selectedOperationalLayer.types;
                            }
                            if (this.popupInfo.fieldInfos[i].visible || this.popupInfo.fieldInfos[i].isEditable) {
                                obj.showInDetailsTab = true;
                            }
                            if ((this.popupInfo.fieldInfos[i].visible) && (this.popupInfo
                                    .fieldInfos[i].fieldName.toLowerCase() === this._selectedOperationalLayer
                                    .objectIdField.toLowerCase())) {
                                obj.showObjectIdField = true;
                            }
                            this._displayColumn.push(obj);
                        }
                    }
                }
            }
        },

        /**
        * This function is used to create panel of data-viewer
        * @memberOf widgets/data-viewer/data-viewer
        */
        _createDataViewerPanel: function () {
            var i, colums;
            domClass.remove(this.dataViewerContainer, "esriCTHidden");
            this._createDataViewerHeaderPanel();
            this._createDataViewerDataPanel();
            this._bindTableSorterEvent();
            colums = query("th", this._table);
            for (i = 0; i < colums.length; i++) {
                this._createHeaderOptionContainer(i, colums[i]);
            }
        },

        /**
        * This function is used to create panel of data-viewer
        * @param{array} feature array
        * @param{string} Index number of OBJECT ID field in feature array
        * @memberOf widgets/data-viewer/data-viewer
        */
        _creatTableRows: function (entireFeatureDataArr, objectIdIndex) {
            var i, tr, tbody, j, td;
            // to create table headers
            tbody = domConstruct.create("tbody", {}, this._table);
            if (entireFeatureDataArr.length > 0) {
                for (i = 0; i < entireFeatureDataArr.length; i++) {
                    tr = domConstruct.create("tr", { "class": "esriCTPointerCursor" }, tbody);
                    for (j = 0; j < entireFeatureDataArr[i].length; j++) {
                        domAttr.set(tr, "OBJID", entireFeatureDataArr[i][objectIdIndex]);
                        if (j === objectIdIndex) {
                            td = domConstruct.create("td", { "class": "esriCTHiddenColumn" });
                        } else {
                            td = domConstruct.create("td", { "class": "esriCTDataViewerTableCellContent" });
                        }
                        if (entireFeatureDataArr[i][j] && entireFeatureDataArr[i][j].formatedDate && entireFeatureDataArr[i][j].formatedDate !== "") {
                            domConstruct.create("span", { "class": "esriCTHiddenColumn", "innerHTML": entireFeatureDataArr[i][j].epoch }, td);
                            domConstruct.create("span", { "innerHTML": entireFeatureDataArr[i][j].formatedDate }, td);
                        } else {
                            td.innerHTML = entireFeatureDataArr[i][j];
                        }
                        tr.appendChild(td);
                    }
                    this._onRowClick(tr);
                }
            }
            this.dataViewerContainer.appendChild(this._table);
            this.appUtils.hideLoadingIndicator();
            this.appUtils.hideOverlayContainer();
        },

        /**
        * This function is used to create data that needs to be added in data-viewer table
        * @memberOf widgets/data-viewer/data-viewer
        */
        _createDataViewerDataPanel: function () {
            var i, j, number, fieldName, format, type, value, dateValue, dateFormat, k,
                n, id, m, isCodeMatched, entireFeatureDataArr, dataSet, objectIdIndex;
            // Stores all rows
            entireFeatureDataArr = [];
            for (i = 0; i < this._features.length; i++) {
                // Stores single row
                dataSet = [];
                for (j = 0; j < this._displayColumn.length; j++) {
                    if (this._displayColumn[j].displayField) {
                        fieldName = this._displayColumn[j].fieldName;
                        format = this._displayColumn[j].format;
                        type = this._displayColumn[j].type;
                        value = this._features[i].attributes[fieldName];
                        dateFormat = this.appUtils.getDateFormat(format).dateFormat;
                        switch (type) {
                        case "esriFieldTypeOID":
                            dataSet.push(value);
                            objectIdIndex = j;
                            break;
                        case "esriFieldTypeDate":
                            dateValue = {};
                            // If the field contains date value
                            if (value && value !== 0) {
                                dateValue.epoch = value;
                                dateValue.formatedDate = (moment(value)).format(dateFormat);
                                dataSet.push(dateValue);
                            } else {
                                if (value === 0 || value === "" || value === null) {
                                    dataSet.push("");
                                } else {
                                    dateValue.epoch = value;
                                    dateValue.formatedDate = (moment(value)).format(dateFormat);
                                    dataSet.push(dateValue);
                                }
                            }
                            break;
                        default:
                            // If the field contains coded domain values
                            if (this._displayColumn[j].codedValues) {
                                // Tracks whether data is entered in the dataset or not.
                                // Whether value is matched or not it has to be entered in the dataset.
                                isCodeMatched = false;
                                if (value || value === 0) {
                                    for (k = 0; k < this._displayColumn[j].codedValues.length; k++) {
                                        if (this._displayColumn[j].codedValues[k].code === value) {
                                            isCodeMatched = true;
                                            dataSet.push(this._displayColumn[j].codedValues[k].name);
                                        }
                                    }
                                } else {
                                    isCodeMatched = true;
                                    dataSet.push(value);
                                }
                                if (!isCodeMatched) {
                                    dataSet.push(value);
                                }
                            } else if (this._displayColumn[j].types) {
                                // Tracks whether data is entered in the dataset or not.
                                // Whether value is matched or not it has to be entered in the dataset.
                                isCodeMatched = false;
                                // If the field contains types
                                if (value || value === 0) {
                                    for (n = 0; n < this._displayColumn[j].types.length; n++) {
                                        if (this._displayColumn[j].types[n].id.toString() === value.toString()) {
                                            isCodeMatched = true;
                                            dataSet.push(this._displayColumn[j].types[n].name);
                                        }
                                    }
                                } else {
                                    isCodeMatched = true;
                                    dataSet.push(value);
                                }
                                if (!isCodeMatched) {
                                    dataSet.push(value);
                                }
                            } else if (this._selectedOperationalLayer.types && this._selectedOperationalLayer.types.length > 0 && this._selectedOperationalLayer.types[0].domains && this._selectedOperationalLayer.types[0].domains[fieldName] && this._selectedOperationalLayer.types[0].domains[fieldName].codedValues) {
                                // If the fields contain subtypes
                                isCodeMatched = false;
                                id = this._features[i].attributes[this._selectedOperationalLayer.typeIdField];
                                for (m = 0; m < this._selectedOperationalLayer.types.length; m++) {
                                    if (this._selectedOperationalLayer.types[m].id === id) {
                                        for (n = 0; n < this._selectedOperationalLayer.types[m].domains[fieldName].codedValues.length; n++) {
                                            if (value === this._selectedOperationalLayer.types[m].domains[fieldName].codedValues[n].code) {
                                                isCodeMatched = true;
                                                if (value || value === 0) {
                                                    dataSet.push(this._selectedOperationalLayer.types[m].domains[fieldName].codedValues[n].name);
                                                } else {
                                                    dataSet.push(value);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!isCodeMatched) {
                                    dataSet.push(value);
                                }
                            } else {
                                // If the fields contain number format
                                if (this._displayColumn[j].numberFormat) {
                                    if (value || value === 0) {
                                        if (this._displayColumn[j].numberFormat.digitSeparator) {
                                            number = value.toFixed(this._displayColumn[j].numberFormat.places);
                                            number = this.appUtils.convertNumberToThousandSeperator(number);
                                            dataSet.push(number);
                                        } else {
                                            dataSet.push(value.toFixed(this._displayColumn[j].numberFormat.places));
                                        }
                                    } else {
                                        dataSet.push(value);
                                    }
                                } else {
                                    // If none of the above conditions are satisfied
                                    dataSet.push(value);
                                }
                            }
                        }
                    }
                }
                // Push single row in array
                entireFeatureDataArr.push(dataSet);
            }
            // Pass entire data for creation of a data-viewer table
            this._creatTableRows(entireFeatureDataArr, objectIdIndex);
        },

        /**
        * This function is used to create feature table header panel.
        * @memberOf widgets/data-viewer/data-viewer
        */
        _createDataViewerHeaderPanel: function () {
            var columnHeader, thead, tr, i, theadClass;
            domConstruct.empty(this.dataViewerContainer);
            this._table = domConstruct.create("table", { "id": "myTable", "class": "table table-striped table-bordered", "cellspacing": "0", "cellpadding": "0" }, this.dataViewerContainer);

            //            this._bindTableSorterEvent();
            thead = domConstruct.create("thead", {}, this._table);
            tr = domConstruct.create("tr", {}, thead);
            // to create table headers
            if (this._features.length > 0) {
                this._getFieldProperties();
                for (i = 0; i < this._displayColumn.length; i++) {
                    theadClass = this._createClassName(this._displayColumn[i].label);
                    if (this._displayColumn[i].type === "esriFieldTypeOID") {
                        columnHeader = domConstruct.create("th", { "class": "esriCTHiddenColumn " + theadClass, "style": "min-width:300px;" });
                    } else {
                        columnHeader = domConstruct.create("th", { "class": "esriCTTableHeaderDiv esriCTDataViewerTableCellContent " + theadClass });
                    }
                    domConstruct.create("div", { "class": "esriCTTableHeader", "innerHTML": this._displayColumn[i].label }, columnHeader);
                    domConstruct.create("div", { "class": "esriCTBlackCaretIcon esriCTSortAsc esriCTHiddenColumn", "innerHTML": "&#9660;" }, columnHeader);
                    domConstruct.create("div", { "class": "esriCTFilterIcon  esriCTSortDesc esriCTHiddenColumn" }, columnHeader);

                    tr.appendChild(columnHeader);
                    // Attach header click event
                    this._attachHeaderClickEvent(columnHeader, this._displayColumn[i].label);

                }
            }
        },

        /**
        * This function is used attach click event on table header
        * To show or hide filter container div for corresponding clicked header title
        * @memberOf widgets/data-viewer/data-viewer
        */
        _attachHeaderClickEvent: function (header, headerTitle) {
            var childNode, currentChildNode, node;
            this.own(on(header, "click", lang.hitch(this, function () {
                // Display none all other filter containers except the current header's filter container
                array.forEach(this._displayColumn, lang.hitch(this, function (columnName) {
                    if (columnName.label !== headerTitle) {
                        var className = this._createClassName(columnName.label);
                        node = query("." + className)[0];
                        if (node) {
                            childNode = query(".esriCTFilterParentContainer", node)[0];
                            domStyle.set(childNode, "display", "none");
                        }
                    }
                }));
                currentChildNode = query(".esriCTFilterParentContainer", header)[0];
                var title = this._createClassName(headerTitle);
                if (domClass.contains(header, title) && domStyle.get(currentChildNode, "display") !== "block") {
                    domStyle.set(currentChildNode, "display", "block");
                }
            })));
        },

        /**
        * This function is used to display details panel
        * @memberOf widgets/data-viewer/data-viewer
        */
        showDetailsPanel: function (featureSet) {
            return featureSet;
        },

        /**
        * This function is used to create container for table header options
        * @memberOf widgets/data-viewer/data-viewer
        */
        _createHeaderOptionContainer: function (i, tableHeader) {
            var filterParentContainer, ascFlagContainer, descFlagContainer, columnNumber;
            // Creating a div which contains 'Ascending' and 'Descending' flag titles div
            filterParentContainer = domConstruct.create("div", { "class": "esriCTFilterParentContainer" }, tableHeader);
            // 'Ascending' flag title div
            ascFlagContainer = domConstruct.create("div", { "innerHTML": this.appConfig.i18n.dataviewer.ascendingFlagTitle, "class": "esriCTAscDescTitleDiv esriCTAsc" }, filterParentContainer);
            // 'Descending' flag title div
            descFlagContainer = domConstruct.create("div", { "innerHTML": this.appConfig.i18n.dataviewer.descendingFlagTitle, "class": "esriCTAscDescTitleDiv esriCTDesc" }, filterParentContainer);
            domAttr.set(ascFlagContainer, "colID", i);
            domAttr.set(descFlagContainer, "colID", i);

            on(query(".esriCTAsc", tableHeader)[0], "click", lang.hitch(this, function () {
                columnNumber = parseInt(domAttr.get(ascFlagContainer, "colID"), 10);
                this._sortByColoumn(columnNumber, "ASC");
            }));
            on(query(".esriCTDesc", tableHeader)[0], "click", lang.hitch(this, function () {
                columnNumber = parseInt(domAttr.get(descFlagContainer, "colID"), 10);
                this._sortByColoumn(columnNumber, "DESC");
            }));
            // creating Filter widget, only if the field contains 'ask for value' filter checked on the layer
            // TODO : Filter widget coming soon... //ignore jslint
            // this._createFilterWidget(filterParentContainer, i, this._displayColumn[i].fieldName);
        },

        /**
        * This function is used to create filter widget
        * @memberOf widgets/data-viewer/data-viewer
        */
        _createFilterWidget: function (filterParentContainer, index, label) {
            var filterParameters;
            // filter widget parameters
            filterParameters = {
                "appConfig": this.appConfig,
                "filterParentContainer": filterParentContainer,
                "index": index,
                "itemInfo": this.itemInfo,
                "displayColumn": label,
                "selectedOperationalLayerID": this.selectedOperationalLayerID,
                "selectedOperationalLayer": this.selectedOperationalLayer
            };
            // Instantiating filter object for the fields configured with 'ask for value'
            this._filterWidgetObj = new Filter(filterParameters, domConstruct.create("div", {}, filterParentContainer));
            // creating UI Filters, only if the field contains 'ask for value' filters checked for the layer
            this._filterWidgetObj.startup();
        },

        /**
        * This function will
        * @memberOf widgets/data-viewer/data-viewer
        */
        _createClassName: function (className) {
            return className.split(" ").join("");
        },

        /**
        * This function will instantiate table sorter
        * @memberOf widgets/data-viewer/data-viewer
        */
        _bindTableSorterEvent: function () {
            $("#myTable").tablesorter({
                headers: {
                    // disable sorting of the first & second column - before we would have to had made two entries
                    // note that "first-name" is a class on the span INSIDE the first column th cell
                    'table thead th': {
                        // disable it by setting the property sorter to false
                        sorter: false
                    }
                }
            });
        },

        /**
        * This function binds events to sort the table in ascending or
        * descending order on column wise
        * @memberOf widgets/data-viewer/data-viewer
        */
        _sortByColoumn: function (columnNumber, sortingOrder) {
            if (sortingOrder === "ASC") {
                $('table').trigger('sorton', [[[columnNumber, 0]]]);
            } else {
                $('table').trigger('sorton', [[[columnNumber, 1]]]);
            }
        },

        /**
        * This function is used to highlight feature on row click.
        * @memberOf widgets/data-viewer/data-viewer
        */
        _onRowClick: function (tr) {
            on(tr, "click", lang.hitch(this, function (evt) {
                this.appUtils.showLoadingIndicator();
                this._featureObjectID = parseInt(domAttr.get(evt.currentTarget, "OBJID"), 10);
                this._highLightFeatureOnRowClick(this._featureObjectID, evt);
            }));
        },

        /**
        * This function will clear selected faetures
        * @memberOf widgets/data-viewer/data-viewer
        */
        _clearSelection: function () {
            this._selectRowGraphicsLayer.clear();
        },

        /**
        * This function de select the selected rows
        * @memberOf widgets/data-viewer/data-viewer
        */
        _deselectTableRows: function () {
            var selectedRow;
            selectedRow = query(".esriCTRowHighlighted", this._table);
            array.forEach(selectedRow, lang.hitch(this, function (key) {
                domClass.remove(key, "esriCTRowHighlighted");
            }));
        },

        /**
        * This function is used attach click event to features
        * @memberOf widgets/data-viewer/data-viewer
        */
        onFeatureClick: function (evt) {
            this.appUtils.showLoadingIndicator();
            this._selectFeatureOnMapClick(evt);
        },

        /**
        * This function is used to select feature on map
        * @param{object} feature that needs to be selected
        * @memberOf widgets/data-viewer/data-viewer
        */
        _selectFeatureOnMapClick: function (evt) {
            var objectId, featureQuery, featureLayer, feature, ctrlFlag = false, selectFlag;
            featureQuery = new Query();
            feature = evt.graphic;
            objectId = feature.attributes[this._selectedOperationalLayer.objectIdField];
            featureQuery.objectIds = [parseInt(objectId, 10)];
            featureQuery.outSpatialReference = this.map.spatialReference;
            featureQuery.returnGeometry = true;
            featureQuery.outFields = ["*"];
            // Consider if feature is selected & updated with certain value.
            // Now if user selects same feature from the map and pans the map. Since we retain the selected features in the grid.
            // So to maintain updated value of the selected feature, a new object of the feature layer is required.
            // If a new object is not created than the previous value of feature appears and not the updated one.
            featureLayer = new FeatureLayer(this._selectedOperationalLayer.url);
            if (this.definitionExpression) {
                featureLayer.setDefinitionExpression(this.definitionExpression);
            }
            if (this.popupInfo) {
                featureLayer.setInfoTemplate(new PopupTemplate(this.popupInfo));
            }
            featureLayer.queryFeatures(featureQuery, lang.hitch(this, function (featureSet) {
                this._getSelectedLayerOnTop();
                if (!evt.ctrlKey) {
                    this._clearSelection();
                } else {
                    ctrlFlag = true;
                }
                selectFlag = this._selectRowOnFeatureClick(objectId, true, ctrlFlag);
                if (selectFlag) {
                    this._selectRowGraphicsLayer.add(this._getHighLightSymbol(featureSet.features[0], false));
                    if (!this._isRowFound) {
                        this.createDataViewerUI(false);
                    }
                }
                //open details panel with feature information
                this.showDetailsPanel(featureSet);
                this.appUtils.hideLoadingIndicator();
            }), lang.hitch(this, function () {
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * This function is used to highlight feature.
        * @param{object} objectId of feature that needs to be high-lighted
        * @memberOf widgets/data-viewer/data-viewer
        */
        _highLightFeatureOnRowClick: function (objectId, evt) {
            var featureQuery, featureLayer, ctrlFlag = false, selectFlag;
            featureQuery = new Query();
            featureQuery.outSpatialReference = this.map.spatialReference;
            featureQuery.objectIds = [parseInt(objectId, 10)];
            featureQuery.returnGeometry = true;
            featureQuery.outFields = ["*"];
            // Consider if feature is selected & updated with certain value.
            // Now if user selects same feature from the grid and pans the map. Since we retain the selected features in the grid.
            // So to maintain updated value of the selected feature, a new object of the feature layer is required.
            // If a new object is not created than the previous value of feature appears and not the updated one.
            featureLayer = new FeatureLayer(this._selectedOperationalLayer.url);
            if (this.definitionExpression) {
                featureLayer.setDefinitionExpression(this.definitionExpression);
            }
            if (this.popupInfo) {
                featureLayer.setInfoTemplate(new PopupTemplate(this.popupInfo));
            }
            featureLayer.queryFeatures(featureQuery, lang.hitch(this,
                function (featureSet) {
                    this._getSelectedLayerOnTop();
                    if (!evt.ctrlKey) {
                        this._clearSelection();
                    } else {
                        ctrlFlag = true;
                    }
                    selectFlag = this._selectRowOnFeatureClick(objectId, false, ctrlFlag);
                    if (selectFlag) {
                        if (featureSet.features[0].geometry) {
                            this._selectRowGraphicsLayer.add(this._getHighLightSymbol(featureSet.features[0]));
                        } else {
                            this._selectRowGraphicsLayer.add(featureSet.features[0]);
                            this.appUtils.showMessage(this.appConfig.i18n.dataviewer.noFeatureGeometry);
                        }
                    }
                    if (!ctrlFlag) {
                        if (this._isPointLayer) {
                            this.map.setLevel(this.appConfig.zoomLevel);
                            this.map.centerAt(featureSet.features[0].geometry);
                        } else {
                            this.map.setExtent(featureSet.features[0].geometry.getExtent(), true);
                        }
                    }
                    //open details panel with feature information
                    this.showDetailsPanel(featureSet);
                    this.appUtils.hideLoadingIndicator();
                }), lang.hitch(this, function () { this.appUtils.hideLoadingIndicator(); }));
        },

        /**
        * This function is used to highlight feature.
        * @memberOf widgets/data-viewer/data-viewer
        */
        _selectRowOnFeatureClick: function (objectId, selectRow, ctrlFlag) { //ignore jslint
            var i, selectedRowObjID, rowNumber, isRowSelected = false;
            this._isRowFound = false;
            for (i = 0; i < this._table.rows.length; i++) {
                selectedRowObjID = parseInt(domAttr.get(this._table.rows[i], "OBJID"), 10);
                if (objectId === selectedRowObjID) {
                    this._isRowFound = true;
                    rowNumber = i;
                    if (!domClass.contains(this._table.rows[i], "esriCTRowHighlighted")) {
                        if (!ctrlFlag) {
                            this._clearSelection();
                            this._deselectTableRows();
                        }
                        domClass.add(this._table.rows[i], "esriCTRowHighlighted");
                        isRowSelected = true;
                    } else {
                        this._removeHighLightedFeatureOnRowClick(objectId);
                        domClass.remove(this._table.rows[i], "esriCTRowHighlighted");
                        isRowSelected = false;
                    }
                    break;
                }
            }
            this.appUtils.hideLoadingIndicator();
            if (this._isRowFound && selectRow) {
                this._scrollToActivatedFeature(rowNumber);
            } else {
                if (this._isRowFound) {
                    this.appUtils.hideLoadingIndicator();
                }
            }
            return isRowSelected;
        },

        /**
        * This function is used to remove highlighted feature from map.
        * @param{object} objectId of feature that needs to be removed
        * @memberOf widgets/data-viewer/data-viewer
        */
        _removeHighLightedFeatureOnRowClick: function (objectId) {
            var i, objectID;
            for (i = 0; i < this._selectRowGraphicsLayer.graphics.length; i++) {
                objectID = this._selectRowGraphicsLayer.graphics[i].attributes[this._selectedOperationalLayer.objectIdField];
                if (parseInt(objectID, 10) === parseInt(objectId, 10)) {
                    this._selectRowGraphicsLayer.remove(this._selectRowGraphicsLayer
                            .graphics[i]);
                    break;
                }
            }
        },

        /**
        * This function is used to scroll data-viewer to activated row
        * @param{integer} row number of data-viewer grid
        * @memberOf widgets/data-viewer/data-viewer
        */
        _scrollToActivatedFeature: function (rowNumber) {
            $('.esriCTDataViewerContainer').animate({
                scrollTop: 0
            }, 0);
            setTimeout(lang.hitch(this, function () {
                if ($('.esriCTDataViewerContainer tr:eq(' + rowNumber + ')').offset() && $('.esriCTDataViewerContainer tr:eq(' + rowNumber + ')').offset().top) {
                    // Get row position by index
                    var scrollTopValue = $('.esriCTDataViewerContainer tr:eq(' + rowNumber + ')').offset().top;
                    $('.esriCTDataViewerMainContainer').animate({
                        scrollTop: $('.esriCTDataViewerMainContainer').scrollTop() + scrollTopValue - 100
                    }, 400);
                }
                this.appUtils.hideLoadingIndicator();
            }), 10);
        },

        /**
        * This function is used to get selected layer on top
        * @memberOf widgets/data-viewer/data-viewer
        */
        _getSelectedLayerOnTop: function () {
            this.map.reorderLayer(this.map.getLayer("selectedRowGraphicsLayer"), 1000);
        },

        /**
        * This function is used to get symbol i.e, used for highlighting feature.
        * For point feature graphic layer is used to highlighting it. Because arcgis api do not have capability
        * of highlighting point symbol with cross-hair. Other than point geometry like polygon, polyline, etc...
        * selectFeatures method of feature layer is used which has the capability of highlighting it with cyan color
        * @param{object} selected feature which needs to be highlighted
        * @param{boolean} whether feature is to be selected/activated
        * @memberOf widgets/data-viewer/data-viewer
        */
        _getHighLightSymbol: function (graphic) {
            // If feature geometry is of type point, add a crosshair symbol
            // If feature geometry is of type polyline, highlight the line
            // If feature geometry is of type polygon, highlight the boundary of the polygon
            switch (graphic.geometry.type) {
            case "point":
                return this._getPointSymbol(graphic);
            case "polyline":
                return this._getPolyLineSymbol(graphic);
            case "polygon":
                return this._getPolygonSymbol(graphic);
            }
        },

        /**
        * This function is used to get symbol for point geometry
        * @param{object} selected feature which needs to be highlighted
        * @param{boolean} whether feature is to be selected/activated
        * @memberOf widgets/data-viewer/data-viewer
        */
        _getPointSymbol: function (graphic) {
            var symbol, isSymbolFound, graphics, point, graphicInfoValue, layerInfoValue, i;
            isSymbolFound = false;
            symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, null, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 3));
            symbol.setColor(null);
            symbol.size = 30; //set default Symbol size which will be used in case symbol not found.
            //check if layer is valid and have valid renderer object then only check for other symbol properties
            if (this._selectedOperationalLayer && this._selectedOperationalLayer.renderer) {
                if (this._selectedOperationalLayer.renderer.symbol) {
                    isSymbolFound = true;
                    symbol = this._updatePointSymbolProperties(symbol, this._selectedOperationalLayer.renderer.symbol);
                } else if (this._selectedOperationalLayer.renderer.infos && (this._selectedOperationalLayer.renderer.infos.length > 0)) {
                    for (i = 0; i < this._selectedOperationalLayer.renderer.infos.length; i++) {
                        if (this._selectedOperationalLayer.typeIdField) {
                            graphicInfoValue = graphic.attributes[this._selectedOperationalLayer.typeIdField];
                        } else if (this._selectedOperationalLayer.renderer.attributeField) {
                            graphicInfoValue = graphic.attributes[this._selectedOperationalLayer.renderer.attributeField];
                        }
                        layerInfoValue = this._selectedOperationalLayer.renderer.infos[i].value;
                        // To get properties of symbol when infos contains other than class break renderer.
                        if (graphicInfoValue !== undefined && graphicInfoValue !== null && graphicInfoValue !== "" && layerInfoValue !== undefined && layerInfoValue !== null && layerInfoValue !== "") {
                            if (graphicInfoValue.toString() === layerInfoValue.toString()) {
                                isSymbolFound = true;
                                symbol = this._updatePointSymbolProperties(symbol, this._selectedOperationalLayer.renderer.infos[i].symbol);
                            }
                        }
                    }
                    if (!isSymbolFound) {
                        if (this._selectedOperationalLayer.renderer.defaultSymbol) {
                            isSymbolFound = true;
                            symbol = this._updatePointSymbolProperties(symbol, this._selectedOperationalLayer.renderer.defaultSymbol);
                        }
                    }
                }
            }
            point = new Point(graphic.geometry.x, graphic.geometry.y, new SpatialReference({
                wkid: graphic.geometry.spatialReference.wkid
            }));
            graphics = new Graphic(point, symbol, graphic.attributes);
            return graphics;
        },

        /**
        * This function is used to get symbol for polyline geometry
        * @param{object} selected feature which needs to be highlighted
        * @param{boolean} whether feature is to be selected/activated
        * @memberOf widgets/data-viewer/data-viewer
        */
        _getPolyLineSymbol: function (graphic) {
            var symbol, graphics, polyline, symbolWidth, graphicInfoValue, layerInfoValue, i;
            symbolWidth = 5; // default line width
            //check if layer is valid and have valid renderer object then only check for other  symbol properties
            if (this._selectedOperationalLayer && this._selectedOperationalLayer.renderer) {
                if (this._selectedOperationalLayer.renderer.symbol && this._selectedOperationalLayer.renderer.symbol.hasOwnProperty("width")) {
                    symbolWidth = this._selectedOperationalLayer.renderer.symbol.width;
                } else if ((this._selectedOperationalLayer.renderer.infos) && (this._selectedOperationalLayer.renderer.infos.length > 0)) {
                    for (i = 0; i < this._selectedOperationalLayer.renderer.infos.length; i++) {
                        if (this._selectedOperationalLayer.typeIdField) {
                            graphicInfoValue = graphic.attributes[this._selectedOperationalLayer.typeIdField];
                        } else if (this._selectedOperationalLayer.renderer.attributeField) {
                            graphicInfoValue = graphic.attributes[this._selectedOperationalLayer.renderer.attributeField];
                        }
                        layerInfoValue = this._selectedOperationalLayer.renderer.infos[i].value;
                        // To get properties of symbol when infos contains other than class break renderer.
                        if (graphicInfoValue !== undefined && graphicInfoValue !== null && graphicInfoValue !== "" && layerInfoValue !== undefined && layerInfoValue !== null && layerInfoValue !== "") {
                            if (graphicInfoValue.toString() === layerInfoValue.toString() && this._selectedOperationalLayer.renderer.infos[i].symbol.hasOwnProperty("width")) {
                                symbolWidth = this._selectedOperationalLayer.renderer.infos[i].symbol.width;
                            }
                        }
                    }
                } else if (this._selectedOperationalLayer.renderer.defaultSymbol && this._selectedOperationalLayer.renderer.defaultSymbol.hasOwnProperty("width")) {
                    symbolWidth = this._selectedOperationalLayer.renderer.defaultSymbol.width;
                }
            }
            symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), symbolWidth);

            polyline = new Polyline(new SpatialReference({
                wkid: graphic.geometry.spatialReference.wkid
            }));
            if (graphic.geometry.paths && graphic.geometry.paths.length > 0) {
                polyline.addPath(graphic.geometry.paths[0]);
            }
            graphics = new Graphic(polyline, symbol, graphic.attributes);
            return graphics;
        },

        /**
        * This function is used to get symbol for polygon geometry
        * @param{object} selected feature which needs to be highlighted
        * @param{boolean} whether feature is to be selected/activated
        * @memberOf widgets/data-viewer/data-viewer
        */
        _getPolygonSymbol: function (graphic) {
            var symbol, graphics, polygon;
            symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 4), new Color([0, 0, 0, 0]));
            polygon = new Polygon(new SpatialReference({
                wkid: graphic.geometry.spatialReference.wkid
            }));
            if (graphic.geometry.rings) {
                polygon.rings = lang.clone(graphic.geometry.rings);
            }
            graphics = new Graphic(polygon, symbol, graphic.attributes);
            return graphics;
        },

        /**
        * This function is used to update symbol properties
        * @param{object} symbol that needs to be assigned to selected/activated feature
        * @param{object} renderer layer Symbol
        * @memberOf widgets/data-viewer/data-viewer
        */
        _updatePointSymbolProperties: function (symbol, layerSymbol) {
            var height, width, size;
            if (layerSymbol.hasOwnProperty("height") && layerSymbol.hasOwnProperty("width")) {
                height = layerSymbol.height;
                width = layerSymbol.width;
                // To display cross hair properly around feature its size needs to be calculated
                size = (height > width) ? height : width;
                size = size + 10;
                symbol.size = size;
            }
            if (layerSymbol.hasOwnProperty("size")) {
                if (!size || size < layerSymbol.size) {
                    symbol.size = layerSymbol.size + 10;
                }
            }
            if (layerSymbol.hasOwnProperty("xoffset")) {
                symbol.xoffset = layerSymbol.xoffset;
            }
            if (layerSymbol.hasOwnProperty("yoffset")) {
                symbol.yoffset = layerSymbol.yoffset;
            }
            return symbol;
        }
    });
});