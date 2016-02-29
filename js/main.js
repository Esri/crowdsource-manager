/*global define,document,setTimeout,window,dojo,$ */
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
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/on",
    "application/utils/utils",
    "widgets/app-header/app-header",
    "widgets/map-viewer/map-viewer",
    "widgets/webmap-list/webmap-list",
    "widgets/data-viewer/data-viewer",
    "dojo/dom-class",
    "esri/layers/FeatureLayer",
    "widgets/time-slider/time-slider",
    "widgets/details-panel/details-panel",
    "esri/arcgis/Portal",
    "esri/tasks/query",
    "dojo/query",
    "esri/dijit/PopupTemplate",
    "dojo/domReady!"
], function (
    declare,
    lang,
    dom,
    domStyle,
    domConstruct,
    on,
    ApplicationUtils,
    ApplicationHeader,
    MapViewer,
    WebMapList,
    DataViewer,
    domClass,
    FeatureLayer,
    TimeSlider,
    DetailsPanel,
    esriPortal,
    EsriQuery,
    query,
    PopupTemplate
) {
    return declare(null, {
        _boilerPlateTemplate: null, // to store object of boilerplate
        _loggedInUser: null, // to store details of logged in user
        _applicationHeader: null, // to store object of application header widget
        _webMapListWidget: null, // to store object of webmap list widget
        _timeSliderWidget: null, // to store object of time slider widget
        _dataViewerWidget: null, // to store object of data viewer widget
        _detailsPanelWidget: null, // to store object of details panel widget
        _existingDefinitionExpression: null, // to store existing definition expression of layer,
        _dataViewerFeatureLayerUpdateEndHandle: null, // update end handle of feature layer
        _itemInfo: null, // to store item info of webmap
        _featureLayerClickHandle: null, // click handle of feature layer
        _mapPanelWidget: null, // to store object of map panel widget
        _layerSelectionDetails: null, // to store details when new operational layer is selected
        _selectRowGraphicsClickHandle: null, // graphics click handle to select a feature
        _refinedOperationalLayer: null, // to store object of layer which is added in snapshot mode
        _timeInfo: null, // to store time info object of a layer
        _mapResizeHandle: null, // to store resize handle of a map

        /**
        * This method is designed to handle processing after any DOM fragments have been actually added to the document.
        * @param{object} boilerplate template object
        * @param{object} logged in user details
        * @memberOf widgets/main/main
        */
        startup: function (boilerPlateTemplateObject, loggedInUser) {
            this._loggedInUser = loggedInUser;
            var queryParams = {};
            // config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information.
            if (boilerPlateTemplateObject) {
                this._boilerPlateTemplate = boilerPlateTemplateObject;
                this.appConfig = boilerPlateTemplateObject.config;
                // if login details are not available set it to anonymousUserName
                if (this._loggedInUser) {
                    this.appConfig.logInDetails = {
                        "userName": this._loggedInUser.fullName,
                        "token": this._loggedInUser.credential.token
                    };
                    queryParams.token = this._loggedInUser.credential.token;
                }
                // enable queryForGroupItems in templateconfig
                this._boilerPlateTemplate.templateConfig.queryForGroupItems = true;
                // construct the query params. If found in group info mixin configured group params
                // so that in case of private group where we dont get the group info, items will be loaded as configured in templateconfig
                lang.mixin(queryParams, this._boilerPlateTemplate.templateConfig.groupParams);
                if (this.appConfig.groupInfo.results && this.appConfig.groupInfo.results.length > 0) {
                    if (this.appConfig.groupInfo.results[0].sortField) {
                        queryParams.sortField = this.appConfig.groupInfo.results[0].sortField;
                    }
                    if (this.appConfig.groupInfo.results[0].sortOrder) {
                        queryParams.sortOrder = this.appConfig.groupInfo.results[0].sortOrder;
                    }
                }
                // pass the newly constructed queryparams from groupinfo.
                // if query params not available in groupinfo or group is private
                // items will be sorted according to modified date.
                this._groupItems = [];
                this._loadGroupItems(queryParams);
            } else {
                ApplicationUtils.showError(this.appConfig.i18n.config.configNotDefined);
            }
        },

        /**
        * This function is used to load group items
        * @param{object} parameter used to query group items
        * @memberOf widgets/main/main
        */
        _loadGroupItems: function (queryParams) {
            this._boilerPlateTemplate.queryGroupItems(queryParams).then(lang.hitch(this, this._groupItemsLoaded));
        },

        /**
        * This function is executed when group items are loaded
        * @param{object} response once group item are loaded
        * @memberOf widgets/main/main
        */
        _groupItemsLoaded: function (response) {
            this._groupItems.push.apply(this._groupItems, response.groupItems.results);
            if (response.groupItems.nextQueryParams.start < 0) {
                if (!this.appConfig.groupItems) {
                    this.appConfig.groupItems = {};
                }
                this.appConfig.groupItems.results = this._groupItems;
                this._loadApplication();

            } else {
                this._loadGroupItems(response.groupItems.nextQueryParams);
            }
        },

        /**
        * This function is used to load application
        * @memberOf widgets/main/main
        */
        _loadApplication: function () {
            if (this.appConfig.groupItems.results.length > 0) {
                // executes when window is resized
                on(window, "resize", lang.hitch(this, this._onWindowResize));
                // set Application Theme
                ApplicationUtils.loadApplicationTheme(this.appConfig);
                // create Application header
                this._createApplicationHeader();
                // create map panel
                this._createMapPanel();
                // to instantiate resize handle
                this._resizeUpperAndLowerContainer();
                // load web map list
                domClass.add(dom.byId("noWebMapParentContainer"), "esriCTHidden");
                domClass.remove(dom.byId("mainWrapperContainer"), "esriCTHidden");
                // create webmap list
                this._createWebMapList();
                this._handleEmptyDetailsPanel();
            } else {
                // handle case when there id no webmap to display
                this._handleNoWebMapToDisplay();
            }
        },

        /**
        * This function is executed when window is resized
        * @memberOf widgets/main/main
        */
        _onWindowResize: function () {
            if (this._applicationHeader) {
                this._applicationHeader._setWidthOfApplicationNameContainer();
            }
            this._resizeMap();
        },

        /**
        * This function is used to instantiate application header.
        * @memberOf widgets/main/main
        */
        _createApplicationHeader: function () {
            var appHeaderParameter;
            this._destroyApplicationHeaderWidget();
            // parameters needed for instantiating application header
            appHeaderParameter = {
                "appConfig": this.appConfig,
                "appUtils": ApplicationUtils,
                "loggedInUser": this._loggedInUser
            };
            // loading application header
            this._applicationHeader = new ApplicationHeader(appHeaderParameter, domConstruct.create("div", {}, dom.byId('applicationHeaderWrapperContainer')));
            this._applicationHeader.startup();
        },

        /**
        * This function is used to destroy application header widget.
        * @memberOf widgets/main/main
        */
        _destroyApplicationHeaderWidget: function () {
            if (this._applicationHeader) {
                this._applicationHeader.destroy();
            }
        },

        /**
        * This function is used to instantiate map panel
        * @memberOf widgets/main/main
        */
        _createMapPanel: function () {
            var mapViewerParameter;
            // parameters needed for instantiating map viewer panel
            mapViewerParameter = {
                "appConfig": this.appConfig,
                "appUtils": ApplicationUtils
            };
            // load map viewer panel
            this._mapPanelWidget = new MapViewer(mapViewerParameter, domConstruct.create("div", {}, dom.byId("mapPanelWrapperContainer")));
        },

        /**
        * This function is used to instantiate webMapList widget.
        * @memberOf widgets/main/main
        */
        _createWebMapList: function () {
            var webMapDescriptionFields, webMapListConfigData;
            this._addWebMapListToggleIcon();
            // hide/show info fields of web-map
            webMapDescriptionFields = {
                "description": this.appConfig.webMapInfoDescription,
                "snippet": this.appConfig.webMapInfoSnippet,
                "owner": this.appConfig.webMapInfoOwner,
                "created": this.appConfig.webMapInfoCreated,
                "modified": this.appConfig.webMapInfoModified,
                "licenseInfo": this.appConfig.webMapInfoLicenseInfo,
                "accessInformation": this.appConfig.webMapInfoAccessInformation,
                "tags": this.appConfig.webMapInfoTags,
                "numViews": this.appConfig.webMapInfoNumViews,
                "avgRating": this.appConfig.webMapInfoAvgRating
            };
            // parameters needed for instantiating web-map list widget
            webMapListConfigData = {
                "webMapDescriptionFields": webMapDescriptionFields,
                "appConfig": this.appConfig,
                "mapDivID": "mapDiv",
                "appUtils": ApplicationUtils,
                "changeExtentOnLayerChange": false,
                "autoResize": false
            };
            // instantiate web-map list widget
            this._webMapListWidget = new WebMapList(webMapListConfigData, domConstruct.create("div", {}, dom.byId('webMapListContainer')));
            this._attachWebMapListEventListener();
            this._webMapListWidget.startup();
        },

        /**
        * This function is used listen events raised by webmap list widget
        * @memberOf widgets/main/main
        */
        _attachWebMapListEventListener: function () {
            var timeAnimation;
            // when new operational layer is selected show it in data-viewer
            this._webMapListWidget.onOperationalLayerSelected = lang.hitch(this, function (details) {
                setTimeout(lang.hitch(this, function () {
                    ApplicationUtils.showLoadingIndicator();
                    this._enableHeaderIcons();
                    if (this.appConfig.i18n.direction === "rtl") {
                        //Remove disable class from webmap list toggle button
                        domClass.replace(dom.byId("webmapListToggleButton"), "esriCTPointerCursor", "esriCTWebMapPanelToggleButtonCloseDisabled");
                    } else {
                        //Remove disable class from webmap list toggle button
                        domClass.replace(dom.byId("webmapListToggleButton"), "esriCTPointerCursor", "esriCTWebMapPanelToggleButtonOpenDisabled");
                    }
                    //Show initial load message when user is yet to select a feature
                    if (query(".esriCTNoContentDetailsPanelWrapperContainer")[0]) {
                        domClass.remove(query(".esriCTNoContentDetailsPanelWrapperContainer")[0], "esriCTHidden");
                    }
                    this.map = details.map;
                    this._layerSelectionDetails = details;
                    this._itemInfo = details.itemInfo;
                    this._timeInfo = details.operationalLayerDetails.layerObject.timeInfo;
                    this._addOperationalLayerInSnapShotMode();
                    this._setApplicationHeaderTitle();
                    if (this._mapResizeHandle) {
                        this._mapResizeHandle.remove();
                    }
                    this._mapResizeHandle = on(this.map, "resize", lang.hitch(this, function () {
                        this._resizeMap();
                    }));
                    this._removeFeatureLayerHandle();
                    this._createFeatureLayerHandle();
                    timeAnimation = this._checkTimeAnimation(this._itemInfo.itemData);
                    if (this._itemInfo.itemData.widgets && this._itemInfo.itemData.widgets.timeSlider && this._itemInfo.itemData.widgets.timeSlider.properties) {
                        this._displayContainerOfTimeSlider();
                        this._createTimeSlider();
                    } else {
                        this._destroyTimeSliderWidget();
                        this._hideContainerOfTimeSlider();
                    }
                    this.map.addLayer(this._refinedOperationalLayer);
                }), 10);
            });
            // show message when there is no web map to display
            this._webMapListWidget.noMapsFound = lang.hitch(this, function () {
                this._handleNoWebMapToDisplay();
            });
            // to disable header icons
            this._webMapListWidget.displayInitalLoad = lang.hitch(this, function () {
                this._disableHeaderIcons();
            });
        },

        /**
        * This function is used to enable header icons
        * @memberOf widgets/main/main
        */
        _enableHeaderIcons: function () {
            this._applicationHeader.enableHeaderIcons();
        },

        /**
        * This function is used to display the container of time slider
        * @memberOf widgets/main/main
        */
        _displayContainerOfTimeSlider: function () {
            domClass.replace(dom.byId("upperContainer"), "esriCTUpperContainer", "esriCTUpperContainerEmptySlider");
            domClass.replace(dom.byId("lowerContainer"), "esriCTLowerContainer", "esriCTLowerContainerEmptySlider");
            domClass.replace(dom.byId("dataViewerWrapperContainer"), "esriCTDataViewerWrapperContainer", "esriCTDataViewerWrapperContainerEmptySlider");
            domClass.remove(dom.byId("timeSliderWrapperContainer"), "esriCTHidden");
            this._resizeMap();
        },

        /**
        * This function is used to hide the container of time slider
        * @memberOf widgets/time-slider/time-slider
        */
        _hideContainerOfTimeSlider: function () {
            domClass.replace(dom.byId("upperContainer"), "esriCTUpperContainerEmptySlider", "esriCTUpperContainer");
            domClass.replace(dom.byId("lowerContainer"), "esriCTLowerContainerEmptySlider", "esriCTLowerContainer");
            domClass.replace(dom.byId("dataViewerWrapperContainer"), "esriCTDataViewerWrapperContainerEmptySlider", "esriCTDataViewerWrapperContainer");
            domClass.add(dom.byId("timeSliderWrapperContainer"), "esriCTHidden");
            this._resizeMap();
        },

        /**
        * This function is used to check time animation in webmap Json.
        * @param{object} parameters to check time animation
        * @memberOf widgets/main/main
        */
        _checkTimeAnimation: function (itemData) {
            var isEnableTimeAnimation = true,
                timeAnimationKey = "timeAnimation",
                i;
            for (i = 0; i < itemData.operationalLayers.length; i++) {
                if (itemData.operationalLayers[i].id === this._refinedOperationalLayer.id) {
                    if (itemData.operationalLayers[i][timeAnimationKey] === false) {
                        isEnableTimeAnimation = false;
                    }
                    break;
                }
            }
            return isEnableTimeAnimation;
        },

        /**
        * This function is used add selected operational layer in snapshot mode
        * @memberOf widgets/main/main
        */
        _addOperationalLayerInSnapShotMode: function () {
            var opLayerInfo;
            //get selected operation layer details
            opLayerInfo = this._layerSelectionDetails.operationalLayerDetails;
            //remove selected layer from map
            this.map.removeLayer(this.map.getLayer(opLayerInfo.id));
            //create feature layer in 'snapshot' mode
            this._refinedOperationalLayer = new FeatureLayer(opLayerInfo.url, {
                mode: FeatureLayer.MODE_SNAPSHOT,
                id: opLayerInfo.id,
                outFields: ["*"]
            });
            //set definition expression configured in webmap
            if (opLayerInfo.layerDefinition && opLayerInfo.layerDefinition.definitionExpression) {
                this._refinedOperationalLayer.setDefinitionExpression(opLayerInfo.layerDefinition.definitionExpression);
            }
            //set layer renderer configured in webmap
            if (opLayerInfo.layerDefinition && opLayerInfo.layerDefinition.drawingInfo && opLayerInfo.layerDefinition.drawingInfo.renderer) {
                this._refinedOperationalLayer.setRenderer(opLayerInfo.layerDefinition.drawingInfo.renderer);
            }
            //set popupInfo template configured in webmap
            if (opLayerInfo.popupInfo) {
                this._refinedOperationalLayer.setInfoTemplate(new PopupTemplate(opLayerInfo.popupInfo));
            }
            //set layer opacity configured in webmap
            this._refinedOperationalLayer.setOpacity(opLayerInfo.opacity);
        },

        /**
        * This function is used disable header icons
        * @memberOf widgets/main/main
        */
        _disableHeaderIcons: function () {
            this._addOrganizationBaseMap();
        },

        /**
        * This function is used add first basemap of organization on initial load
        * @memberOf widgets/main/main
        */
        _addOrganizationBaseMap: function () {
            var webMapListObj, portal, params;
            webMapListObj = this._webMapListWidget;
            params = {
                q: this.appConfig.orgInfo.basemapGalleryGroupQuery
            };
            portal = new esriPortal.Portal(this.appConfig.sharinghost);
            portal.queryGroups(params).then(function (groups) {
                params = {
                    q: "group:" + groups.results[0].id + " AND" + ' type:"Web Map" -type:"Web Mapping Application"'
                };
                portal.queryItems(params).then(lang.hitch(this, function (results) {
                    webMapListObj._createMap(results.results[0].id, "mapDiv");
                    ApplicationUtils.hideLoadingIndicator();
                }));
            });
        },

        /**
        * This function is used to add webmap toggle button
        * @memberOf widgets/main/main
        */
        _addWebMapListToggleIcon: function () {
            if (this.appConfig.i18n.direction === "rtl") {
                dojo.addClass(dom.byId('webmapListToggleButton'), "esriCTWebMapPanelToggleButtonClose");
            } else {
                dojo.addClass(dom.byId('webmapListToggleButton'), "esriCTWebMapPanelToggleButtonOpen");
            }
        },

        /**
        * This function is used to handle scenario when there is no web map
        * @memberOf widgets/main/main
        */
        _handleNoWebMapToDisplay: function () {
            var error = {};
            error.message = this.appConfig.i18n.webMapList.noWebMapInGroup;
            this._displayErrorMessageScreen(error);
            ApplicationUtils.hideLoadingIndicator();
        },

        /**
        * This function is used to set application header title after selection of operational layer
        * @memberOf widgets/main/main
        */
        _setApplicationHeaderTitle: function () {
            dojo.byId("operationalLayerName").innerHTML = this._layerSelectionDetails.operationalLayerDetails.title;
        },

        /**
        * This function is used to instantiate data-viewer widget.
        * @param{object} details of newly selected layer
        * @memberOf widgets/main/main
        */
        _createDataViewer: function () {
            var dataViewerConfigData, layerDefinition;
            layerDefinition = this._layerSelectionDetails.operationalLayerDetails.layerDefinition;
            // parameters that are passed to data-viewer widget
            dataViewerConfigData = {
                "appConfig": this.appConfig,
                "map": this.map,
                "selectedOperationalLayerID": this._layerSelectionDetails.operationalLayerId,
                "selectedOperationalLayerTitle": this._layerSelectionDetails.operationalLayerDetails.title,
                "popupInfo": this._layerSelectionDetails.operationalLayerDetails.popupInfo,
                "definitionExpression": layerDefinition && layerDefinition.definitionExpression,
                "itemInfo": this._layerSelectionDetails.itemInfo,
                "lastSelectedWebMapExtent": this._webMapListWidget.lastSelectedWebMapExtent,
                "lastMapZoomLevel": this.map.getZoom(),
                "lastMapScale": this.map.getScale(),
                "appUtils": ApplicationUtils,
                "selectedOperationalLayer": this._refinedOperationalLayer
            };
            this._destroyDataViewerWidget();
            this._destroyDetailsPanelWidget();
            // instantiate data-viewer widget
            this._dataViewerWidget = new DataViewer(dataViewerConfigData, domConstruct.create("div", {}, dom.byId("dataViewerWrapperContainer")));
            this._attachDataViewerEventListener();
            this._dataViewerWidget.startup(true);
        },

        /**
        * This function is used to listen events raised by data viewer widget
        * @memberOf widgets/main/main
        */
        _attachDataViewerEventListener: function () {
            this._dataViewerWidget.showDetailsPanel = lang.hitch(this, function (featureSet) {
                //Hide initial load message when user selects feature
                if (query(".esriCTNoContentDetailsPanelWrapperContainer")[0]) {
                    domClass.add(query(".esriCTNoContentDetailsPanelWrapperContainer")[0], "esriCTHidden");
                }
                // create details panel
                this._createDetailsPanel(featureSet);
            });
            this._dataViewerWidget.attachEventToGraphicsLayer = lang.hitch(this, function (graphicsLayer) {
                // to select graphics on click of activated feature
                this._selectRowGraphicsClickHandle = on(graphicsLayer, "click", lang.hitch(this, function (evt) {
                    if (evt.graphic.geometry.type !== "point") {
                        this._dataViewerWidget.onFeatureClick(evt);
                    }
                }));
            });
        },

        /**
        * This function is used to destroy data-viewer widget.
        * @memberOf widgets/main/main
        */
        _destroyDataViewerWidget: function () {
            if (this._dataViewerWidget) {
                this._dataViewerWidget.destroy();
            }
        },

        /**
        * This function is used to create event handles
        * @param{object} operational layer to which event needs to be attached
        * @memberOf widgets/main/main
        */
        _createFeatureLayerHandle: function () {
            if (this._refinedOperationalLayer) {
                // to enable/disable details button on click of feature layer
                this._featureLayerClickHandle = on(this._refinedOperationalLayer, "click", lang.hitch(this, function (evt) {
                    this._dataViewerWidget.onFeatureClick(evt);
                }));
                this._dataViewerFeatureLayerUpdateEndHandle = on(this._refinedOperationalLayer, "update-end", lang.hitch(this, function () {
                    //Check if time slider widget exsist, if yes then query and fetch features within current time extent
                    if (this._timeSliderWidget) {
                        var timeExtent, timeQuery;
                        timeExtent = this._timeSliderWidget._createTimeExtent(this._timeSliderWidget.currentTimeInfo);
                        timeQuery = new EsriQuery();
                        timeQuery.timeExtent = timeExtent;
                        timeQuery.where = "1=1";
                        this._refinedOperationalLayer.queryFeatures(timeQuery, lang.hitch(this, function (featureSet) {
                            //Change graphics of layer with latest featched features
                            this._refinedOperationalLayer.graphics = featureSet.features || [];
                            this._createDataViewer();
                        }));
                    } else {
                        this._createDataViewer();
                    }
                }));
            }
        },

        /**
        * This function is used to instantiate time slider widget.
        * @memberOf widgets/main/main
        */
        _createTimeSlider: function () {
            this._destroyTimeSliderWidget();
            var timeSliderParameters;
            timeSliderParameters = {
                "appConfig": this.appConfig,
                "appUtils": ApplicationUtils,
                "webmapJSON": this._layerSelectionDetails.itemInfo,
                "map": this.map,
                "selectedLayer": this._refinedOperationalLayer,
                "timeInfo": this._timeInfo
            };
            this._timeSliderWidget = new TimeSlider(timeSliderParameters, domConstruct.create("div", {}, dom.byId('timeSliderWrapperContainer')));
            this._timeSliderWidget.startup();
        },

        /**
        * This function is used to destroy time slider widget.
        * @memberOf widgets/main/main
        */
        _destroyTimeSliderWidget: function () {
            if (this._timeSliderWidget) {
                this._timeSliderWidget.destroy();
            }
        },

        /**
        * This function is used to resize the map when its container is resized.
        * @memberOf widgets/main/main
        */
        _resizeMap: function () {
            var mapCenter;
            if ((this.map) && (domStyle.get(dom.byId("mapDiv"), "display") === "block")) {
                mapCenter = this.map.extent.getCenter();
                domStyle.set(dom.byId("mapDiv"), "height", "100%");
                domStyle.set(dom.byId("mapDiv"), "width", "100%");
            }
            setTimeout(lang.hitch(this, function () {
                if ((this.map) && (domStyle.get(dom.byId("mapDiv"), "display") === "block")) {
                    this.map.resize();
                    this.map.reposition();
                    this.map.centerAt(mapCenter);
                }
            }), 500);
        },

        /**
        * This function is used to set existing definition expression.
        * @param{object} item info of selected operational layer
        * @param{object} selected operational layer
        * @memberOf widgets/main/main
        */
        _getExistingDefinitionExpression: function (itemInfo) {
            var j;
            // Initially, if a layer has some definition expression than store it
            for (j = 0; j < itemInfo.itemData.operationalLayers.length; j++) {
                if (this._refinedOperationalLayer.id === itemInfo.itemData.operationalLayers[j].id) {
                    if (itemInfo.itemData.operationalLayers[j].layerDefinition && itemInfo.itemData.operationalLayers[j].layerDefinition.definitionExpression) {
                        this._existingDefinitionExpression = itemInfo.itemData.operationalLayers[j].layerDefinition.definitionExpression;
                    } else {
                        this._existingDefinitionExpression = null;
                    }
                }
            }
        },

        /**
        * This function is used to instantiate details panel widget.
        * @memberOf widgets/main/main
        */
        _createDetailsPanel: function (featureSet) {
            this._destroyDetailsPanelWidget();
            var detailsPanelParameters;
            detailsPanelParameters = {
                "appConfig": this.appConfig,
                "selectedFeatureSet": featureSet,
                "selectedOperationalLayer": this._refinedOperationalLayer,
                "map": this.map,
                "appUtils": ApplicationUtils,
                "itemInfo": this._itemInfo
            };
            this._detailsPanelWidget = new DetailsPanel(detailsPanelParameters, domConstruct.create("div", {}, dom.byId("detailsPanelWrapperContainer")));
            this._detailsPanelWidget.startup();
        },

        /**
        * This function is used to destroy details panel widget.
        * @memberOf widgets/main/main
        */
        _destroyDetailsPanelWidget: function () {
            if (this._detailsPanelWidget) {
                this._detailsPanelWidget.destroyPopupWidget();
                this._detailsPanelWidget.destroyMediaWidget();
                this._detailsPanelWidget.destroyCommentsWidget();
                this._detailsPanelWidget.destroy();
            }
        },

        /**
        * This function is used to resize upper and lower container using resize handler
        * @memberOf widgets/main/main
        */
        _resizeUpperAndLowerContainer: function () {
            //set jquery resizable on upper container
            $("#upperContainer").resizable({
                alsoResizeReverse: "#lowerContainer", //on resizeing upper container resize the lower map container
                handles: 's', //show resize handel only at the bottom of the grid container
                containment: "#UpperAndLowerWrapperContainer",
                maxHeight: 550,
                minHeight: 75
            });

            //handle resize stop event which will be fired on resize complete
            //after completing resize of containers, resize the map so that it will be fit resized size
            $("#upperContainer").on("resizestop", lang.hitch(this, function () {
                ApplicationUtils.showLoadingIndicator();
                var mainContainerHeight, upperContainerHeight, lowerContainerHeight;
                mainContainerHeight = parseFloat(domStyle.get("UpperAndLowerWrapperContainer", "height"));
                upperContainerHeight = parseFloat(domStyle.get("upperContainer", "height"));
                lowerContainerHeight = mainContainerHeight - upperContainerHeight;
                domStyle.set("lowerContainer", "height", lowerContainerHeight + "px");
                this._resizeMap();
                ApplicationUtils.hideLoadingIndicator();
            }));
        },

        /**
        * This function is used to remove event handles
        * @memberOf widgets/main/main
        */
        _removeFeatureLayerHandle: function () {
            // removes previous feature layer click handle
            if (this._featureLayerClickHandle) {
                this._featureLayerClickHandle.remove();
            }
            // removes previous feature layer update end handle
            if (this._dataViewerFeatureLayerUpdateEndHandle) {
                this._dataViewerFeatureLayerUpdateEndHandle.remove();
            }
        },

        /**
        * This function is used to show appropriate message when deatils panel is empty
        * @memberOf widgets/main/main
        */
        _handleEmptyDetailsPanel: function () {
            var noContentWrapperContainer;
            noContentWrapperContainer = domConstruct.create("div", { "class": "esriCTNoContentDetailsPanelWrapperContainer" }, dom.byId("detailsPanelWrapperContainer"));
            domConstruct.create("div", { "class": "esriCTNoContentDetailsPanelContainer", "innerHTML": this.appConfig.selectFeatureMessage }, noContentWrapperContainer);
        },

        /**
        * This function is used to screen of error message
        * @memberOf widgets/main/main
        */
        _displayErrorMessageScreen: function (error) {
            var errorMessage, node;
            domClass.add("mainWrapperContainer", "esriCTHidden");
            errorMessage = this.appConfig.i18n.map.error;
            if (error && error.message) {
                errorMessage = error.message;
            }
            // remove loading class from body
            domClass.remove(document.body, "app-loading");
            domClass.add(document.body, "app-error");
            domClass.add(query(".loading-indicator")[0], "esriCTWhiteBackGround");
            node = dom.byId("loading_message");
            node.innerHTML = errorMessage;
        }
    });
});