{
    "configurationSettings": [{
        "category": "<b>Configure template</b>",
        "fields": [{
            "type": "webmap"
        }, {
            "placeHolder": "Defaults to map owner",
            "label": "Owner Text:",
            "fieldName": "owner",
            "type": "string",
            "tooltip": "Defaults to map owner"
        }, {
            "type": "string",
            "fieldName": "theme",
            "tooltip": "Color theme to use",
            "label": "Color Scheme:",
            "options": [{
                "label": "Chrome",
                "value": "chrome"
            }, {
                "label": "Seaside",
                "value": "seaside"
            }, {
                "label": "Pavement",
                "value": "pavement"
            }]
        }]
    }, {
        "category": "<b>Header Settings</b>",
        "fields": [{
            "type": "string",
            "fieldName": "applicationName",
            "label": "Title",
            "tooltip": "Application title (max 27 chars)"
        }, {
            "label": "Icon URL",
            "fieldName": "applicationIcon",
            "type": "string",
            "tooltip": "Icon in top left corner of application. Icon should be 48px high."
        }, {
            "type": "color",
            "fieldName": "theme",
            "tooltip": "Application color theme",
            "label": "Color Scheme"
        }]
    }, {
        "category": "<b>Group and Map Settings</b>",
        "fields": [{
            "type": "group",
            "label": "Select group",
            "tooltip": "Group displayed in the application"
        }, {
            "type": "string",
            "fieldName": "zoomLevel",
            "label": "Zoom Level",
            "tooltip": "Configure zoom level"
        }, {
            "type": "string",
            "fieldName": "commentField",
            "label": "Comment Field (optional)",
            "tooltip": "Text field in the comments tables that stores feedback. Field name must be the same across all layers and maps."
        }, {
            "type": "boolean",
            "fieldName": "usePopupConfigurationForComment",
            "label": "Use comment table popup configuration",
            "tooltip": "Enable to display a comment submission form based on the popup configuration for the comments layer instead of a single field for comment entry"
        }, {
            "type": "paragraph",
            "value": "Choose the map information to display:"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoDescription",
            "label": "Description",
            "tooltip": "Enable to show webmap description"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoSnippet",
            "label": "Short Summary",
            "tooltip": "Enable to show webmap summary"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoOwner",
            "label": "Owner Name",
            "tooltip": "Enable to show webmap owner"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoCreated",
            "label": "Creation Date",
            "tooltip": "Enable to show webmap created date"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoModified",
            "label": "Modification Date",
            "tooltip": "Enable to show webmap modified date"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoLicenseInfo",
            "label": "Access and Use Constraints",
            "tooltip": "Enable to show webmap licensing information"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoAccessInformation",
            "label": "Credits",
            "tooltip": "Enable to show webmap credits"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoTags",
            "label": "Tags",
            "tooltip": "Enable to show webmap tags"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoNumViews",
            "label": "Number of Views",
            "tooltip": "Enable to show webmap number of views"
        }, {
            "type": "boolean",
            "fieldName": "webMapInfoAvgRating",
            "label": "Average Rating",
            "tooltip": "Enable to show webmap average rating"
        }, {
            "type": "boolean",
            "fieldName": "showNonEditableLayers",
            "label": "Show Non Editable Layers",
            "tooltip": "Enable to show non editable layers on map"
        }, {
            "type": "string",
            "fieldName": "selectFeatureMessage",
            "label": "Details panel message",
            "tooltip": "This message is displayed in details panel when no feature is selected in data viewer"
        }, {
            "type": "boolean",
            "fieldName": "enableFilter",
            "label": "Show filters with default value",
            "tooltip": "If this field is true default value of filters will be displayed else empty values will be displayed"
        }],
        "values": {
            "group": "d3e11b4398984ec481d3ae9bde0d2810",
            "theme": "#d15706",
            "applicationName": "",
            "applicationIcon": "",
            "applicationFavicon": "",
            "zoomLevel": 12,
            "commentField": "COMMENTS",
            "usePopupConfigurationForComment": false,
            "webMapInfoDescription": true,
            "webMapInfoSnippet": false,
            "webMapInfoOwner": true,
            "webMapInfoCreated": false,
            "webMapInfoModified": false,
            "webMapInfoLicenseInfo": false,
            "webMapInfoAccessInformation": false,
            "webMapInfoTags": false,
            "webMapInfoNumViews": false,
            "webMapInfoAvgRating": false,
            "selectFeatureMessage": "Select a feature to get started",
            "enableFilter": true
        }
    }]
}