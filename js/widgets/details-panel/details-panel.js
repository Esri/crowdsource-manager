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
    "dojo/dom",
    "dojo/dom-class",
    "dojo/text!./templates/details-panel.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "widgets/details-panel/comments",
    "widgets/details-panel/media",
    "widgets/details-panel/popup",
    "dojo/dom-construct",
    "dojo/domReady!"
], function (
    declare,
    dom,
    domClass,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang,
    Comments,
    Media,
    PopupTab,
    domConstruct

) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _popupWidgetObj: null, // to store object of popup widget
        _mediaWidgetObj: null, // to store object of media widget
        _commentsWidgetObj: null, // to store object of comments widget
        i18n: {},

        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/details-panel/details-panel
        */
        constructor: function (options) {
            lang.mixin(this, options);
            this.i18n = this.appConfig.i18n;
        },

        /**
        * This function is designed to handle processing after any DOM fragments have been actually added to the document.
        * @memberOf widgets/details-panel/details-panel
        */
        startup: function () {
            // TODO : Popup tab coming soon... //ignore jslint
            // this._initializePopupWidget();
            // TODO : Media tab coming soon... //ignore jslint
            // this._initializeMediaWidget();
            this._initializeCommentsWidget();
        },

        /**
        * This function is used to initialize popup tab
        * @memberOf widgets/details-panel/details-panel
        */
        _initializePopupWidget: function () {
            var popupParameters = {};
            popupParameters = {
                "appConfig": this.appConfig,
                "selectedFeatureSet": this.selectedFeatureSet,
                "selectedOperationalLayer": this.selectedOperationalLayer,
                "map": this.map,
                "appUtils": this.appUtils,
                "itemInfo": this.itemInfo
            };
            // Initialize popup widget
            this._popupWidgetObj = new PopupTab(popupParameters, domConstruct.create("div", {}, dom.byId("popupWrapperContainer")));
            this._popupWidgetObj.startup();
        },

        /**
        * This function is used to initialize media tab
        * @memberOf widgets/details-panel/details-panel
        */
        _initializeMediaWidget: function () {
            var mediaParameters;
            mediaParameters = {
                "appConfig": this.appConfig,
                "selectedFeatureSet": this.selectedFeatureSet,
                "selectedOperationalLayer": this.selectedOperationalLayer,
                "map": this.map,
                "appUtils": this.appUtils,
                "itemInfo": this.itemInfo
            };
            // Initialize comments widget
            this._mediaWidgetObj = new Media(mediaParameters, domConstruct.create("div", {}, dom.byId("mediaWrapperContainer")));
            this._mediaWidgetObj.startup();
        },

        /**
        * This function is used to initialize comments tab
        * @memberOf widgets/details-panel/details-panel
        */
        _initializeCommentsWidget: function () {
            var commentsParameters;
            commentsParameters = {
                "appConfig": this.appConfig,
                "selectedFeatureSet": this.selectedFeatureSet,
                "selectedOperationalLayer": this.selectedOperationalLayer,
                "map": this.map,
                "appUtils": this.appUtils,
                "itemInfo": this.itemInfo
            };
            // Initialize comments widget
            this._commentsWidgetObj = new Comments(commentsParameters, domConstruct.create("div", {}, dom.byId("commentsWrapperContainer")));
            this._attachCommentsEventListener();
            this._commentsWidgetObj.startup();
            if (!domClass.contains(dom.byId("commentformContainer"), "esriCTHidden")) {
                domClass.add(dom.byId("commentformContainer"), "esriCTHidden");
            }
        },

        _attachCommentsEventListener: function () {
            this._commentsWidgetObj.hideCommentsTab = lang.hitch(this, function () {
                this._hideDetailsPanelTab("comments");
            });

            this._commentsWidgetObj.showCommentsTab = lang.hitch(this, function () {
                this._showDetailsPanelTab("comments");
            });
        },

        /**
        * This function is used to destroy popup widget.
        * @memberOf widgets/main/main
        */
        destroyPopupWidget: function () {
            if (this._popupWidgetObj) {
                this._popupWidgetObj.destroy();
            }
        },

        /**
        * This function is used to destroy media widget.
        * @memberOf widgets/main/main
        */
        destroyMediaWidget: function () {
            if (this._mediaWidgetObj) {
                this._mediaWidgetObj.destroy();
            }
        },

        /**
        * This function is used to destroy comments widget.
        * @memberOf widgets/main/main
        */
        destroyCommentsWidget: function () {
            if (this._commentsWidgetObj) {
                this._commentsWidgetObj.destroy();
            }
        },


        /**
        * This function is used to hide navigation tabs based on availability of data
        * @param{object} tab name
        * @memberOf widgets/details-panel/details-panel
        */
        _hideDetailsPanelTab: function (tabName) {
            dom.byId(tabName + "Tab").style.display = "none";
        },

        /**
        * This function is used to hide navigation tabs based on availability of data
        * @param{object} tab name
        * @memberOf widgets/details-panel/details-panel
        */
        _showDetailsPanelTab: function (tabName) {
            //TODO : check for appropriate display property since the tab goes to next line after setting "block" //ignore jslint
            dom.byId(tabName + "Tab").style.display = "";
        }
    });
});
