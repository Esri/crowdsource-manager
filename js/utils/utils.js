/*global define,document,alert,dojo,navigator */
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
    "dojo/dom-class",
    "dojo/text!css/theme-template.css",
    "dojo/string",
    "dojo/dom-construct",
    "dojo/query",
    "dojo/number",
    "dojo/dom",
    "dojo/_base/Color",
    "dojo/colors",
    "dojox/color"
], function (
    domClass,
    ThemeCss,
    string,
    domConstruct,
    query,
    numberformatter,
    dom,
    Color,
    Colors,
    dojoxColor
) {
    return {

        /**
         * This function is used to show loading indicator.
         * @memberOf utils/utils
         */
        showLoadingIndicator: function () {
            domClass.add(document.body, "app-loading");
        },

        /**
         * This function is used to hide loading indicator.
         * @memberOf utils/utils
         */
        hideLoadingIndicator: function () {
            domClass.remove(document.body, "app-loading");
        },

        /**
         * This function is used to hide overlay container.
         * @memberOf utils/utils
         */
        hideOverlayContainer: function () {
            var overlayContainer = dom.byId("overlayContainer");
            domClass.add(overlayContainer, "esriCTHidden");
        },

        /**
         * This function is used to show overlay container.
         * @memberOf utils/utils
         */
        showOverlayContainer: function () {
            var overlayContainer = dom.byId("overlayContainer");
            if (overlayContainer) {
                domClass.remove(overlayContainer, "esriCTHidden");
            }
        },

        /**
         * This function is used to show error
         * @param {string} error to be shown
         * @memberOf utils/utils
         */
        showError: function (error) {
            alert(error);
        },

        /**
         * This function is used to show message.
         * @param {string} message to be shown
         * @memberOf utils/utils
         */
        showMessage: function (message) {
            alert(message);
        },

        /**
         * This function is used set the theming according to org theming
         * @param{object} application configuration
         * @memberOf utils/utils
         */
        _setOrgTheme: function (appConfig) {
            appConfig.appTheme = {
                "header": {
                    "background": appConfig.theme,
                    "text": appConfig.headerTextColor
                },
                "body": {
                    "background": appConfig.bodyBackgroundColor,
                    "text": appConfig.bodyTextColor
                },
                "button": {
                    "background": appConfig.buttonBackgroundColor,
                    "text": appConfig.buttonTextColor
                }
            };
            //if logo is not configured by user and in org properties we have valid logo then only use the logo from org
            if (!appConfig.applicationIcon && appConfig.appTheme.logo && appConfig.appTheme.logo.small) {
                appConfig.applicationIcon = appConfig.appTheme.logo.small;
            }
            // calculated colors according to configuration
            appConfig.appTheme.body.calculatedBackground =
                this.getCalculatedColor(appConfig.appTheme.body.background, 50, 6);
            appConfig.appTheme.body.calculatedText =
                this.getCalculatedColor(appConfig.appTheme.body.text, 50, 21);
            appConfig.appTheme.header.calculatedBackground =
                this.getCalculatedColor(appConfig.appTheme.header.background, 70, 18);
            appConfig.appTheme.header.calculatedText =
                this.getCalculatedColor(appConfig.appTheme.header.text, 50, 27);
        },

        /**
         * This function is used to load application theme.
         * @param{object} application configuration
         * @memberOf utils/utils
         */
        loadApplicationTheme: function (appConfig) {
            var cssString, head, style, link, rgbColor;
            // if theme is configured
            if (appConfig.theme) {
                // Set the org theme for application
                this._setOrgTheme(appConfig);
                //Convert hex color to rgb and add opacity to get lighter shade of configured color
                rgbColor = new Color(appConfig.theme);
                rgbColor.a = 0.6;
                //substitute theme color values in theme template
                cssString = string.substitute(ThemeCss, {
                    /** Default theming */
                    SelectedThemeColor: appConfig.theme,
                    LighterShadeThemeColor: rgbColor,
                    HighlightedRowColor: appConfig.highlightRow,
                    /** Org Theming */
                    // Configured/Org colors for app theme
                    BodyBackgroundColor: appConfig.appTheme.body.background,
                    BodyTextColor: appConfig.appTheme.body.text,
                    HeaderBackgroundColor: appConfig.theme,
                    HeaderTextColor: appConfig.appTheme.header.text,
                    ButtonBackgroundColor: appConfig.appTheme.button.background,
                    ButtonTextColor: appConfig.appTheme.button.text,
                    // Calculated colors
                    CalculatedBodyBackgroundColor: appConfig.appTheme.body.calculatedBackground,
                    CalculatedBodyTextColor: appConfig.appTheme.body.calculatedText,
                    CalculatedHeaderBackgroundColor: appConfig.appTheme.header.calculatedBackground,
                    CalculatedHeaderTextColor: appConfig.appTheme.header.calculatedText
                });
                //Create Style using theme template and append it to head
                //On Lower versions of IE10 Style tag is read only so create theme using styleSheet.cssText
                if (dojo.isIE < 10) {
                    head = document.getElementsByTagName('head')[0];
                    style = document.createElement('style');
                    style.type = 'text/css';
                    style.styleSheet.cssText = cssString;
                    head.appendChild(style);
                } else {
                    domConstruct.create("style", { "type": "text/css", "innerHTML": cssString }, query("head")[0]);
                }
                // If application is loaded in RTL mode, change styles of required nodes
                if (appConfig.i18n.direction === "rtl") {
                    link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = "./css/rtl.css";
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
            }
        },

        /**
         * This function is used to get format of date
         * @param{string} type of date
         * @memberOf utils/utils
         */
        getDateFormat: function (type) {
            var obj = {};
            switch (type) {
            case "shortDate":
                obj.dateFormat = "MM/DD/YYYY";
                obj.showTime = false;
                return obj;
            case "shortDateLE":
                obj.dateFormat = "DD/MM/YYYY";
                obj.showTime = false;
                return obj;
            case "longMonthDayYear":
                obj.dateFormat = "MMMM DD, YYYY";
                obj.showTime = false;
                return obj;
            case "dayShortMonthYear":
                obj.dateFormat = "DD MMM YYYY";
                obj.showTime = false;
                return obj;
            case "longDate":
                obj.dateFormat = "dddd, MMMM DD, YYYY";
                obj.showTime = false;
                return obj;
            case "shortDateLongTime":
                obj.dateFormat = "MM/DD/YYYY h:mm:ss a";
                obj.showTime = true;
                return obj;
            case "shortDateLongTime24":
                obj.dateFormat = "M/DD/YYYY HH:mm:ss";
                obj.showTime = true;
                return obj;
            case "shortDateLELongTime24":
                obj.dateFormat = "D/M/YYYY HH:mm:ss";
                obj.showTime = true;
                return obj;
            case "shortDateLELongTime":
                obj.dateFormat = "DD/MM/YYYY h:mm:ss a";
                obj.showTime = true;
                return obj;
            case "shortDateShortTime":
                obj.dateFormat = "MM/DD/YYYY h:mm a";
                obj.showTime = true;
                return obj;
            case "shortDateLEShortTime":
                obj.dateFormat = "DD/MM/YYYY h:mm a";
                obj.showTime = true;
                return obj;
            case "shortDateShortTime24":
                obj.dateFormat = "MM/DD/YYYY HH:mm";
                obj.showTime = true;
                return obj;
            case "shortDateLEShortTime24":
                obj.dateFormat = "DD/MM/YYYY HH:mm";
                obj.showTime = true;
                return obj;
            case "longMonthYear":
                obj.dateFormat = "MMMM YYYY";
                obj.showTime = false;
                return obj;
            case "shortMonthYear":
                obj.dateFormat = "MMM YYYY";
                obj.showTime = false;
                return obj;
            case "year":
                obj.dateFormat = "YYYY";
                obj.showTime = false;
                return obj;
            default:
                obj.dateFormat = "MMMM DD, YYYY";
                obj.showTime = false;
                return obj;
            }
        },

        /**
         * This function is used to convert number to thousand separator
         * @param{integer} number that needs to be converted into thousand separator
         * @memberOf utils/utils
         */
        convertNumberToThousandSeparator: function (number, decimalPlace) {
            return numberformatter.format(number, { places: decimalPlace });
        },

        /**
         * To determine the android operating system
         * @returns {bool}
         * @memberOf utils/utils
         */
        isAndroid: function () {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("android") > -1;
        },

        /**
         * To determine the ios operating system
         * @returns {bool}
         * @memberOf utils/utils
         */
        isIos: function () {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("ipad") > -1;
        },

        /**
         * This function is used to get the calculated color from the configured color in org json
         * @returns {bool}
         * @memberOf utils/utils
         */
        getCalculatedColor: function (configuredColor, luminosityDifference, luminosity) {
            var calculatedColor, calculatedHexColor, configuredColorObject, configuredColorHSLObject;
            configuredColorObject = new Colors(configuredColor);
            configuredColorHSLObject = configuredColorObject.toHsl();
            if (configuredColorHSLObject.l < luminosityDifference) {
                calculatedColor = dojoxColor.fromHsl(configuredColorHSLObject.h,
                    configuredColorHSLObject.s, configuredColorHSLObject.l + luminosity);
            } else {
                calculatedColor = dojoxColor.fromHsl(configuredColorHSLObject.h,
                    configuredColorHSLObject.s, configuredColorHSLObject.l - luminosity);
            }
            calculatedHexColor = calculatedColor.toHex();
            return calculatedHexColor;
        }
    };
});