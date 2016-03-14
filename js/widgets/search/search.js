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
    "dojo/text!./templates/search.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/on",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "esri/tasks/GeometryService",
    "dojo/domReady!"
], function (
    declare,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang,
    domClass,
    on,
    QueryTask,
    Query,
    GeometryService
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _searchedFieldValue: null, // to store value searched by user
        _newDefinitionExpression: null, // to store new definition expression generated for searching a value
        _existingDefinitionExpression: null, // to store existing definition expression applied on layer
        _layerUpdateHandle: null, // to store the handle of update end event of the selected layer
        _searchedFromSearchWidget: false, //to store flag if map should be zoomed to searched records

        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/search/search
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is designed to handle processing after any DOM fragments have been actually added to the document.
        * @memberOf widgets/search/search
        */
        startup: function () {
            this._toggleOptions();
        },

        /**
        * This function is called after all properties of a widget are defined
        * @memberOf widgets/search/search
        */
        postCreate: function () {
            this.inherited(arguments);
            this.clearSearchText();
            this._attachSearchWidgetEvents();
        },

        /**
        * This function is used to attach event to search icon in search bar.
        * @memberOf widgets/search/search
        */
        _attachSearchWidgetEvents: function () {
            on(this.searchRecords, "click", lang.hitch(this, function () {
                this.searchFeatureRecords(true);
            }));
            on(this.searchBox, "keyup", lang.hitch(this, function (event) {
                if (event.keyCode === 13) {
                    this.searchFeatureRecords(true);
                }
            }));
        },

        /**
        * This function is used to search records for the value entered by user
        * @param zoomToSearched set this flag if after search map should be zoom to searched features
        * @memberOf widgets/search/search
        */
        searchFeatureRecords: function (zoomToSearched) {
            this._searchedFromSearchWidget = zoomToSearched;
            if (!this._searchedFromSearchWidget) {
                domClass.add(this.searchOptions, "esriCTHidden");
            }
            $(".esriCTNoResults").addClass("esriCTHidden");
            // If the value/search string exists than search it
            if ((lang.trim(this.searchBox.value) !== "")) {
                this.searchBox.value = lang.trim(this.searchBox.value);
                this._searchedFieldValue = this.searchBox.value;
                // Search records based on the value entered by the user
                this._searchField();
            } else {
                this.searchBox.value = "";
                //if function is called for manual refresh and search is empty,
                //then just set the existing def exprn so that the layer will get updated records
                if (!this._searchedFromSearchWidget) {
                    this.selectedOperationalLayer.refresh();
                }
            }
        },

        /**
        * This function is used to search the value of field entered by user
        * @memberOf widgets/search/search
        */
        _searchField: function () {
            this.appUtils.showLoadingIndicator();
            // If the search string exists.
            if (this._searchedFieldValue) {
                this._newDefinitionExpression = this._getNewDefinitionExpression();
            } else {
                $(".esriCTNoResults").addClass("esriCTHidden");
                this._newDefinitionExpression = this._existingDefinitionExpression;
            }
            this._resetDefinitionExpression();
        },

        /**
        * This function is used to re-set definition expression
        * @memberOf widgets/search/search
        */
        _resetDefinitionExpression: function () {
            var query, queryTask;
            query = new Query();
            queryTask = new QueryTask(this.selectedOperationalLayer.url);
            query.where = this._newDefinitionExpression;
            queryTask.executeForCount(query, lang.hitch(this, function (results) {
                if (results > 0) {
                    if (this._searchedFromSearchWidget) {
                        this._layerUpdateHandle = this.selectedOperationalLayer.on("update-end", lang.hitch(this, function () {
                            this._layerUpdateHandle.remove();
                            this._zoomToSearchedRecords();
                        }));
                    }
                    this.selectedOperationalLayer.setDefinitionExpression(this._newDefinitionExpression);
                    this._removeNoResultFoundMessage();

                } else {
                    this.searchBox.value = "";
                    this.selectedOperationalLayer.setDefinitionExpression(this._existingDefinitionExpression);
                    if (this._searchedFromSearchWidget) {
                        this._displayNoResultFoundMessage();
                    }
                }
            }), lang.hitch(this, function () {
                // if any error occur while quering the current expression
                this.selectedOperationalLayer.setDefinitionExpression(this._existingDefinitionExpression);
                this._removeNoResultFoundMessage();
            }));
        },

        /**
        * This function is used to display no result found message
        * @memberOf widgets/search/search
        */
        _displayNoResultFoundMessage: function () {
            this.noResultsFound.innerHTML = this.appConfig.i18n.search.noResultFoundText;
            $(".esriCTNoResults").removeClass("esriCTHidden");
        },

        /**
        * This function is used to remove no result found message
        * @memberOf widgets/search/search
        */
        _removeNoResultFoundMessage: function () {
            $(".esriCTNoResults").addClass("esriCTHidden");
        },

        /**
        * This function is used to get definition expression
        * @param{string} search string
        * @memberOf widgets/search/search
        */
        _getNewDefinitionExpression: function () {
            var layerObject, i, definitionExpression = null;
            // After user search for a particular value that definition expression, including the default one if merged together and returned
            if (this.itemInfo.itemData.applicationProperties.viewing.search && this.itemInfo.itemData.applicationProperties.viewing.search.enabled) {
                for (i = 0; i < this.itemInfo.itemData.applicationProperties.viewing.search.layers.length; i++) {
                    if (this.selectedOperationalLayerID === this.itemInfo.itemData.applicationProperties.viewing.search.layers[i].id) {
                        layerObject = this.itemInfo.itemData.applicationProperties.viewing.search.layers[i];
                        if (this._existingDefinitionExpression) {
                            definitionExpression = this._existingDefinitionExpression;
                            if (layerObject.field.exactMatch) {
                                // For exact match case
                                definitionExpression += " AND " + "UPPER(" + layerObject.field.name + ")" + " = '" + lang.trim(this._searchedFieldValue).toUpperCase() + "'";
                            } else {
                                // For contains case
                                definitionExpression += " AND " + "UPPER(" + layerObject.field.name + ")" + " LIKE '%" + lang.trim(this._searchedFieldValue).toUpperCase() + "%'";
                            }
                        } else {
                            if (layerObject.field.exactMatch) {
                                // For exact match case
                                definitionExpression = "UPPER(" + layerObject.field.name + ")" + " = '" + lang.trim(this._searchedFieldValue).toUpperCase() + "'";
                            } else {
                                // For contains case
                                definitionExpression = "UPPER(" + layerObject.field.name + ")" + " LIKE '%" + lang.trim(this._searchedFieldValue).toUpperCase() + "%'";
                            }
                        }
                        return definitionExpression;
                    }
                }
            }
            return definitionExpression;
        },

        /**
        * This function is used to show or hide serchbox
        * @memberOf widgets/search/search
        */
        _toggleOptions: function () {
            domClass.toggle(this.searchOptions, "esriCTHidden");
        },

        /**
        * This function is used to clear contents of search input control
        * @memberOf widgets/search/search
        */
        clearSearchText: function () {
            on(this.clearTextContent, "click", lang.hitch(this, function () {
                if (this._newDefinitionExpression !== this._existingDefinitionExpression) {
                    this.appUtils.showLoadingIndicator();
                    this._newDefinitionExpression = this._existingDefinitionExpression;
                    this.searchBox.value = "";
                    this.selectedOperationalLayer.setDefinitionExpression(this._existingDefinitionExpression);
                    this._removeNoResultFoundMessage();
                    this._toggleOptions();
                } else {
                    this.appUtils.showLoadingIndicator();
                    if ((lang.trim(this.searchBox.value) !== "")) {
                        this.searchBox.value = "";
                    }
                    this.appUtils.hideLoadingIndicator();
                }
            }));
        },

        /**
        * This function is used to reset search panel
        * @memberOf widgets/search/search
        */
        resetSearchPanel: function (searchParameter) {
            domClass.add(this.searchOptions, "esriCTHidden");
            var i, enableSearch = false;
            this._mixinSearchParameter(searchParameter);
            if (this.itemInfo && this.itemInfo.itemData.applicationProperties && this.itemInfo.itemData.applicationProperties.viewing && this.itemInfo.itemData.applicationProperties.viewing.search && this.itemInfo.itemData.applicationProperties.viewing.search.enabled) {
                for (i = 0; i < this.itemInfo.itemData.applicationProperties.viewing.search.layers.length; i++) {
                    //if selected layer is enabled for search set the enableSearch flag to true
                    if (this.selectedOperationalLayerID === this.itemInfo.itemData.applicationProperties.viewing.search.layers[i].id) {
                        if ($(".esriCTSearchBox").length > 0 && this.itemInfo.itemData.applicationProperties.viewing.search.hintText) {
                            this.searchBox.placeholder = this.itemInfo.itemData.applicationProperties.viewing.search.hintText;
                        }
                        enableSearch = true;
                        break;
                    }
                }
            }
            //if enableSearch flag is true enalbel search icon else disable it
            if (enableSearch) {
                // Track existing definition expression
                this._getExistingDefinitionExpression();
                this._enableSearchIcon();
            } else {
                this._disableSearchIcon();
            }
        },

        /**
        * This function is used to enable search icon
        * @memberOf widgets/search/search
        */
        _enableSearchIcon: function () {
            domClass.replace(this.searchButton, "esriCTSearchIconContainer", "esriCTSearchIconContainerDisabled");
            domClass.replace(this.searchButton, "esriCTPointerCursor", "esriCTDefaultCursor");
        },

        /**
        * This function is used to disable search icon
        * @memberOf widgets/search/search
        */
        _disableSearchIcon: function () {
            domClass.replace(this.searchButton, "esriCTSearchIconContainerDisabled", "esriCTSearchIconContainer");
            domClass.replace(this.searchButton, "esriCTDefaultCursor", "esriCTPointerCursor");
            //also hide search options
            domClass.add(this.searchOptions, "esriCTHidden");
        },

        /**
        * This function is used to mixin search parameter
        * @memberOf widgets/search/search
        */
        _mixinSearchParameter: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is used to get existing definition expression applied on layer
        * @memberOf widgets/search/search
        */
        _getExistingDefinitionExpression: function () {
            if (this.selectedOperationalLayer._defnExpr) {
                this._existingDefinitionExpression = this.selectedOperationalLayer._defnExpr;
            }
        },

        /**
        * This function is used to create a new data set after definition expression is set
        * @memberOf widgets/data-viewer/data-viewer
        */
        _zoomToSearchedRecords: function () {
            var selectedFeatureArr, geometryService, selectedFeaturesGeometryArr, i;
            selectedFeaturesGeometryArr = [];
            geometryService = new GeometryService(this.appConfig.helperServices.geometry.url);
            selectedFeatureArr = this.selectedOperationalLayer.graphics;
            for (i = 0; i < selectedFeatureArr.length; i++) {
                if (selectedFeatureArr[i].geometry) {
                    selectedFeaturesGeometryArr.push(selectedFeatureArr[i].geometry);
                }
            }
            // If single feature is selected, then zoom map to configure zoom level
            if (selectedFeaturesGeometryArr.length === 1 && this.selectedOperationalLayer.geometryType === "esriGeometryPoint") {
                this.map.setLevel(this.appConfig.zoomLevel);
                this.map.centerAt(selectedFeaturesGeometryArr[0]);
                this.appUtils.hideLoadingIndicator();
            } else if (selectedFeaturesGeometryArr.length > 0) {
                // If multiple features are selected, then do union of selected feature's geometry and set map extent of it
                geometryService.union(selectedFeaturesGeometryArr).then(lang.hitch(this, function (response) {
                    this.map.setExtent(response.getExtent(), true);
                    this.appUtils.hideLoadingIndicator();
                }), lang.hitch(this, function () {
                    this.appUtils.hideLoadingIndicator();
                }));
            } else {
                this.appUtils.hideLoadingIndicator();
            }
        }
    });
});
