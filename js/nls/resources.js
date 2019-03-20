/*global define */
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
    root: ({
        map: {
            error: "Unable to create map",
            licenseError: {
                message: "Your account is not licensed to use Configurable Apps that are not public. Please ask your organization administrator to assign you a user type that includes Essential Apps or an add-on Essential Apps license.",
                title: "Not Licensed"
            }
        },
        webMapList: {
            owner: "Owner", // Appears in web-map list description panel when it is set to true
            created: "Date created", // Appears in web-map list description panel when it is set to true
            modified: "Date modified", // Appears in web-map list description panel when it is set to true
            description: "Description", // Appears in web-map list description panel when it is set to true
            snippet: "Summary", // Appears in web-map list description panel when it is set to true
            licenseInfo: "Access and use constraints", // Appears in web-map list description panel when it is set to true
            accessInformation: "Credits", // Appears in web-map list description panel when it is set to true
            tags: "Tags", // Appears in web-map list description panel when it is set to true
            numViews: "Number of views", // Appears in web-map list description panel when it is set to true
            avgRating: "Rating", // Appears in web-map list description panel when it is set to true
            noWebMapInGroup: "Configured group is invalid or no items have been shared with this group yet", // Appears when invalid group in configured or no web-map is available in that group
            infoBtnToolTip: "Map information", // Display tool-tip on command button to display description of web-map
            openWebmapList: "Open panel", //tooltip for toggle button
            closeWebmapList: "Close panel" //tooltip for toggle button
        },
        geoform: {
            enterInformation: "Details", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Attachments", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Browse", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Location", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Submit", // Command button to submit the geoform to report an issue
            cancelButton: "Cancel", //Command button to close the geoform
            requiredField: "(required)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Select&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Please enter valid value.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Layer fields are not configured to capture data", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Please enter an integer", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Please enter an integer", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Please provide values for all required fields", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Please select the location for your report", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum value ${minValue} and maximum value ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum date ${minValue} and Maximum date ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Report could not be submitted.", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "attachment(s) selected", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} of ${total} attachment(s) failed to upload.", // Shown when there is error while uploading the attachment, while submitting the geoform
            attachmentDeleteStatus: "${failed} of ${total} attachment(s) failed to delete.", // Shown when there is error while deleting the attachments, while updating the feature/comment
            featureUpdateStatus: "${failed} of ${total} feature(s) failed to update.", // Shown when there is error while updating the features
            geoLocationError: "Current location not available", // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Current location is out of basemap extent", // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Save", // Command button to open the geoform
            cancelButtonTooltip: "Cancel", //tooltip for cancel button
            geoformBackButtonTooltip: "Return to the report list", //tooltip for Geoform back button
            updateFeaturesConfirmationMsg: "${count} features will be updated", //confirmation message to be displayed before updating the features
            attachmentHeaderText: "Attachments", //attachment header Text
            unknownPopupAttachment: "FILE", // displayed for attached file having unknown extension
            unableToEditPopupMessage: "You do not have permission to perform this action.", // to display message when unauthorized user tries to edit the popup info
            invalidFeatureCreatorMessage: "You are not authorized to edit this feature.", // Displayed when "editors can only edit" option is true and user cannot edit the feature
            userSpecificFeatureUpdateMessage: "Only features created by ${username} have been updated.",
            anonymousUserText: "Anonymous"
        },
        mapViewer: {
            zoomInToolTip: "Zoom in", // Display tool-tip on command button to zoom in map
            zoomOutToolTip: "Zoom out" // Display tool-tip on command button to zoom out map
        },
        applicationHeader: {
            signInOption: "Sign In", // Appears when user has not signed in
            signOutOption: "Sign Out", // Appears when user has not signed in
            pleaseSignInText: "Please sign in" // Appears when user needs to sign-in into the application
        },
        dataviewer: {
            noIssuesReported: "No reports available", // Appears when no issues are available in current extent
            noFeatureGeometry: "Feature cannot be displayed", // Appears when user selects/activates a feature and geometry is available for that
            ascendingFlagTitle: "Sort in ascending order", // Appears as a label for Ascending flag as a sorting option
            descendingFlagTitle: "Sort in descending order", // Appears as a label for Descending flag as a sorting option
            filterLabel: "Filter", // Appears as a label for Filter container
            valueRadioButtonLabel: "Value", // Appears as a label for 'Value' radio button in filter container
            uniqueRadioButtonLabel: "Unique", // Appears as a label for 'Unique' radio button in filter container
            selectLayerToBegin: "Select a category to get started", // for showing default message on application load
            layerFeatureCount: "${selectedFeatureCount} selected / ${featureCount} records", // Appears beside operational layer name to display count of total & selected feature
            exportToCsvSuccessMessage: "CSV file exported successfully.", // Displayed when export to csv is completed
            exportToCsvErrorMessage: "Error while exporting selected features to CSV file. Please try again.", // Displayed when error occurs while exporting data to csv
            exportToCSVButtonTooltip: "Export to CSV" // Displayed as a tooltip for export to CSV button
        },
        timeSlider: {
            timeSliderLabel: "Time range", // Appears beside time slider widget
            timeSliderInEditModeAlert: "Time slider unavailable while editing" // Displayed when user tries to change time-slider in edit mode
        },
        comment: {
            commentsFormSubmitButton: "Save", // Displayed on submit button to display comments
            commentsFormCancelButton: "Cancel", // Displayed on cancel button to cancel comments
            errorInSubmittingComment: "Edits could not be saved.", // Shown when user is unable to add comments
            emptyCommentMessage: "Value required", // Shown when user submits a comment without any text/character
            placeHolderText: "", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "No records available", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} character(s) remain", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No", // Shown when comments character limit is exceeded
            selectAttachments: "Attachments", // Appears above 'Select file' button indicating option to attach files while adding comments
            selectFileText: "Browse", // Command button to open a dialog box to select file(s) to be attached
            attachmentSelectedMsg: "attachment(s) selected", // Shown besides the select file button indicating the number of files attached
            attachmentHeaderText: "Attachments", //attachment header Text
            addRecordText: "Add Record", // shown to add record in comments tab under details panel
            unknownCommentAttachment: "FILE", // displayed for attached file having unknown extension
            unableToAddOrEditCommentMessage: "You do not have permission to perform this action." // to display message when unauthorized user tries to add/edit the comment
        },
        main: {
            noGroup: "No group configured", // Appears when no group is configured
            basemapGalleryText: "Basemap Gallery", // Basemap gallery text
            legendText: "Legend", //Legend text
            featureNotFoundMessage: "Requested feature not found" //Message displayed when feature is not found
        },
        search: {
            searchIconTooltip: "Search this layer", // Displayed on hover of search icon
            noResultFoundText: "No results found", // Displayed when no results are found after search
            searchInEditModeAlert: "Search unavailable while editing" // Displayed when no results are found after search
        },
        manualRefresh: {
            manualRefreshIconTooltip: "Refresh", // Displayed on hover of manual refresh icon
            confirmManualRefreshText: "All selections and unsaved changes will be discarded" // Appears when user wants to do manual refresh
        },
        help: {
            helpIconTooltip: "Help" // Displayed on hover of manual refresh icon
        },
        filter: {
            noFeatureFoundText: "No feature found for this value.", // Displayed when no feature is found after applying filter
            distinctQueryFailed: "No distinct values found for the field.", // Displayed when query fails while fetching distinct values in filter unique value section
            andText: "and", // Displayed in filter UI when "is between" case is applied to its field
            filterInEditModeAlert: "Filters unavailable while editing.", // Displayed when user tries to applies filter in edit mode
            dropdownSelectOption: "Select", // Displayed as a first option in a filter dropdown
            filterInShowSelectedEditModeAlert: "Filters unavailable in 'Show Selected' mode." // Displayed when user tries to applies filter in 'Show Selected' mode
        },
        detailsPanel: {
            editContentText: "Edit record" // Displayed on hover of edit toggle button
        },
        signOutPage: {
            signOutMessage: "You've been successfully signed out", // Appears when user is successfully signed-out from application
            reSignInMessage: "Click here to sign in" // Appears when user is signed-out from application and wants to sign-in again
        },
        selectionOptions: {
            selectionOptionsIconTooltip: "Selection Options", // Displayed on hover of selection options icon
            showAllOptionText: "Show All", // Displayed as a option in list of selection options
            showSelectedOptionText: "Show Selected" // Displayed as a option in list of selection options
        }
    }),
    "ar": 1,
    "bs": 1,
    "ca": 1,
    "cs": 1,
    "da": 1,
    "de": 1,
    "el": 1,
    "es": 1,
    "et": 1,
    "fi": 1,
    "fr": 1,
    "he": 1,
    "hi": 1,
    "hr": 1,
    "hu": 1,
    "id": 1,
    "it": 1,
    "ja": 1,
    "ko": 1,
    "lt": 1,
    "lv": 1,
    "nb": 1,
    "nl": 1,
    "pl": 1,
    "pt-br": 1,
    "pt-pt": 1,
    "ro": 1,
    "ru": 1,
    "sl": 1,
    "sr": 1,
    "sv": 1,
    "th": 1,
    "tr": 1,
    "uk": 1,
    "vi": 1,
    "zh-cn": 1,
    "zh-hk": 1,
    "zh-tw": 1
});