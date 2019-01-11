{
    "values": {
        "group": "",
        "theme": "#f26e1f",
        "applicationName": "",
        "applicationIcon": "",
        "applicationFavicon": "/images/favicon.ico",
        "zoomLevel": 12,
        "basemapGroup": "",
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
        "showNonEditableLayers": false,
        "selectFeatureMessage": "Choose a report from the table or map.",
        "enableFilter": true,
        "helpDialogTitle": "Help",
        "helpDialogContent": "<p>Welcome to Crowdsource Manager! <\/p> <p>Use this application to review and update reports. To get started, choose a category and then choose a report from the table or map.<\/p> <p>The details of that report will load in the panel in the lower left corner of the screen. From this panel, you can also review images, charts, and other information associated with the selected report. Update the report details by clicking the pencil icon, or hold down the CTRL key while clicking multiple reports to open the batch editor.<\/p> <p>View the location of the report using the map in the lower right corner of the application.<\/p><p>Reports can be filtered by time or field values. If time filtering is enabled for your reports, a time slider will appear below the table. Drag the time slider handle(s) to show only reports from a specific time span in the map and table. If filtering based on field values is enabled for your reports, a filter icon will appear in the table header next to the name of the fields that can be used to filter the reports. Click the icon and specify which reports you'd like to see in the table and map.<\/p>",
        "popupTabText": "Info",
        "mediaTabText": "Media",
        "commentsTabText": "Comments",
        "showHelpIcon": false,
        "commentFormAttachmentSectionLabel": "Attachments",
        "popupFormAttachmentSectionLabel": "Attachments",
        "headerTextColor": "#fff",
        "bodyBackgroundColor": "#fff",
        "bodyTextColor": "#515151",
        "buttonBackgroundColor": "#fff",
        "buttonTextColor": "#f26e1f",
        "defaultDetailsTab": "Info",
        "showBaseMapGallery": false,
        "showLegend": false,
        "showPopupForNonEditableLayers": false,
        "enableEditingAttachments": false
    },
    "configurationSettings": [{
        "category": "<b>General</b>",
        "fields": [{
            "type": "paragraph",
            "value": "For more information on configuring this app, check out the <a href=\"http://links.esri.com/localgovernment/help/crowdsource-manager\" target=\"_blank\">Crowdsource Manager documentation<\/a>."
        }, {
            "label": "Select a group",
            "tooltip": "Choose a group that contains one or more maps containing layers of data to manage through your application.",
            "type": "group"
        }, {
            "label": "Application title",
            "tooltip": "Title displays in application header",
            "type": "string",
            "fieldName": "applicationName"
        }, {
            "label": "Greeting message",
            "tooltip": "Provide a message to display when no features are currently selected.",
            "type": "string",
            "fieldName": "selectFeatureMessage",
            "placeholder": "Choose a report from the table or map."
        }, {
            "type": "subcategory",
            "label": "Help"
        }, {
            "type": "conditional",
            "fieldName": "showHelpIcon",
            "label": "Enable the help window",
            "tooltip": "When disabled, the help window will not be accessible",
            "condition": false,
            "items": [{
                "type": "string",
                "fieldName": "helpDialogTitle",
                "label": "Help window title",
                "tooltip": "Text displayed at the top of the help window"
            }, {
                "type": "string",
                "fieldName": "helpDialogContent",
                "label": "Dialog content",
                "stringFieldOption": "richtext",
                "tooltip": "Text and graphics that will display in the help window."
            }]
        }]
    }, {
        "category": "<b>Theme</b>",
        "fields": [{
            "label": "Header text color",
            "tooltip": "Set header text color",
            "type": "color",
            "sharedThemeProperty": "header.text",
            "fieldName": "headerTextColor"
        }, {
            "label": "Header background color",
            "tooltip": "Set header background color",
            "type": "color",
            "fieldName": "theme",
            "sharedThemeProperty": "header.background"
        }, {
            "label": "Body text color",
            "tooltip": "Set body text color",
            "type": "color",
            "sharedThemeProperty": "body.text",
            "fieldName": "bodyTextColor"
        }, {
            "label": "Body background color",
            "tooltip": "Set body background color",
            "type": "color",
            "sharedThemeProperty": "body.background",
            "fieldName": "bodyBackgroundColor"
        }, {
            "label": "Button text color",
            "tooltip": "Set button text color",
            "type": "color",
            "sharedThemeProperty": "button.text",
            "fieldName": "buttonTextColor"
        }, {
            "label": "Button background color",
            "tooltip": "Set button background color",
            "type": "color",
            "sharedThemeProperty": "button.background",
            "fieldName": "buttonBackgroundColor"
        }, {
            "label": "Color of selected table rows",
            "tooltip": "Choose the color for highlighting selected rows in the table",
            "type": "color",
            "fieldName": "highlightRow"
        }, {
            "label": "Application logo",
            "tooltip": "Logo displays in top left corner of application. Image should be 48px tall.",
            "type": "string",
            "sharedThemeProperty": "logo.small",
            "fieldName": "applicationIcon",
            "placeHolder": "/images/app-icon.png"
        }, {
            "label": "Application favicon",
            "tooltip": "Icon to display in browser tabs",
            "type": "string",
            "fieldName": "applicationFavicon",
            "placeHolder": "/images/favicon.ico"
        }]
    }, {
        "category": "<b>Options</b>",
        "fields": [{
            "type": "subcategory",
            "label": "Reference layers"
        }, {
            "type": "paragraph",
            "value": "By default, Crowdsource Manager apps will show only one editable layer at a time. Optionally, choose to also display non-editable map layers for additional context."
        }, {
            "label": "Show reference layers",
            "tooltip": "Enable to show non-editable layers",
            "type": "boolean",
            "fieldName": "showNonEditableLayers"
        }, {
            "label": "Show popup for non-editable layers",
            "tooltip": "Enable to show popup for non-editable layers",
            "type": "boolean",
            "fieldName": "showPopupForNonEditableLayers"
        }, {
            "type": "subcategory",
            "label": "Zoom level"
        }, {
            "type": "paragraph",
            "value": "When a report is selected from the list, the map will pan and zoom to show the location of that report. Specify how near (larger number) or far (smaller number) the map should zoom relative to the ground."
        }, {
            "label": "Zoom level for selected report",
            "tooltip": "Specify how near (larger number) or far (smaller number) the map should zoom relative to the ground.",
            "type": "string",
            "fieldName": "zoomLevel"
        }, {
            "type": "subcategory",
            "label": "Map information"
        }, {
            "type": "paragraph",
            "value": "Select the item details elements that will be visible for each map:"
        }, {
            "label": "Description",
            "tooltip": "Enable to show webmap description",
            "type": "boolean",
            "fieldName": "webMapInfoDescription"
        }, {
            "label": "Short Summary",
            "tooltip": "Enable to show webmap summary",
            "type": "boolean",
            "fieldName": "webMapInfoSnippet"
        }, {
            "label": "Owner Name",
            "tooltip": "Enable to show webmap owner",
            "type": "boolean",
            "fieldName": "webMapInfoOwner"
        }, {
            "label": "Creation Date",
            "tooltip": "Enable to show webmap created date",
            "type": "boolean",
            "fieldName": "webMapInfoCreated"
        }, {
            "label": "Modification Date",
            "tooltip": "Enable to show webmap modified date",
            "type": "boolean",
            "fieldName": "webMapInfoModified"
        }, {
            "label": "Access and Use Constraints",
            "tooltip": "Enable to show webmap licensing information",
            "type": "boolean",
            "fieldName": "webMapInfoLicenseInfo"
        }, {
            "label": "Credits",
            "tooltip": "Enable to show webmap credits",
            "type": "boolean",
            "fieldName": "webMapInfoAccessInformation"
        }, {
            "label": "Tags",
            "tooltip": "Enable to show webmap tags",
            "type": "boolean",
            "fieldName": "webMapInfoTags"
        }, {
            "label": "Number of Views",
            "tooltip": "Enable to show webmap number of views",
            "type": "boolean",
            "fieldName": "webMapInfoNumViews"
        }, {
            "label": "Average Rating",
            "tooltip": "Enable to show webmap average rating",
            "type": "boolean",
            "fieldName": "webMapInfoAvgRating"
        }, {
            "type": "subcategory",
            "label": "Basemap Settings"
        }, {
            "label": "Show basemap gallery",
            "tooltip": "When disabled, basemap gallery toggle will not be displayed",
            "type": "conditional",
            "condition": false,
            "fieldName": "showBaseMapGallery",
            "items": [{
                "label": "Select basemap group",
                "tooltip": "Group displayed in the base map gallery",
                "type": "basemapgroup",
                "fieldName": "basemapGroup"
            }]
        }, {
            "type": "subcategory",
            "label": "Legend Settings"
        }, {
            "label": "Show Legend",
            "tooltip": "When disabled, legend button will not be displayed",
            "type": "boolean",
            "fieldName": "showLegend"
        }]
    }, {
        "category": "<b>Reports</b>",
        "fields": [{
            "type": "subcategory",
            "label": "Info tab"
        }, {
            "type": "paragraph",
            "value": "This tab displays the information for each report as it is <a href=\"http://links.esri.com/ArcGISOnline/Configurepop-ups\" target=\"_blank\">configured in the popup<\/a> for that layer. User can edit report attributes and view non-media attachments."
        }, {
            "label": "Tab label",
            "tooltip": "Tab label to display popup details, edit report attributes and view non-media attachments.",
            "type": "string",
            "fieldName": "popupTabText"
        }, {
            "type": "subcategory",
            "label": "Media tab"
        }, {
            "type": "paragraph",
            "value": "This tab displays images and charts associated with the currently selected report. This tab is only visible when the selected report contains at least one image <a href=\"http://links.esri.com/ArcGISOnline/AlterHostedService\" target=\"_blank\">attachment<\/a>, or <a href=\"http://links.esri.com/ArcGISOnline/Configurepop-ups/ShowImages\" target=\"_blank\">images<\/a> and <a href=\"http://links.esri.com/ArcGISOnline/Configurepop-ups/ShowCharts\" target=\"_blank\">charts<\/a> defined as part of the popup configuration."
        }, {
            "label": "Tab label",
            "tooltip": "Tab label to display image attachments and popup media.",
            "type": "string",
            "fieldName": "mediaTabText"
        }, {
            "type": "subcategory",
            "label": "Comments tab"
        }, {
            "type": "paragraph",
            "value": "This tab displays <a href=\"http://links.esri.com/localgovernment/relationshipclass\">related records<\/a> associated with the currently selected report. Users can toggle to an editing mode which is only visible when the selected report contains at least one visible related record."
        }, {
            "label": "Tab label",
            "tooltip": "Tab label for comments",
            "type": "string",
            "fieldName": "commentsTabText"
        },  {
            "label": "Header for attachment section of comment form",
            "tooltip": "Name to display on the comments form where supporting files can be attached to the comments. This section is only available when attachments are enabled on the related records layer.",
            "type": "string",
            "fieldName": "commentFormAttachmentSectionLabel"
        }, {
            "label": "Header for attachment section of popup form",
            "tooltip": "Name to display on the popup form where supporting files can be attached to the feature. This section is only available when attachments are enabled on the selected layer.",
            "type": "string",
            "fieldName": "popupFormAttachmentSectionLabel"
        }, {
            "type": "paragraph",
            "value": "Indicate how related records are displayed and edited: either by using a single field, or by using the <a href=\"http://links.esri.com/ArcGISOnline/Configurepop-ups\" target=\"_blank\">popup<\/a> defined for the table layer in the map."
        }, {
            "type": "conditional",
            "fieldName": "usePopupConfigurationForComment",
            "label": "Display related records using the popup configuration.",
            "tooltip": "Enable to display related records and the editing form based on the table layer's popup configuration instead of a single field. Fields that are marked editable in the popup will be editable in the application.",
            "condition": true,
            "items": [{
                "type": "paragraph",
                "value": "Name of a single field to display, regardless of the popup settings. This value is ignored if you choose to build the form using the popup configuration."
            },{
                "type": "string",
                "fieldName": "commentField",
                "label": "Name of a single field to display",
                "tooltip": "Only content from related tables that have this field will be accessible through the application."
            }]
        }, {
            "type": "options",
            "fieldName": "defaultDetailsTab",
            "tooltip": "Selected tab will be opened by default when a report is selected",
            "label": "Default selected tab:",
            "options": [{
                "label": "Info",
                "value": "Info"
            }, {
                "label": "Media",
                "value": "Media"
            }, {
                "label": "Comments",
                "value": "Comments"
            }]
        }, {
            "label": "Enable editing attachments",
            "tooltip": "When enabled, attachment of info & comment tab could be edited",
            "type": "boolean",
            "fieldName": "enableEditingAttachments"
        }]
    }, {
        "category": "<b>Filters</b>",
        "fields": [{
            "type": "paragraph",
            "value": "Attribute filters that use the option to 'Ask For Values' and the time slider will be exposed in Crowdsource Manager when they have been configured on layers in the map."
        }, {
            "type": "paragraph",
            "value": "By default, the application will honor the initial values of these filters. If you use several of these filters, that may mean that no features are visible when your application loads. Optionally, uncheck the following parameter to choose to ignore the default filter and time slider values when the app loads. Users of the application will be able to choose the filter values they would like to apply. and let your users apply the filters as necessary. Crowdsource Manager apps will always honor static filters on your map layers."
        }, {
            "label": "Apply default filters automatically",
            "tooltip": "Enable to load the application with the default values of all dynamic filters applied.",
            "type": "boolean",
            "fieldName": "enableFilter"
        }]
    }]
}