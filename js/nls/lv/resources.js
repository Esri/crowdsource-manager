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
    "error": "Nevar izveidot karti",
    "licenseError": {
      "message": "Jūsu kontam nav licences, lai izmantotu konfigurējamās lietotnes, kas nav publiskas. Pieprasiet savas organizācijas administratoram piešķirt jums lietotāja veidu, kurā iekļauts lietotņu komplekts Essential Apps vai papildinājumlietotņu Essential Apps licence.",
      "title": "Nav licences"
    },
    "warningMessageTitle": "Ierobežots pārlūkprogrammas atbalsts",
    "warningMessageAGOL": "Jūs izmantojiet novecojušu pārlūkprogrammu. Šajā pārlūkprogrammā dažas no lietotnes iespējām var nedarboties kā paredzēts vai nedarboties vispār. Nākotnē tiks pārtraukts šīs pārlūkprogrammas atbalsts.</br></br>Lūdzu, izmantojiet <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, vai <edge-link>Microsoft Edge</edge-link> jaunākās versijas.</br></br>Papildinformāciju par pārlūkprogrammu atbalstu meklējiet mūsu dokumentācijā. Sniedziet savas atsauksmes, izmantojot <feedback-link>GeoNet, Esri kopienu</feedback-link>.",
    "warningMessageEnterprise": "Jūs izmantojat pārlūkprogrammu, kas vairs netiek atbalstīta. Šajā pārlūkprogrammā dažas šīs lietotnes daļas var nedarboties kā paredzēts vai nedarboties vispār.</br></br>Lūdzu, izmantojiet <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, vai <edge-link>Microsoft Edge</edge-link> jaunākās versijas."
  },
  "webMapList": {
    "owner": "Īpašnieks",
    "created": "Izveides datums",
    "modified": "Modificēšanas datums",
    "description": "Apraksts",
    "snippet": "Kopsavilkums",
    "licenseInfo": "Piekļuves un izmantošanas ierobežojumi",
    "accessInformation": "Kredīti",
    "tags": "Atlēgas vārdi",
    "numViews": "Skatījumu skaits",
    "avgRating": "Vērtējums",
    "noWebMapInGroup": "Konfigurētā grupa nav derīga vai ar šo grupu vēl nav kopīgots neviens elements",
    "infoBtnToolTip": "Kartes informācija",
    "openWebmapList": "Atvērt paneli",
    "closeWebmapList": "Aizvērt paneli"
  },
  "geoform": {
    "enterInformation": "Detaļas",
    "selectAttachments": "Pielikumi",
    "selectFileText": "Pārlūkot",
    "enterLocation": "Novietojums",
    "reportItButton": "Iesniegt",
    "cancelButton": "Atcelt",
    "requiredField": "(nepieciešams)",
    "selectDefaultText": "Izvēlēties&hellip;",
    "invalidInputValue": "Lūdzu, ievadiet derīgu vērtību.",
    "noFieldsConfiguredMessage": "Slāņa lauki nav konfigurēti datu tveršanai",
    "invalidSmallNumber": "Lūdzu ievadiet veselu skaitli",
    "invalidNumber": "Lūdzu ievadiet veselu skaitli",
    "invalidFloat": "Lūdzu ievadiet numuru",
    "invalidDouble": "Lūdzu ievadiet numuru",
    "requiredFields": "Lūdzu nodrošiniet vērtības visiem obligātajiem laukiem",
    "selectLocation": "Lūdzu atlasiet vietu savam ziņojumam",
    "numericRangeHintMessage": "${openStrong}Padoms.${closeStrong} Minimālā vērtība ${minValue} un maksimālā vērtība ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Padoms.${closeStrong} Minimālais datums ${minValue} un maksimālais datums ${maxValue}",
    "errorsInApplyEdits": "Neizdevās iesniegt pārskatu.",
    "attachmentSelectedMsg": "atlasītais(-ie) pielikums(-i)",
    "attachmentUploadStatus": "${failed} no ${total} pielikumiem neizdevās augšupielādēt.",
    "attachmentDeleteStatus": "${failed} no ${total} pielikumiem neizdevās izdzēst.",
    "featureUpdateStatus": "${failed} no ${total} elementiem neizdevās atjaunināt.",
    "geoLocationError": "Pašreizējā vieta nav pieejama",
    "geoLocationOutOfExtent": "Pašreizējā vieta ir ārpus pamatkartes pārklājuma",
    "submitButtonTooltip": "Saglabāt",
    "cancelButtonTooltip": "Atcelt",
    "geoformBackButtonTooltip": "Atgriezties pārskatu sarakstā",
    "updateFeaturesConfirmationMsg": "${count} elementi tiks atjaunināti",
    "attachmentHeaderText": "Piesaistes",
    "unknownPopupAttachment": "FAILS",
    "unableToEditPopupMessage": "Jums nav atļaujas izpildīt šo darbību.",
    "invalidFeatureCreatorMessage": "Jūs neesat pilnvaroti rediģēt šo elementu.",
    "userSpecificFeatureUpdateMessage": "Ir atjaunināti tikai ${username} izveidotie elementi.",
    "anonymousUserText": "Anonīms"
  },
  "mapViewer": {
    "zoomInToolTip": "Pietuvināt",
    "zoomOutToolTip": "Attālināt"
  },
  "applicationHeader": {
    "signInOption": "Pierakstīties",
    "signOutOption": "Izrakstīties",
    "pleaseSignInText": "Lūdzu, pierakstieties"
  },
  "dataviewer": {
    "noIssuesReported": "Nav pieejamu ziņojumu",
    "noFeatureGeometry": "Funkciju nevar parādīt",
    "ascendingFlagTitle": "Kārtot augošā secībā",
    "descendingFlagTitle": "Kārtot dilstošā secībā",
    "filterLabel": "Filtrs",
    "valueRadioButtonLabel": "Lielums",
    "uniqueRadioButtonLabel": "Unikāls",
    "selectLayerToBegin": "Lai sāktu darbu, atlasiet kategoriju",
    "layerFeatureCount": "${selectedFeatureCount} atlasīts / ${featureCount} ieraksti",
    "exportToCsvSuccessMessage": "CSV fails eksportēts veiksmīgi.",
    "exportToCsvErrorMessage": "Eksportējot izvēlētos elementus uz CSV failu, radās kļūda. Lūdzu, mēģiniet vēlreiz.",
    "exportToCSVButtonTooltip": "Eksportēt uz CSV",
    "showAllButtonTooltip": "Rādīt visus",
    "showSelectedButtonTooltip": "Rādīt izvēlētos",
    "selectAllButtonTooltip": "Izvēlieties visu",
    "clearSelectionButtonTooltip": "Notīrīt izvēlēto"
  },
  "timeSlider": {
    "timeSliderLabel": "Laika diapazons",
    "timeSliderInEditModeAlert": "Rediģējot laika slīdnis nav pieejams"
  },
  "comment": {
    "commentsFormSubmitButton": "Saglabāt",
    "commentsFormCancelButton": "Atcelt",
    "errorInSubmittingComment": "Labojumus nevarēja saglabāt.",
    "emptyCommentMessage": "Nepieciešama vērtība",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nav pieejams neviens ieraksts",
    "remainingTextCount": "Palikusi(-šas) ${0} rakstzīme(-s)",
    "showNoText": "Nē",
    "selectAttachments": "Pielikumi",
    "selectFileText": "Pārlūkot",
    "attachmentSelectedMsg": "atlasītais(-ie) pielikums(-i)",
    "attachmentHeaderText": "Piesaistes",
    "addRecordText": "Pievienot ierakstu",
    "unknownCommentAttachment": "FAILS",
    "unableToAddOrEditCommentMessage": "Jums nav atļaujas izpildīt šo darbību."
  },
  "main": {
    "noGroup": "Nav konfigurētas grupas",
    "basemapGalleryText": "Pamatkaršu galerija",
    "legendText": "Apzīmējumi",
    "featureNotFoundMessage": "Pieprasītais elements nav atrasts"
  },
  "search": {
    "searchIconTooltip": "Meklēt šo slāni",
    "clearSearchIconTooltip": "Notīrīt meklēto",
    "noResultFoundText": "Rezultāti nav atrasti",
    "searchInEditModeAlert": "Rediģējot meklēšana nav pieejama"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Atjaunot",
    "confirmManualRefreshText": "Visas atlases un nesaglabātās izmaiņas tiks atmestas",
    "confirmHardRefreshText": "Visi filtri, atlases un nesaglabātās izmaiņas tiks atmestas"
  },
  "help": {
    "helpIconTooltip": "Palīdzība"
  },
  "filter": {
    "noFeatureFoundText": "Šai vērtībai nav atrasts neviens elements.",
    "distinctQueryFailed": "Laukam nav atrasta neviena atšķirīga vērtība.",
    "andText": "un",
    "filterInEditModeAlert": "Rediģēšanas laikā filtri nav pieejami.",
    "dropdownSelectOption": "Izvēlēties",
    "filterInShowSelectedEditModeAlert": "Režīmā 'Rādīt izvēlētos' filtri nav pieejami."
  },
  "detailsPanel": {
    "editContentText": "Rediģēt ierakstu"
  },
  "signOutPage": {
    "signOutMessage": "Jūs esat veiksmīgi izrakstījies",
    "reSignInMessage": "Noklikšķiniet šeit, lai pierakstītos"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Atlases opcijas",
    "showAllOptionText": "Rādīt visus",
    "showSelectedOptionText": "Rādīt izvēlētos"
  }
});