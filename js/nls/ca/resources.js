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
            error: "No es pot crear el mapa"
        },
        webMapList: {
            owner: "Propietari", // Appears in web-map list description panel when it is set to true
            created: "Data de creació", // Appears in web-map list description panel when it is set to true
            modified: "Data de modificació", // Appears in web-map list description panel when it is set to true
            description: "Descripció", // Appears in web-map list description panel when it is set to true
            snippet: "Resum", // Appears in web-map list description panel when it is set to true
            licenseInfo: "Restriccions d\'ús i d\'accés", // Appears in web-map list description panel when it is set to true
            accessInformation: "Crèdits", // Appears in web-map list description panel when it is set to true
            tags: "Etiquetes", // Appears in web-map list description panel when it is set to true
            numViews: "Nombre de visualitzacions", // Appears in web-map list description panel when it is set to true
            avgRating: "Qualificació", // Appears in web-map list description panel when it is set to true
            noWebMapInGroup: "El grup que s\'ha configurat no és vàlid o no s\'ha compartit cap element amb aquest grup encara", // Appears when invalid group in configured or no web-map is available in that group
            infoBtnToolTip: "Informació del mapa", // Display tool-tip on command button to display description of web-map
            openWebmapList: "Obre la subfinestra", //tooltip for toggle button
            closeWebmapList: "Tanca la subfinestra" //tooltip for toggle button
        },
        geoform: {
            enterInformation: "Detalls", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Fitxers adjunts", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Navega", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Ubicació", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Envia", // Command button to submit the geoform to report an issue
            cancelButton: "Cancel·la", //Command button to close the geoform
            requiredField: "(obligatori)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Selecciona&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Introduïu un valor vàlid.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Els camps de la capa no estan configurats per capturar dades", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Introduïu un enter", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Introduïu un enter", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Introduïu un nombre", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Introduïu un nombre", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Proporcioneu valors per a tots els camps obligatoris", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Seleccioneu la ubicació per a l\'informe", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Suggeriment:${closeStrong} valor mínim ${minValue} i valor màxim ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Suggeriment:${closeStrong} data mínima ${minValue} i data màxima ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "L\'informe no s\'ha pogut enviar", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "fitxers adjunts seleccionats", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "No s\'han pogut pujar ${failed} de ${total} fitxers adjunts", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Ubicació actual no disponible", // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "La ubicació actual està fora de l\'extensió del mapa base", // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Desa", // Command button to open the geoform
            cancelButtonTooltip: "Cancel·la", //tooltip for cancel button
            geoformBackButtonTooltip: "Torna a la llista d\'informes", //tooltip for Geoform back button
            updateFeaturesConfirmationMsg: "${count} entitats s\'actualitzaran", //confirmation message to be displayed before updating the features
            attachmentHeaderText: "Fitxers adjunts", //attachment header Text
            unknownPopupAttachment: "FILE", // displayed for attached file having unknown extension
            unableToEditPopupMessage: "No teniu permís per fer aquesta acció." // to display message when unauthorized user tries to edit the popup info
        },
        mapViewer: {
            zoomInToolTip: "Amplia", // Display tool-tip on command button to zoom in map
            zoomOutToolTip: "Redueix" // Display tool-tip on command button to zoom out map
        },
        applicationHeader: {
            signInOption: "Inicia la sessió", // Appears when user has not signed in
            signOutOption: "Tanca la sessió", // Appears when user has not signed in
            pleaseSignInText: "Inicieu la sessió" // Appears when user needs to sign-in into the application
        },
        dataviewer: {
            noIssuesReported: "No hi ha cap informe disponible", // Appears when no issues are available in current extent
            noFeatureGeometry: "L\'entitat no es pot mostrar", // Appears when user selects/activates a feature and geometry is available for that
            ascendingFlagTitle: "Ordena en ordre ascendent", // Appears as a label for Ascending flag as a sorting option
            descendingFlagTitle: "Ordena en ordre descendent", // Appears as a label for Descending flag as a sorting option
            filterLabel: "Filtre", // Appears as a label for Filter container
            valueRadioButtonLabel: "Valor", // Appears as a label for 'Value' radio button in filter container
            uniqueRadioButtonLabel: "Únic", // Appears as a label for 'Unique' radio button in filter container
            selectLayerToBegin: "Seleccioneu una categoria per començar", // for showing default message on application load
            layerFeatureCount: "${selectedFeatureCount} seleccionades/${featureCount} registres" // Appears beside operational layer name to display count of total & selected feature
        },
        timeSlider: {
            timeSliderLabel: "Interval de temps", // Appears beside time slider widget
            timeSliderInEditModeAlert: "El control lliscant de temps no està disponible durant l\'edició" // Displayed when user tries to change time-slider in edit mode
        },
        comment: {
            commentsFormSubmitButton: "Desa", // Displayed on submit button to display comments
            commentsFormCancelButton: "Cancel·la", // Displayed on cancel button to cancel comments
            errorInSubmittingComment: "Els canvis no s\'han pogut desar.", // Shown when user is unable to add comments
            emptyCommentMessage: "Valor necessari", // Shown when user submits a comment without any text/character
            placeHolderText: "", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "No hi ha cap registre disponible", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caràcters restants", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No", // Shown when comments character limit is exceeded
            selectAttachments: "Fitxers adjunts", // Appears above 'Select file' button indicating option to attach files while adding comments
            selectFileText: "Navega", // Command button to open a dialog box to select file(s) to be attached
            attachmentSelectedMsg: "fitxers adjunts seleccionats", // Shown besides the select file button indicating the number of files attached
            attachmentHeaderText: "Fitxers adjunts", //attachment header Text
            addRecordText: "Afegeix un registre", // shown to add record in comments tab under details panel
            unknownCommentAttachment: "FILE", // displayed for attached file having unknown extension
            unableToAddOrEditCommentMessage: "No teniu permís per fer aquesta acció." // to display message when unauthorized user tries to add/edit the comment
        },
        main: {
            noGroup: "No hi ha cap grup configurat", // Appears when no group is configured
            basemapGalleryText: "Galeria de mapes base", // Basemap gallery text
            legendText: "Llegenda", //Legend text
            featureNotFoundMessage: "L\'entitat sol·licitada no s\'ha trobat" //Message displayed when feature is not found
        },
        search: {
            searchIconTooltip: "Cerca en aquesta capa", // Displayed on hover of search icon
            noResultFoundText: "No s\'ha trobat cap resultat", // Displayed when no results are found after search
            searchInEditModeAlert: "La cerca no està disponible durant l\'edició" // Displayed when no results are found after search
        },
        manualRefresh: {
            manualRefreshIconTooltip: "Actualitza", // Displayed on hover of manual refresh icon
            confirmManualRefreshText: "Es descartaran totes les seleccions i els canvis sense desar" // Appears when user wants to do manual refresh
        },
        help: {
            helpIconTooltip: "Ajuda" // Displayed on hover of manual refresh icon
        },
        filter: {
            noFeatureFoundText: "No s\'ha trobat cap entitat per a aquest valor.", // Displayed when no feature is found after applying filter
            distinctQueryFailed: "No s\'ha trobat cap valor diferenciat per al camp.", // Displayed when query fails while fetching distinct values in filter unique value section
            andText: "i", // Displayed in filter UI when "is between" case is applied to its field
            filterInEditModeAlert: "Els filtres no estan disponibles durant l\'edició.", // Displayed when user tries to applies filter in edit mode
            dropdownSelectOption: "Selecciona", // Displayed as a first option in a filter dropdown
            filterInShowSelectedEditModeAlert: "Els filtres no estan disponibles en el mode \"Mostra els seleccionats\"." // Displayed when user tries to applies filter in 'Show Selected' mode
        },
        detailsPanel: {
            editContentText: "Edita el registre" // Displayed on hover of edit toggle button
        },
        signOutPage: {
            signOutMessage: "Heu tancat la sessió correctament", // Appears when user is successfully signed-out from application
            reSignInMessage: "Feu clic aquí per iniciar la sessió" // Appears when user is signed-out from application and wants to sign-in again
        },
        selectionOptions: {
            selectionOptionsIconTooltip: "Opcions de selecció", // Displayed on hover of selection options icon
            showAllOptionText: "Mostra-ho tot", // Displayed as a option in list of selection options
            showSelectedOptionText: "Mostra els seleccionats" // Displayed as a option in list of selection options
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