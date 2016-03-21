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
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/date/locale",
    "dojo/text!./templates/time-slider.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/TimeExtent",
    "esri/dijit/TimeSlider",
    "dojo/domReady!"
], function (
    declare,
    domConstruct,
    lang,
    domAttr,
    locale,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    TimeExtent,
    TimeSlider
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        currentTimeInfo: null,
        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/time-slider/time-slider
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is called after all properties of a widget are defined
        * @memberOf widgets/time-slider/time-slider
        */
        startup: function () {
            var webmapWidgets;
            webmapWidgets = this.webmapJSON.itemData.widgets;
            this._createTimeSlider(webmapWidgets.timeSlider.properties);
        },

        /**
        * This function is used to create UI for time slider list.
        * @param{object} parameters to create timeSlider
        * @memberOf widgets/time-slider/time-slider
        */
        _createTimeSlider: function (timeInfoData) {
            this.timeInfoData = timeInfoData;
            var timeExtent = this._createTimeExtent(timeInfoData),
                timeSlider = new TimeSlider({
                    "thumbCount": timeInfoData.thumbCount
                }, this.timeSliderContainer);
            timeSlider.setThumbIndexes([0, 1]);
            //Check the configuration of time slider in webmap, if timeStopInterval is available use it otherwise
            //create time slider ticks/interval by numberOfStops property
            if (timeInfoData.timeStopInterval) {
                timeSlider.createTimeStopsByTimeInterval(timeExtent, timeInfoData.timeStopInterval.interval, timeInfoData.timeStopInterval.units);
            } else {
                timeSlider.createTimeStopsByCount(timeExtent, timeInfoData.numberOfStops);
            }
            timeSlider.on("time-extent-change", lang.hitch(this, this._showSliderInfo));
            domAttr.set(this.timeSliderTextContainer, "innerHTML", this.appConfig.i18n.timeSlider.timeSliderLabel);
            timeSlider.startup();
            this.map.setTimeSlider(timeSlider);
        },

        /**
        * This function is used to remove slider and its date/time value.
        * @memberOf widgets/time-slider/time-slider
        */
        _removeTimeSlider: function () {
            domConstruct.empty(this.timeSliderContainer);
            domConstruct.empty(this.timeSliderDateContainer);
            domConstruct.empty(this.timeSliderTextContainer);
        },

        /**
        * This function is used to create Time Extent for timeSlider.
        * @memberOf widgets/time-slider/time-slider
        */
        _createTimeExtent: function (timeInfoData) {
            return new TimeExtent(new Date(timeInfoData.startTime), new Date(timeInfoData.endTime));
        },

        /**
        * This function is used to show current slider date/time info.
        * @param{object} parameters to create timeSlider
        * @memberOf widgets/time-slider/time-slider
        */
        _showSliderInfo: function (sliderValue) {
            var displayDate, dateTimeDiaplayPattern, startDate, endDate;
            this.appUtils.showLoadingIndicator();
            this.currentTimeInfo = sliderValue;
            dateTimeDiaplayPattern = "MM/dd/yyyy HH:MM a";
            startDate = locale.format(new Date(sliderValue.startTime), {
                datePattern: dateTimeDiaplayPattern,
                selector: "date"
            }).replace(",", " ");
            endDate = locale.format(new Date(sliderValue.endTime), {
                datePattern: dateTimeDiaplayPattern,
                selector: "date"
            }).replace(",", " ");
            //Check for the configuration of time slider, and accordingly set the date string
            if (this.timeInfoData.thumbCount > 1) {
                displayDate = startDate + " - " + endDate;
            } else {
                displayDate = endDate;
            }
            domAttr.set(this.timeSliderDateContainer, "innerHTML", displayDate);
        }
    });
});