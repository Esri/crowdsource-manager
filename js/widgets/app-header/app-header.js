/*global define,dojoConfig,$,confirm,document */
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
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/dom-style",
    "dojo/on",
    "dojo/text!./templates/app-header.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "widgets/search/search",
    "widgets/manual-refresh/manual-refresh",
    "widgets/help/help",
    "dojo/dom-class"
], function (
    declare,
    domConstruct,
    lang,
    domAttr,
    domStyle,
    on,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    Search,
    ManualRefresh,
    Help,
    domClass
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template, //  a string representing the HTML of the template
        _helpWidgetObj: null, // to store object of help widget
        _searchWidgetObj: null, // to store object of search widget
        _manualRefreshWidgetObj: null, // to store object of manual refresh widget

        /**
        * This function is called when widget is constructed
        * @param{object} parameters of the widget
        * @memberOf widgets/app-header/app-header
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is designed to handle processing after any DOM fragments have been actually added to the document.
        * @memberOf widgets/app-header/app-header
        */
        startup: function () {
            this._onApplicationIconLoad();
            this._setMaxWidthOfApplicationIcon();
            this._setApplicationIcon();
        },

        /**
        * This function is executed when application icon is loaded inside its container
        * @memberOf widgets/app-header/app-header
        */
        _onApplicationIconLoad: function () {
            on(this.applicationHeaderIcon, "load", lang.hitch(this, function () {
                this._setWidthOfApplicationNameContainer();
                this._setApplicationName();
                this._setApplicationShortcutIcon();
                this._initializeSearchWidget();
                this._initializeManualRefreshWidget();
                this._initializeHelpWidget();
                this._setToolTip();
            }));
        },

        /**
        * This function is used to set tooltip for application header icon
        * @memberOf widgets/app-header/app-header
        */
        _setToolTip: function () {
            domAttr.set(this.searchButton, "title", this.appConfig.i18n.search.searchIconTooltip);
            domAttr.set(this.refreshButton, "title", this.appConfig.i18n.manualRefresh.manualRefreshIconTooltip);
            domAttr.set(this.helpButton, "title", this.appConfig.i18n.help.helpIconTooltip);
        },

        /**
        * This function is used to set max width of the application icon container
        * @memberOf widgets/app-header/app-header
        */
        _setMaxWidthOfApplicationIcon: function () {
            var searchIconWidth, manualRefreshIconWidth, helpIconWidth, applicationHeaderContainerWidth, headerIconsWidth;
            applicationHeaderContainerWidth = $(this.applicationHeaderContainer).outerWidth(true);
            applicationHeaderContainerWidth = parseFloat(applicationHeaderContainerWidth);
            searchIconWidth = $(this.searchButton).outerWidth(true);
            searchIconWidth = parseFloat(searchIconWidth);
            manualRefreshIconWidth = $(this.refreshButton).outerWidth(true);
            manualRefreshIconWidth = parseFloat(manualRefreshIconWidth);
            helpIconWidth = $(this.helpButton).outerWidth(true);
            helpIconWidth = parseFloat(helpIconWidth);
            headerIconsWidth = searchIconWidth + manualRefreshIconWidth + helpIconWidth;
            domStyle.set(this.applicationHeaderIconContainer, "max-width", (applicationHeaderContainerWidth - headerIconsWidth) + "px");
        },

        /**
        * This function is used to set application icon
        * @memberOf widgets/app-header/app-header
        */
        _setApplicationIcon: function () {
            // first check if application icon is configured than display that
            // second check if group icon is available than display that
            // third default fallback icon will be displayed if above both scenario are not available
            if (this.appConfig.applicationIcon && lang.trim(this.appConfig.applicationIcon).length !== 0) {
                if (this.appConfig.applicationIcon.indexOf("http") === 0) {
                    domAttr.set(this.applicationHeaderIcon, "src", this.appConfig.applicationIcon);
                } else {
                    if (this.appConfig.applicationIcon.indexOf("/") === 0) {
                        domAttr.set(this.applicationHeaderIcon, "src", dojoConfig.baseURL + this.appConfig.applicationIcon);
                    } else {
                        domAttr.set(this.applicationHeaderIcon, "src", dojoConfig.baseURL + "/" + this.appConfig.applicationIcon);
                    }
                }
            } else if (this.appConfig.groupInfo) {
                if (this.appConfig.groupInfo.results.length > 0 && this.appConfig.groupInfo.results[0].thumbnailUrl) {
                    domAttr.set(this.applicationHeaderIcon, "src", this.appConfig.groupInfo.results[0].thumbnailUrl);
                } else {
                    domAttr.set(this.applicationHeaderIcon, "src", dojoConfig.baseURL + "/images/app-icon.png");
                }
            } else {
                domAttr.set(this.applicationHeaderIcon, "src", dojoConfig.baseURL + "/images/app-icon.png");
            }
        },

        /**
        * This function is used to set width of application name container
        * @memberOf widgets/app-header/app-header
        */
        _setWidthOfApplicationNameContainer: function () {
            var applicationIconWidth, searchIconWidth, manualRefreshIconWidth, helpIconWidth, applicationHeaderContainerWidth, headerIconsWidth, applicationNameContainerWidth;
            applicationHeaderContainerWidth = $(this.applicationHeaderContainer).outerWidth(true);
            applicationHeaderContainerWidth = parseFloat(applicationHeaderContainerWidth);
            applicationIconWidth = $(this.applicationHeaderIconContainer).outerWidth(true);
            applicationIconWidth = parseFloat(applicationIconWidth);
            searchIconWidth = $(this.searchButton).outerWidth(true);
            searchIconWidth = parseFloat(searchIconWidth);
            manualRefreshIconWidth = $(this.refreshButton).outerWidth(true);
            manualRefreshIconWidth = parseFloat(manualRefreshIconWidth);
            helpIconWidth = $(this.helpButton).outerWidth(true);
            helpIconWidth = parseFloat(helpIconWidth);
            headerIconsWidth = applicationIconWidth + searchIconWidth + manualRefreshIconWidth + helpIconWidth;
            applicationNameContainerWidth = applicationHeaderContainerWidth - headerIconsWidth;
            applicationNameContainerWidth = applicationNameContainerWidth - 15;
            domStyle.set(this.applicationNameContainer, "width", applicationNameContainerWidth + "px");
        },

        /**
        * This function is used to set name of application
        * @memberOf widgets/app-header/app-header
        */
        _setApplicationName: function () {
            var applicationName;
            // first check if application name is configured than display that
            // second check if group title is available display that
            // if user clicks cancel button than display sign-in text
            if (this.appConfig.applicationName && lang.trim(this.appConfig.applicationName).length !== 0) {
                applicationName = this.appConfig.applicationName;
            } else if (this.appConfig.groupInfo.results.length > 0 && this.appConfig.groupInfo.results[0].title) {
                applicationName = this.appConfig.groupInfo.results[0].title;
            }
            // to set title of document
            document.title = applicationName;
            // to set application name
            domAttr.set(this.applicationHeaderName, "innerHTML", applicationName);
        },

        /**
        * This function is used to set shortcut icon of an application.
        * @memberOf widgets/app-header/app-header
        */
        _setApplicationShortcutIcon: function () {
            this._loadIcons("shortcut icon", this.applicationHeaderIcon.src);
        },

        /**
        * This function is used to load icons.
        * @param{string} rel specifies the relationship between documents
        * @param{string} iconPath shows path of image
        * @memberOf widgets/app-header/app-header
        */
        _loadIcons: function (rel, iconPath) {
            var icon;
            icon = domConstruct.create("link");
            icon.rel = rel;
            icon.type = "image/x-icon";
            if (iconPath.indexOf("http") === 0) {
                icon.href = iconPath;
            } else {
                icon.href = dojoConfig.baseURL + iconPath;
            }
            document.getElementsByTagName('head')[0].appendChild(icon);
        },

        /**
        * This function is used to create help widget
        * @memberOf widgets/app-header/app-header
        */
        _initializeHelpWidget: function () {
            var helpParameters;
            this._destroyHelpWidget();
            helpParameters = {
                "appConfig": this.appConfig
            };
            // Initialize help widget
            this._helpWidgetObj = new Help(helpParameters);
            // On click of help icon, open help modal
            on(this.helpButton, "click", lang.hitch(this, function () {
                this._helpWidgetObj.startup();
            }));
        },

        /**
        * This function is used to destroy help widget
        * @memberOf widgets/app-header/app-header
        */
        _destroyHelpWidget: function () {
            if (this._helpWidgetObj) {
                this._helpWidgetObj.destroy();
            }
        },

        /**
        * This method is used to create search widget.
        * @memberOf widgets/app-header/app-header
        */
        _initializeSearchWidget: function () {
            var searchParameters;
            searchParameters = {
                "appConfig": this.appConfig,
                "appUtils": this.appUtils
            };
            // Initialize search widget
            this._searchWidgetObj = new Search(searchParameters);
            // On click of search icon, open search panel
            on(this.searchButton, "click", lang.hitch(this, function () {
                if (domClass.contains(this.searchButton, "esriCTSearchIconContainer")) {
                    this._searchWidgetObj.startup();
                }
            }));
        },

        /**
        * This method is used to create manual refresh widget
        * @memberOf widgets/app-header/app-header
        */
        _initializeManualRefreshWidget: function () {
            var refreshParameters;
            refreshParameters = {
                "appConfig": this.appConfig,
                "appUtils": this.appUtils
            };
            // Initialize manual refresh widget
            this._manualRefreshWidgetObj = new ManualRefresh(refreshParameters);
            // On click of manual refresh icon, proceed with manual refresh functionality
            on(this.refreshButton, "click", lang.hitch(this, function () {
                if (domClass.contains(this.refreshButton, "esriCTManualRefreshIconContainer")) {
                    this._manualRefreshWidgetObj.startup();
                }
            }));
        },

        /**
        * This method is used to enable header icons
        * @memberOf widgets/app-header/app-header
        */
        enableHeaderIcons: function () {
            domClass.replace(this.refreshButton, "esriCTManualRefreshIconContainer", "esriCTManualRefreshIconContainerDisable");
            domClass.replace(this.refreshButton, "esriCTPointerCursor", "esriCTDefaultCursor");
            domClass.replace(this.searchButton, "esriCTSearchIconContainer", "esriCTSearchIconContainerDisabled");
            domClass.replace(this.searchButton, "esriCTPointerCursor", "esriCTDefaultCursor");
        }
    });
});