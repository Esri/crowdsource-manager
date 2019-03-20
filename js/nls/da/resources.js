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
  "map": {
    "error": "Kan ikke oprette kort",
    "licenseError": {
      "message": "Din konto har ikke licens til at bruge Konfigurérbare apps, der ikke er offentlige. Bed din organisationsadministrator om at knytte dig til en brugertype, der omfatter Essential Apps eller en add-on Essential Apps-licens.",
      "title": "Ikke licenseret"
    }
  },
  "webMapList": {
    "owner": "Ejer",
    "created": "Oprettelsesdato",
    "modified": "Dato for ændring",
    "description": "Beskrivelse",
    "snippet": "Oversigt",
    "licenseInfo": "Få adgang til og brug begrænsninger",
    "accessInformation": "Credits",
    "tags": "Nøgleord",
    "numViews": "Antal visninger",
    "avgRating": "Vurdering",
    "noWebMapInGroup": "Konfigureret gruppe er ugyldig, eller ingen elementer er endnu blevet delt med denne gruppe",
    "infoBtnToolTip": "Kortoplysninger",
    "openWebmapList": "Åbn panel",
    "closeWebmapList": "Luk panel"
  },
  "geoform": {
    "enterInformation": "%1 - Vælg app-mappe",
    "selectAttachments": "Vedhæftninger",
    "selectFileText": "Gennemse",
    "enterLocation": "Position",
    "reportItButton": "Indsend",
    "cancelButton": "Annullér",
    "requiredField": "(obligatorisk)",
    "selectDefaultText": "Select&hellip;",
    "invalidInputValue": "Indtast en gyldig værdi.",
    "noFieldsConfiguredMessage": "Lagfelter er ikke konfigureret til at hente data",
    "invalidSmallNumber": "Indtast et heltal",
    "invalidNumber": "Indtast et heltal",
    "invalidFloat": "Indtast et tal",
    "invalidDouble": "Indtast et tal",
    "requiredFields": "Angiv værdier for alle påkrævede felter",
    "selectLocation": "Vælg en placering for din rapport",
    "numericRangeHintMessage": "${openStrong}Tip:${closeStrong} Minimumværdi ${minValue} og maksimumværdi ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Tip:${closeStrong} Minimumdato ${minValue} og maksimumdato ${maxValue}",
    "errorsInApplyEdits": "Rapport kunne ikke sendes.",
    "attachmentSelectedMsg": "vedhæftning(er) valgt",
    "attachmentUploadStatus": "${failed} af ${total} vedhæftning(er) kunne ikke overføres.",
    "attachmentDeleteStatus": "${failed} af ${total} vedhæftning(er) kunne ikke slettes.",
    "featureUpdateStatus": "${failed} af ${total} objekt(er) kunne ikke opdateres.",
    "geoLocationError": "Aktuel position er ikke tilgængelig",
    "geoLocationOutOfExtent": "Aktuel position ligger uden for baggrundskortets udstrækning",
    "submitButtonTooltip": "Gem",
    "cancelButtonTooltip": "Annullér",
    "geoformBackButtonTooltip": "Vend tilbage til rapportlisten",
    "updateFeaturesConfirmationMsg": "${count} objekter vil blive opdateret",
    "attachmentHeaderText": "Vedhæftninger",
    "unknownPopupAttachment": "FIL",
    "unableToEditPopupMessage": "Du har ikke tilladelse til at udføre denne handling.",
    "invalidFeatureCreatorMessage": "Du er ikke autoriseret til redigere dette objekt.",
    "userSpecificFeatureUpdateMessage": "Kun objekter, der er oprettet af ${username}, er blevet opdateret.",
    "anonymousUserText": "Anonym"
  },
  "mapViewer": {
    "zoomInToolTip": "Zoom ind",
    "zoomOutToolTip": "Zoom ud"
  },
  "applicationHeader": {
    "signInOption": "Log ind",
    "signOutOption": "Log ud",
    "pleaseSignInText": "Log ind"
  },
  "dataviewer": {
    "noIssuesReported": "Ingen tilgængelige rapporter",
    "noFeatureGeometry": "Objekt kan ikke vises",
    "ascendingFlagTitle": "Sortér i stigende rækkefølge",
    "descendingFlagTitle": "Sortér i faldende rækkefølge",
    "filterLabel": "Filtrér",
    "valueRadioButtonLabel": "Værdi",
    "uniqueRadioButtonLabel": "Unik",
    "selectLayerToBegin": "Vælg en kategori at starte med",
    "layerFeatureCount": "${selectedFeatureCount} valgt / ${featureCount} poster",
    "exportToCsvSuccessMessage": "CSV-fil eksporteret uden fejl.",
    "exportToCsvErrorMessage": "Der opstod en fejl under eksport af de valgte objekter til CSV-filen. Prøv igen.",
    "exportToCSVButtonTooltip": "Eksportér til CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Tidsinterval",
    "timeSliderInEditModeAlert": "Tidsskyder er utilgængelig, når du redigerer"
  },
  "comment": {
    "commentsFormSubmitButton": "Gem",
    "commentsFormCancelButton": "Annullér",
    "errorInSubmittingComment": "Redigeringer kunne ikke gemmes.",
    "emptyCommentMessage": "Værdi er påkrævet",
    "placeHolderText": "",
    "noCommentsAvailableText": "Ingen poster er tilgængelige",
    "remainingTextCount": "${0} tegn tilbage",
    "showNoText": "Nej",
    "selectAttachments": "Vedhæftninger",
    "selectFileText": "Gennemse",
    "attachmentSelectedMsg": "vedhæftning(er) valgt",
    "attachmentHeaderText": "Vedhæftninger",
    "addRecordText": "Tilføj post",
    "unknownCommentAttachment": "FIL",
    "unableToAddOrEditCommentMessage": "Du har ikke tilladelse til at udføre denne handling."
  },
  "main": {
    "noGroup": "Ingen gruppe konfigureret",
    "basemapGalleryText": "Galleri over baggrundskort",
    "legendText": "Signaturforklaring",
    "featureNotFoundMessage": "Det objekt, der er blevet anmodet om, kunne ikke findes"
  },
  "search": {
    "searchIconTooltip": "Søg i dette lag",
    "noResultFoundText": "Ingen resultater",
    "searchInEditModeAlert": "Søgning er utilgængelig under redigering"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Opdatér",
    "confirmManualRefreshText": "Alle markeringer og ikke-gemte ændringer vil gå tabt"
  },
  "help": {
    "helpIconTooltip": "Hjælp"
  },
  "filter": {
    "noFeatureFoundText": "Intet objekt fundet for denne værdi.",
    "distinctQueryFailed": "Ingen forskellige værdier fundet for dette felt.",
    "andText": "og",
    "filterInEditModeAlert": "Filtre er utilgængelige under redigering.",
    "dropdownSelectOption": "Vælg",
    "filterInShowSelectedEditModeAlert": "Filtre er utilgængelige i 'Vis udvalgte'-tilstand."
  },
  "detailsPanel": {
    "editContentText": "Redigér post"
  },
  "signOutPage": {
    "signOutMessage": "Du er blevet logget ud",
    "reSignInMessage": "Klik her for at logge ind"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Valgmuligheder",
    "showAllOptionText": "Vis alle",
    "showSelectedOptionText": "Vis valgte"
  }
});