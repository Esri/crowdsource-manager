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
            error: "Unable to create map"
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
            openWebmapList: "Open Map/Layer selection panel", //tooltip for toggle button
            closeWebmapList: "Close Map/Layer selection panel" //tooltip for toggle button
        },
        geoform: {
            enterInformation: "Details", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Attachments", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Browse", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Location", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Report It", // Command button to submit the geoform to report an issue
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
            numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Report could not be submitted", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "attachment(s) selected", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} of ${total} attachment(s) failed to upload", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Current location not available", // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Current location is out of basemap extent", // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Save", // Command button to open the geoform
            cancelButtonTooltip: "Cancel", //tooltip for cancel button
            geoformBackButtonTooltip: "Go to the report list", //tooltip for Geoform back button
            updateFeaturesConfirmationMsg: "${count} features will be updated", //confirmation essage to be displayed before updating the features
            attachmentHeaderText: "Attachments"//attachment header Text
        },
        mapViewer: {
            zoomInToolTip: "Zoom in", // Display tool-tip on command button to zoom in map
            zoomOutToolTip: "Zoom out" // Display tool-tip on command button to zoom out map
        },
        dataviewer: {
            noIssuesReported: "No reports available", // Appears when no issues are available in current extent
            noFeatureGeometry: "Feature cannot be displayed", // Appears when user selects/activates a feature and geometry is available for that
            ascendingFlagTitle: "Sort in ascending order", // Appears as a label for Ascending flag as a sorting option
            descendingFlagTitle: "Sort in descending order", // Appears as a label for Descending flag as a sorting option
            filterLabel: "Filter", // Appears as a label for Filter container
            valueRadioButtonLabel: "Value", // Appears as a label for 'Value' radio button in filter container
            uniqueRadioButtonLabel: "Unique", // Appears as a label for 'Unique' radio button in filter container
            selectLayerToBegin: "Please select a layer to begin with" // for showing default message on application load
        },
        timeSlider: {
            timeSliderLabel: "Time range" // Appears beside time slider widget
        },
        comment: {
            commentsFormSubmitButton: "Save", // Displayed on submit button to display comments
            commentsFormCancelButton: "Cancel", // Displayed on cancel button to cancel comments
            errorInSubmittingComment: "Comment could not be submitted.", // Shown when user is unable to add comments
            emptyCommentMessage: "Please enter a comment.", // Shown when user submits a comment without any text/character
            placeHolderText: "Type a comment", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "No comments available", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} character(s) remain", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No" // Shown when comments character limit is exceeded
        },
        main: {
            noGroup: "No group configured" // Appears when no group is configured
        },
        search: {
            searchIconTooltip: "Search this layer",
            noResultFoundText: "No results found"
        },
        manualRefresh: {
            manualRefreshIconTooltip: "Refresh",
            confirmManualRefeshText: "All selections and unsaved changes will be discarded" // Appears when user wants to do manual refresh
        },
        help: {
            helpIconTooltip: "Help"
        },
        mediaTab: {
            noFeatureAvailabe: "No Media Content available"
        },
        filter: {
            noFeatureFoundText: "No feature found for this input value.",
            distinctQueryFalied: "No distinct values found for the field."
        },
        detailsPanel: {
            popupTabText: "Popup", // Display on popup tab text
            mediaTabText: "Media", // Display on media tab text
            commentsTabText: "Comments" // Display on comments tab text
        }
    }),
    "fr": 1,
    "he": 1
});