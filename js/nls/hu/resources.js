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
            error: "Nem sikerült létrehozni a térképet"
        },
        webMapList: {
            owner: "Tulajdonos", // Appears in web-map list description panel when it is set to true
            created: "Létrehozás dátuma", // Appears in web-map list description panel when it is set to true
            modified: "Módosítás dátuma", // Appears in web-map list description panel when it is set to true
            description: "Leírás", // Appears in web-map list description panel when it is set to true
            snippet: "Összefoglalás", // Appears in web-map list description panel when it is set to true
            licenseInfo: "Hozzáférési és használati korlátozások", // Appears in web-map list description panel when it is set to true
            accessInformation: "Kreditek", // Appears in web-map list description panel when it is set to true
            tags: "Címkék", // Appears in web-map list description panel when it is set to true
            numViews: "Megtekintések száma", // Appears in web-map list description panel when it is set to true
            avgRating: "Értékelés", // Appears in web-map list description panel when it is set to true
            noWebMapInGroup: "A konfigurált csoport érvénytelen, vagy még nincsenek megosztva elemek ezzel a csoporttal", // Appears when invalid group in configured or no web-map is available in that group
            infoBtnToolTip: "Térkép adatai", // Display tool-tip on command button to display description of web-map
            openWebmapList: "Panel megnyitása", //tooltip for toggle button
            closeWebmapList: "Panel bezárása" //tooltip for toggle button
        },
        geoform: {
            enterInformation: "Részletek", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Csatolmányok", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Tallózás", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Hely", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Beküldés", // Command button to submit the geoform to report an issue
            cancelButton: "Mégse", //Command button to close the geoform
            requiredField: "(kötelező)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Kiválasztás&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Adjon meg érvényes értéket.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "A réteg mezői nincsenek konfigurálva adatok rögzítésére", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Adjon meg egy egész számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Adjon meg egy egész számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Adjon meg egy számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Adjon meg egy számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Adjon meg értéket minden kötelező mezőben", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Válasszon helyet a jelentés számára", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Tipp:${closeStrong} ${minValue} minimális érték és ${maxValue} maximális érték", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Tipp:${closeStrong} ${minValue} minimális dátum és ${maxValue} maximális dátum", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Nem sikerült elküldeni a jelentést", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "csatolmány kiválasztva", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} csatolmányt nem sikerült feltölteni (összesen: ${total})", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Az aktuális hely nem érhető el", // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Az aktuális hely az alaptérkép kiterjedésén kívül van", // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Mentés", // Command button to open the geoform
            cancelButtonTooltip: "Mégse", //tooltip for cancel button
            geoformBackButtonTooltip: "Vissza a jelentéslistához", //tooltip for Geoform back button
            updateFeaturesConfirmationMsg: "${count} vektoros elem lesz frissítve", //confirmation message to be displayed before updating the features
            attachmentHeaderText: "Csatolmányok", //attachment header Text
            unknownPopupAttachment: "FÁJL", // displayed for attached file having unknown extension
            unableToEditPopupMessage: "Nincs engedélye a művelet végrehajtására." // to display message when unauthorized user tries to edit the popup info
        },
        mapViewer: {
            zoomInToolTip: "Nagyítás", // Display tool-tip on command button to zoom in map
            zoomOutToolTip: "Kicsinyítés" // Display tool-tip on command button to zoom out map
        },
        applicationHeader: {
            signInOption: "Bejelentkezés", // Appears when user has not signed in
            signOutOption: "Kijelentkezés", // Appears when user has not signed in
            pleaseSignInText: "Jelentkezzen be" // Appears when user needs to sign-in into the application
        },
        dataviewer: {
            noIssuesReported: "Nincsenek elérhető jelentések", // Appears when no issues are available in current extent
            noFeatureGeometry: "A vektoros elem nem jeleníthető meg", // Appears when user selects/activates a feature and geometry is available for that
            ascendingFlagTitle: "Rendezés növekvő sorrendben", // Appears as a label for Ascending flag as a sorting option
            descendingFlagTitle: "Rendezés csökkenő sorrendben", // Appears as a label for Descending flag as a sorting option
            filterLabel: "Szűrő", // Appears as a label for Filter container
            valueRadioButtonLabel: "Érték", // Appears as a label for 'Value' radio button in filter container
            uniqueRadioButtonLabel: "Egyedi", // Appears as a label for 'Unique' radio button in filter container
            selectLayerToBegin: "Válasszon ki egy kategóriát a kezdéshez", // for showing default message on application load
            layerFeatureCount: "${selectedFeatureCount} kiválasztva / ${featureCount} rekord" // Appears beside operational layer name to display count of total & selected feature
        },
        timeSlider: {
            timeSliderLabel: "Időtartomány", // Appears beside time slider widget
            timeSliderInEditModeAlert: "Az Idő csúszka szerkesztés közben nem érhető el" // Displayed when user tries to change time-slider in edit mode
        },
        comment: {
            commentsFormSubmitButton: "Mentés", // Displayed on submit button to display comments
            commentsFormCancelButton: "Mégse", // Displayed on cancel button to cancel comments
            errorInSubmittingComment: "Nem sikerült menteni a módosításokat.", // Shown when user is unable to add comments
            emptyCommentMessage: "Értéket kell megadni", // Shown when user submits a comment without any text/character
            placeHolderText: "", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nincsenek elérhető rekordok", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} karakter maradt", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nem", // Shown when comments character limit is exceeded
            selectAttachments: "Csatolmányok", // Appears above 'Select file' button indicating option to attach files while adding comments
            selectFileText: "Tallózás", // Command button to open a dialog box to select file(s) to be attached
            attachmentSelectedMsg: "csatolmány kiválasztva", // Shown besides the select file button indicating the number of files attached
            attachmentHeaderText: "Csatolmányok", //attachment header Text
            addRecordText: "Rekord hozzáadása", // shown to add record in comments tab under details panel
            unknownCommentAttachment: "FÁJL", // displayed for attached file having unknown extension
            unableToAddOrEditCommentMessage: "Nincs engedélye a művelet végrehajtására." // to display message when unauthorized user tries to add/edit the comment
        },
        main: {
            noGroup: "Nincs konfigurálva csoport", // Appears when no group is configured
            basemapGalleryText: "Alaptérkép-galéria", // Basemap gallery text
            legendText: "Jelmagyarázat", //Legend text
            featureNotFoundMessage: "A kért vektoros elem nem található" //Message displayed when feature is not found
        },
        search: {
            searchIconTooltip: "Keresés a rétegben", // Displayed on hover of search icon
            noResultFoundText: "Nincs találat", // Displayed when no results are found after search
            searchInEditModeAlert: "A keresés szerkesztés közben nem érhető el" // Displayed when no results are found after search
        },
        manualRefresh: {
            manualRefreshIconTooltip: "Frissítés", // Displayed on hover of manual refresh icon
            confirmManualRefreshText: "Minden kijelölés és nem mentett módosítás figyelmen kívül lesz hagyva" // Appears when user wants to do manual refresh
        },
        help: {
            helpIconTooltip: "Súgó" // Displayed on hover of manual refresh icon
        },
        filter: {
            noFeatureFoundText: "Nem található vektoros elem ehhez az értékhez.", // Displayed when no feature is found after applying filter
            distinctQueryFailed: "Nincsenek egyedi értékek a mezőhöz.", // Displayed when query fails while fetching distinct values in filter unique value section
            andText: "és", // Displayed in filter UI when "is between" case is applied to its field
            filterInEditModeAlert: "A szűrők szerkesztés közben nem érhetők el.", // Displayed when user tries to applies filter in edit mode
            dropdownSelectOption: "Kiválasztás", // Displayed as a first option in a filter dropdown
            filterInShowSelectedEditModeAlert: "A szűrők a „Kiválasztott elemek megjelenítése” módban nem érhetők el." // Displayed when user tries to applies filter in 'Show Selected' mode
        },
        detailsPanel: {
            editContentText: "Rekord szerkesztése" // Displayed on hover of edit toggle button
        },
        signOutPage: {
            signOutMessage: "Sikeresen kijelentkezett", // Appears when user is successfully signed-out from application
            reSignInMessage: "Kattintson ide a bejelentkezéshez" // Appears when user is signed-out from application and wants to sign-in again
        },
        selectionOptions: {
            selectionOptionsIconTooltip: "Kiválasztási beállítások", // Displayed on hover of selection options icon
            showAllOptionText: "Összes megjelenítése", // Displayed as a option in list of selection options
            showSelectedOptionText: "Kiválasztott elemek megjelenítése" // Displayed as a option in list of selection options
        }
    }),
    "ar": 1,
    "bs": 1,
    "ca": 0,
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
    "hu": 0,
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
    "vi": 1,
    "zh-cn": 1,
    "zh-hk": 1,
    "zh-tw": 1
});