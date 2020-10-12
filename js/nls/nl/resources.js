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
    "error": "Kaart kan niet gemaakt worden",
    "licenseError": {
      "message": "Uw account heeft geen licentie om configureerbare apps te gebruiken die niet openbaar zijn. Vraag uw organisatiebeheerder om u een gebruikerstype toe te wijzen dat Essential Apps of een add-on Essential Apps-licentie bevat.",
      "title": "Geen licentie"
    }
  },
  "webMapList": {
    "owner": "Eigenaar",
    "created": "Aanmaakdatum",
    "modified": "Datum wijziging",
    "description": "Beschrijving",
    "snippet": "Samenvatting",
    "licenseInfo": "Gebruiks- en toegangsbeperkingen",
    "accessInformation": "Credits",
    "tags": "Labels",
    "numViews": "Aantal weergaven",
    "avgRating": "Beoordeling",
    "noWebMapInGroup": "Geconfigureerde groep is ongeldig of er worden nog geen items gedeeld met deze groep",
    "infoBtnToolTip": "Kaartinformatie",
    "openWebmapList": "Panel openen",
    "closeWebmapList": "Panel sluiten"
  },
  "geoform": {
    "enterInformation": "Details",
    "selectAttachments": "Bijlagen",
    "selectFileText": "Bladeren",
    "enterLocation": "Locatie",
    "reportItButton": "Verzenden",
    "cancelButton": "Annuleren",
    "requiredField": "(vereist)",
    "selectDefaultText": "Selecteren&hellip;",
    "invalidInputValue": "Geef een geldige waarde op.",
    "noFieldsConfiguredMessage": "Laagvelden zijn niet geconfigureerd om data vast te leggen",
    "invalidSmallNumber": "Een integer invoeren",
    "invalidNumber": "Een integer invoeren",
    "invalidFloat": "Een nummer invoeren",
    "invalidDouble": "Een nummer invoeren",
    "requiredFields": "Geef waarden op voor alle vereiste velden",
    "selectLocation": "Selecteer de locatie voor uw rapport",
    "numericRangeHintMessage": "${openStrong}Tip:${closeStrong} Minimumwaarde ${minValue} en maximumwaarde ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Tip:${closeStrong} Minimumdatum ${minValue} en maximumdatum ${maxValue}",
    "errorsInApplyEdits": "Rapport kon niet worden ingediend.",
    "attachmentSelectedMsg": "bijlage(n) geselecteerd",
    "attachmentUploadStatus": "${failed} van ${total} bijlage(n) niet geüpload.",
    "attachmentDeleteStatus": "${failed} van ${total} bijlage(n) niet verwijderd.",
    "featureUpdateStatus": "${failed} van ${total} object(en) niet bijgewerkt.",
    "geoLocationError": "Huidige locatie niet beschikbaar",
    "geoLocationOutOfExtent": "Huidige locatie ligt buiten het basiskaartbereik",
    "submitButtonTooltip": "Opslaan",
    "cancelButtonTooltip": "Annuleren",
    "geoformBackButtonTooltip": "Terug naar de meldlijst",
    "updateFeaturesConfirmationMsg": "${count} objecten worden bijgewerkt",
    "attachmentHeaderText": "Bijlagen",
    "unknownPopupAttachment": "BESTAND",
    "unableToEditPopupMessage": "U hebt geen toestemming om deze actie uit te voeren.",
    "invalidFeatureCreatorMessage": "U bent niet gemachtigd om dit object te bewerken.",
    "userSpecificFeatureUpdateMessage": "Alleen de objecten die zijn gecreëerd door ${username} zijn bijgewerkt.",
    "anonymousUserText": "Anoniem"
  },
  "mapViewer": {
    "zoomInToolTip": "Inzoomen",
    "zoomOutToolTip": "Uitzoomen"
  },
  "applicationHeader": {
    "signInOption": "Aanmelden",
    "signOutOption": "Afmelden",
    "pleaseSignInText": "Meld u aan"
  },
  "dataviewer": {
    "noIssuesReported": "Geen rapporten beschikbaar",
    "noFeatureGeometry": "Object kan niet worden weergegeven",
    "ascendingFlagTitle": "Sorteren in oplopende volgorde",
    "descendingFlagTitle": "Sorteren in aflopende volgorde",
    "filterLabel": "Filteren",
    "valueRadioButtonLabel": "Waarde",
    "uniqueRadioButtonLabel": "Uniek",
    "selectLayerToBegin": "Selecteer een categorie om te starten",
    "layerFeatureCount": "${selectedFeatureCount} geselecteerd / ${featureCount} items",
    "exportToCsvSuccessMessage": "CSV-bestand met succes geëxporteerd.",
    "exportToCsvErrorMessage": "Fout bij het exporteren van de geselecteerde objecten naar CSV-bestand. Probeer het opnieuw.",
    "exportToCSVButtonTooltip": "Exporteren naar CSV",
    "showAllButtonTooltip": "Show All",
    "showSelectedButtonTooltip": "Geef geselecteerde weer",
    "selectAllButtonTooltip": "Alles selecteren",
    "clearSelectionButtonTooltip": "Selectie wissen",
    "invalidFeatureMessage": "Kan geen ${invalidFeatureCount} ongeldig(e) object(en) selecteren."
  },
  "timeSlider": {
    "timeSliderLabel": "Tijdsbereik",
    "timeSliderInEditModeAlert": "Tijdschuifregelaar onbeschikbaar tijdens het bewerken"
  },
  "comment": {
    "commentsFormSubmitButton": "Opslaan",
    "commentsFormCancelButton": "Annuleren",
    "errorInSubmittingComment": "Wijzigingen kunnen niet worden opgeslagen.",
    "emptyCommentMessage": "Waarde vereist.",
    "placeHolderText": "",
    "noCommentsAvailableText": "Geen records beschikbaar",
    "remainingTextCount": "${0} teken(s) over",
    "showNoText": "Nee",
    "selectAttachments": "Bijlagen",
    "selectFileText": "Bladeren",
    "attachmentSelectedMsg": "bijlage(n) geselecteerd",
    "attachmentHeaderText": "Bijlagen",
    "addRecordText": "Item toevoegen",
    "unknownCommentAttachment": "BESTAND",
    "unableToAddOrEditCommentMessage": "U hebt geen toestemming om deze actie uit te voeren."
  },
  "main": {
    "noGroup": "Geen groep geconfigureerd",
    "basemapGalleryText": "Basiskaartgalerij",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Gevraagd object niet gevonden"
  },
  "search": {
    "searchIconTooltip": "Deze laag zoeken",
    "noResultFoundText": "Geen resultaten gevonden",
    "searchInEditModeAlert": "Zoeken onbeschikbaar tijdens het bewerken"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Vernieuwen",
    "confirmManualRefreshText": "Alle selecties en onopgeslagen wijzigingen worden genegeerd"
  },
  "help": {
    "helpIconTooltip": "Help"
  },
  "filter": {
    "noFeatureFoundText": "Geen object gevonden voor deze waarde.",
    "distinctQueryFailed": "Geen afzonderlijke waarden gevonden voor het veld.",
    "andText": "en",
    "filterInEditModeAlert": "Filters niet beschikbaar tijdens het bewerken.",
    "dropdownSelectOption": "Selecteren",
    "filterInShowSelectedEditModeAlert": "Filters niet beschikbaar in modus 'Geef geselecteerde weer'."
  },
  "detailsPanel": {
    "editContentText": "Record bewerken"
  },
  "signOutPage": {
    "signOutMessage": "U bent afgemeld.",
    "reSignInMessage": "Klik hier om u aan te melden."
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Selectie-opties",
    "showAllOptionText": "Alles tonen",
    "showSelectedOptionText": "Geef geselecteerde weer"
  }
});