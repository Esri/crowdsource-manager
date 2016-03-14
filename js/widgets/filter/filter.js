/*global define,dojo,alert,moment,$,screen */
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
    "dojo/dom",
    "dojo/query",
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
    domStyle,
    dom,
    query
) {
    return declare([_WidgetBase], {
        _filterContainer: null, // contains parent filter container
        _filterObject: [], // object to store values for maintaining state of data viewer when manual refresh call
        _parameterizedExpression: "", // to store parameterized expression of the layer
        _currentExpression: "", // to store new definition expression
        _isCodedValueColumn: false, // boolean value to watch a coded domain value field
        _isTypeIdfield: false, // boolean value to watch a Type Id  value field
        _openFilterParam: [],

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
            if (!this.appConfig._filterObject) {
                this.appConfig._filterObject = {};

                array.forEach(this.itemInfo.itemData.operationalLayers, lang.hitch(this, function (layer) {
                    if (this.selectedOperationalLayer.id === layer.id && layer.definitionEditor) {
                        this.appConfig._filterObject = layer.definitionEditor;
                        this._parameterizedExpression = this.appConfig._filterObject.parameterizedExpression;
                        return true;
                    }
                }));
                this._resetFilterObjectParameters();
            } else {
                this._parameterizedExpression = this.appConfig._filterObject.parameterizedExpression;
            }
            this._createFilterOptionContainer();
        },

        /**
        * This function is used to create filters for the header field (only when ask for value is enabled)
        * @memberOf widgets/filter/filter
        */
        _createFilterOptionContainer: function () {
            var definitionEditorInputs, split, displayColumn;
            if (this.appConfig._filterObject && this.appConfig._filterObject.parameterizedExpression && this.appConfig._filterObject.parameterizedExpression !== "") {
                split = this.appConfig._filterObject.parameterizedExpression.split(this.displayColumn);
                if (split.length > 1 && this.appConfig._filterObject.inputs) {
                    displayColumn = this.displayColumn;
                    definitionEditorInputs = this.appConfig._filterObject.inputs;
                    // call function to check and append the filters used for the field
                    array.forEach(this.appConfig._filterObject.inputs, lang.hitch(this, function (definitionEditorInput, index) {
                        this._createFilterContainer(definitionEditorInput, index, displayColumn);
                    }));
                }
            }
        },

        /**
        * This function will create main filter container
        * @param{obj} contains current editor input value
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _createFilterContainer: function (definitionEditorInput, index, displayColumn) {
            var filterLabel, screenHeight, maxHeight, borderContainer;
            if (displayColumn === definitionEditorInput.parameters[0].fieldName) {
                this._isCodedValueColumn = this._hasCodedDomain(displayColumn);
                this._isTypeIdfield = this._hasTypeIdfield(displayColumn);
                // As to create filter container only one time for a field
                // checking if it is already created (i.e. when index > 0)
                if (!this._filterContainer) {
                    this._filterContainer = domConstruct.create("div", { "class": "esriCTFilterContainer" }, this.filterParentContainer);
                    filterLabel = domConstruct.create("div", { "innerHTML": this.appConfig.i18n.dataviewer.filterLabel, "class": "esriCTFilterLabel" }, this._filterContainer);
                    borderContainer = domConstruct.create("div", { "class": "esriCTBorderDiv" }, this._filterContainer);
                    this.filterAttributesContainer = domConstruct.create("div", { "class": "esriCTFilterAttributesContainer" }, this._filterContainer);
                    screenHeight = screen.height;
                    maxHeight = screenHeight - 380;
                    domStyle.set(this.filterAttributesContainer, "max-height", maxHeight + "px");
                }
                // Calling a function to append filter optipns in the container
                this._createFilterOptionBox(definitionEditorInput, index, displayColumn);
            }
        },

        /**
        * This function is used to create filters for the header field (only when ask for value is enabled)
        * @param{object} contains definition editor input details
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _createFilterOptionBox: function (definitionEditorInput, index, displayColumn) {
            var baseFilterOptionDiv, textBoxDiv, selectOptionDiv, selectOption, radioButtonParentDiv, radioButtonDiv, radioButtonObject = {}, formGroupDiv, container, hintFilterContainer, dateFieldObj, closeTextBoxSpan, closeDropDownSpan, radioParamObj;
            baseFilterOptionDiv = domConstruct.create("div", {
                "class": "esriCTBaseFilterOptionDiv"
            }, this.filterAttributesContainer);
            domConstruct.create("div", { "innerHTML": definitionEditorInput.prompt, "class": "esriCTFilterLabelDiv" }, baseFilterOptionDiv);
            // Check the data type of current input value
            if (definitionEditorInput.parameters[0].type !== "esriFieldTypeDate") {

                if (!this._isCodedValueColumn && !this._isTypeIdfield) {
                    // Create text box container
                    // displays when 'value' radio button is selected (OR by default)
                    textBoxDiv = domConstruct.create("div", {
                        "class": "esriCTInputTextBoxDiv"
                    }, baseFilterOptionDiv);
                    // create close icon for textbox
                    closeTextBoxSpan = domConstruct.create("span", {
                        "class": "esriCTActiveCloseSpan " + displayColumn
                    }, textBoxDiv);
                    this._createTextBoxContainer(textBoxDiv, definitionEditorInput, index, closeTextBoxSpan, displayColumn);
                }
                // Create dropdown container
                // displays when 'unique' radio button is selected
                selectOptionDiv = domConstruct.create("div", {
                    "class": "esriCTSelectOptionDiv"
                }, baseFilterOptionDiv);
                // 'select' html tag is creating to show distinct values of the current field
                selectOption = domConstruct.create("select", {
                    "class": "esriCTSelectOption"
                }, selectOptionDiv);
                // create close icon for dropdown
                closeDropDownSpan = domConstruct.create("span", {
                    "class": "esriCTActiveCloseSpan esriCTHiddenColumn " + displayColumn
                }, selectOptionDiv);
                if (!this._isCodedValueColumn && !this._isTypeIdfield) {
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
                        "selectOption": selectOption,
                        "closeDropDownSpan": closeDropDownSpan,
                        "closeTextBoxSpan": closeTextBoxSpan,
                        "displayColumn": displayColumn
                    };
                    // Create radio buttons for text value and unique drop down value
                    this._createRadioButtons(radioButtonObject);
                } else {
                    domStyle.set(selectOptionDiv, "display", "block");
                    if (closeDropDownSpan && domClass.contains(closeDropDownSpan, "esriCTHiddenColumn")) {
                        domClass.remove(closeDropDownSpan, "esriCTHiddenColumn");
                    }
                    this.appConfig._filterObject.inputs[index].parameters[0].showDropDown = true;
                    radioParamObj = {
                        "selectOption": selectOption,
                        "index": index,
                        "selectOptionDiv": selectOptionDiv,
                        "closeDropDownSpan": closeDropDownSpan,
                        "displayColumn": displayColumn
                    };
                    // if a radio button is called first time, then query distinct values of current field
                    this._queryLayerForDistinctValues(radioParamObj);
                }
            } else {
                // create date picker container div
                formGroupDiv = domConstruct.create("div", { "class": "esriCTDatePickerDiv form-group" }, baseFilterOptionDiv);
                // adding date picker icon
                container = this._addNotationIcon(formGroupDiv, "glyphicon-calendar");
                // object for creating date field
                dateFieldObj = {
                    "definitionEditorInput": definitionEditorInput,
                    "index": index,
                    "formGroupDiv": formGroupDiv,
                    "displayColumn": displayColumn
                };
                // initializing date picker instance
                this._createDateField(container, dateFieldObj, displayColumn);
            }
            hintFilterContainer = domConstruct.create("div", { "class": "esriCTHintFilterContainer" }, baseFilterOptionDiv);
            domConstruct.create("div", { "innerHTML": "Hint: " + definitionEditorInput.hint }, hintFilterContainer);
            this._checkFieldActiveNodes(displayColumn);
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
        * @param{ndoe} contains parent node of filter body
        * @param{object} contains parentNode, inputs, index and date input node to attached date time picker
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _createDateField: function (parentNode, obj, displayColumn) {
            var dateInputField, fieldValue, defaultValue, closeDatePickerSpan, queryDateObject = {};
            domClass.add(parentNode, "date");
            // create input container for DateTimePicker
            dateInputField = domConstruct.create("input", {
                type: "text",
                value: "",
                className: "form-control hasDatetimepicker",
                "data-input-type": "Date",
                "id": displayColumn + obj.index
            }, parentNode);
            // create close icon span for date picker
            closeDatePickerSpan = domConstruct.create("span", {
                "class": "esriCTActiveCloseSpan " + displayColumn
            }, obj.formGroupDiv);
            // Attach close icon click event for datePicker
            this._attachCloseDatePickerSpanClickEvent(closeDatePickerSpan, obj.index, obj.displayColumn);
            defaultValue = obj.definitionEditorInput.parameters[0].utcValue;
            //check date field value if exists else set the default or current date value
            if (this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue) {
                fieldValue = this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue;
            } else {
                fieldValue = defaultValue ? new Date(defaultValue) : new Date();
            }
            $(parentNode).datetimepicker().data("DateTimePicker").date(fieldValue);
            if (this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue === null) {
                this.appConfig._filterObject.inputs[obj.index].parameters[0].prevValue = null;
                this._resetDatePicker(closeDatePickerSpan, obj.index, obj.displayColumn);
            } else {
                this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue = $(parentNode).datetimepicker().data("DateTimePicker").date().toString();
                this.appConfig._filterObject.inputs[obj.index].parameters[0].prevValue = $(parentNode).datetimepicker().data("DateTimePicker").date().toString();
            }
            // Attach datetime picker to the container
            $(parentNode).datetimepicker().on('dp.change', lang.hitch(this, function (val) {
                // on change
                if (new Date(this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue).toString() !== val.date.toString()) {
                    this.appUtils.showLoadingIndicator();
                    this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue = $(parentNode).data().date;
                    $(parentNode).data("DateTimePicker").hide();
                    domClass.replace(closeDatePickerSpan, "esriCTActiveCloseSpan", "esriCTDisabledCloseSpan");
                    this._onEditFilterOptionChangeIcon(obj.index, obj.displayColumn);
                    this._checkFieldActiveNodes(obj.displayColumn);
                    if (new Date(this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue).toString() !== new Date(this.appConfig._filterObject.inputs[obj.index].parameters[0].prevValue).toString()) {
                        this._setCurrentExpression();
                        queryDateObject = {
                            "input": dom.byId(obj.displayColumn + obj.index),
                            "node": $(parentNode),
                            "index": obj.index,
                            "displayColumn": obj.displayColumn,
                            "closeDatePickerSpan": closeDatePickerSpan
                        };
                        this._getFeatureCountForDatePicker(queryDateObject);
                    }
                }
            }));
            // if filter is not enabled then reset date picker
            if (!this.appConfig.enableFilter && !this.appConfig._filterObject.inputs[obj.index].parameters[0].enableFilter) {
                this._resetDatePicker(closeDatePickerSpan, obj.index, obj.displayColumn);
            }
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
            domConstruct.create("div", {
                "innerHTML": this.appConfig.i18n.dataviewer.valueRadioButtonLabel,
                "class": "esriCTRadioButtonLabel"
            }, radioParam.node);
            uniqueRadio = domConstruct.create("input", {
                "type": "radio",
                "name": radioParam.definitionEditorInput.parameters[0].fieldName + radioParam.index,
                "value": this.appConfig.i18n.dataviewer.uniqueRadioButtonLabel,
                "class": "esriCTRadioButton"
            }, radioParam.node);
            domConstruct.create("div", {
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
                "definitionEditorInput": radioParam.definitionEditorInput,
                "closeDropDownSpan": radioParam.closeDropDownSpan,
                "closeTextBoxSpan": radioParam.closeTextBoxSpan,
                "displayColumn": radioParam.displayColumn
            };
            this._openFilterParam[radioParam.index] = radioButtonParam;
            if (this.appConfig._filterObject.inputs[radioParam.index].parameters[0].showTextBox) {
                domAttr.set(valueRadio, "checked", true);
                this._showTextBox(radioButtonParam);
            } else if (this.appConfig._filterObject.inputs[radioParam.index].parameters[0].showDropDown) {
                domAttr.set(uniqueRadio, "checked", true);
                // boolean value 'false' tells that radio button is not clicked
                // setting radio button checked by default
                this._showDropDown(radioButtonParam);
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
            // on 'value' radio button select
            on(radioParamObj.valueRadio, "change", lang.hitch(this, function () {
                this.appUtils.showLoadingIndicator();
                this._showTextBox(radioParamObj);
                this._onEditFilterOptionChangeIcon(radioParamObj.index, radioParamObj.displayColumn);
                this._checkFieldActiveNodes(radioParamObj.displayColumn);
                this.appUtils.hideLoadingIndicator();
            }));
            // on 'unique' radio button select
            on(radioParamObj.uniqueRadio, "change", lang.hitch(this, function () {
                this.appUtils.showLoadingIndicator();
                // boolean value 'true' tells that radio button is checked
                this._showDropDown(radioParamObj);
                this._onEditFilterOptionChangeIcon(radioParamObj.index, radioParamObj.displayColumn);
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * Function to show text box if 'value' radio button selected
        * @param{object} contains nodes and values to change and maintain state
        * @memberOf widgets/filter/filter
        */
        _showTextBox: function (radioParamObj) {
            domStyle.set(radioParamObj.selectOptionDiv, "display", "none");
            domStyle.set(radioParamObj.textBoxDiv, "display", "block");
            if (radioParamObj.closeDropDownSpan && !domClass.contains(radioParamObj.closeDropDownSpan, "esriCTHiddenColumn")) {
                domClass.add(radioParamObj.closeDropDownSpan, "esriCTHiddenColumn");
            }
            if (radioParamObj.closeTextBoxSpan && domClass.contains(radioParamObj.closeTextBoxSpan, "esriCTHiddenColumn")) {
                domClass.remove(radioParamObj.closeTextBoxSpan, "esriCTHiddenColumn");
            }
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].showTextBox = true;
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].showDropDown = false;
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].currentValue = this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].textBoxValue;
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].prevTextBoxValue = this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].textBoxValue;
        },

        /**
        * Function to show dropdown if 'unique' radio button selected
        * @param{object} contains nodes, _filterObject to change and maintain state
        * @memberOf widgets/filter/filter
        */
        _showDropDown: function (radioParamObj) {
            domStyle.set(radioParamObj.selectOptionDiv, "display", "block");
            domStyle.set(radioParamObj.textBoxDiv, "display", "none");
            if (radioParamObj.closeDropDownSpan && domClass.contains(radioParamObj.closeDropDownSpan, "esriCTHiddenColumn")) {
                domClass.remove(radioParamObj.closeDropDownSpan, "esriCTHiddenColumn");
            }
            if (radioParamObj.closeTextBoxSpan && !domClass.contains(radioParamObj.closeTextBoxSpan, "esriCTHiddenColumn")) {
                domClass.add(radioParamObj.closeTextBoxSpan, "esriCTHiddenColumn");
            }
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].showTextBox = false;
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].showDropDown = true;
            // if a radio button is called first time, then query distinct values of current field
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].currentValue = this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].dropDownValue;
            this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].prevDropDownValue = this.appConfig._filterObject.inputs[radioParamObj.index].parameters[0].dropDownValue;
            this._queryLayerForDistinctValues(radioParamObj);
        },

        /**
        * Query layer for distinct values of the field
        * @param{object} contains nodes and values to change and maintain state
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
            queryLayer.outFields = [radioParamObj.displayColumn];
            deferred = new Deferred();
            queryTask.execute(queryLayer).then(lang.hitch(this, function (results) {
                deferred.resolve(results);
                if (results.features.length > 0) {
                    features = results.features;
                    var dropDownContainerObj = {
                        "features": features,
                        "node": radioParamObj.selectOption,
                        "index": radioParamObj.index,
                        "closeDropDownSpan": radioParamObj.closeDropDownSpan,
                        "displayColumn": radioParamObj.displayColumn
                    };
                    this._populateDropDownContainer(dropDownContainerObj);
                    this._checkFieldActiveNodes(radioParamObj.displayColumn);
                }
            }), lang.hitch(this, function () {
                // if any error occur while quering the current field
                this.appUtils.showMessage(this.appConfig.i18n.filter.distinctQueryFalied);
                deferred.resolve();
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * Create input textbox
        * @param{node} contains the node for the textbox
        * @param{object} contains layer input details
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{node} conains close icon for textbox
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _createTextBoxContainer: function (node, definitionEditorInput, index, closeTextBoxSpan, displayColumn) {
            var inputTextBox, value;
            inputTextBox = domConstruct.create("input", {
                "type": "text",
                "class": "esriCTInputTextBox"
            }, node);
            // set default value to textbox
            this._setDefaultTextBoxValue(definitionEditorInput, inputTextBox, index, closeTextBoxSpan);
            // attach 'blur' event of input textbox
            this._attachTextBoxBlurEvent(inputTextBox, closeTextBoxSpan, index, displayColumn);
            this._attachCloseTextBoxSpanClickEvent(inputTextBox, closeTextBoxSpan, index, displayColumn);
            // Check whether the textbox value is empty and change close icon
            value = lang.trim(inputTextBox.value);
            if (value !== "") {
                domClass.replace(closeTextBoxSpan, "esriCTActiveCloseSpan", "esriCTDisabledCloseSpan");
            } else {
                domAttr.set(inputTextBox, "value", "");
                domClass.replace(closeTextBoxSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
            }
            // check configured filter enable option for textbox
            this._checkConfigFilterOptionForTextBox(inputTextBox, closeTextBoxSpan, index);
        },

        /**
        * Function to populate combobox
        * @param{node} contains the node to fit the textbox
        * @param{results} contains the distinct values came after quering the layer
        * @memberOf widgets/filter/filter
        */
        _populateDropDownContainer: function (obj) {
            var option = [], firstOption, selectedOption = false, closeDropDownSpan, coadedDomainValue, dropDownValue, prevDropDownValue;
            domConstruct.empty(obj.node);
            closeDropDownSpan = obj.closeDropDownSpan;
            if (this.appConfig._filterObject && this.appConfig._filterObject.inputs[obj.index] && (this.appConfig._filterObject.inputs[obj.index].parameters[0].dropDownValue || this.appConfig._filterObject.inputs[obj.index].parameters[0].dropDownValue === null)) {
                dropDownValue = this.appConfig._filterObject.inputs[obj.index].parameters[0].dropDownValue;
            }
            if (this.appConfig._filterObject && this.appConfig._filterObject.inputs[obj.index] && (this.appConfig._filterObject.inputs[obj.index].parameters[0].prevDropDownValue || this.appConfig._filterObject.inputs[obj.index].parameters[0].prevDropDownValue === null)) {
                prevDropDownValue = this.appConfig._filterObject.inputs[obj.index].parameters[0].prevDropDownValue;
            }
            // start pushing option to dropdown
            firstOption = domConstruct.create("option", { "innerHTML": "Select", "value": null }, obj.node);
            array.forEach(obj.features, lang.hitch(this, function (feature, i) {
                if (feature.attributes[obj.displayColumn] === 0 || (feature.attributes[obj.displayColumn] && (feature.attributes[obj.displayColumn] !== "" || feature.attributes[obj.displayColumn] !== null))) {
                    if (this._isCodedValueColumn) {
                        coadedDomainValue = this._getCodedDomainValue(feature.attributes[obj.displayColumn], obj.displayColumn);
                    } else if (this._isTypeIdfield) {
                        coadedDomainValue = this._getTypeIdField(feature.attributes[obj.displayColumn]);
                    } else {
                        coadedDomainValue = feature.attributes[obj.displayColumn];
                    }
                    option[i] = domConstruct.create("option", {
                        "innerHTML": coadedDomainValue,
                        "value": feature.attributes[obj.displayColumn]
                    }, obj.node);
                    // Setting default selection value for the dropdown
                    if (prevDropDownValue && prevDropDownValue === feature.attributes[obj.displayColumn].toString()) {
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].dropDownValue = prevDropDownValue;
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue = prevDropDownValue;
                        domAttr.set(option[i], "selected", true);
                        selectedOption = true;
                    } else if (dropDownValue && dropDownValue === feature.attributes[obj.displayColumn].toString()) {
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue = dropDownValue;
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].prevDropDownValue = dropDownValue;
                        domAttr.set(option[i], "selected", true);
                        selectedOption = true;
                    } else if ((dropDownValue === "" || dropDownValue === null) && !selectedOption) {
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue = dropDownValue;
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].prevDropDownValue = dropDownValue;
                        this._resetDropDown(firstOption, obj.index, closeDropDownSpan);
                        selectedOption = true;
                    } else if (this.appConfig._filterObject.inputs[obj.index].parameters[0].defaultValue.toString() === feature.attributes[obj.displayColumn].toString() && !selectedOption) {
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].dropDownValue = feature.attributes[obj.displayColumn];
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].currentValue = feature.attributes[obj.displayColumn];
                        this.appConfig._filterObject.inputs[obj.index].parameters[0].prevDropDownValue = feature.attributes[obj.displayColumn];
                        domAttr.set(option[i], "selected", true);
                        selectedOption = true;
                    }
                }
            }));
            // Attach dropdown change event
            this._attachDropDownChangeEvent(obj.node, obj.index, closeDropDownSpan, obj.displayColumn);
            // Attach dropdown's close icon
            this._attachCloseDropDownSpanClickEvent(firstOption, obj.index, closeDropDownSpan, obj.displayColumn);
            // check configured filter enable option for dropdown
            this._checkConfigFilterOptionForDropDown(firstOption, obj.index, closeDropDownSpan);
            // if default value is not found in options list then set 1st option by default
            if (!selectedOption) {
                this._resetDropDown(firstOption, obj.index, closeDropDownSpan);
            }
        },

        /**
        * This function will create new parameterized expression string
        * @param{object} contains layer input details
        * @param{node} contains input textbox node
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{node} contains close icon for textbox
        * @memberOf widgets/filter/filter
        */
        _setDefaultTextBoxValue: function (definitionEditorInput, inputTextBox, index, closeTextBoxSpan) {
            if (definitionEditorInput.parameters[0].prevTextBoxValue === "" || definitionEditorInput.parameters[0].prevTextBoxValue) {
                domAttr.set(inputTextBox, "value", definitionEditorInput.parameters[0].prevTextBoxValue);
                this.appConfig._filterObject.inputs[index].parameters[0].currentValue = definitionEditorInput.parameters[0].prevTextBoxValue;
                this.appConfig._filterObject.inputs[index].parameters[0].textBoxValue = definitionEditorInput.parameters[0].prevTextBoxValue;
            } else if (definitionEditorInput.parameters[0].textBoxValue === "" || definitionEditorInput.parameters[0].textBoxValue) {
                domAttr.set(inputTextBox, "value", definitionEditorInput.parameters[0].textBoxValue);
                this.appConfig._filterObject.inputs[index].parameters[0].currentValue = definitionEditorInput.parameters[0].textBoxValue;
                this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue = definitionEditorInput.parameters[0].textBoxValue;
            } else if (definitionEditorInput.parameters[0].textBoxValue === null) {
                domAttr.set(inputTextBox, "value", "");
            } else {
                domAttr.set(inputTextBox, "value", definitionEditorInput.parameters[0].defaultValue);
                this.appConfig._filterObject.inputs[index].parameters[0].textBoxValue = definitionEditorInput.parameters[0].defaultValue;
                this.appConfig._filterObject.inputs[index].parameters[0].currentValue = definitionEditorInput.parameters[0].defaultValue;
                this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue = definitionEditorInput.parameters[0].defaultValue;
            }
            if (inputTextBox.value !== "") {
                domClass.replace(closeTextBoxSpan, "esriCTActiveCloseSpan", "esriCTDisabledCloseSpan");
            } else {
                domAttr.set(inputTextBox, "value", "");
                domClass.replace(closeTextBoxSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
            }
        },

        /**
        * Function to attach 'blur' event of input textbox
        * @param{node} contains input textbox node
        * @param{ndoe} contains close icon for textbox
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _attachTextBoxBlurEvent: function (inputTextBox, closeTextBoxSpan, index, displayColumn) {
            var value;
            on(inputTextBox, "blur", lang.hitch(this, function () {
                this.appUtils.showLoadingIndicator();
                this.appConfig._filterObject.inputs[index].parameters[0].textBoxValue = inputTextBox.value;
                this.appConfig._filterObject.inputs[index].parameters[0].currentValue = inputTextBox.value;
                value = lang.trim(inputTextBox.value);
                // Check whether the textbox value is empty and change close icon
                if (value !== "") {
                    domClass.replace(closeTextBoxSpan, "esriCTActiveCloseSpan", "esriCTDisabledCloseSpan");
                } else {
                    domAttr.set(inputTextBox, "value", "");
                    domClass.replace(closeTextBoxSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
                }
                this._checkFieldActiveNodes(displayColumn);
                this._setCurrentExpression();
                this._getFeatureCount(inputTextBox, index, closeTextBoxSpan, displayColumn, "textBox");
            }));
        },

        /**
        * Function to attach 'click' event of textbox close icon
        * @param{inputTextBox} contains input textbox node
        * @param{closeTextBoxSpan} contains close icon node
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _attachCloseTextBoxSpanClickEvent: function (inputTextBox, closeTextBoxSpan, index, displayColumn) {
            // Attach "click" event to close icon for textBox
            on(closeTextBoxSpan, "click", lang.hitch(this, function () {
                if (domClass.contains(closeTextBoxSpan, "esriCTActiveCloseSpan")) {
                    this.appUtils.showLoadingIndicator();
                    this._setEmptyTextBox(inputTextBox, closeTextBoxSpan, index);
                    this._onEditFilterOptionChangeIcon(index, displayColumn);
                    this._checkFieldActiveNodes(displayColumn);
                    this.appConfig._filterObject.inputs[index].parameters[0].valueFrom = "textBox";
                    this._setParameterizedExpression();
                }
            }));
        },

        /**
        * Function to attach 'change' event of dropdown
        * @param{node} contains input dropdown select option node
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{node} contains close icon node
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _attachDropDownChangeEvent: function (node, index, closeDropDownSpan, displayColumn) {
            var getCount = false;
            // When another option is chosen from dropdown list
            on(node, "change", lang.hitch(this, function () {
                if (!getCount) {
                    this.appUtils.showLoadingIndicator();
                    this.appConfig._filterObject.inputs[index].parameters[0].dropDownValue = node.value;
                    this.appConfig._filterObject.inputs[index].parameters[0].currentValue = node.value;
                    // check if selected option is the default option of the dropdown
                    if (domAttr.get(node[0], "selected") !== true) {
                        domClass.replace(closeDropDownSpan, "esriCTActiveCloseSpan", "esriCTDisabledCloseSpan");
                    } else {
                        domClass.replace(closeDropDownSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
                        this.appConfig._filterObject.inputs[index].parameters[0].dropDownValue = null;
                        this.appConfig._filterObject.inputs[index].parameters[0].currentValue = null;
                    }
                    this._onEditFilterOptionChangeIcon(index, displayColumn);
                    this._checkFieldActiveNodes(displayColumn);
                    this._setCurrentExpression();
                    this._getFeatureCount(node, index, closeDropDownSpan, displayColumn, "dropDown");
                    getCount = true;
                }
            }));
        },

        /**
        * Function to attach 'click' event of dropdown close icon
        * @param{string} contains first option of dropdown list
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{node} contains close icon node
        * @memberOf widgets/filter/filter
        */
        _attachCloseDropDownSpanClickEvent: function (firstOption, index, closeDropDownSpan, displayColumn) {
            // Attach "click" event to close icon for textBox
            on(closeDropDownSpan, "click", lang.hitch(this, function () {
                if (domClass.contains(closeDropDownSpan, "esriCTActiveCloseSpan")) {
                    this.appUtils.showLoadingIndicator();
                    this._resetDropDown(firstOption, index, closeDropDownSpan);
                    this._onEditFilterOptionChangeIcon(index, displayColumn);
                    this._checkFieldActiveNodes(displayColumn);
                    this.appConfig._filterObject.inputs[index].parameters[0].valueFrom = "dropDown";
                    this._setParameterizedExpression();
                }
            }));
        },

        /**
        * Function to check configured filter enable option for textbox
        * @param{node} contains input textbox node
        * @param{node} contains close icon node
        * @param{int} contains the index/parameter id of the input layer detail
        * @memberOf widgets/filter/filter
        */
        _checkConfigFilterOptionForTextBox: function (inputTextBox, closeTextBoxSpan, index) {
            if (!this.appConfig.enableFilter && !this.appConfig._filterObject.inputs[index].parameters[0].enableFilter) {
                this._setEmptyTextBox(inputTextBox, closeTextBoxSpan, index);
            }
        },

        /**
        * Function to check configured filter enable option for dropdown
        * @param{string} contains first option of dropdown list
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{node} contains close icon node
        * @memberOf widgets/filter/filter
        */
        _checkConfigFilterOptionForDropDown: function (firstOption, index, closeDropDownSpan) {
            if (!this.appConfig.enableFilter && !this.appConfig._filterObject.inputs[index].parameters[0].enableFilter) {
                this._resetDropDown(firstOption, index, closeDropDownSpan);
            }
        },

        /**
        * Function to set textbox with empty("") value
        * @param{node} contains input textbox node
        * @param{node} contains close icon node
        * @param{int} contains the index/parameter id of the input layer detail
        * @memberOf widgets/filter/filter
        */
        _setEmptyTextBox: function (inputTextBox, closeTextBoxSpan, index) {
            domAttr.set(inputTextBox, "value", "");
            domClass.replace(closeTextBoxSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
            this.appConfig._filterObject.inputs[index].parameters[0].textBoxValue = null;
            this.appConfig._filterObject.inputs[index].parameters[0].currentValue = "";
            this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue = "";
        },

        /**
        * Function to set 'select' default option for dropdown
        * @param{string} contains first option of dropdown list
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{node} contains close icon node
        * @memberOf widgets/filter/filter
        */
        _resetDropDown: function (firstOption, index, closeDropDownSpan) {
            domAttr.set(firstOption, "selected", true);
            domClass.replace(closeDropDownSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
            this.appConfig._filterObject.inputs[index].parameters[0].dropDownValue = null;
            this.appConfig._filterObject.inputs[index].parameters[0].currentValue = null;
            this.appConfig._filterObject.inputs[index].parameters[0].prevDropDownValue = null;
        },

        /**
        * Function to attach 'click' event of date picker close icon
        * @param{icon} contains close icon node
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _attachCloseDatePickerSpanClickEvent: function (icon, index, displayColumn) {
            on(icon, "click", lang.hitch(this, function () {
                if (domClass.contains(icon, "esriCTActiveCloseSpan")) {
                    this.appUtils.showLoadingIndicator();
                    this._resetDatePicker(icon, index, displayColumn);
                    this._onEditFilterOptionChangeIcon(index, displayColumn);
                    this._checkFieldActiveNodes(displayColumn);
                    this._setParameterizedExpression();
                }
            }));
        },

        /**
        * Function to reset date picker node
        * @param{icon} contains close icon node
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _resetDatePicker: function (icon, index, displayColumn) {
            domAttr.set(dom.byId(displayColumn + index), "value", "");
            this.appConfig._filterObject.inputs[index].parameters[0].currentValue = null;
            domClass.replace(icon, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
        },

        /**
        * This function will change icon of the field
        * if enable filter option in config is false
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _onEditFilterOptionChangeIcon: function (index, displayColumn) {
            var columnClassName, caretIconDiv, filterIconDiv;
            this.appConfig._filterObject.inputs[index].parameters[0].enableFilter = true;
            columnClassName = displayColumn;
            if (!this.appConfig.enableFilter) {
                caretIconDiv = query(".esriCTBlackCaretIcon." + columnClassName)[0];
                filterIconDiv = query(".esriCTFilterIcon." + columnClassName)[0];
                this._enableFilterIcon(caretIconDiv, filterIconDiv);
            }
        },

        /**
        * This function will create new parameterized expression string
        * either on default application load,
        * or on any change in values
        * @memberOf widgets/filter/filter
        */
        _setParameterizedExpression: function () {
            this._currentExpression = "";
            this._setCurrentExpression();
            this._applyParameterizedExpression();
        },

        /**
        * Function to reset filter object when a different layer is selected from a same webmap
        * @memberOf widgets/filter/filter
        */
        _resetFilterObjectParameters: function () {
            array.forEach(this.appConfig._filterObject.inputs, lang.hitch(this, function (input) {
                if (input.parameters[0].dropDownValue) {
                    input.parameters[0].dropDownValue = "";
                    input.parameters[0].showDropDown = false;
                }
                if (input.parameters[0].textBoxValue) {
                    input.parameters[0].textBoxValue = "";
                    input.parameters[0].showTextBox = false;
                }
                if (input.parameters[0].prevTextBoxValue) {
                    input.parameters[0].prevTextBoxValue = "";
                }

                if (input.parameters[0].prevDropDownValue) {
                    input.parameters[0].prevDropDownValue = null;
                }

                if (input.parameters[0].currentValue) {
                    input.parameters[0].currentValue = "";
                }
                if (input.parameters[0].enableFilter) {
                    input.parameters[0].enableFilter = false;
                }
            }));
        },

        /** This function will check values which are null or not
        * and change icon accordingly
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _checkFieldActiveNodes: function (displayColumn) {
            var nodes = [], enableFilter = false, columnClassName, caretIconDiv, filterIconDiv;
            columnClassName = displayColumn;
            nodes = query("." + columnClassName);
            caretIconDiv = query(".esriCTBlackCaretIcon." + columnClassName)[0];
            filterIconDiv = query(".esriCTFilterIcon." + columnClassName)[0];
            array.some(nodes, lang.hitch(this, function (node) {
                if (domClass.contains(node, "esriCTActiveCloseSpan") && !domClass.contains(node, "esriCTHiddenColumn")) {
                    enableFilter = true;
                    return;
                }
            }));
            if (enableFilter) {
                this._enableFilterIcon(caretIconDiv, filterIconDiv);
            } else {
                this._enableCaretIcon(caretIconDiv, filterIconDiv);
            }
        },

        /** this function will show caret icon on the field header
        * @param{caretIconDiv} contains a node with caret icon
        * @param{filterIconDiv} contains a node with filter icon
        * @memberOf widgets/filter/filter
        */
        _enableCaretIcon: function (caretIconDiv, filterIconDiv) {
            if (caretIconDiv && domClass.contains(caretIconDiv, "esriCTHiddenColumn")) {
                domClass.remove(caretIconDiv, "esriCTHiddenColumn");
            }
            if (filterIconDiv && !domClass.contains(filterIconDiv, "esriCTHiddenColumn")) {
                domClass.add(filterIconDiv, "esriCTHiddenColumn");
            }
        },

        /** This function will show filter icon on the field header
        * @param{caretIconDiv} contains a node with caret icon
        * @param{filterIconDiv} contains a node with filter icon
        * @memberOf widgets/filter/filter
        */
        _enableFilterIcon: function (caretIconDiv, filterIconDiv) {
            if (caretIconDiv && !domClass.contains(caretIconDiv, "esriCTHiddenColumn")) {
                domClass.add(caretIconDiv, "esriCTHiddenColumn");
            }
            if (filterIconDiv && domClass.contains(filterIconDiv, "esriCTHiddenColumn")) {
                domClass.remove(filterIconDiv, "esriCTHiddenColumn");
            }
        },

        /** This function will show filter icon on the field header
        * @param{value} contains a coded value to decoded
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _getCodedDomainValue: function (value, displayColumn) {
            var isNotFound = true;
            array.forEach(this.selectedOperationalLayer.fields, lang.hitch(this, function (field) {
                if (field.name === displayColumn && field.domain && field.domain.codedValues.length > 0) {
                    array.forEach(field.domain.codedValues, lang.hitch(this, function (codedValue) {
                        if (codedValue.code === value && isNotFound) {
                            value = codedValue.name;
                            isNotFound = false;
                        }
                    }));
                }
            }));
            return value;
        },

        /** This function will show filter icon on the field header
        * @param{value} contains a Type Id field value to decoded
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _getTypeIdField: function (value) {
            var isNotFound = true;
            array.forEach(this.selectedOperationalLayer.types, lang.hitch(this, function (type) {
                if (type.id === value && isNotFound) {
                    value = type.name;
                    isNotFound = false;
                }
            }));
            return value;
        },

        /**
        * This function return boolean value if the current field coded domain values
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _hasCodedDomain: function (displayColumn) {
            var isCodedDoamin = false;
            array.forEach(this.selectedOperationalLayer.fields, lang.hitch(this, function (field) {
                if (field.name === displayColumn && field.domain && field.domain.codedValues && field.domain.codedValues.length > 0 && !isCodedDoamin) {
                    isCodedDoamin = true;
                }
            }));
            return isCodedDoamin;
        },

        /**
        * This function return boolean value if the current field is Type Id field values
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _hasTypeIdfield: function (displayColumn) {
            var isTypeIdfield = false;
            if (this.selectedOperationalLayer.typeIdField === displayColumn) {
                isTypeIdfield = true;
            }
            return isTypeIdfield;
        },

        /**
        * This function will count features for the entered textbox value
        * @param{input} contains textbox node
        * @param{int} contains the index/parameter id of the input layer detail
        * @param{node} contains cancel input icon for textbox
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _getFeatureCount: function (node, index, closeSpan, displayColumn, valueFrom) {
            var query, queryTask, deferred, alertPoped = false;
            deferred = new Deferred();
            query = new Query();
            queryTask = new QueryTask(this.selectedOperationalLayer.url);
            query.where = this._currentExpression;
            queryTask.executeForCount(query, lang.hitch(this, function (results) {
                deferred.resolve(results);
                // if the count of features is 0,
                // then show alert message to user,
                if (results > 0) {
                    if (valueFrom === "textBox") {
                        this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue = node.value;
                    } else {
                        this.appConfig._filterObject.inputs[index].parameters[0].prevDropDownValue = node.value;
                    }
                    this.appConfig._filterObject.inputs[index].parameters[0].valueFrom = valueFrom;
                    this._applyParameterizedExpression();
                } else {
                    // else set default values and refresh layer for the expression
                    if (valueFrom === "textBox") {
                        this._resetTextBoxPrevValue(index, closeSpan, displayColumn, node);
                    } else {
                        this._resetPrevDropDownValue(index, closeSpan, displayColumn, node);
                    }
                    alert(this.appConfig.i18n.filter.noFeatureFoundText);
                    this.appUtils.hideLoadingIndicator();
                    alertPoped = true;
                }
            }), lang.hitch(this, function () {
                deferred.resolve();
                if (valueFrom === "textBox") {
                    this._resetTextBoxPrevValue(index, closeSpan, displayColumn, node);
                } else {
                    this._resetPrevDropDownValue(index, closeSpan, displayColumn, node);
                }
                if (!alertPoped) {
                    alert(this.appConfig.i18n.filter.noFeatureFoundText);
                    this.appUtils.hideLoadingIndicator();
                }
            }));
        },

        /**
        * This function will set a definition expression for the layer
        * @memberOf widgets/filter/filter
        */
        _setCurrentExpression: function () {
            var arrayList = [], expressionArray = [], expressionValue, andExpression = false;
            // split and check if multiple filters are applied
            if (this._parameterizedExpression.split(") AND (").length > 1) {
                // if the expression is an 'ALL' expression
                andExpression = true;
                // if 'yes' then slice substring to set values accordingly
                expressionValue = this._parameterizedExpression.substring(1, (this._parameterizedExpression.length - 1));
                // split the _parameterizedExpression to set values to set current definition expression
                arrayList = expressionValue.split(") AND (");
            } else if (this._parameterizedExpression.split(") OR (").length > 1) {
                // if the expression is an 'ANY' expression
                andExpression = false;
                // if 'yes' then slice substring to set values accordingly
                expressionValue = this._parameterizedExpression.substring(1, (this._parameterizedExpression.length - 1));
                // split the _parameterizedExpression to set values to set current definition expression
                arrayList = expressionValue.split(") OR (");
            } else {
                // if it is a single parameter expression
                arrayList[0] = this._parameterizedExpression;
            }
            array.forEach(this.appConfig._filterObject.inputs, lang.hitch(this, function (input, i) {
                array.forEach(arrayList, lang.hitch(this, function (arrayElement) {
                    // for dynamic filtering option
                    if (arrayElement.split("{").length > 1) {
                        if (arrayElement.split("{")[1].split("}")[0] === i.toString() && input.parameters[0].currentValue) {
                            if (input.parameters[0].type === "esriFieldTypeDate") {
                                arrayElement = arrayElement.split(i).join("0");
                                arrayElement = arrayElement.split(i + 1).join("1");
                                expressionArray.push(lang.replace(arrayElement, [input.parameters[0].currentValue.split(" ")[0] + " 00:00:00", input.parameters[0].currentValue.split(" ")[0] + " 23:59:59"]));
                            } else {
                                arrayElement = arrayElement.split(i).join("0");
                                expressionArray.push(lang.replace(arrayElement, [input.parameters[0].currentValue]));
                            }
                        }
                    } else {
                        // for static filter
                        expressionArray.push(arrayElement);
                    }
                }));
            }));
            // if expressionArray length is greater than 1, then join stings by ') AND (' to set a valid expression
            if (expressionArray.length > 1) {
                if (andExpression) {
                    this._currentExpression = expressionArray.join(") AND (");
                } else {
                    this._currentExpression = expressionArray.join(") OR (");
                }
                this._currentExpression = "(" + this._currentExpression + ")";
            } else {
                // if expressionArray length is equal to 1 and not empty, else set the expression to '1=1'
                this._currentExpression = (expressionArray[0] && expressionArray[0] !== "") ? expressionArray[0] : "1=1";
            }
        },

        /**
        * This function will apply filter and refresh the layer
        * @memberOf widgets/filter/filter
        */
        _applyParameterizedExpression: function () {
            this.selectedOperationalLayer.setDefinitionExpression(this._currentExpression);
            this.selectedOperationalLayer.refresh();
        },

        /**
        * This function will show the node on which the filter was last applied
        * either textbox or dropdown
        * @param{string} contains field name
        * @memberOf widgets/filter/filter
        */
        _showAppliedFilterValue: function (columnName) {
            array.forEach(this.appConfig._filterObject.inputs, lang.hitch(this, function (input, i) {
                if (input.parameters[0].fieldName === columnName && input.parameters[0].type !== "esriFieldTypeDate") {
                    if (input.parameters[0].valueFrom === "dropDown") {
                        domAttr.set(this._openFilterParam[i].uniqueRadio, "checked", true);
                        // boolean value 'true' tells that radio button is checked
                        this._showDropDown(this._openFilterParam[i]);
                    } else {
                        domAttr.set(this._openFilterParam[i].valueRadio, "checked", true);
                        this._showTextBox(this._openFilterParam[i]);
                        this._checkFieldActiveNodes(columnName);
                    }
                    this._onEditFilterOptionChangeIcon(this._openFilterParam[i].index, columnName);
                }
            }));
        },

        /**
        * This function will reset textbox with fevious valid filter value
        * @param{int} contains index or parameterId of the field
        * @param{node} contains close icon for the textbox
        * @param{string} contains name of the field
        * @param{input} contains textbox
        * @memberOf widgets/filter/filter
        */
        _resetTextBoxPrevValue: function (index, closeTextBoxSpan, displayColumn, inputTextBox) {
            if (this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue === null || this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue === "" || (this.appConfig._filterObject && this.appConfig._filterObject.inputs[index] && this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue)) {
                domAttr.set(inputTextBox, "value", this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue);
                this.appConfig._filterObject.inputs[index].parameters[0].textBoxValue = this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue;
                this.appConfig._filterObject.inputs[index].parameters[0].currentValue = this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue;
                if (this.appConfig._filterObject.inputs[index].parameters[0].prevTextBoxValue !== "") {
                    domClass.replace(closeTextBoxSpan, "esriCTActiveCloseSpan", "esriCTDisabledCloseSpan");
                } else {
                    domClass.replace(closeTextBoxSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
                }
                this._checkFieldActiveNodes(displayColumn);
            }
        },

        /**
        * This function will reset dropDown with fevious valid filter value
        * @param{int} contains index or parameterId of the field
        * @param{node} contains close icon for the dropdown
        * @param{string} contains name of the field
        * @param{input} contains dropdown
        * @memberOf widgets/filter/filter
        */
        _resetPrevDropDownValue: function (index, closeSpan, displayColumn, node) {
            var layerObj;
            if (this.appConfig._filterObject.inputs[index].parameters[0].prevDropDownValue === null || this.appConfig._filterObject.inputs[index].parameters[0].prevDropDownValue === "" || (this.appConfig._filterObject && this.appConfig._filterObject.inputs[index] && this.appConfig._filterObject.inputs[index].parameters[0].prevDropDownValue)) {
                this.appConfig._filterObject.inputs[index].parameters[0].dropDownValue = this.appConfig._filterObject.inputs[index].parameters[0].prevDropDownValue;
                if (this._openFilterParam[index]) {
                    this._showDropDown(this._openFilterParam[index]);
                } else {
                    layerObj = {
                        "index": index,
                        "closeDropDownSpan": closeSpan,
                        "displayColumn": displayColumn,
                        "selectOption": node
                    };
                    this._queryLayerForDistinctValues(layerObj);
                }
            }
        },

        /**
        * This function will query for count for the date picker
        * @param{object} contains required params for date picker
        * @memberOf widgets/filter/filter
        */
        _getFeatureCountForDatePicker: function (queryDateObject) {
            var query, queryTask, deferred, alertPoped = false;
            deferred = new Deferred();
            query = new Query();
            queryTask = new QueryTask(this.selectedOperationalLayer.url);
            query.where = this._currentExpression;
            queryTask.executeForCount(query, lang.hitch(this, function (results) {
                deferred.resolve(results);
                // if the count of features is 0,
                // then show alert message to user,
                if (results > 0) {
                    this.appConfig._filterObject.inputs[queryDateObject.index].parameters[0].currentValue = queryDateObject.node.data().date;
                    this.appConfig._filterObject.inputs[queryDateObject.index].parameters[0].prevValue = queryDateObject.node.data().date;
                    queryDateObject.node.datetimepicker().data("DateTimePicker").date(new Date(queryDateObject.node.data().date));
                    this._applyParameterizedExpression();
                } else {
                    this._resetDatePickerToPrevValue(queryDateObject);
                    alert(this.appConfig.i18n.filter.noFeatureFoundText);
                    this.appUtils.hideLoadingIndicator();
                    alertPoped = true;
                }
            }), lang.hitch(this, function () {
                deferred.resolve();
                this._resetDatePickerToPrevValue(queryDateObject);
                if (!alertPoped) {
                    alert(this.appConfig.i18n.filter.noFeatureFoundText);
                    this.appUtils.hideLoadingIndicator();
                }
            }));
        },

        /**
        * This function will reset dropDown with fevious valid filter value
        * @param{object} contains required params to reset date picker
        * @memberOf widgets/filter/filter
        */
        _resetDatePickerToPrevValue: function (queryDateObject) {
            var prevValue;
            prevValue = this.appConfig._filterObject.inputs[queryDateObject.index].parameters[0].prevValue;
            if (prevValue === null || prevValue === "" || (this.appConfig._filterObject && this.appConfig._filterObject.inputs[queryDateObject.index] && prevValue)) {
                queryDateObject.node.datetimepicker().data("DateTimePicker").date(new Date(prevValue));
                domAttr.set(queryDateObject.input, "value", queryDateObject.node.data().date);
                this.appConfig._filterObject.inputs[queryDateObject.index].parameters[0].currentValue = prevValue;
                if (prevValue !== "") {
                    domClass.replace(queryDateObject.closeDatePickerSpan, "esriCTActiveCloseSpan", "esriCTDisabledCloseSpan");
                } else {
                    domClass.replace(queryDateObject.closeDatePickerSpan, "esriCTDisabledCloseSpan", "esriCTActiveCloseSpan");
                }
                this._checkFieldActiveNodes(queryDateObject.displayColumn);
            }
        }
    });
});
