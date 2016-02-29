/*global define,dojo,alert,moment,$ */
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
    "dijit/_WidgetBase",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/_base/array",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/Deferred",
    "dojo/dom-style",
    "dojo/domReady!"
], function (
    declare,
    domConstruct,
    _WidgetBase,
    QueryTask,
    Query,
    lang,
    on,
    array,
    domAttr,
    domClass,
    Deferred,
    domStyle
) {
    return declare([_WidgetBase], {
        _filterContainer: null, // contains parent filter container
        _filterObject: [], // object to store values for maintaining state of data viewer when manual refresh call
        _parameterizedExpression: "", // to store parameterized expression of the layer
        _currentExpression: "", // to store new definition expression


        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/filter/filter
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        startup: function () {
            // initialize filters to be checked for the field, and
            // append filter, if found
            this._checkForFilters();
        },

        _checkForFilters: function () {

            /********************* uncomment for testing state maintainance - START *****************/

            //      var definitionEditor = {
            //        "inputs": [{
            //          "hint": "LAT hint",
            //          "prompt": "LAT is",
            //          "parameters": [{
            //            "type": "esriFieldTypeDouble",
            //            "fieldName": "LAT",
            //            "parameterId": 0,
            //            "defaultValue": 10.3,
            //            "showTextBox": false,
            //            "showDropDown": true,
            //            "dropDownValue": 12.3,
            //            "textBoxValue": 70
            //          }]
            //        }, {
            //          "hint": "LAT is not hint",
            //          "prompt": "LAT is not",
            //          "parameters": [{
            //            "type": "esriFieldTypeDouble",
            //            "fieldName": "LAT",
            //            "parameterId": 1,
            //            "defaultValue": 10.4,
            //            "showTextBox": true,
            //            "showDropDown": false,
            //            "dropDownValue": 10.4,
            //            "textBoxValue": 12
            //          }]
            //        }],
            //        "parameterizedExpression": "(LAT = {0}) AND (LAT <> {1})"
            //      }
            //      this._filterObject = definitionEditor;

            /********************* uncomment for testing state maintainance - END *****************/

            /********************* comment it for testing state maintainance - START *****************/
            if (this._filterStateObject && this._filterStateObject.inputs && this._filterStateObject.inputs.length > 0) {
                this._filterObject = this._filterStateObject;
            } else {
                array.forEach(this.itemInfo.itemData.operationalLayers, lang.hitch(this, function (layer) {
                    if (this.selectedOperationalLayer.id === layer.id && layer.definitionEditor) {
                        this._filterObject = layer.definitionEditor;
                        return true;
                    }
                }));
            }
            /********************* comment it for testing state maintainance - END *****************/
            this._parameterizedExpression = this._filterObject.parameterizedExpression;
            this._createFilterOptionContainer();
        },

        /**
        * This function is used to create filters for the header field (only when ask for value is enabled)
        * @memberOf widgets/filter/filter
        */
        _createFilterOptionContainer: function () {
            var definitionEditorInputs, split;
            if (this._filterObject && this._filterObject.parameterizedExpression && this._filterObject.parameterizedExpression !== "") {
                split = this._filterObject.parameterizedExpression.split(this.displayColumn);
                if (split.length > 1 && this._filterObject.inputs) {
                    definitionEditorInputs = this._filterObject.inputs;
                    // call function to check and append the filters used for the field
                    array.forEach(this._filterObject.inputs, lang.hitch(this, function (definitionEditorInput, index) {
                        // 
                        this._createFilterContainer(definitionEditorInput, index);
                    }));
                }
            }
        },

        /**
        * This function will create main filter container
        * @param{obj} contains current editor input value
        * @memberOf widgets/filter/filter
        */
        _createFilterContainer: function (definitionEditorInput, index) {
            var filterLabel;
            if (this.displayColumn === definitionEditorInput.parameters[0].fieldName) {
                // As to create filter container only one time for a field
                // checking if it is already created (i.e. when index > 0)
                if (!this._filterContainer) {
                    this._filterContainer = domConstruct.create("div", { "class": "esriCTFilterContainer" }, this.filterParentContainer);
                    filterLabel = domConstruct.create("label", { "innerHTML": this.appConfig.i18n.dataviewer.filterLabel, "class": "esriCTFilterLabel" }, this._filterContainer);
                    this.filterAttributesContainer = domConstruct.create("div", { "class": "esriCTFilterAttributesContainer" }, this._filterContainer);
                }
                // Calling a function to append filter optipns in the container
                this._createFilterOptionBox(definitionEditorInput, index);
            }
        },

        /**
        * This function is used to create filters for the header field (only when ask for value is enabled)
        * @param{}
        * @memberOf widgets/filter/filter
        */
        _createFilterOptionBox: function (definitionEditorInput, index) {
            var baseFilterOptionDiv, textBoxDiv, selectOptionDiv, selectOption, radioButtonParentDiv, radioButtonDiv, radioButtonObject = {}, formGroupDiv, container, hintFilterContainer;
            baseFilterOptionDiv = domConstruct.create("div", {
                "class": "esriCTBaseFilterOptionDiv"
            }, this.filterAttributesContainer);
            domConstruct.create("label", { "innerHTML": definitionEditorInput.prompt, "class": "esriCTFilterLabel" }, baseFilterOptionDiv);
            if (definitionEditorInput.parameters[0].type !== "esriFieldTypeDate") {
                // Create text box container 
                // displays when 'value' radio button is selected (OR by default)
                textBoxDiv = domConstruct.create("div", {
                    "class": "esriCTInputTextBoxDiv"
                }, baseFilterOptionDiv);
                this._createTextBoxContainer(textBoxDiv, definitionEditorInput, index);

                // Create combo box container 
                // displays when 'unique' radio button is selected
                selectOptionDiv = domConstruct.create("div", {
                    "class": "esriCTSelectOptionDiv"
                }, baseFilterOptionDiv);
                selectOption = domConstruct.create("select", {
                    "class": "esriCTSelectOption"
                }, selectOptionDiv);

                // Creating Radio buttons container
                radioButtonParentDiv = domConstruct.create("div", {
                    "class": "esriCTRadioOptionParentDiv"
                }, baseFilterOptionDiv);
                radioButtonDiv = domConstruct.create("div", {
                    "class": "esriCTRadioButtonDiv"
                }, radioButtonParentDiv);

                radioButtonObject = {
                    "node": radioButtonDiv,
                    "definitionEditorInput": definitionEditorInput,
                    "index": index,
                    "textBoxDiv": textBoxDiv,
                    "selectOptionDiv": selectOptionDiv,
                    "selectOption": selectOption
                };

                // Create radio buttons for text value and unique drop down value
                this._createRadioButtons(radioButtonObject);
            } else {
                // for date picker
                // create date picker container div
                formGroupDiv = domConstruct.create("div", { "class": "esriCTDatePickerDiv form-group" }, baseFilterOptionDiv);
                // adding date picker icon
                container = this._addNotationIcon(formGroupDiv, "glyphicon-calendar");
                // initializing date picker instance
                this._createDateField(container);
            }
            hintFilterContainer = domConstruct.create("div", { "class": "esriCTHintFilterContainer" }, baseFilterOptionDiv);
            domConstruct.create("label", { "innerHTML": "Hint: " + definitionEditorInput.hint }, hintFilterContainer);
        },

        /**
        * Add calendar notation icon
        * @param{object} formContent, Parent Node to attached field
        * @param{string} imageIconClass,default class of image icon calendar
        * @memberOf widgets/filter/filter
        */
        _addNotationIcon: function (formContent, imageIconClass) {
            var inputIconGroupContainer, inputIconGroupAddOn;
            // create container for calendar for date time picker
            inputIconGroupContainer = domConstruct.create("div", {
                className: "input-group"
            }, formContent);
            inputIconGroupAddOn = domConstruct.create("span", {
                className: "input-group-addon"
            }, inputIconGroupContainer);
            domConstruct.create("span", {
                className: "glyphicon " + imageIconClass
            }, inputIconGroupAddOn);
            // return Value
            return inputIconGroupContainer;
        },

        /**
        * Create datetime picker
        * @param{object} parentNode, parent node to attached date time picker
        * @memberOf widgets/filter/filter
        */
        _createDateField: function (parentNode) {
            var dateInputField;
            domClass.add(parentNode, "date");
            // create input container for DateTimePicker
            dateInputField = domConstruct.create("input", {
                type: "text",
                value: "",
                className: "form-control hasDatetimepicker",
                "data-input-type": "Date",
                "id": ""
            }, parentNode);

            // Attach datetime picker to the container
            $(parentNode).datetimepicker();
        },

        /**
        * Create radio buttons and labels for it
        * @param{object} definitionEditorInput, index, nodes
        * @memberOf widgets/filter/filter
        */
        _createRadioButtons: function (radioParam) {
            var valueRadio, uniqueRadio, radioButtonParam = {};
            valueRadio = domConstruct.create("input", {
                "type": "radio",
                "name": radioParam.definitionEditorInput.parameters[0].fieldName + radioParam.index,
                "value": this.appConfig.i18n.dataviewer.valueRadioButtonLabel,
                "class": "esriCTRadioButton"
            }, radioParam.node);
            domConstruct.create("label", {
                "innerHTML": this.appConfig.i18n.dataviewer.valueRadioButtonLabel,
                "class": "esriCTRadioButtonLabel"
            }, radioParam.node);
            uniqueRadio = domConstruct.create("input", {
                "type": "radio",
                "name": radioParam.definitionEditorInput.parameters[0].fieldName + radioParam.index,
                "value": this.appConfig.i18n.dataviewer.uniqueRadioButtonLabel,
                "class": "esriCTRadioButton"
            }, radioParam.node);
            domConstruct.create("label", {
                "innerHTML": this.appConfig.i18n.dataviewer.uniqueRadioButtonLabel,
                "class": "esriCTRadioButtonLabel"
            }, radioParam.node);

            // radio button parameter object
            radioButtonParam = {
                "valueRadio": valueRadio,
                "uniqueRadio": uniqueRadio,
                "index": radioParam.index,
                "selectOptionDiv": radioParam.selectOptionDiv,
                "textBoxDiv": radioParam.textBoxDiv,
                "selectOption": radioParam.selectOption,
                "definitionEditorInput": radioParam.definitionEditorInput
            };

            if (this._filterObject.inputs[radioParam.index].parameters[0].showTextBox) {
                domAttr.set(valueRadio, "checked", true);
                this._showTextBox(radioButtonParam);
            } else if (this._filterObject.inputs[radioParam.index].parameters[0].showDropDown) {
                domAttr.set(uniqueRadio, "checked", true);
                this._showDropDown(radioButtonParam, false);
            } else {
                domAttr.set(valueRadio, "checked", true);
                this._showTextBox(radioButtonParam);
            }

            // Attach radio button's change event
            this._attachRadioButtonEvents(radioButtonParam);
        },

        /**
        * Attach radio buttons change events
        * @param{object} contains nodes
        * @memberOf widgets/filter/filter
        */
        _attachRadioButtonEvents: function (radioParamObj) {
            var isSelected = false;
            // on 'value' radio button select
            on(radioParamObj.valueRadio, "change", lang.hitch(this, function () {
                this._showTextBox(radioParamObj);
            }));
            // on 'unique' radio button select
            on(radioParamObj.uniqueRadio, "change", lang.hitch(this, function () {
                this._showDropDown(radioParamObj, isSelected);
                isSelected = true;
            }));
        },

        /**
        * Function to show text box if 'value' radio button selected
        * @param{object} contains nodes, _filterObject to change and maintain state
        * @memberOf widgets/filter/filter
        */
        _showTextBox: function (radioParamObj) {
            domStyle.set(radioParamObj.selectOptionDiv, "display", "none");
            domStyle.set(radioParamObj.textBoxDiv, "display", "block");
            this._filterObject.inputs[radioParamObj.index].parameters[0].showTextBox = true;
            this._filterObject.inputs[radioParamObj.index].parameters[0].showDropDown = false;
            this._filterObject.inputs[radioParamObj.index].parameters[0].currentValue = this._filterObject.inputs[radioParamObj.index].parameters[0].textBoxValue;
            this._setParameterizedExpression();
        },

        /**
        * Function to show dropdown if 'unique' radio button selected
        * @param{object} contains nodes, _filterObject to change and maintain state
        * @memberOf widgets/filter/filter
        */
        _showDropDown: function (radioParamObj, isSelected) {
            domStyle.set(radioParamObj.selectOptionDiv, "display", "block");
            domStyle.set(radioParamObj.textBoxDiv, "display", "none");
            this._filterObject.inputs[radioParamObj.index].parameters[0].showTextBox = false;
            this._filterObject.inputs[radioParamObj.index].parameters[0].showDropDown = true;
            if (!isSelected) {
                // if a radio button is called first time, then query distinct values of current field 
                this._queryLayerForDistinctValues(radioParamObj);
            } else {
                this._filterObject.inputs[radioParamObj.index].parameters[0].currentValue = this._filterObject.inputs[radioParamObj.index].parameters[0].dropDownValue;
                this._setParameterizedExpression();
            }
        },

        /**
        * Query layer for distinct values of the field
        * @param{object} contains nodes, _filterObject to change and maintain state
        * @memberOf widgets/filter/filter
        */
        _queryLayerForDistinctValues: function (radioParamObj) {
            var queryTask, queryLayer, deferred, features;
            // function to populate combobox
            queryTask = new QueryTask(this.selectedOperationalLayer.url);
            queryLayer = new Query();
            queryLayer.returnGeometry = false;
            queryLayer.returnDistinctValues = true;
            queryLayer.where = "1=1";
            queryLayer.outFields = [this.displayColumn];
            deferred = new Deferred();
            queryTask.execute(queryLayer).then(lang.hitch(this, function (results) {
                deferred.resolve(results);
                if (results.features.length > 0) {
                    features = results.features;
                    // if results length is greater than 0, then populate dropdown with the attribute values
                    this._populateDropDownContainer(features, radioParamObj.selectOption, radioParamObj.index);
                }
            }), function () {
                // if any error occur while quering the current field
                this.appUtils.showMessage(this.appConfig.i18n.filter.distinctQueryFalied);
                this._showTextBox(radioParamObj);
                deferred.resolve();
            });
        },

        /**
        * Create input textbox for value filter
        * @param{node} contains the node to fit the textbox
        * @memberOf widgets/filter/filter
        */
        _createTextBoxContainer: function (node, definitionEditorInput, index) {
            var inputTextBox;
            inputTextBox = domConstruct.create("input", {
                "type": "text",
                "class": "esriCTInputTextBox"
            }, node);
            if (definitionEditorInput.parameters[0].textBoxValue) {
                domAttr.set(inputTextBox, "value", definitionEditorInput.parameters[0].textBoxValue);
                this._filterObject.inputs[index].parameters[0].currentValue = definitionEditorInput.parameters[0].textBoxValue;
            } else {
                domAttr.set(inputTextBox, "value", definitionEditorInput.parameters[0].defaultValue);
                this._filterObject.inputs[index].parameters[0].textBoxValue = definitionEditorInput.parameters[0].defaultValue;
                this._filterObject.inputs[index].parameters[0].currentValue = definitionEditorInput.parameters[0].defaultValue;
            }
            this._setParameterizedExpression();

            on(inputTextBox, "blur", lang.hitch(this, function () {
                this._filterObject.inputs[index].parameters[0].textBoxValue = inputTextBox.value;
                this._filterObject.inputs[index].parameters[0].currentValue = inputTextBox.value;
                this._setParameterizedExpression();
            }));

            //            closeSpan = domConstruct.create("span", {
            //                "class": "esriCTCloseSpan"
            //            }, node);
            //            on(closeSpan, "click", lang.hitch(this, function () {
            //                // to be handle 'close' click
            //            }));
        },

        /**
        * Function to populate combobox
        * @param{node} contains the node to fit the textbox
        * @param{results} contains the distinct values came after quering the layer
        * @memberOf widgets/filter/filter
        */
        _populateDropDownContainer: function (features, node, index) {
            var option = [], firstOption, selectedOption = false;
            domConstruct.empty(node);
            firstOption = domConstruct.create("option", { "innerHTML": "", "value": "" }, node);
            array.forEach(features, lang.hitch(this, function (feature, i) {
                option[i] = domConstruct.create("option", {
                    "innerHTML": feature.attributes[this.displayColumn],
                    "value": feature.attributes[this.displayColumn]
                }, node);
                if (this._filterObject.inputs[index].parameters[0].dropDownValue && this._filterObject.inputs[index].parameters[0].dropDownValue === feature.attributes[this.displayColumn].toString()) {
                    this._filterObject.inputs[index].parameters[0].currentValue = feature.attributes[this.displayColumn];
                    domAttr.set(option[i], "selected", true);
                    selectedOption = true;
                } else if (this._filterObject.inputs[index].parameters[0].defaultValue === feature.attributes[this.displayColumn].toString()) {
                    this._filterObject.inputs[index].parameters[0].currentValue = feature.attributes[this.displayColumn];
                    domAttr.set(option[i], "selected", true);
                    selectedOption = true;
                }
            }));
            // if default value is not found in options list then set 1st option by default  
            if (!selectedOption) {
                domAttr.set(option[0], "selected", true);
                this._filterObject.inputs[index].parameters[0].dropDownValue = option[0].value;
                this._filterObject.inputs[index].parameters[0].currentValue = option[0].value;
            }
            this._setParameterizedExpression();
            // When another option is chosen from dropdown list
            on(node, "change", lang.hitch(this, function () {
                this._filterObject.inputs[index].parameters[0].dropDownValue = node.value;
                this._filterObject.inputs[index].parameters[0].currentValue = node.value;
                this._setParameterizedExpression();
            }));
        },

        /**
        * This function will create new parameterized expression string
        * either on default application load,
        * or on any change in values
        * @memberOf widgets/filter/filter
        */
        _setParameterizedExpression: function () {
            var arrayList = [];
            this._currentExpression = "";
            arrayList = this._parameterizedExpression.split("}");
            array.forEach(this._filterObject.inputs, lang.hitch(this, function (input, i) {
                if (input.parameters[0].currentValue) {
                    array.forEach(arrayList, lang.hitch(this, function (arrayElement) {
                        if (arrayElement.split("{")[1] === i.toString()) {
                            arrayElement = arrayElement.split("{")[0] + input.parameters[0].currentValue;
                            this._currentExpression += arrayElement;
                        }
                    }));
                }
            }));
        }
    });
});
