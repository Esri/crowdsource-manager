/*global define,location */
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
define({
    // Default configuration settings for the application. This is where you'll define things like a bing maps key,
    // default web map, default app color theme and more. These values can be overwritten by template configuration settings and url parameters.
    "appid": "",
    "webmap": "",
    "oauthappid": null, //"AFTKRmv16wj14N3z",
    // Group templates must support a group url parameter. This will contain the id of the group.
    "group": "4c4ea6122c1a4313bab674bc4d9cf83b",
    // Enter the url to the proxy if needed by the application. See the 'Using the proxy page' help topic for details
    // http://developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
    "proxyurl": "proxy.ashx",
    // Example of a template specific property. If your template had several color schemes
    // you could define the default here and setup configuration settings to allow users to choose a different
    // color theme.
    "theme": "#f26e1f",
    "bingKey": "", //Enter the url to your organizations bing maps key if you want to use bing basemaps
    // Defaults to arcgis.com. Set this value to your portal or organization host name.
    "sharinghost": location.protocol + "//" + "arcgis.com",
    "units": null,
    // If your applcation needs to edit feature layer fields set this value to true. When false the map will
    // be dreated with layers that are not set to editable which allows the FeatureLayer to load features optimally.
    "editable": false,
    "markerSymbol": "./images/esri-blue-pin-circle-26.png",
    "markerSymbolWidth": 26,
    "markerSymbolHeight": 26,
    "helperServices": {
        "geometry": {
            "url": "http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer"
        },
        "printTask": {
            "url": null
        },
        "elevationSync": {
            "url": null
        },
        "geocode": [{
            "url": null
        }]
    },
    // Value to used in place of null values
    "showNullValueAs": "",
    // Name of the application
    "applicationName": "",
    // Icon of the application
    "applicationIcon": "",
    // Favicon icon of the application
    "applicationFavicon": "/images/favicon.ico",
    // To set description field whether it needs to be displayed or not in web-map description area
    "webMapInfoDescription": true,
    // To set snippet field whether it needs to be displayed or not in web-map description area
    "webMapInfoSnippet": false,
    // To set owner field whether it needs to be displayed or not in web-map description area
    "webMapInfoOwner": true,
    // To set created field whether it needs to be displayed or not in web-map description area
    "webMapInfoCreated": false,
    // To set modified field whether it needs to be displayed or not in web-map description area
    "webMapInfoModified": false,
    // To set license info field whether it needs to be displayed or not in web-map description area
    "webMapInfoLicenseInfo": false,
    // To set access information field whether it needs to be displayed or not in web-map description area
    "webMapInfoAccessInformation": false,
    // To set tags field whether it needs to be displayed or not in web-map description area
    "webMapInfoTags": false,
    // To set views field whether it needs to be displayed or not in web-map description area
    "webMapInfoNumViews": false,
    // To set rating field whether it needs to be displayed or not in web-map description area
    "webMapInfoAvgRating": false,
    // To set title for help dialog
    "helpDialogTitle": "Help Page",
    // To set content for help dialog
    "helpDialogContent": "<p>Crowdsource Manager, a companion group template to Crowdsource Reporter, allows users within an organization to review problems or observations submitted through the Reporter application.</p>",
    // to set zoom level of map when single feature is selected
    "zoomLevel": 12,
    // to display comment table popup info
    "usePopupConfigurationForComment": true,
    // to set field of comment to fetch data from it
    "commentField": "LONG_TEXT",
    // to show non editable layers on selected web map
    "showNonEditableLayers": true,
    // to set the color of feature that is activated by selecting particular row
    "highlightRow": "#C8C8C8",
    // configurable message to indicate that user needs to select record to view the details panel
    "selectFeatureMessage": "Select a feature to get started",
    // To enable or disable filters, applied on the selected layer
    "enableFilter": true,
    // when image of attachment is not available it will get replaced by this default icon
    "defaultAttachmentIcon": "/images/default-attachment.png"
});
