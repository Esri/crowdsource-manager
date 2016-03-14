/*global define,$ */
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
    "dojo/on",
    "dojo/dom",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/text!./templates/media.html",
    "dijit/registry",
    "dijit/layout/ContentPane",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dojo/domReady!"
], function (
    declare,
    on,
    dom,
    domClass,
    domStyle,
    domAttr,
    template,
    registry,
    ContentPane,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _infoContent: null,
        _infoWidget: null,
        _chartInfo: null,
        _chartIndex: 0,
        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/details-panel/media
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is a startup for media widget
        * @memberOf widgets/details-panel/media
        */
        startup: function () {
            this.hideMediaTab();
            if (this.multipleFeatures[0]) {
                this._createMediaUI();
            }
        },

        /**
        * This function is used to show attachments if any
        * @param{object} parameters to create a carousel panel
        * @memberOf widgets/details-panel/media
        */
        _createMediaUI: function () {
            if (this.selectedOperationalLayer.hasAttachments) {
                this._infoContent = this.multipleFeatures[0].getContent();
                this._chartInfo = this.popupInfo && this.popupInfo.mediaInfos;
                this._infoWidget = registry.byId(this._infoContent.id);
                this._showAttachments();
            }
        },

        /**
        * This function is used to show/hide carousel panel
        * @memberOf widgets/details-panel/media
        */
        _showAttachments: function () {
            var objectID = this.multipleFeatures[0].attributes[this.selectedOperationalLayer.objectIdField];
            /*show Loading indicator */
            this.selectedOperationalLayer.queryAttachmentInfos(objectID,
                lang.hitch(this, function (infos) {
                    // if attachments found
                    if ((infos && infos.length > 0) || (this._chartInfo && this._chartInfo.length > 0)) {
                        this._createDynamicCasoul(infos);
                    } else {
                        this._showNoMedaiFound();
                    }
                }), lang.hitch(this, function () {
                    /*hide Loading indicator */
                }));
        },

        /**
        * This function is used to create a carousel panel
        * @param{object} parameters to create a carousel panel
        * @memberOf widgets/details-panel/media
        */
        _createDynamicCasoul: function (infos) {
            var slideCount = 0, i;
            if (infos) {
                for (i = 0; i < infos.length; i++) {
                    // add to carousel only if it is an image type
                    if (infos[i].contentType && infos[i].contentType.indexOf("image") > -1) {
                        $('<div class="item"><img src="' + infos[i].url + '"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
                        //  $('<li data-target="#carousel-widget" data-slide-to="' + slideCount++ + '"></li>').appendTo('.carousel-indicators');
                        slideCount++;
                    }
                }
            }

            slideCount = this._addChartsToCarousel(slideCount);

            if (slideCount) {
                this.showMediaTab();
                $('.item').first().addClass('active');
                // $('.carousel-indicators > li').first().addClass('active');
                $('#carousel-widget').carousel({
                    interval: false
                });
            } else {
                this._showNoMedaiFound();
            }
        },

        _addChartsToCarousel: function (slideCount) {
            var chartContaner, popupContentPane, chartCount = slideCount;
            if (this._chartInfo && this._chartInfo.length > 0) {
                $('<div class="item"><div id="esriCTChartContainer"></div><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
                //  $('<li data-target="#carousel-widget" data-slide-to="' + slideCount + '"></li>').appendTo('.carousel-indicators');

                chartContaner = dom.byId("esriCTChartContainer");
                popupContentPane = new ContentPane({}, chartContaner);
                popupContentPane.startup();
                popupContentPane.set("content", this._infoContent);
                this._attachNextPrevEvents(slideCount);
                chartCount = slideCount + 1;
            }
            return chartCount;
        },

        _attachNextPrevEvents: function (slideCount) {
            var i;
            on(this.slidePrev, "click", lang.hitch(this, function (evt) {
                var currentIndex = $('#carousel-widget .carousel-inner .item.active').index(), i;
                if (parseInt(currentIndex, 10) === slideCount && this._chartIndex !== 0) {
                    this._chartIndex--;
                    evt.stopPropagation();
                    this._infoWidget._goToPrevMedia();
                } else if (parseInt(currentIndex, 10) === 0 && this._chartIndex === 0) {
                    this._chartIndex = this._chartInfo.length - 1;
                    for (i = 0; i < this._chartIndex; i++) {
                        this._infoWidget._goToNextMedia();
                    }
                }
            }));

            on(this.slideNext, "click", lang.hitch(this, function (evt) {
                var currentIndex = $('#carousel-widget .carousel-inner .item.active').index();
                if (parseInt(currentIndex, 10) === slideCount && this._chartIndex !== this._chartInfo.length - 1) {
                    this._chartIndex++;
                    evt.stopPropagation();
                    this._infoWidget._goToNextMedia();
                } else if (parseInt(currentIndex, 10) === slideCount && this._chartIndex === this._chartInfo.length - 1) {
                    for (i = 0; i < this._chartIndex; i++) {
                        this._infoWidget._goToPrevMedia();
                    }
                    this._chartIndex = 0;
                }
            }));
        },

        /**
        * This function is used to show no medai Found info
        * @memberOf widgets/details-panel/media
        */
        _showNoMedaiFound: function () {
            this.hideMediaTab();
            domStyle.set(this.mediaContainer, "display", "none");
            domClass.remove(this.noMediaInfoContainer, "esriCTHidden");
            domAttr.set(this.noMediaInfoContainer, "innerHTML", this.appConfig.i18n.mediaTab.noFeatureAvailabe);
        },

        /**
        * This function is used to hide medai tab
        * @memberOf widgets/details-panel/media
        */
        hideMediaTab: function () {
            return true;
        },

        /**
        * This function is used to show medai tab
        * @memberOf widgets/details-panel/media
        */
        showMediaTab: function () {
            return true;
        }

    });
});
