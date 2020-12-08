/*global define,setTimeout,window,dojo,$,document */
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
    "dojo/_base/array",
    "dojo/_base/html",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/string",
    "application/utils/utils",
    "widgets/app-header/app-header",
    "widgets/map-viewer/map-viewer",
    "widgets/webmap-list/webmap-list",
    "widgets/data-viewer/data-viewer",
    "dojo/dom-class",
    "esri/layers/FeatureLayer",
    "widgets/time-slider/time-slider",
    "widgets/details-panel/details-panel",
    "esri/tasks/query",
    "dojo/query",
    "esri/dijit/PopupTemplate",
    "dojo/dom-attr",
    "dojo/dom-geometry",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "dojo/Deferred",
    "dojo/promise/all",
    "esri/dijit/BasemapGallery",
    "esri/dijit/Legend",
    "dojo/domReady!"
], function (
    declare,
    lang,
    array,
    html,
    dom,
    domStyle,
    domConstruct,
    on,
    string,
    ApplicationUtils,
    ApplicationHeader,
    MapViewer,
    WebMapList,
    DataViewer,
    domClass,
    FeatureLayer,
    TimeSlider,
    DetailsPanel,
    EsriQuery,
    query,
    PopupTemplate,
    domAttr,
    domGeom,
    QueryTask,
    Query,
    Deferred,
    all,
    BasemapGallery,
    Legend
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
        _mapPanelWidget: null, // to store object of map panel widget
        _layerSelectionDetails: null, // to store details when new operational layer is selected
        _selectRowGraphicsClickHandle: null, // graphics click handle to select a feature
        _refinedOperationalLayer: null, // to store object of layer which is added in snapshot mode
        _timeInfo: null, // to store time info object of a layer
        _mapResizeHandle: null, // to store resize handle of a map
        _mapClickHandle: null, // to store click handle of a map
        _isManualRefreshedClicked: false, // to keep track whether to do manual refresh or not
        _manualRefreshDataObj: null, // to store data needed for manual refresh
        _mapZoomInHandle: null, // to store zoom in handle of map panel
        _mapZoomOutHandle: null, // to store zoom out handle of map panel
        _filterRefreshDataObj: null,
        _isFilterRefreshClicked: false,
        _existingLayerIndex: null, // to store index of layer
        _reorderLayers: false, // flag to reorder layers
        _isGraphicLayerClicked: false, // to track whether graphic layer is clicked or not
        _isShowSelectedClicked: false,
        _disableTimeSliderClickHandle: null, // to store handle of disable time slider
        _minScale: null, // to save the min scale of selected operational layer
        _maxScale: null, // to save the max scale of selected operational layer
        _mapExtentChangeHandle: null, // to store extent change handle of map
        _initialLoad: true, //flag to check if refresh layer event is fired for the first time
        _basemapGallery: null, // to store the object of basemap gallery widget
        _legend: null,  // to store the object of legend gallery widget
        _lastSelectedNonEditableFeature: null,
        clearSelectionButtonClickedHandle: null,
        selectAllButtonClickedHandle: null,
        showAllButtonClickedHandle: null,
        exportToCSVButtonClickHandle: null,
        _featuresEditorsCanSeeObjArr: [
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": true,
                "allowOthersToUpdate": true,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": true,
                "allowAnonymousToDelete": true
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": false,
                "allowOthersToUpdate": false,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": false,
                "allowAnonymousToDelete": false
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": true,
                "allowOthersToUpdate": true,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": false,
                "allowAnonymousToDelete": false
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": false,
                "allowOthersToUpdate": false,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": true,
                "allowAnonymousToDelete": true
            }
        ],

        /**
         * This method is designed to handle processing after any
         * DOM fragments have been actually added to the document.
         * @param{object} boilerplate template object
         * @param{object} logged in user details
         * @memberOf widgets/main/main
         */
        startup: function (boilerPlateTemplateObject, loggedInUser) {
            this._loggedInUser = loggedInUser;
            var queryParams = {};
            // config will contain application and user defined info for the
            // template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information.
            if (boilerPlateTemplateObject) {
                this._boilerPlateTemplate = boilerPlateTemplateObject;
                this.appConfig = boilerPlateTemplateObject.config;
                this.appConfig.urlObject = lang.clone(boilerPlateTemplateObject.urlObject);
                this.clonedURLObject = lang.clone(this.appConfig.urlObject);
                // if login details are not available set it to anonymousUserName
                if (this._loggedInUser) {
                    this.appConfig.logInDetails = {
                        "userName": this._loggedInUser.fullName,
                        "token": this._loggedInUser.credential.token,
                        "canEditFeatures": this._checkUserPrivileges(),
                        "isUserSignedIn": true,
                        "userId": this._loggedInUser.credential.userId
                    };
                    queryParams.token = this._loggedInUser.credential.token;
                } else {
                    this.appConfig.logInDetails = {
                        "userName": this.appConfig.i18n.applicationHeader.signInOption,
                        "token": "",
                        "canEditFeatures": true,
                        "isUserSignedIn": false,
                        "userId": ""
                    };
                }
                // enable queryForGroupItems in templateconfig
                this._boilerPlateTemplate.templateConfig.queryForGroupItems = true;
                // construct the query params. If found in group info mixin configured group params
                // so that in case of private group where we dont get the group info,
                // items will be loaded as configured in templateconfig
                lang.mixin(queryParams, this._boilerPlateTemplate.templateConfig.groupParams);
                if (this.appConfig.groupInfo.results && this.appConfig.groupInfo.results.length > 0) {
                    if (this.appConfig.groupInfo.results[0].sortField) {
                        queryParams.sortField = this.appConfig.groupInfo.results[0].sortField;
                    }
                    if (this.appConfig.groupInfo.results[0].sortOrder) {
                        queryParams.sortOrder = this.appConfig.groupInfo.results[0].sortOrder;
                    }
                }
                this._checkSelfContent();
                // pass the newly constructed queryparams from groupinfo.
                // if query params not available in groupinfo or group is private
                // items will be sorted according to modified date.
                this._groupItems = [];
                this._loadGroupItems(queryParams);
                on(document, "click", lang.hitch(this, function (event) {
                    var target, basemapPanel, legendPanel, isInternal;
                    target = event.target || event.srcElement;
                    basemapPanel = query(".esriCTOnScreenBasemap")[0];
                    legendPanel = query(".esriCTOnScreenLegend")[0];
                    //Check for click event and accordingly show/hide on screen widgets
                    if (basemapPanel && legendPanel) {
                        isInternal = target === basemapPanel || target === legendPanel ||
                            html.isDescendant(target, basemapPanel) || html.isDescendant(target, legendPanel);
                        if (!isInternal) {
                            this._hidePanel("Basemap");
                            this._hidePanel("Legend");
                        }
                    }
                }));
            } else {
                ApplicationUtils.showError(this.appConfig.i18n.config.configNotDefined);
            }
        },
        /**
        * Check that the requested item is from the same org, otherwise redirect to error page
        * @memberOf main
        */
        _checkSelfContent: function () {
            if (this.appConfig.appResponse && 
              !this._loggedInUser &&
              window.location.hostname.indexOf('arcgis.com') > -1 &&
              this.appConfig.appResponse.item &&
              this.appConfig.appResponse.item.access == "public" &&
              this.appConfig.appResponse.item.contentOrigin &&
              this.appConfig.appResponse.item.contentOrigin != "self"){
                var redirectUrl = "https://www.arcgis.com/apps/CrowdsourceManager/index.html?appid=" + this.appConfig.appResponse.item.id;
                window.location.replace("../shared/origin/index.html?appUrl=" + redirectUrl);
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
                domClass.remove("UpperAndLowerWrapperContainer", "esriCTHidden");
                domClass.add("signInErrorMessageContainer", "esriCTHidden");
                // executes when window is resized
                on(window, "resize", lang.hitch(this, this._onWindowResize));
                // executes when window is resized
                on(window, "orientationchange", lang.hitch(this, function () {
                    if (ApplicationUtils.isAndroid()) {
                        $(".esriCTFilterParentContainer").css("display", "none");
                    }
                    if (query(".tab-content")[0]) {
                        domStyle.set("carouselInnerContainer", "height", (query(".tab-content")[0].clientHeight - 75) + "px");
                    }
                    if (this._detailsPanelWidget) {
                        this._detailsPanelWidget.resizeChart();
                    }
                }));
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
                this._handleEmptyDataViewerPanel();
                this._attachClickEventToDetailsPanel();
                this._attachClickEventToApplicationHeader();
                this._attachClickEventToOperationalLayerName();
                this._addTooltipToExportToCSVButton();
                this._attachClickEventToExportToCSVButton();
                this._addTooltipToActionButtons();
                this._attachClickEventToActionButtons();
            } else {
                // executes when window is resized
                on(window, "resize", lang.hitch(this, this._onWindowResize));
                // set Application Theme
                ApplicationUtils.loadApplicationTheme(this.appConfig);
                // create Application header
                this._createApplicationHeader(true);
                // create map panel
                this._createMapPanel();
                // handle case when there id no webmap to display
                this._handleNoWebMapToDisplay();
            }
        },

        /**
         * This function is used to attach click event to details panel for closing filter UI.
         * On click of details panel hide webmap list
         * @memberOf widgets/main/main
         */
        _attachClickEventToDetailsPanel: function () {
            on(dom.byId("detailsPanelWrapperContainer"), "click", lang.hitch(this, function () {
                $(".esriCTFilterParentContainer").css("display", "none");
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    this._webMapListWidget.hideWebMapList();
                }
            }));

        },

        /**
         * This function is used to attach click event to application header for closing filter UI.
         * @memberOf widgets/main/main
         */
        _attachClickEventToApplicationHeader: function () {
            on(dom.byId("applicationHeaderWrapperContainer"), "click", lang.hitch(this, function () {
                $(".esriCTFilterParentContainer").css("display", "none");
            }));
        },

        /**
         * This function is used to attach click event to operational name container for closing filter UI.
         * @memberOf widgets/main/main
         */
        _attachClickEventToOperationalLayerName: function () {
            on(dom.byId("operationalLayerNameContainer"), "click", lang.hitch(this, function () {
                $(".esriCTFilterParentContainer").css("display", "none");
            }));
        },

        /**
         * This function is executed when window is resized
         * @memberOf widgets/main/main
         */
        _onWindowResize: function () {
            if (this._applicationHeader) {
                this._applicationHeader._setWidthOfApplicationNameContainer();
            }
            this._setNoDataDataViewerMessagePosition();
            if (!ApplicationUtils.isAndroid()) {
                $(".esriCTFilterParentContainer").css("display", "none");
            }
            setTimeout(lang.hitch(this, function () {
                var datePickerDialogBox, datePickerDialogBoxPosition;
                datePickerDialogBox = query(".bootstrap-datetimepicker-widget.dropdown-menu")[0];
                if (datePickerDialogBox) {
                    datePickerDialogBoxPosition = domGeom.position(datePickerDialogBox, true);
                    domConstruct.place(datePickerDialogBox, dojo.body(), "first");
                    domStyle.set(datePickerDialogBox, "position", "absolute");
                    domStyle.set(datePickerDialogBox, "top", (datePickerDialogBoxPosition.y + "px"));
                    domStyle.set(datePickerDialogBox, "left", (datePickerDialogBoxPosition.x + "px"));
                    domStyle.set(datePickerDialogBox, "height", (datePickerDialogBoxPosition.h + "px"));
                }
            }), 200);
            this._resizeMap();
        },

        /**
         * This function is used to instantiate application header.
         * @memberOf widgets/main/main
         */
        _createApplicationHeader: function (displaySignInText) {
            var appHeaderParameter;
            this._destroyApplicationHeaderWidget();
            // parameters needed to instantiate application header
            appHeaderParameter = {
                "appConfig": this.appConfig,
                "appUtils": ApplicationUtils,
                "loggedInUser": this._loggedInUser,
                "displaySignInText": displaySignInText
            };
            // loading application header
            this._applicationHeader = new ApplicationHeader(appHeaderParameter, domConstruct.create("div", {}, dom.byId('applicationHeaderWrapperContainer')));
            this._attachApplicationHeaderEventListener();
            this._applicationHeader.startup();
        },

        /**
         * This function is used to attach event listener to application header widget
         * @memberOf widgets/main/main
         */
        _attachApplicationHeaderEventListener: function () {
            this._applicationHeader.hideWebMapList = lang.hitch(this, function () {
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    if (this._webMapListWidget) {
                        this._webMapListWidget.hideWebMapList();
                    }
                }
            });
            this._applicationHeader.confirmedManualRefresh = lang.hitch(this, function () {
                this._isManualRefreshedClicked = true;
                this._dataViewerWidget.isShowSelectedClicked = false;
                this._dataViewerWidget.isShowAllClicked = false;
                this._disableExportToCSVButton();
                this.disableClearSelectionIcon();
                this._dataViewerWidget.storeDataForManualRefresh();
            });
            this._applicationHeader.reload = lang.hitch(this, function (logInDetails) {
                this._disableExportToCSVButton();
                this._reloadSignedInUserDetails = logInDetails;
            });
            this._applicationHeader.destroyWidgets = lang.hitch(this, function () {
                ApplicationUtils.showLoadingIndicator();
                ApplicationUtils.showOverlayContainer();
                this._destroyWidgets();
                this.reload(this._reloadSignedInUserDetails);
            });
            this._applicationHeader.onSearchApplied = lang.hitch(this, function (lastSearchedString) {
                this.appConfig._filterObject.lastSearchedString = lastSearchedString;
            });
            //Update the last search string to EMPTY on click of clear text button
            this._applicationHeader.onSearchClear = lang.hitch(this, function () {
                this.appConfig._filterObject.lastSearchedString = "";
            });
            this._applicationHeader.showAllClicked = lang.hitch(this, function () {
                this._showAllRecords();
            });
            this._applicationHeader.showSelectedClicked = lang.hitch(this, function () {
                this._dataViewerWidget.isShowSelectedClicked = true;
                this._dataViewerWidget.isShowAllClicked = false;
                this._detailsPanelWidget.showSelectedClicked();
                if (this._timeSliderWidget) {
                    this._timeSliderWidget.handleTimeSliderVisibility(2);
                }
                this._applicationHeader.disableSearchIcon();
                this._dataViewerWidget.createDataViewerUI(false);
            });
            this._applicationHeader.refreshSelectedLayer = lang.hitch(this, function () {
                this._refreshOperationalLayer();
            });
            this._applicationHeader.selectAllRowsClicked = lang.hitch(this, function () {
                this._dataViewerWidget.selectAllRowsClicked();
            });
            //If manual refresh button is clicked and hard reset flag is set to true
            //select the current selected layer, this will load the layer again by resetting
            //the current selection, filters and honoring web map level filters 
            this._applicationHeader.onApplicationHardReset = lang.hitch(this, function () {
                this._webMapListWidget._displaySelectedOperationalLayer(
                    this._webMapListWidget._currentOperationalLayerDetails);
            });
        },

        /**
         * This method is used to reload the app
         * @memberOf widgets/main/main
         */
        reload: function (logInDetails) {
            return logInDetails;
        },

        /**
         * This function is used to destroy all the widgets.
         * @memberOf widgets/main/main
         */
        _destroyWidgets: function () {
            this._destroyApplicationHeaderWidget();
            this._destroyWebMapPanelWidget();
            this._destroyTimeSliderWidget();
            this._destroyDataViewerWidget();
            this._destroyDetailsPanelWidget();
            this._destroyMapPanelWidget();
            this._destroyBasemapGalleryWidget();
            this._destroyLegendWidget();
            if (this.showAllButtonClickedHandle) {
                this.showAllButtonClickedHandle.remove();
            }
            if (this.selectAllButtonClickedHandle) {
                this.selectAllButtonClickedHandle.remove();
            }
            if (this.clearSelectionButtonClickedHandle) {
                this.clearSelectionButtonClickedHandle.remove();
            }
            if (this.exportToCSVButtonClickHandle) {
                this.exportToCSVButtonClickHandle.remove();
            }
        },

        /**
         * This function is used to destroy basemap gallery widget.
         * @memberOf widgets/main/main
         */
        _destroyBasemapGalleryWidget: function () {
            if (query(".esriCTBasemapGalleryButton")[0]) {
                domConstruct.destroy(query(".esriCTBasemapGalleryButton")[0]);
            }

        },

        /**
         * This function is used to destroy legend widget.
         * @memberOf widgets/main/main
         */
        _destroyLegendWidget: function () {
            if (query(".esriCTLegendButton")[0]) {
                domConstruct.destroy(query(".esriCTLegendButton")[0]);
            }
        },

        /**
         * This function is used to destroy application header widget.
         * @memberOf widgets/main/main
         */
        _destroyApplicationHeaderWidget: function () {
            if (this._applicationHeader) {
                this._applicationHeader.destroy();
                this._applicationHeader = null;
            }
        },

        /**
         * This function is used to destroy webmap panel widget.
         * @memberOf widgets/main/main
         */
        _destroyWebMapPanelWidget: function () {
            if (this._webMapListWidget) {
                this._webMapListWidget.destroy();
            }
        },

        /**
         * This function is used to instantiate map panel
         * @memberOf widgets/main/main
         */
        _createMapPanel: function () {
            var mapViewerParameter;
            // parameters needed for instantiate map viewer panel
            mapViewerParameter = {
                "appConfig": this.appConfig,
                "appUtils": ApplicationUtils
            };
            // load map viewer panel
            this._mapPanelWidget = new MapViewer(mapViewerParameter, domConstruct.create("div", {}, dom.byId("mapPanelWrapperContainer")));
        },

        /**
         * This function is used to destroy map panel widget
         * @memberOf widgets/main/main
         */
        _destroyMapPanelWidget: function () {
            if (this._mapPanelWidget) {
                this._mapPanelWidget.destroy();
            }
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
            // parameters needed for instantiate web-map list widget
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
                    ApplicationUtils.hideOverlayContainer();
                    this._reorderLayers = true;
                    this._initialLoad = true;
                    $(".esriCTSignOutOption").addClass("esriCTHidden");
                    this._resetUpperAndLowerContainer();
                    this._disableExportToCSVButton();
                    this.disableClearSelectionIcon();
                    this.disableSelectionOptionsIcon();
                    //If layer is hosted on portal
                    //Check wether the layer's access is public|private|org
                    if (details.operationalLayerDetails.itemId) {
                        ApplicationUtils.getLayerSharingProperty(details.operationalLayerDetails.itemId, this.appConfig);
                    }
                    // Reset last updated feature array
                    this.updatedFeature = null;
                    // Reset filter state object for a new layer
                    // Filter state object will always became empty when a new operational layer
                    // is selected from the list
                    this.appConfig._filterObject = null;
                    if (this.appConfig.i18n.direction === "rtl") {
                        //Remove disable class from webmap list toggle button
                        domClass.replace(dom.byId("webmapListToggleButton"), "esriCTPointerCursor", "esriCTWebMapPanelToggleButtonCloseDisabled");
                    } else {
                        //Remove disable class from webmap list toggle button
                        domClass.replace(dom.byId("webmapListToggleButton"), "esriCTPointerCursor", "esriCTWebMapPanelToggleButtonOpenDisabled");
                    }
                    if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                        this._webMapListWidget.hideWebMapList();
                    }
                    this._toggleNoFeatureFoundDiv(true);
                    this.map = details.map;
                    this._layerSelectionDetails = details;
                    this._itemInfo = details.itemInfo;
                    this._timeInfo = details.operationalLayerDetails.layerObject.timeInfo;
                    this._isManualRefreshedClicked = false;
                    this._isFilterRefreshClicked = false;
                    this._destroyBasemapGalleryWidget();
                    this._destroyLegendWidget();
                    //destroy time slider instance
                    this._destroyTimeSliderWidget();
                    this._addOperationalLayerInSnapShotMode();
                    //Reset application header and search widget flags
                    if (this._applicationHeader) {
                        this._applicationHeader._isMultipleRecordsSelected = false;
                        this._applicationHeader.isSearchActive = false;
                    }
                    this._enableHeaderIcons();
                    this._setApplicationHeaderTitle();
                    this._attachMapEvents();
                    this._removeFeatureLayerHandle();
                    this._createFeatureLayerHandle();
                    timeAnimation = this._checkTimeAnimation(this._itemInfo.itemData);
                    if (this._timeInfo && this._itemInfo.itemData.widgets && this._itemInfo.itemData.widgets.timeSlider && this._itemInfo.itemData.widgets.timeSlider.properties && timeAnimation) {
                        this._displayContainerOfTimeSlider();
                        this._createTimeSlider();
                    } else {
                        this._destroyTimeSliderWidget();
                        this._hideContainerOfTimeSlider();
                    }
                    this.map.addLayer(this._refinedOperationalLayer, this._existingLayerIndex);
                    this._checkFeatureScaleAndMaxRecordCount(true);
                    this._handleMapControls();
                }), 10);
            });
            // show message when there is no web map to display
            this._webMapListWidget.noMapsFound = lang.hitch(this, function () {
                this._handleNoWebMapToDisplay();
            });
            // to disable header icons
            this._webMapListWidget.displayInitialLoad = lang.hitch(this, function () {
                this._setFeatureLayerCountLabel();
                dom.byId("operationalLayerName").innerHTML = "";
                this._disableHeaderIcons();
            });
        },

        /**
         * This function is used to reset the height of upper and lower container
         * @memberOf widgets/main/main
         */
        _resetUpperAndLowerContainer: function () {
            $("#upperContainer").height('54%');
            $("#lowerContainer").height('45%');
            //Resize the map after setting default height to lower and upper container
            this._resizeMap();
        },

        /**
         * This function is used to check whether layer is visible at current map scale
         * @memberOf widgets/main/main
         */
        _isLayerVisible: function () {
            var currentScale = this.map.getScale();
            // ignored min scale = 0, max scale = 0
            if (this._refinedOperationalLayer.clonedMinScale !== null &&
                this._refinedOperationalLayer.clonedMinScale !== undefined &&
                this._refinedOperationalLayer.clonedMaxScale !== null &&
                this._refinedOperationalLayer.clonedMaxScale !== undefined) {
                if (this._refinedOperationalLayer.clonedMinScale === 0 && this._refinedOperationalLayer.clonedMaxScale === 0) {
                    return true;
                }
                // min scale = value, max scale = 0
                if ((this._refinedOperationalLayer.clonedMinScale >= currentScale) && (this._refinedOperationalLayer.clonedMaxScale === 0)) {
                    return true;
                    // min scale = 0, max scale = value
                }
                if ((this._refinedOperationalLayer.clonedMinScale === 0) && (this._refinedOperationalLayer.clonedMaxScale <= currentScale)) {
                    return true;
                    // min scale = value, max scale = value
                }
                if ((this._refinedOperationalLayer.clonedMinScale <= currentScale) && (this._refinedOperationalLayer.clonedMaxScale <= currentScale)) {
                    return false;
                }
                if ((this._refinedOperationalLayer.clonedMinScale >= currentScale) && (this._refinedOperationalLayer.clonedMaxScale >= currentScale)) {
                    return false;
                }
                if ((this._refinedOperationalLayer.clonedMinScale >= currentScale) && (this._refinedOperationalLayer.clonedMaxScale <= currentScale)) {
                    return true;
                }
            }
            return true;
        },

        /**
         * This function is used to attach event listener to map
         * @memberOf widgets/main/main
         */
        _attachMapEvents: function () {
            if (this._mapResizeHandle) {
                this._mapResizeHandle.remove();
            }
            if (this._mapClickHandle) {
                this._mapClickHandle.remove();
            }
            if (this._mapZoomInHandle) {
                this._mapZoomInHandle.remove();
            }
            if (this._mapZoomOutHandle) {
                this._mapZoomOutHandle.remove();
            }
            if (this._mapExtentChangeHandle) {
                this._mapExtentChangeHandle.remove();
            }
            this._mapResizeHandle = on(this.map, "resize", lang.hitch(this, function () {
                this._resizeMap();
            }));
            this._mapClickHandle = on(this.map, "click", lang.hitch(this, function (evt) {
                var detailsPanelParameters, popupInfo, showSelectedOption;
                $(".esriCTFilterParentContainer").css("display", "none");
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    this._webMapListWidget.hideWebMapList();
                }
                if ((evt.graphic) && (evt.graphic._layer)) {
                    if ((evt.graphic._layer.id === this._refinedOperationalLayer.id) || (evt.graphic._layer.id === "selectedRowGraphicsLayer")) {
                        if (this._dataViewerWidget.isNonEditableFeature) {
                            this._dataViewerWidget.clearSelection();
                        }
                        // detects that feature of non-editable layer is clicked.
                        this._dataViewerWidget.isNonEditableFeature = false;
                        // to track that feature is clicked of feature layer
                        if (this._isGraphicLayerClicked) {
                            this._dataViewerWidget.onFeatureClick(evt, true);
                            this._isGraphicLayerClicked = false;
                        } else {
                            this._dataViewerWidget.onFeatureClick(evt, false);
                        }
                    } else {
                        if (this.appConfig.showPopupForNonEditableLayers) {
                            // detects that feature of non-editable layer is clicked.
                            this._dataViewerWidget.isNonEditableFeature = true;
                            array.forEach(this._itemInfo.itemData.operationalLayers, lang.hitch(this, function (operationalLayer) {
                                if (operationalLayer.id === evt.graphic._layer.id) {
                                    popupInfo = operationalLayer.popupInfo;
                                }
                            }));
                            if (popupInfo === "" || popupInfo === null || popupInfo === undefined) {
                                var infoTemplate = evt.graphic.getInfoTemplate();
                                if (infoTemplate) {
                                    popupInfo = infoTemplate.toJson();
                                }
                            }
                            if (popupInfo) {
                                if (this._lastSelectedNonEditableFeature === evt.graphic.attributes[evt.graphic._layer.objectIdField]) {
                                    this._lastSelectedNonEditableFeature = null;
                                    this._dataViewerWidget.clearSelection();
                                    this._toggleNoFeatureFoundDiv(true);
                                    return;
                                } else {
                                    this._lastSelectedNonEditableFeature = evt.graphic.attributes[evt.graphic._layer.objectIdField];
                                }
                                // clear previous selected feature
                                this._dataViewerWidget._highlightNonEditableFeature(evt.graphic);
                                showSelectedOption = query(".esriCTShowSelectedOption");
                                if (showSelectedOption && showSelectedOption.length > 0) {
                                    showSelectedOption = showSelectedOption[0];
                                }
                                if (domClass.contains(showSelectedOption, "esriCTHidden")) {
                                    this._applicationHeader.showSelectedClicked();
                                }
                                detailsPanelParameters = {
                                    "appConfig": this.appConfig,
                                    "selectedFeatureSet": evt.graphic,
                                    "selectedOperationalLayer": evt.graphic._layer,
                                    "map": this.map,
                                    "appUtils": ApplicationUtils,
                                    "itemInfo": this._itemInfo,
                                    "popupInfo": popupInfo,
                                    "multipleFeatures": [evt.graphic],
                                    "isShowSelectedClicked": null,
                                    "isShowAllClicked": null
                                };
                                this._toggleNoFeatureFoundDiv(false);
                                this._createDetailsPanel(null, detailsPanelParameters);
                            }
                        }
                    }
                }
            }));
            this._mapZoomInHandle = on(query(".esriSimpleSliderIncrementButton")[0], "click", lang.hitch(this, function () {
                $(".esriCTFilterParentContainer").css("display", "none");
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    this._webMapListWidget.hideWebMapList();
                }
            }));
            this._mapZoomOutHandle = on(query(".esriSimpleSliderDecrementButton")[0], "click", lang.hitch(this, function () {
                $(".esriCTFilterParentContainer").css("display", "none");
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    this._webMapListWidget.hideWebMapList();
                }
            }));

            this._mapExtentChangeHandle = on(this.map, "extent-change", lang.hitch(this, this.onMapExtentChange));
        },

        /**
         * This function is used to toggle the visibility of feature layer on change of map extent.
         * @memberOf widgets/main/main
         */
        onMapExtentChange: function () {
            var currentScale = this.map.getScale();
            // ignored min scale = 0, max scale = 0
            if (this._refinedOperationalLayer.clonedMinScale !== null && this._refinedOperationalLayer.clonedMinScale !== undefined &&
                this._refinedOperationalLayer.clonedMaxScale !== null && this._refinedOperationalLayer.clonedMaxScale !== undefined) {
                if (this._refinedOperationalLayer.clonedMinScale === 0 && this._refinedOperationalLayer.clonedMaxScale === 0) {
                    return;
                }
                // min scale = value, max scale = 0
                if ((this._refinedOperationalLayer.clonedMinScale >= currentScale) && (this._refinedOperationalLayer.clonedMaxScale === 0)) {
                    this._refinedOperationalLayer.setVisibility(true);
                    // min scale = 0, max scale = value
                } else if ((this._refinedOperationalLayer.clonedMinScale === 0) && (this._refinedOperationalLayer.clonedMaxScale <= currentScale)) {
                    this._refinedOperationalLayer.setVisibility(true);
                    // min scale = value, max scale = value
                } else if ((this._refinedOperationalLayer.clonedMinScale <= currentScale) && (this._refinedOperationalLayer.clonedMaxScale <= currentScale)) {
                    this._refinedOperationalLayer.setVisibility(false);
                } else if ((this._refinedOperationalLayer.clonedMinScale >= currentScale) && (this._refinedOperationalLayer.clonedMaxScale >= currentScale)) {
                    this._refinedOperationalLayer.setVisibility(false);
                } else if ((this._refinedOperationalLayer.clonedMinScale >= currentScale) && (this._refinedOperationalLayer.clonedMaxScale <= currentScale)) {
                    this._refinedOperationalLayer.setVisibility(true);
                }
            }
        },

        /**
         * This function is used to enable header icons
         * @memberOf widgets/main/main
         */
        _enableHeaderIcons: function () {
            var searchParameter, manualRefreshParameter;
            searchParameter = {
                "itemInfo": this._itemInfo,
                "selectedOperationalLayerID": this._layerSelectionDetails.operationalLayerId,
                "selectedOperationalLayer": this._refinedOperationalLayer,
                "map": this.map
            };
            this._applicationHeader.toggleSearchIcon(searchParameter);
            manualRefreshParameter = {
                "selectedOperationalLayer": this._refinedOperationalLayer
            };
            this._applicationHeader.toggleManualRefreshIcon(manualRefreshParameter);
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
         * This function is used get existing index of layer
         * @memberOf widgets/main/main
         */
        _getExistingIndex: function (layerID) {
            var index, i;
            this._existingLayerIndex = null;
            for (i = 0; i < this._itemInfo.itemData.operationalLayers.length; i++) {
                if (this._itemInfo.itemData.operationalLayers[i].id === layerID) {
                    index = i + 1;
                    this._existingLayerIndex = index;
                }
            }
        },

        /**
         * This function is used to check whether "Editors can only see their own features (requires tracking)" option
         * is selected or not
         * @param {*} ownershipBasedAccessControlForFeatures json that needs to be checked with predefined combination of json
         */
        _isFeaturesOnlyEditorCanSeeOptionSelected: function (ownershipBasedAccessControlForFeatures) {
            var isOptionSelected;
            isOptionSelected = false;
            array.forEach(this._featuresEditorsCanSeeObjArr, lang.hitch(this, function (featuresEditorsCanSeeObj) {
                if (JSON.stringify(featuresEditorsCanSeeObj) === JSON.stringify(ownershipBasedAccessControlForFeatures)) {
                    isOptionSelected = true;
                }
            }));
            return isOptionSelected;
        },

        /**
         * This function is used add selected operational layer in snapshot mode
         * @memberOf widgets/main/main
         */
        _addOperationalLayerInSnapShotMode: function () {
            var opLayerInfo, staticDefinitionExpression, cloneRenderer, cloneLabelingInfo,
                editorFilter, creatorFieldName, existingDefinitionExpression;
            //get selected operation layer details
            opLayerInfo = this._layerSelectionDetails.operationalLayerDetails;
            // clone renderer
            cloneRenderer = lang.clone(this.map.getLayer(opLayerInfo.id).renderer);
            // clone labeling info
            cloneLabelingInfo = lang.clone(this.map.getLayer(opLayerInfo.id).labelingInfo);
            // min scale
            this._minScale = opLayerInfo.layerObject.minScale;
            // max scale
            this._maxScale = opLayerInfo.layerObject.maxScale;
            // get index of layer
            this._getExistingIndex(opLayerInfo.id);
            //remove selected layer from map
            this.map.removeLayer(this.map.getLayer(opLayerInfo.id));
            //create feature layer in 'snapshot' mode
            this._refinedOperationalLayer = new FeatureLayer(opLayerInfo.url, {
                mode: FeatureLayer.MODE_SNAPSHOT,
                id: opLayerInfo.id,
                outFields: ["*"]
            });
            //Set refresh interval to the layer, this will make sure
            //layer refreshes after specified time interval 
            if (this.appConfig.enableAutoRefresh) {
                this._refinedOperationalLayer.setRefreshInterval(
                    opLayerInfo.layerObject.refreshInterval);
            }
            // definition expression - when editors can only edit option is true
            if (opLayerInfo.layerObject.hasOwnProperty("ownershipBasedAccessControlForFeatures") &&
                opLayerInfo.layerObject.ownershipBasedAccessControlForFeatures !== null &&
                opLayerInfo.layerObject.ownershipBasedAccessControlForFeatures !== undefined &&
                opLayerInfo.layerObject.ownershipBasedAccessControlForFeatures !== "" &&
                this._isFeaturesOnlyEditorCanSeeOptionSelected(opLayerInfo.layerObject.ownershipBasedAccessControlForFeatures)) {
                // when creatorField property is available
                if (opLayerInfo.layerObject.hasOwnProperty("editFieldsInfo") &&
                    opLayerInfo.layerObject.editFieldsInfo.hasOwnProperty("creatorField")) {
                    creatorFieldName = opLayerInfo.layerObject.editFieldsInfo.creatorField;
                    // only features created by signed in user will be displayed by applying this definition expression
                    if (this.appConfig.logInDetails.isUserSignedIn) {
                        editorFilter = creatorFieldName + "=" + "'" + this.appConfig.logInDetails.userId + "'";
                    } else {
                        // only features created by anonymous user will be displayed by applying this definition expression
                        editorFilter = creatorFieldName + "=" + "''";
                    }
                }

            }
            if (this.appConfig.enableFilter || !opLayerInfo.definitionEditor) {
                //set definition expression configured in webmap
                if (opLayerInfo.layerDefinition && opLayerInfo.layerDefinition.definitionExpression) {
                    existingDefinitionExpression = opLayerInfo.layerDefinition.definitionExpression;
                    if (existingDefinitionExpression) {
                        if (editorFilter) {
                            existingDefinitionExpression = existingDefinitionExpression + "AND" + editorFilter;
                        }
                    } else {
                        if (editorFilter) {
                            existingDefinitionExpression = editorFilter;
                        }
                    }
                    this._refinedOperationalLayer.setDefinitionExpression(existingDefinitionExpression);
                } else {
                    if (editorFilter) {
                        existingDefinitionExpression = editorFilter;
                    }
                    this._refinedOperationalLayer.setDefinitionExpression(existingDefinitionExpression);
                }
            } else {
                staticDefinitionExpression = this._extractStaticExpression(opLayerInfo);
                // if static expression available
                if (staticDefinitionExpression) {
                    // if editor expression also available
                    if (editorFilter) {
                        staticDefinitionExpression = staticDefinitionExpression + "AND" + editorFilter;
                    }
                } else {
                    if (editorFilter) {
                        staticDefinitionExpression = editorFilter;
                    }
                }
                this._refinedOperationalLayer.setDefinitionExpression(staticDefinitionExpression);
            }
            this._refinedOperationalLayer.setRenderer(cloneRenderer);
            //set popupInfo template configured in webmap
            if (opLayerInfo.popupInfo) {
                this._refinedOperationalLayer.setInfoTemplate(new PopupTemplate(opLayerInfo.popupInfo));
            }
            //set item id
            if (opLayerInfo.itemId) {
                this._refinedOperationalLayer.itemId = opLayerInfo.itemId;
            }
            //set layer opacity configured in webmap
            this._refinedOperationalLayer.setOpacity(opLayerInfo.opacity);
            // set labelling info
            if (cloneLabelingInfo) {
                this._refinedOperationalLayer.setLabelingInfo(cloneLabelingInfo);
            }
            if (this._minScale !== null && this._maxScale !== null) {
                this._refinedOperationalLayer.clonedMinScale = this._minScale;
                this._refinedOperationalLayer.clonedMaxScale = this._maxScale;
            }
            if (this._refinedOperationalLayer.setScaleRange) {
                if (this._minScale !== null && this._maxScale !== null) {
                    this._refinedOperationalLayer.setScaleRange(this._minScale, this._maxScale);
                } else if (this._minScale !== null && (this._maxScale === null || this._maxScale === undefined)) {
                    this._refinedOperationalLayer.setScaleRange(this._minScale, 0);
                } else if (this._maxScale !== null && (this._minScale === null || this._minScale === undefined)) {
                    this._refinedOperationalLayer.setScaleRange(0, this._maxScale);
                }
            }
            this._refinedOperationalLayer.maxRecordCount = opLayerInfo.layerObject.maxRecordCount;
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
            var webMapListObj, portal, params, isUrlParams = false;
            webMapListObj = this._webMapListWidget;
            params = {
                q: this.appConfig.orgInfo.basemapGalleryGroupQuery
            };
            portal = this._boilerPlateTemplate.portal;
            portal.queryGroups(params).then(lang.hitch(this, function (groups) {
                if (groups && groups.results && groups.results.length > 0) {
                    params = {
                        q: "group:" + groups.results[0].id + " AND" + ' type:"Web Map" -type:"Web Mapping Application"'
                    };
                    portal.queryItems(params).then(lang.hitch(this, function (results) {
                        var baseMapID, i;
                        baseMapID = null;
                        if (results && results.results && results.results.length > 0) {
                            for (i = 0; i < results.results.length; i++) {
                                if (results.results[i].hasOwnProperty("title")) {
                                    if (results.results[i].title === this.appConfig.orgInfo.defaultBasemap.title) {
                                        baseMapID = results.results[i].id;
                                        break;
                                    }
                                }
                            }
                            //Check if url contains webmap parameter and accordingly handle the flag value
                            if (this.appConfig.urlObject && (this.appConfig.urlObject.query.webmap || this.appConfig.urlObject.query.layer ||
                                this.appConfig.urlObject.query.oid)) {
                                isUrlParams = true;
                            }
                            if (baseMapID) {
                                webMapListObj._createMap(baseMapID, "mapDiv", true, isUrlParams);
                            } else {
                                webMapListObj._createMap(results.results[0].id, "mapDiv", null, isUrlParams);
                            }
                        }
                        ApplicationUtils.hideLoadingIndicator();
                    }));
                } else {
                    //Check if url contains webmap parameter start processing the parameters
                    if (this.appConfig.urlObject.query.webmap) {
                        this._webMapListWidget.loadWebMapFromUrlParams();
                    }
                    ApplicationUtils.hideLoadingIndicator();
                }
            }));
        },

        /**
         * This function is used to add webmap toggle button
         * @memberOf widgets/main/main
         */
        _addWebMapListToggleIcon: function () {
            if (this.appConfig.i18n.direction === "rtl") {
                dojo.addClass(dom.byId('webmapListToggleButton'), "esrictfonticons-angle-double-right");
            } else {
                dojo.addClass(dom.byId('webmapListToggleButton'), "esrictfonticons-angle-double-left");
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
            dom.byId("operationalLayerName").innerHTML = this._layerSelectionDetails.operationalLayerDetails.title;
        },

        /**
         * This function is used to set count of total number features present in layer
         * @memberOf widgets/main/main
         */
        _setFeatureLayerCountLabel: function (graphics) {
            var count, countLabelString, selectedFeatureCountValue;
            selectedFeatureCountValue = 0;
            if (graphics && graphics.length) {
                count = graphics.length;
            } else {
                count = 0;
            }
            countLabelString = string.substitute(this.appConfig.i18n.dataviewer.layerFeatureCount, { featureCount: count, selectedFeatureCount: selectedFeatureCountValue });
            dom.byId("layerFeatureCountContainer").innerHTML = countLabelString;
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
                "selectedOperationalLayer": this._refinedOperationalLayer,
                "isManualRefreshedClicked": this._isManualRefreshedClicked,
                "manualRefreshDataObj": this._manualRefreshDataObj,
                "updatedFeature": this.updatedFeature,
                "isFilterRefreshClicked": this._isFilterRefreshClicked,
                "filterRefreshDataObj": this._filterRefreshDataObj
            };
            this._destroyDataViewerWidget();
            this._destroyDetailsPanelWidget();
            // instantiate data-viewer widget
            this._dataViewerWidget = new DataViewer(dataViewerConfigData, domConstruct.create("div", {}, dom.byId("dataViewerWrapperContainer")));
            this._isManualRefreshedClicked = false;
            this._isFilterRefreshClicked = false;
            this.updatedFeature = null;
            this._removeDataViewerHandle();
            this._attachDataViewerEventListener();
            this._dataViewerWidget.startup(true);
        },

        /**
         * This function is used to remove handle attached with data viewer widget
         * @memberOf widgets/main/main
         */
        _removeDataViewerHandle: function () {
            if (this._selectRowGraphicsClickHandle) {
                this._selectRowGraphicsClickHandle.remove();
            }
        },

        /**
         * This function is used to listen events raised by data viewer widget
         * @memberOf widgets/main/main
         */
        _attachDataViewerEventListener: function () {
            this._dataViewerWidget.showDetailsPanel = lang.hitch(this, function (showDetailsPanelDataObj) {
                this._toggleNoFeatureFoundDiv(false);
                // create details panel
                this._createDetailsPanel(showDetailsPanelDataObj, null);
            });

            this._dataViewerWidget.resetDetailsPanel = lang.hitch(this, function () {
                this._toggleNoFeatureFoundDiv(true);
            });

            this._dataViewerWidget.enableClearSelectionButton = lang.hitch(this, function () {
                this.enableClearSelectionIcon();
            });

            this._dataViewerWidget.disableClearSelectionButton = lang.hitch(this, function () {
                this.disableClearSelectionIcon();
            });

            this._dataViewerWidget.enableSelectAllButton = lang.hitch(this, function () {
                this.enableSelectAllButton();
            });

            this._dataViewerWidget.disableSelectAllButton = lang.hitch(this, function () {
                this.disableSelectAllButton();
            });

            this._dataViewerWidget.attachEventToGraphicsLayer = lang.hitch(this, function (graphicsLayer) {
                // to select graphics on click of activated feature
                this._selectRowGraphicsClickHandle = on(graphicsLayer, "click", lang.hitch(this, function () {
                    this._isGraphicLayerClicked = true;
                    // Reset last updated feature array
                    this.updatedFeature = null;
                }));
            });
            this._dataViewerWidget.hideWebMapList = lang.hitch(this, function () {
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    this._webMapListWidget.hideWebMapList();
                }
            });
            // to store data needed for manual refresh like scroll position, field order etc...
            this._dataViewerWidget.updateManualRefreshData = lang.hitch(this, function (data) {
                this._manualRefreshDataObj = data;
            });
            // to store data needed for filter refresh like scroll position, field order etc...
            this._dataViewerWidget.updateFilterRefreshData = lang.hitch(this, function (data) {
                this._isFilterRefreshClicked = true;
                this._filterRefreshDataObj = data;
                this._refreshOperationalLayer();
            });
            // to enable selection option icon
            this._dataViewerWidget.enableSelectionOptionsIcon = lang.hitch(this, function () {
                this.enableSelectionOptionsIcon();
            });
            // to disable selection option icon
            this._dataViewerWidget.disableSelectionOptionsIcon = lang.hitch(this, function () {
                this.disableSelectionOptionsIcon();
            });
            // to enable selection option icon
            this._dataViewerWidget.enableClearSelectionIcon = lang.hitch(this, function () {
                this.enableClearSelectionIcon();
            });
            // to disable selection option icon
            this._dataViewerWidget.disableClearSelectionIcon = lang.hitch(this, function () {
                this.disableClearSelectionIcon();
            });
            // to show all the records
            this._dataViewerWidget.showAllClicked = lang.hitch(this, function () {
                this._showAllRecords();
            });
            this._dataViewerWidget.webMapListDestroyMaps = lang.hitch(this, function () {
                if (this._webMapListWidget.mapsToBeDestroyed.length > 0) {
                    for (var i = this._webMapListWidget.mapsToBeDestroyed.length - 1; i >= 0; i--) {
                        this._webMapListWidget.mapsToBeDestroyed[i].destroy();
                    }
                    this._webMapListWidget.mapsToBeDestroyed.length = 0;
                }
            });
            // to show all the records
            this._dataViewerWidget.showSelectedClicked = lang.hitch(this, function () {
                if (this._timeSliderWidget) {
                    this._timeSliderWidget.handleTimeSliderVisibility(2);
                }
                this._detailsPanelWidget.showSelectedClicked();
            });
            // to get notified when data viewer is loaded
            this._dataViewerWidget.onDataViewerLoaded = lang.hitch(this, function () {
                if (this.isAutoRefresh && this.prevSelectedFeatureOID) {
                    this._dataViewerWidget.selectFeatureInDataViewer(this.prevSelectedFeatureOID);
                }
            });
        },

        /**
         * This function is used to show all the records
         * @memberOf widgets/main/main
         */
        _showAllRecords: function () {
            this._dataViewerWidget.isShowSelectedClicked = false;
            this._dataViewerWidget.isShowAllClicked = true;
            if (this._timeSliderWidget) {
                this._timeSliderWidget.handleTimeSliderVisibility(0);
            }
            this._applicationHeader.enableSearchIcon();
            this._detailsPanelWidget.showAllClicked();
            this._dataViewerWidget.createDataViewerUI(false);
        },

        /**
         * This function is used to destroy data-viewer widget.
         * @memberOf widgets/main/main
         */
        _destroyDataViewerWidget: function () {
            var dataViewerGraphicsLayer;
            if (this.map) {
                dataViewerGraphicsLayer = this.map.getLayer("selectedRowGraphicsLayer");
            }
            if (dom.byId("filterContainerWrapper")) {
                domConstruct.empty(dom.byId("filterContainerWrapper"));
            }
            if (dom.byId("dataViewerWrapperContainer")) {
                domConstruct.empty(dom.byId("dataViewerWrapperContainer"));
            }
            if (dataViewerGraphicsLayer) {
                this.map.removeLayer(dataViewerGraphicsLayer);
            }
            if (this._dataViewerWidget) {
                this._dataViewerWidget.destroy();
            }
        },

        /**
         * This function is used to reorder all the layers on map
         * @memberOf widgets/main/main
         */
        _reorderAllLayers: function () {
            var layer, i, layerInstance, index, basemapLength;
            basemapLength = 1;
            if ((this.map.layerIds) && (this.map.layerIds.length > 0)) {
                basemapLength = this.map.layerIds.length;
            }
            for (i = 0; i < this._itemInfo.itemData.operationalLayers.length; i++) {
                for (layer in this.map._layers) {
                    if (this.map._layers.hasOwnProperty(layer)) {
                        if (this.map._layers[layer].id === this._itemInfo.itemData.operationalLayers[i].id) {
                            layerInstance = this.map.getLayer(this._itemInfo.itemData.operationalLayers[i].id);
                            index = i + basemapLength;
                            this.map.reorderLayer(layerInstance, index);
                        }
                    }
                }
            }
        },

        /**
         * This function is used to pull label layer on top
         * @memberOf widgets/main/main
         */
        _getLayerLayerOnTop: function () {
            var labelLayerObj, numberOfLayers;
            labelLayerObj = this.map.getLayer("labels");
            numberOfLayers = 1000;
            if ((typeof (Object.keys) === "function") && (this.map._layers)) {
                numberOfLayers = Object.keys(this.map._layers).length + 1;
            }
            if (labelLayerObj) {
                this.map.reorderLayer(labelLayerObj, numberOfLayers);
            }
        },

        /**
         * This function is used to add feature layer in label layer
         * @memberOf widgets/main/main
         */
        _addFeatureLayerInLabelLayer: function () {
            var labelLayerObj;
            labelLayerObj = this.map.getLayer("labels");
            if (labelLayerObj && labelLayerObj.hasOwnProperty("featureLayers")) {
                if (this._refinedOperationalLayer.hasOwnProperty("labelingInfo")) {
                    labelLayerObj.featureLayers.push(this._refinedOperationalLayer);
                    labelLayerObj.refresh();
                }
            }
        },

        /**
         * This function is used to remove feature layer in label layer
         * @memberOf widgets/main/main
         */
        _removeLayerFromLabelLayer: function (layerID) {
            var labelLayerObj, i;
            labelLayerObj = this.map.getLayer("labels");
            if (labelLayerObj && labelLayerObj.hasOwnProperty("featureLayers")) {
                for (i = 0; i < labelLayerObj.featureLayers.length; i++) {
                    if (layerID === labelLayerObj.featureLayers[i].id) {
                        labelLayerObj.featureLayers.splice(i, 1);
                        break;
                    }
                }
            }
        },

        /**
         * This function is used to check the scale and max record count of feature layer
         * @memberOf widgets/main/main
         */
        _checkFeatureScaleAndMaxRecordCount: function (isOnLoad) {
            this._getAllFeaturesID().then(lang.hitch(this, function (featureIDs) {
                if ((isOnLoad && !this._isLayerVisible()) || (!isOnLoad && (!this._isLayerVisible() || this._refinedOperationalLayer.isExplicitlyFeaturesAdded || featureIDs.length > this._refinedOperationalLayer.maxRecordCount))) {
                    this._getFeatureByChunks(featureIDs).then(lang.hitch(this, function (entireFeatureArr) {
                        this._refinedOperationalLayer.clear();
                        array.forEach(entireFeatureArr, lang.hitch(this, function (graphic) {
                            graphic.infoTemplate = this._refinedOperationalLayer.infoTemplate;
                            this._refinedOperationalLayer._add(graphic);
                        }));
                        this._refinedOperationalLayer.isExplicitlyFeaturesAdded = true;
                        this._removeFeatureLayerHandle();
                        this._onFeatureLayerUpdateEnd();
                    }));
                }
            }));
        },

        /**
         * This function is used to get the features in chunks
         * @memberOf widgets/main/main
         */
        _getFeatureByChunks: function (featureIds) {
            var deferredList, deferred, chunkArr, chunkSize;
            deferred = new Deferred();
            deferredList = [];
            chunkArr = [];
            chunkSize = this._refinedOperationalLayer.maxRecordCount;
            while (featureIds.length > 0) {
                deferredList.push(this._getFeatures(featureIds.splice(0, chunkSize)));
            }
            all(deferredList).then(lang.hitch(this, function (featuresArr) {
                var intersectingFeatures;
                intersectingFeatures = [];
                array.forEach(featuresArr, lang.hitch(this, function (features) {
                    intersectingFeatures = intersectingFeatures.concat(features);
                }));
                deferred.resolve(intersectingFeatures);
            }));
            return deferred.promise;
        },

        /**
         * This function is used to get the features
         * @memberOf widgets/main/main
         */
        _getFeatures: function (featureIds) {
            var deferred, queryTask, queryObj;
            deferred = new Deferred();
            queryObj = new Query();
            queryObj.outFields = ["*"];
            queryObj.returnGeometry = true;
            queryObj.objectIds = featureIds;
            queryObj.outSpatialReference = this.map.spatialReference;
            queryTask = new QueryTask(this._refinedOperationalLayer.url);
            queryTask.execute(queryObj, lang.hitch(this, function (featureSet) {
                if (featureSet.features) {
                    deferred.resolve(featureSet.features);
                } else {
                    deferred.resolve([]);
                }
            }), lang.hitch(this, function () {
                deferred.resolve([]);
            }));
            return deferred.promise;
        },

        /**
         * This function is used to check whether features are exceeding max record count
         * @param{object} operational layer to which event needs to be attached
         * @memberOf widgets/main/main
         */
        _getAllFeaturesID: function () {
            var queryTask, queryParameters, deferred;
            deferred = new Deferred();
            queryTask = new QueryTask(this._refinedOperationalLayer.url);
            queryParameters = new Query();
            queryParameters.returnGeometry = false;
            queryParameters.where = this._refinedOperationalLayer.getDefinitionExpression() || "1=1";
            queryTask.executeForIds(queryParameters).then(lang.hitch(this, function (ids) {
                if (ids) {
                    deferred.resolve(ids);
                } else {
                    deferred.resolve([]);
                }
            }), lang.hitch(this, function () {
                deferred.resolve([]);
            }));
            return deferred.promise;
        },

        _onFeatureLayerUpdateEnd: function () {
            if (this._isShowSelectedClicked) {
                this._isShowSelectedClicked = false;
                this._dataViewerWidget.createDataViewerUI(false);
            } else {
                if (this._reorderLayers) {
                    this._reorderLayers = false;
                    this._reorderAllLayers();
                }
                this._removeLayerFromLabelLayer(this._refinedOperationalLayer.id);
                this._addFeatureLayerInLabelLayer();
                this._getLayerLayerOnTop();
                this._refinedOperationalLayer.clearSelection();
                this._toggleNoFeatureFoundDiv(true);
                //Enable time slider if it was disable
                if (this._timeSliderWidget) {
                    this._timeSliderWidget.handleTimeSliderVisibility(0);
                }
                //Enable search if it was disable
                if (this._applicationHeader) {
                    this._applicationHeader._handleSearchIconVisibility(0);
                }
                //Check if time slider widget exist, if yes then query and fetch features within current time extent
                if (this._timeSliderWidget) {
                    var timeExtent, timeQuery;
                    timeExtent = this._timeSliderWidget._createTimeExtent(this._timeSliderWidget.currentTimeInfo);
                    timeQuery = new EsriQuery();
                    timeQuery.timeExtent = timeExtent;
                    timeQuery.where = "1=1";
                    this._refinedOperationalLayer.queryFeatures(timeQuery, lang.hitch(this, function (featureSet) {
                        //Change graphics of layer with latest fetched features
                        this._refinedOperationalLayer.graphics = featureSet.features || [];
                        this._setFeatureLayerCountLabel(this._refinedOperationalLayer.graphics);
                        this._createDataViewer();
                    }));
                } else {
                    this._setFeatureLayerCountLabel(this._refinedOperationalLayer.graphics);
                    this._createDataViewer();
                }
            }
        },

        /**
         * This function is used to create event handles
         * @param{object} operational layer to which event needs to be attached
         * @memberOf widgets/main/main
         */
        _createFeatureLayerHandle: function () {
            if (this._refinedOperationalLayer) {
                //remove the existing refresh handle
                if (this._refreshHandle) {
                    this._refreshHandle.remove();
                }
                this._dataViewerFeatureLayerUpdateEndHandle = on(this._refinedOperationalLayer, "update-end", lang.hitch(this, this._onFeatureLayerUpdateEnd));
                //Bind the refresh event for a layer
                if (this.appConfig.enableAutoRefresh) {
                    this._refreshHandle = on(this._refinedOperationalLayer, "refresh-tick",
                        lang.hitch(this, function () {
                            this._autoRefreshApp();
                        }));
                }
            }
        },

        /**
         * This function is auto refreshes application
         * @memberOf widgets/main/main
         */
        _autoRefreshApp: function () {
            //Refresh the application only if it is not in edit mode
            // and the comments form is not open
            if (this._dataViewerWidget.isEditMode ||
                (this._detailsPanelWidget && this._detailsPanelWidget.isCommentsFormOpen)) {
                    return;
            }
            this.isAutoRefresh = true;
            var selectedFeatures = this._dataViewerWidget._getSelectedFeatures();
            //If a single feature was selected before app refresh
            //keep the selected feature object id and reselect
            //the feature once app refreshes
            if (selectedFeatures.length === 1) {
                this.prevSelectedFeatureOID =
                    selectedFeatures[0].attributes[this._refinedOperationalLayer.objectIdField];
            } else {
                this.prevSelectedFeatureOID = null;
            }
            //After getting all the desired data, refresh the application
            this._applicationHeader.refreshApplication();
            //update the button state if data viewer was in show selected mode
            var showAllButton = dom.byId("showAllMainButton");
            if (selectedFeatures.length > 0 && domClass.contains(showAllButton, "esriCTShowAllIcon")) {
                domClass.replace(showAllButton, "esriCTShowSelectedIconEnabled", "esriCTShowAllIcon");
                domAttr.set(showAllButton, "title", this.appConfig.i18n.dataviewer.showSelectedButtonTooltip);
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

            // handler for the hiding web map list on time slider buttons click
            this._timeSliderWidget.hideWebMapList = lang.hitch(this, function () {
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    this._webMapListWidget.hideWebMapList();
                }
            });

            this._timeSliderWidget.refreshSelectedLayer = lang.hitch(this, function () {
                //Time slider causes layer selection process to fire twice
                //To handle this just create a flag and make it false on first load
                if (this._initialLoad) {
                    this.appConfig.urlObject = {};
                    this.appConfig.urlObject = this.clonedURLObject;
                    this._initialLoad = false;
                } else {
                    delete this.appConfig.urlObject;
                }
                this._refreshOperationalLayer();
            });

            this._timeSliderWidget.startup();
            if (this._disableTimeSliderClickHandle) {
                this._disableTimeSliderClickHandle.remove();
            }
            // Show alert message when user try to interact with the time slider in edit mode
            this._disableTimeSliderClickHandle = on(dom.byId("disableTimeSliderWrapperContainer"), "click", lang.hitch(this, function () {
                ApplicationUtils.showMessage(this.appConfig.i18n.timeSlider.timeSliderInEditModeAlert);
            }));

        },

        /**
         * This function is used to destroy time slider widget.
         * @memberOf widgets/main/main
         */
        _destroyTimeSliderWidget: function () {
            if (this._timeSliderWidget) {
                this._timeSliderWidget.destroy();
                this._timeSliderWidget = null;
            }
        },

        /**
         * This function is used to resize the map when its container is resized.
         * @memberOf widgets/main/main
         */
        _resizeMap: function () {
            var mapCenter;
            if ((this.map) && (domStyle.get(dom.byId("mapDiv"), "display") === "block")) {
                domStyle.set(dom.byId("mapDiv"), "height", "100%");
                domStyle.set(dom.byId("mapDiv"), "width", "100%");
            }
            setTimeout(lang.hitch(this, function () {
                if ((this.map) && (domStyle.get(dom.byId("mapDiv"), "display") === "block")) {
                    mapCenter = this.map.extent.getCenter();
                    this.map.resize();
                    this.map.reposition();
                    this.map.centerAt(mapCenter);
                }
            }), 500);
        },

        /**
         * This function is used to instantiate details panel widget.
         * @memberOf widgets/main/main
         */
        _createDetailsPanel: function (showDetailsPanelDataObj, detailsPanelParametersObj) {
            this._destroyDetailsPanelWidget();
            var detailsPanelParameters;
            if (showDetailsPanelDataObj) {
                detailsPanelParameters = {
                    "appConfig": this.appConfig,
                    "selectedFeatureSet": showDetailsPanelDataObj.singleFeature,
                    "selectedOperationalLayer": this._refinedOperationalLayer,
                    "map": this.map,
                    "appUtils": ApplicationUtils,
                    "itemInfo": this._itemInfo,
                    "popupInfo": this._layerSelectionDetails.operationalLayerDetails.popupInfo,
                    "multipleFeatures": showDetailsPanelDataObj.multipleFeature,
                    "isShowSelectedClicked": this._dataViewerWidget.isShowSelectedClicked,
                    "isShowAllClicked": this._dataViewerWidget.isShowAllClicked
                };
            } else {
                detailsPanelParameters = detailsPanelParametersObj;
            }
            this._detailsPanelWidget = new DetailsPanel(detailsPanelParameters, domConstruct.create("div", {}, dom.byId("detailsPanelWrapperContainer")));
            this._attachDetailsPanelEventListener();
            this._detailsPanelWidget.startup();
        },

        _refreshOperationalLayer: function () {
            if (this._refinedOperationalLayer.isExplicitlyFeaturesAdded) {
                this._checkFeatureScaleAndMaxRecordCount(false);
            } else {
                this._refinedOperationalLayer.refresh();
            }
        },

        /**
         * This function is used to attach event listener to details panel widget
         * @memberOf widgets/main/main
         */
        _attachDetailsPanelEventListener: function () {
            this._detailsPanelWidget.hideWebMapList = lang.hitch(this, function () {
                if ((!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonOpenDisabled")) && (!domClass.contains("webmapListToggleButton", "esriCTWebMapPanelToggleButtonCloseDisabled"))) {
                    this._webMapListWidget.hideWebMapList();
                }
            });

            this._detailsPanelWidget.onFeatureUpdated = lang.hitch(this, function (updatedfeature, isShowSelectedClicked) {
                this.updatedFeature = updatedfeature;
                // Refresh selected layer to get updated features
                this._isShowSelectedClicked = isShowSelectedClicked;
                this._refreshOperationalLayer();
                this.enableSelectAllButton();
            });

            this._detailsPanelWidget.onMultipleFeatureEditCancel = lang.hitch(this, function (feature) {
                //highlight selected features row in table
                this._dataViewerWidget.highlightSelectedFeature(feature);
            });

            this._detailsPanelWidget.popupEditModeEnabled = lang.hitch(this, function (isEditMode) {
                var featureLength;
                if (isEditMode) {
                    featureLength = 2;
                    if (this._dataViewerWidget) {
                        this._dataViewerWidget.isEditMode = true;
                    }
                } else {
                    featureLength = 1;
                    if (this._dataViewerWidget) {
                        this._dataViewerWidget.isEditMode = false;
                    }
                    //If edit mode is disabled and data viewer has at least one feature selected
                    //enable select all button
                    if (this._dataViewerWidget && this._dataViewerWidget._getSelectedFeatures().length > 0) {
                        this.enableSelectAllButton();
                    }
                }
                if (((this._timeSliderWidget) && (!this._dataViewerWidget)) || ((this._timeSliderWidget) && (this._dataViewerWidget) && (!this._dataViewerWidget.isShowSelectedClicked))) {
                    this._timeSliderWidget.handleTimeSliderVisibility(featureLength);
                }
                // If search widget exist, handle its visibility
                if (((this._applicationHeader) && (!this._dataViewerWidget)) || ((this._applicationHeader) && (this._dataViewerWidget) && (!this._dataViewerWidget.isShowSelectedClicked))) {
                    this._applicationHeader._handleSearchIconVisibility(featureLength);
                }
            });
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
            if (dom.byId("detailsPanelWrapperContainer")) {
                domClass.add(dom.byId("detailsPanelWrapperContainer"), "esriCTHideTabList");
            }
        },

        /**
         * This function is used to resize upper and lower container using resize handler
         * @memberOf widgets/main/main
         */
        _resizeUpperAndLowerContainer: function () {
            //set jquery resizable on upper container
            $("#upperContainer").resizable({
                alsoResizeReverse: "#lowerContainer", //on resizing upper container resize the lower map container
                handles: 's', //show resize handel only at the bottom of the grid container
                containment: "#UpperAndLowerWrapperContainer",
                maxHeight: 550,
                minHeight: 140
            });

            //handle resize stop event which will be fired on resize complete
            //after completing resize of containers, resize the map so that it will be fit resized size
            $("#upperContainer").on("resizestop", lang.hitch(this, function () {
                ApplicationUtils.showLoadingIndicator();
                $(".esriCTFilterParentContainer").css("display", "none");
                var mainContainerHeight, upperContainerHeight, lowerContainerHeight;
                mainContainerHeight = parseFloat(domStyle.get("UpperAndLowerWrapperContainer", "height"));
                upperContainerHeight = parseFloat(domStyle.get("upperContainer", "height"));
                lowerContainerHeight = mainContainerHeight - upperContainerHeight;
                domStyle.set("lowerContainer", "height", lowerContainerHeight + "px");
                // add for resize image container LB
                if (query(".tab-content")[0]) {
                    if (dom.byId("carouselInnerContainer")) {
                        domStyle.set("carouselInnerContainer", "height", (query(".tab-content")[0].clientHeight - 18) + "px");
                    }
                }
                this._resizeMap();
                if (query(".esriCTDataViewerMainContainer") && (query(".esriCTDataViewerMainContainer").length > 0) && query(".esriCTDataViewerMainContainer")[0].clientHeight) {
                    if (this._dataViewerWidget && this._dataViewerWidget.dataViewerContainer) {
                        domStyle.set(this._dataViewerWidget.dataViewerContainer, "height", query(".esriCTDataViewerMainContainer")[0].clientHeight + "px");
                    }
                }
                // fit charts in media panel
                if (this._detailsPanelWidget) {
                    this._detailsPanelWidget.resizeChart();
                }
                ApplicationUtils.hideLoadingIndicator();
            }));
        },

        /**
         * This function is used to remove event handles
         * @memberOf widgets/main/main
         */
        _removeFeatureLayerHandle: function () {
            // removes previous feature layer update end handle
            if (this._dataViewerFeatureLayerUpdateEndHandle) {
                this._dataViewerFeatureLayerUpdateEndHandle.remove();
            }
        },

        /**
         * This function is used to show appropriate message when details panel is empty
         * @memberOf widgets/main/main
         */
        _handleEmptyDetailsPanel: function () {
            var noContentWrapperContainer;
            if (dojo.query(".esriCTNoContentDetailsPanelWrapperContainer")[0]) {
                domConstruct.destroy(dojo.query(".esriCTNoContentDetailsPanelWrapperContainer")[0]);
            }
            noContentWrapperContainer = domConstruct.create("div", { "class": "esriCTNoContentDetailsPanelWrapperContainer" }, dom.byId("detailsPanelWrapperContainer"));
            domConstruct.create("div", { "class": "esriCTNoContentDetailsPanelContainer esriCTBodyTextColor", "innerHTML": this.appConfig.selectFeatureMessage }, noContentWrapperContainer);
        },

        /**
         * This function is used to show appropriate message when Data viewer panel is empty
         * @memberOf widgets/main/main
         */
        _handleEmptyDataViewerPanel: function () {
            var noDataWrapperContainer, webMapListContainer, webMapListContainerWidth;
            webMapListContainer = dom.byId('webMapListContainer');
            webMapListContainerWidth = $(webMapListContainer).outerWidth(true);
            domConstruct.empty(dom.byId("overlayContainer"));
            noDataWrapperContainer = domConstruct.create("div", {
                "class": "esriCTNoDataDataViewerPanelContainer",
                "innerHTML": this.appConfig.i18n.dataviewer.selectLayerToBegin
            }, dom.byId("overlayContainer"));
            if (this.appConfig.i18n.direction === "rtl") {
                domStyle.set(noDataWrapperContainer, "padding-right", webMapListContainerWidth + "px");
            } else {
                domStyle.set(noDataWrapperContainer, "padding-left", webMapListContainerWidth + "px");
            }
            this._setNoDataDataViewerMessagePosition();
        },

        /**
         * This function is align the no data message when Data viewer panel is empty from the top
         * @memberOf widgets/main/main
         */
        _setNoDataDataViewerMessagePosition: function () {
            var noDataViewerContainer, upperContainerHeight;
            upperContainerHeight = parseFloat(domStyle.get("upperContainer", "height") / 2);
            noDataViewerContainer = query(".esriCTNoDataDataViewerPanelContainer")[0];
            if (noDataViewerContainer) {
                domStyle.set(noDataViewerContainer, "marginTop", upperContainerHeight + "px");
            }
        },

        /**
         * This function is used to screen of error message
         * @memberOf widgets/main/main
         */
        _displayErrorMessageScreen: function (error) {
            var errorMessage, signInErrorMessageContainerHeight;
            domClass.add("UpperAndLowerWrapperContainer", "esriCTHidden");
            domClass.remove("signInErrorMessageContainer", "esriCTHidden");
            errorMessage = this.appConfig.i18n.map.error;
            if (error && error.message) {
                errorMessage = error.message;
            }
            signInErrorMessageContainerHeight = $("#signInErrorMessageContainer").outerHeight(true);
            signInErrorMessageContainerHeight = parseFloat(signInErrorMessageContainerHeight);
            domStyle.set("signInErrorMessageContainer", "line-height", signInErrorMessageContainerHeight + "px");
            domClass.add("signInErrorMessageContainer", "esriCTTextAlignCenter");
            domAttr.set("signInErrorMessageContainer", "innerHTML", errorMessage);
            ApplicationUtils.hideLoadingIndicator();
        },

        /**
         * This function is used to show/hide state of empty details panel
         * @memberOf widgets/main/main
         */
        _toggleNoFeatureFoundDiv: function (isVisible) {
            //Show/hide initial load message
            if (query(".esriCTNoContentDetailsPanelWrapperContainer")[0]) {
                if (isVisible) {
                    domClass.remove(query(".esriCTNoContentDetailsPanelWrapperContainer")[0], "esriCTHidden");
                } else {
                    domClass.add(query(".esriCTNoContentDetailsPanelWrapperContainer")[0], "esriCTHidden");
                }
            }
        },

        /**
         * This function is used to extract statice definition expression of layer
         * @memberOf widgets/main/main
         */
        _extractStaticExpression: function (opLayerInfo) {
            var arrayList = [], parameterizedExpression, expressionArray = [], expressionValue, andExpression = false, newExpression = "";
            parameterizedExpression = opLayerInfo.definitionEditor.parameterizedExpression;
            // split and check if multiple filters are applied
            if (parameterizedExpression.split(") AND (").length > 1) {
                // if the expression is an 'ALL' expression
                andExpression = true;
                // if 'yes' then slice substring to set values accordingly
                expressionValue = parameterizedExpression.substring(1, (parameterizedExpression.length - 1));
                // split the parameterizedExpression to set values to set current definition expression
                arrayList = expressionValue.split(") AND (");
            } else if (parameterizedExpression.split(") OR (").length > 1) {
                // if the expression is an 'ANY' expression
                andExpression = false;
                // if 'yes' then slice substring to set values accordingly
                expressionValue = parameterizedExpression.substring(1, (parameterizedExpression.length - 1));
                // split the parameterizedExpression to set values to set current definition expression
                arrayList = expressionValue.split(") OR (");
            } else {
                // if it is a single parameter expression
                arrayList[0] = parameterizedExpression;
            }
            array.forEach(arrayList, lang.hitch(this, function (arrayElement) {
                // for dynamic filtering option
                if (arrayElement.split("{").length <= 1) {
                    // for static filter
                    expressionArray.push(arrayElement);
                }
            }));
            //Create definition expression
            array.forEach(expressionArray, lang.hitch(this, function (currentExpression, index) {
                if (andExpression) {
                    newExpression += "(" + currentExpression + ")";
                    if (index !== expressionArray.length - 1) {
                        newExpression += " AND ";
                    }
                } else {
                    newExpression += "(" + currentExpression + ")";
                    if (index !== expressionArray.length - 1) {
                        newExpression += " OR ";
                    }
                }
            }));
            return newExpression;
        },

        /**
         * Check for user account and his privileges to show/hide editing buttons
         * @memberOf widgets/main/main
         */
        _checkUserPrivileges: function () {
            var userActLevel;
            if (this._loggedInUser && this._loggedInUser.hasOwnProperty("level") && this._loggedInUser.hasOwnProperty("privileges")) {
                userActLevel = parseInt(this._loggedInUser.level, 10);
                if (userActLevel > 1 && this._loggedInUser.privileges.indexOf("features:user:edit") >= 0) {
                    return true;
                }
            }
            return false;
        },

        /* Section for basemap gallery and legend */

        _handleMapControls: function () {
            var basemapG, basemapGalleryButtonDiv, legendButtonDiv, legend;
            //Create basemap widget on every layer/webmap change
            this._legend = null;
            this._basemapGallery = null;
            if (this.appConfig.showBaseMapGallery) {
                if (!this._basemapGallery) {
                    basemapG = this._createOnScreenWidgetPanel("Basemap");
                    basemapGalleryButtonDiv = domConstruct.create("div", {
                        "class": "esriCTMapNavigationButton esriCTBasemapGalleryButton",
                        "title": this.appConfig.i18n.main.basemapGalleryText
                    });
                    on(basemapGalleryButtonDiv, "click", lang.hitch(this, function (event) {
                        event.stopPropagation();
                        if (!this._basemapGallery) {
                            this._fetchBasemapGalleryGroup().then(lang.hitch(this, function (id) {
                                this._createBasemapGallery(basemapG, id);
                            }));
                        }
                        this._showPanel("Basemap");
                    }));
                    domConstruct.place(basemapGalleryButtonDiv, query(".esriSimpleSliderDecrementButton", dom.byId("mapDiv"))[0], "after");
                }
            }
            if (this.appConfig.showLegend) {
                legendButtonDiv = domConstruct.create("div", {
                    "class": "esriCTMapNavigationButton esriCTLegendButton",
                    "title": this.appConfig.i18n.main.legendText
                });
                legend = this._createOnScreenWidgetPanel("Legend");
                on(legendButtonDiv, "click", lang.hitch(this, function (event) {
                    event.stopPropagation();
                    if (!this._legend) {
                        this._createLegend(legend);
                    }
                    this._showPanel("Legend");
                }));
                if (this.appConfig.showBaseMapGallery) {
                    domConstruct.place(legendButtonDiv, basemapGalleryButtonDiv, "after");
                } else {
                    domConstruct.place(legendButtonDiv, query(".esriSimpleSliderDecrementButton", dom.byId("mapDiv"))[0], "after");
                }
            }
        },

        _fetchBasemapGalleryGroup: function () {
            var basemapGroup, basemapDef, groupId, params;
            basemapDef = new Deferred();
            if (this.appConfig.basemapGroup) {
                basemapGroup = this.appConfig.basemapGroup;
            } else if (this.appConfig.orgInfo.useVectorBasemaps) {
                basemapGroup = this.appConfig.orgInfo.vectorBasemapGalleryGroupQuery;
            } else {
                basemapGroup = this.appConfig.orgInfo.basemapGalleryGroupQuery;
            }
            params = {
                q: basemapGroup
            };
            this.appConfig.portalObject.queryGroups(params).then(lang.hitch(this, function (groups) {
                //Check if configured group is valid
                if (groups.results && groups.results[0] && groups.results[0].id) {
                    groupId = groups.results[0].id;
                } else {
                    groupId = null;
                }
                basemapDef.resolve(groupId);
            }), function () {
                //reject deferred
                basemapDef.reject(null);
            });
            return basemapDef.promise;
        },

        /**
        * create panel for on screen widget
        * @param{string} name of panel to be created
        * @memberOf main
        */
        _createOnScreenWidgetPanel: function (panel) {
            var headerTitle, container, titleContainer, contentWrapper, closeBtn;
            //Clear widgets dom
            if (query(".esriCTOnScreen" + panel)[0]) {
                domConstruct.destroy(query(".esriCTOnScreen" + panel)[0]);
            }
            //Set the title based on panel
            if (panel === "Basemap") {
                headerTitle = this.appConfig.i18n.main.basemapGalleryText;
            } else {
                headerTitle = this.appConfig.i18n.main.legendText;
            }
            container = domConstruct.create("div", {
                "class": "esriCTOnScreenWidgetContainer esriCTHidden esriCTOnScreen" + panel
            }, dojo.body());
            titleContainer = domConstruct.create("div", {
                "class": "esriCTOnScreenWidgetTitleContainer esriCTHeaderBackgroundColor esriCTHeaderTextColor esriCTHeaderTextColorAsBorder",
                title: panel
            }, container);
            domConstruct.create("div", {
                "class": "esriCTHeaderTitle",
                innerHTML: headerTitle
            }, titleContainer);

            closeBtn = domConstruct.create("div", {
                "class": "esriCTCloseHelpWindow esrictfonticons esrictfonticons-close-1 esriCTHeaderTextColor esriCTHeaderBackgroundColor"
            }, domConstruct.create("div", { "class": "esriCTPanelCloseBtn esriCTFloatLeft" }, titleContainer));

            //Listen for close button click
            on(closeBtn, "click", lang.hitch(this, function () {
                domClass.add(container, "esriCTHidden");
            }));
            //Create dom for on screen panel
            contentWrapper = domConstruct.create("div", {
                "class": "esriCTOnScreenWidgetWrapper esriCTBodyTextColor esriCTBodyBackgroundColor"
            }, container);
            return contentWrapper;
        },

        /**
        * create basemap gallery widget
        * @param{object} parent node
        * @memberOf main
        */
        _createBasemapGallery: function (parentNode, id) {
            var configuredGroup = {}, loadingIndicatorDiv, basemapErrorHandler;
            configuredGroup.id = id;
            loadingIndicatorDiv = domConstruct.create("div", {
                "class": "esriCTBasemapLoading"
            }, parentNode);
            this._basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: this.map,
                basemapsGroup: configuredGroup,
                portalUrl: this.appConfig.sharinghost,
                "class": "esriCTHidden"
            }, domConstruct.create('div', {}, parentNode));
            this._basemapGallery.startup();
            //Hide loading indicator on load
            this._basemapGallery.on("load", lang.hitch(this, function () {
                domClass.add(loadingIndicatorDiv, "esriCTHidden");
                domClass.remove(this._basemapGallery.domNode, "esriCTHidden");
                if (basemapErrorHandler) {
                    basemapErrorHandler.remove();
                }
            }));
            //Hide basemap gallery after selecting a basemap
            this._basemapGallery.on("selection-change", lang.hitch(this, function () {
                this._hidePanel("Basemap");
            }));
            //Handle basemap gallery error
            basemapErrorHandler = this._basemapGallery.on("error", lang.hitch(this, function (err) {
                domClass.add(loadingIndicatorDiv, "esriCTHidden");
                domClass.remove(this._basemapGallery.domNode, "esriCTHidden");
                domAttr.set(this._basemapGallery.domNode, "innerHTML", err.message);
            }));
        },

        /**
        * create legend widget
        * @param{object} parent node
        * @memberOf main
        */
        _createLegend: function (parentNode) {
            var layerInfo = [], isNonEditableLayer, capabilities, showLegend;
            //Loop through all the layers and filter them based on capabilities
            array.forEach(this._itemInfo.itemData.operationalLayers,
                lang.hitch(this, function (layer) {
                    isNonEditableLayer = false;
                    showLegend = true;
                    capabilities = layer.resourceInfo.capabilities;
                    if (capabilities) {
                        isNonEditableLayer = capabilities.indexOf("Create") === -1 && (capabilities.indexOf("Editing") === -1 ||
                            capabilities.indexOf("Update") === -1);
                    }
                    //Honor show/hide legend prperty from webmap
                    if (layer.hasOwnProperty("showLegend")) {
                        showLegend = layer.showLegend;
                    }
                    //Filter layer based on different criteria
                    if (showLegend && (layer.id === this._refinedOperationalLayer.id || (this.appConfig.showNonEditableLayers && isNonEditableLayer))) {
                        layerInfo.push({ layer: this.map._layers[layer.id], title: layer.title });
                    }
                }));
            this._legend = new Legend({
                map: this.map,
                layerInfos: layerInfo,
                respectVisibility: false
            }, domConstruct.create('div', {}, parentNode));
            this._legend.startup();
        },

        /**
        * show on screen panel
        * @param{string} name of panel to be shown
        * @memberOf main
        */
        _showPanel: function (panel) {
            var nodeClass;
            //Before showing the selected panel, close all the other panels
            query(".esriCTOnScreenWidgetContainer").forEach(lang.hitch(this,
                function (node) {
                    if (node) {
                        domClass.add(node, "esriCTHidden");
                    }
                }));
            nodeClass = ".esriCTOnScreen" + panel;
            domClass.remove(query(nodeClass)[0], "esriCTHidden");
        },

        /**
        * show on screen panel
        * @param{string} name of panel to be shown
        * @memberOf main
        */
        _hidePanel: function (panel) {
            var nodeClass;
            nodeClass = ".esriCTOnScreen" + panel;
            domClass.add(query(nodeClass)[0], "esriCTHidden");
        },
        /* End of section for basemap gallery and legend */

        /**
         * This function is used to set tooltip to export to csv button
         */
        _addTooltipToExportToCSVButton: function () {
            var exportButton = dom.byId("exportToCSVMainButton");
            domAttr.set(exportButton, "title", this.appConfig.i18n.dataviewer.exportToCSVButtonTooltip);
        },

        /**
         * This function is used to attach click event to export to csv button
         */
        _attachClickEventToExportToCSVButton: function () {
            var exportButton = dom.byId("exportToCSVMainButton");
            this.exportToCSVButtonClickHandle = on(exportButton, "click", lang.hitch(this, function () {
                if (!(domClass.contains(exportButton, "esriCTExportToCSVIconDisabled"))) {
                    this._exportSelectedFeaturesToCSV();
                }
            }));
        },

        /**
         * This function is used to call the export function of data-viewer widget that will be exporting the data to CSV
         */
        _exportSelectedFeaturesToCSV: function() {
            this._dataViewerWidget.exportSelectedFeaturesToCSV();
        },

        /**
         * This function is used to disable export to csv button
         */
        _disableExportToCSVButton: function () {
            var exportButton = dom.byId("exportToCSVMainButton");
            domClass.add(exportButton, "esriCTExportToCSVIconDisabled");
        },


        /**
         * This function is used to add tooltip to all the action buttons
         */
        _addTooltipToActionButtons: function () {
            var showAllButton = dom.byId("showAllMainButton");
            var selectAllButton = dom.byId("selectAllMainButton");
            var clearSelectionButton = dom.byId("clearSelectionMainButton");
            domAttr.set(showAllButton, "title", this.appConfig.i18n.dataviewer.showSelectedButtonTooltip);
            domAttr.set(selectAllButton, "title", this.appConfig.i18n.dataviewer.selectAllButtonTooltip);
            domAttr.set(clearSelectionButton, "title", this.appConfig.i18n.dataviewer.clearSelectionButtonTooltip);
        },

        /**
         * This function is used bind click events to all the action buttons
         */
        _attachClickEventToActionButtons: function () {
            var showAllButton = dom.byId("showAllMainButton");
            var selectAllButton = dom.byId("selectAllMainButton");
            var clearSelectionButton = dom.byId("clearSelectionMainButton");
            this.showAllButtonClickedHandle = on(showAllButton, "click", lang.hitch(this, function () {
                if (!domClass.contains(showAllButton, "esriCTShowSelectedIconDisabled")) {
                    if (domClass.contains(showAllButton, "esriCTShowSelectedIconEnabled")) {
                        ApplicationUtils.showLoadingIndicator();
                        setTimeout(lang.hitch(this, function () {
                        this._dataViewerWidget.isShowSelectedClicked = true;
                        this._dataViewerWidget.isShowAllClicked = false;
                        this._detailsPanelWidget.showSelectedClicked();
                        if (this._timeSliderWidget) {
                            this._timeSliderWidget.handleTimeSliderVisibility(2);
                        }
                        this._applicationHeader.disableSearchIcon();
                        this._dataViewerWidget.createDataViewerUI(false);
                        this.disableSelectAllButton();
                        domClass.replace(showAllButton, "esriCTShowAllIcon", "esriCTShowSelectedIconEnabled");
                        domAttr.set(showAllButton, "title", this.appConfig.i18n.dataviewer.showAllButtonTooltip);
                            ApplicationUtils.hideLoadingIndicator();
                        }), 250);
                    } else {
                        ApplicationUtils.showLoadingIndicator();
                        setTimeout(lang.hitch(this, function () {
                        this._showAllRecords();
                        domClass.replace(showAllButton, "esriCTShowSelectedIconEnabled", "esriCTShowAllIcon");
                        domAttr.set(showAllButton, "title", this.appConfig.i18n.dataviewer.showSelectedButtonTooltip);
                        //If all the rows in data viewer are selected
                        //disable select all button
                        if (this._isAllRowsSelected()) {
                            this.disableSelectAllButton();
                        }
                            ApplicationUtils.hideLoadingIndicator();
                        }), 250);
                    }
                }
            }));
            this.selectAllButtonClickedHandle = on(selectAllButton, "click", lang.hitch(this, function () {
                if (!(domClass.contains(selectAllButton, "esriCTSelectAllIconDisabled"))) {
                    this._dataViewerWidget.selectAllRowsClicked();
                }
            }));
            this.clearSelectionButtonClickedHandle = on(clearSelectionButton, "click", lang.hitch(this, function () {
                if (!(domClass.contains(clearSelectionButton, "esriCTClearSelectionIconDisabled"))) {
                    ApplicationUtils.showLoadingIndicator();
                    setTimeout(lang.hitch(this, function () {
                    this._dataViewerWidget.clearAllRowsSelection();
                    this._disableExportToCSVButton();
                    this.disableClearSelectionIcon();
                    this.enableSelectAllButton();
                    //If show selected screen is shown and clear selection is clicked
                    //clear all currently displayed records
                    if (domClass.contains(showAllButton, "esriCTShowAllIcon")) {
                        this._dataViewerWidget.createDataViewerUI(false);
                        showAllButton.click();
                    }
                    //Change the edit mode value to false
                    //This is required for filter panel to work as expected
                    //and for other parts of the app too
                    if (this._detailsPanelWidget) {
                        this._detailsPanelWidget.popupEditModeEnabled(false);
                    }
                    if (this._dataViewerWidget) {
                        this._dataViewerWidget.isEditMode = false;
                    }
                        ApplicationUtils.hideLoadingIndicator();
                    }), 250);
                }
            }));
        },

        /**
         * This function checks wether all the rows are selected in data viewer
         */
        _isAllRowsSelected: function () {
            var allRowsSelected
            if (this.map && this._dataViewerWidget) {
                dataViewerGraphicsLayer = this.map.getLayer("selectedRowGraphicsLayer");
                //If all the rows are selected then disable select all button
                //subtracting 2 from table rows as two rows are for headers
                if (dataViewerGraphicsLayer.graphics.length === this._dataViewerWidget._table.rows.length - 2) {
                    allRowsSelected = true;
                }
            }
            return allRowsSelected;
        },

        /**
         * This function is used to enable selection option icon
         */
        enableSelectionOptionsIcon: function () {
            var showAllButton = dom.byId("showAllMainButton");
            domClass.replace(showAllButton, "esriCTShowSelectedIconEnabled", "esriCTShowSelectedIconDisabled");
        },

        /**
         * This function is used to disable selection option icon
         */
        disableSelectionOptionsIcon: function () {
            var showAllButton = dom.byId("showAllMainButton");
            domClass.replace(showAllButton, "esriCTShowSelectedIconDisabled", "esriCTShowSelectedIconEnabled");
        },

        /**
         * This function is used to enable clear selection option icon
         */
        enableClearSelectionIcon: function () {
            var clearSelectionButton = dom.byId("clearSelectionMainButton");
            domClass.replace(clearSelectionButton, "esriCTClearSelectionIconEnabled", "esriCTClearSelectionIconDisabled");
        },

        /**
         * This function is used to disable clear selection option icon
         */
        disableClearSelectionIcon: function () {
            var clearSelectionButton = dom.byId("clearSelectionMainButton");
            domClass.replace(clearSelectionButton, "esriCTClearSelectionIconDisabled", "esriCTClearSelectionIconEnabled");
        },

        /**
         * This function is used to enable select all button
         */
        enableSelectAllButton: function () {
            var selectAllButton = dom.byId("selectAllMainButton");
            domClass.replace(selectAllButton, "esriCTSelectAllIcon", "esriCTSelectAllIconDisabled");
        },

        /**
         * This function is used to disable select all button
         */
        disableSelectAllButton: function () {
            var selectAllButton = dom.byId("selectAllMainButton");
            domClass.replace(selectAllButton, "esriCTSelectAllIconDisabled", "esriCTSelectAllIcon");
        }
    });
});