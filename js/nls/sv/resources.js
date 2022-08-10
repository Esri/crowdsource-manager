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
    "error": "Det går inte att skapa kartan",
    "licenseError": {
      "message": "Ditt konto har ingen licens för att använda konfigurerbara appar som inte är tillgängliga för allmänheten. Be din organisations administratör att tilldela dig en användartyp som omfattar Essential Apps eller en tilläggslicens för Essential Apps.",
      "title": "Inte licensierad"
    },
    "warningMessageTitle": "Begränsat webbläsarstöd",
    "warningMessageAGOL": "Du använder en webbläsare som är inaktuell. Vissa delar av applikationen kanske inte fungerar optimalt eller inte alls i den här webbläsaren. Stöd för den här webbläsaren kommer att upphöra i framtiden.</br></br>Använd de senaste versionerna av <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> eller <edge-link>Microsoft Edge</edge-link>.</br></br>För mer information om webbläsarstöd, se vår dokumentation. Lämna din återkoppling via <feedback-link>GeoNet, Esris community</feedback-link>.",
    "warningMessageEnterprise": "Du använder en webbläsare som inte längre stöds. Vissa delar av den här applikationen kanske inte fungerar optimalt eller inte alls i den här webbläsaren.</br></br>Använd de senaste versionerna av <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> eller <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Ägare",
    "created": "Skapad den",
    "modified": "Ändrad den",
    "description": "Beskrivning",
    "snippet": "Sammanfattning",
    "licenseInfo": "Begränsningar av åtkomst och användning",
    "accessInformation": "Krediter",
    "tags": "Taggar",
    "numViews": "Antal visningar",
    "avgRating": "Bedömning",
    "noWebMapInGroup": "Den konfigurerade gruppen är ogiltig eller inga objekt har delats med den här gruppen ännu",
    "infoBtnToolTip": "Kartinformation",
    "openWebmapList": "Öppna panel",
    "closeWebmapList": "Stäng panel"
  },
  "geoform": {
    "enterInformation": "Detaljer",
    "selectAttachments": "Bilagor",
    "selectFileText": "Bläddra",
    "enterLocation": "Plats",
    "reportItButton": "Skicka",
    "cancelButton": "Avbryt",
    "requiredField": "(obligatoriskt)",
    "selectDefaultText": "Välj&hellip;",
    "invalidInputValue": "Ange ett giltigt värde.",
    "noFieldsConfiguredMessage": "Lagerfält är inte konfigurerade att fånga data",
    "invalidSmallNumber": "Ange ett heltal",
    "invalidNumber": "Ange ett heltal",
    "invalidFloat": "Ange ett tal",
    "invalidDouble": "Ange ett tal",
    "requiredFields": "Ange värden för alla obligatoriska fält",
    "selectLocation": "Välj platsen för din rapport",
    "numericRangeHintMessage": "${openStrong}Tips:${closeStrong} lägsta värde ${minValue} och maximalt värde ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Tips:${closeStrong} minsta datum ${minValue} och största datum ${maxValue}",
    "errorsInApplyEdits": "Det gick inte att skicka rapporten.",
    "attachmentSelectedMsg": "bilagor markerade",
    "attachmentUploadStatus": "${failed} av ${total} bilagor kunde inte överföras.",
    "attachmentDeleteStatus": "${failed} av ${total} bilagor kunde inte tas bort.",
    "featureUpdateStatus": "${failed} av ${total} geoobjekt kunde inte uppdateras.",
    "geoLocationError": "Aktuell plats finns inte tillgänglig",
    "geoLocationOutOfExtent": "Aktuell plats är utanför baskartans utbredning",
    "submitButtonTooltip": "Spara",
    "cancelButtonTooltip": "Avbryt",
    "geoformBackButtonTooltip": "Återgå till rapportlistan",
    "updateFeaturesConfirmationMsg": "${count} geoobjekt uppdateras",
    "attachmentHeaderText": "Bilagor",
    "unknownPopupAttachment": "ARKIV",
    "unableToEditPopupMessage": "Du har inte behörighet att utföra den här åtgärden.",
    "invalidFeatureCreatorMessage": "Du är inte behörig att redigera det här geoobjektet.",
    "userSpecificFeatureUpdateMessage": "Endast geoobjekt som har skapats av ${username} har uppdaterats.",
    "anonymousUserText": "Anonymt"
  },
  "mapViewer": {
    "zoomInToolTip": "Zooma in",
    "zoomOutToolTip": "Zooma ut"
  },
  "applicationHeader": {
    "signInOption": "Logga in",
    "signOutOption": "Logga ut",
    "pleaseSignInText": "Logga in"
  },
  "dataviewer": {
    "noIssuesReported": "Inga rapporter tillgängliga",
    "noFeatureGeometry": "Geoobjektet kan inte visas",
    "ascendingFlagTitle": "Sortera i stigande ordning",
    "descendingFlagTitle": "Sortera i fallande ordning",
    "filterLabel": "Filter",
    "valueRadioButtonLabel": "Värde",
    "uniqueRadioButtonLabel": "Unik",
    "selectLayerToBegin": "Välj en kategori för att komma igång",
    "layerFeatureCount": "${selectedFeatureCount} valda / ${featureCount} poster",
    "exportToCsvSuccessMessage": "CSV-filen har exporterats.",
    "exportToCsvErrorMessage": "Ett fel uppstod vid export av valda geoobjekt till CSV-filen. Försök igen.",
    "exportToCSVButtonTooltip": "Export to CSV",
    "showAllButtonTooltip": "Visa alla",
    "showSelectedButtonTooltip": "Visa valda",
    "selectAllButtonTooltip": "Markera alla",
    "clearSelectionButtonTooltip": "Rensa val"
  },
  "timeSlider": {
    "timeSliderLabel": "Tidsintervall",
    "timeSliderInEditModeAlert": "Tidsreglage inte tillgängligt vid redigering"
  },
  "comment": {
    "commentsFormSubmitButton": "Spara",
    "commentsFormCancelButton": "Avbryt",
    "errorInSubmittingComment": "Ändringar kunde inte sparas.",
    "emptyCommentMessage": "Värde krävs",
    "placeHolderText": "",
    "noCommentsAvailableText": "Inga poster tillgängliga",
    "remainingTextCount": "${0} tecken återstår",
    "showNoText": "Nej",
    "selectAttachments": "Bilagor",
    "selectFileText": "Bläddra",
    "attachmentSelectedMsg": "bilagor markerade",
    "attachmentHeaderText": "Bilagor",
    "addRecordText": "Lägg till post",
    "unknownCommentAttachment": "ARKIV",
    "unableToAddOrEditCommentMessage": "Du har inte behörighet att utföra den här åtgärden."
  },
  "main": {
    "noGroup": "Ingen grupp konfigurerad",
    "basemapGalleryText": "Baskartgalleri",
    "legendText": "Teckenförklaring",
    "featureNotFoundMessage": "Det begärda geoobjektet hittades inte"
  },
  "search": {
    "searchIconTooltip": "Sök i det här lagret",
    "clearSearchIconTooltip": "Rensa sökningen",
    "noResultFoundText": "Inga resultat hittades",
    "searchInEditModeAlert": "Sökfunktionen är inte tillgänglig vid redigering"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Uppdatera",
    "confirmManualRefreshText": "Alla urval och osparade ändringar ignoreras",
    "confirmHardRefreshText": "Alla filter, urval och osparade ändringar ignoreras"
  },
  "help": {
    "helpIconTooltip": "Hjälp"
  },
  "filter": {
    "noFeatureFoundText": "Inget geoobjekt hittades för detta värde.",
    "distinctQueryFailed": "Inga distinkta värden hittades för fältet.",
    "andText": "och",
    "filterInEditModeAlert": "Filter är inte tillgängliga vid redigering.",
    "dropdownSelectOption": "Välj",
    "filterInShowSelectedEditModeAlert": "Filter är inte tillgängliga i läget Visa valda.",
    "operatorIs": "Är",
    "operatorIsNot": "Är inte",
    "stringOperatorStartsWith": "Startar med",
    "stringOperatorEndsWith": "Slutar med",
    "stringOperatorContains": "Innehåller",
    "stringOperatorDoesNotContain": "Innehåller inte",
    "operatorIsBlank": "Är tom",
    "operatorIsNotBlank": "Är inte tom",
    "numberOperatorIsAtLeast": "Är minst",
    "numberOperatorIsLessThan": "Är mindre än",
    "numberOperatorIsAtMost": "Är högst",
    "numberOperatorIsGreaterThan": "Är större än",
    "numberOperatorIsBetween": "Är mellan",
    "numberOperatorIsNotBetween": "Är inte mellan"
  },
  "detailsPanel": {
    "editContentText": "Redigera post"
  },
  "signOutPage": {
    "signOutMessage": "Du har loggat ut",
    "reSignInMessage": "Klicka här för att logga in"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Alternativ för urval",
    "showAllOptionText": "Visa alla",
    "showSelectedOptionText": "Visa valda"
  }
});