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
    "dijit/_WidgetBase",
    "dojo/_base/lang",
    "dojo/domReady!"
], function (
    declare,
    _WidgetBase,
    lang

) {
    return declare([_WidgetBase], {
        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/manual-refresh/manual-refresh
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is designed to handle processing after any DOM fragments have been actually added to the document.
        * @memberOf widgets/manual-refresh/manual-refresh
        */
        startup: function () {
            this.appUtils.showMessage("Manual refresh coming soon...");
        }
    });
});
