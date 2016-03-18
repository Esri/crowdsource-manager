/*global define,dojo */
/*jslint sloppy:true,unparam:true,indent:4 */
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
    "dojo/text!./templates/popup.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dijit/layout/ContentPane",
    "dojo/domReady!"
], function (
    declare,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang,
    domConstruct,
    ContentPane

) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        /**
        * This function is called when widget is constructed
        * @param{object} options contains parameters of widget
        * @memberOf widgets/details-panel/popup
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        startup: function () {
            //display selected feature's popup info
            this._showPopupInfo();
        },


        /**
        * Show selected feature's popup content
        * @param{object} parameters of widget
        * @memberOf widgets/details-panel/popup
        */
        _showPopupInfo: function () {
            var popupContainer, popupContentPane;
            //check whether multiple features selected
            if (this.selectedFeatureSet.features.length === 1) {
                //display feature's popup info if one feature is selected
                popupContainer = domConstruct.create("div", { "class": "esriCTPopupInfoContainer" }, this.popupDetailsContainer);
                popupContentPane = new ContentPane({}, popupContainer);
                popupContentPane.startup();
                popupContentPane.set("content", this.selectedFeatureSet.features[0].getContent());
            }
        }
    });
});