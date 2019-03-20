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
    "error": "Karte ni mogoče ustvariti",
    "licenseError": {
      "message": "Vaš račun ni licenciran za uporabo konfigurabilnih aplikacij, ki niso javne. Prosite administratorja v vaši organizaciji, da vam dodeli tip uporabnika, ki vsebuje aplikacije Essential Apps ali licenco za dodatne aplikacije Essential Apps.",
      "title": "Brez licence"
    }
  },
  "webMapList": {
    "owner": "Lastnik",
    "created": "Datum ustvarjanja",
    "modified": "Datum spremembe",
    "description": "Opis",
    "snippet": "Povzetek",
    "licenseInfo": "Omejitve dostopa in uporabe",
    "accessInformation": "Krediti",
    "tags": "Oznake",
    "numViews": "Število ogledov",
    "avgRating": "Ocena",
    "noWebMapInGroup": "Konfigurirana skupina je neveljavna ali s skupino elementi še niso bili deljeni",
    "infoBtnToolTip": "Informacije o karti",
    "openWebmapList": "Odpri ploščo",
    "closeWebmapList": "Zapri ploščo"
  },
  "geoform": {
    "enterInformation": "Podrobnosti",
    "selectAttachments": "Priloge",
    "selectFileText": "Prebrskaj",
    "enterLocation": "Lokacija",
    "reportItButton": "Pošlji",
    "cancelButton": "Prekliči",
    "requiredField": "(obvezno)",
    "selectDefaultText": "Izberi&hellip;",
    "invalidInputValue": "Vnesite veljavno vrednost.",
    "noFieldsConfiguredMessage": "Polja sloja niso konfigurirana za zajemanje podatkov",
    "invalidSmallNumber": "Vnesite celo število",
    "invalidNumber": "Vnesite celo število",
    "invalidFloat": "Vnesite številko",
    "invalidDouble": "Vnesite številko",
    "requiredFields": "Navedite vrednosti za vsa obvezna polja",
    "selectLocation": "Izberite lokacijo za svoje poročilo",
    "numericRangeHintMessage": "${openStrong}Namig:${closeStrong} Minimalna vrednost ${minValue} in maksimalna vrednost ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Namig:${closeStrong} Najmanjši datum ${minValue} in največji datum ${maxValue}",
    "errorsInApplyEdits": "Poročila ni bilo mogoče poslati.",
    "attachmentSelectedMsg": "izbranih prilog",
    "attachmentUploadStatus": "${failed} od ${total} prilog ni bilo mogoče naložiti.",
    "attachmentDeleteStatus": "${failed} od ${total} prilog ni bilo mogoče izbrisati.",
    "featureUpdateStatus": "${failed} od ${total} geoobjektov ni bilo mogoče posodobiti.",
    "geoLocationError": "Trenutna lokacija ni na voljo",
    "geoLocationOutOfExtent": "Trenutna lokacija je izven obsega temeljne karte",
    "submitButtonTooltip": "Shrani",
    "cancelButtonTooltip": "Prekliči",
    "geoformBackButtonTooltip": "Vrnitev na seznam poročil",
    "updateFeaturesConfirmationMsg": "Posodobljenih bo ${count} geoobjektov",
    "attachmentHeaderText": "Priloge",
    "unknownPopupAttachment": "DATOTEKA",
    "unableToEditPopupMessage": "Za izvajanje tega dejanja nimate dovoljenja.",
    "invalidFeatureCreatorMessage": "Niste pooblaščeni za urejanje tega geoobjekta.",
    "userSpecificFeatureUpdateMessage": "Samo geoobjekti, ki jih je ustvaril uporabnik ${username}, so bili posodobljeni.",
    "anonymousUserText": "Anonimno"
  },
  "mapViewer": {
    "zoomInToolTip": "Povečaj",
    "zoomOutToolTip": "Pomanjšaj"
  },
  "applicationHeader": {
    "signInOption": "Prijava",
    "signOutOption": "Odjava",
    "pleaseSignInText": "Prijavite se"
  },
  "dataviewer": {
    "noIssuesReported": "Ni razpoložljivih poročil",
    "noFeatureGeometry": "Geoobjekta ni mogoče prikazati",
    "ascendingFlagTitle": "Razvrsti v naraščajočem vrstnem redu",
    "descendingFlagTitle": "Razvrsti v padajočem vrstnem redu",
    "filterLabel": "Filter",
    "valueRadioButtonLabel": "Vrednost",
    "uniqueRadioButtonLabel": "Enolično",
    "selectLayerToBegin": "Izberite kategorijo za začetek",
    "layerFeatureCount": "${selectedFeatureCount} izbranih/${featureCount} zapisov",
    "exportToCsvSuccessMessage": "Datoteka CSV je bila uspešno izvožena.",
    "exportToCsvErrorMessage": "Pri izvažanju izbranih geoobjektov v datoteko CSV je prišlo do napake. Poskusite znova.",
    "exportToCSVButtonTooltip": "Izvozi v CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Časovni razpon",
    "timeSliderInEditModeAlert": "Časovni drsnik med urejanjem ni na voljo"
  },
  "comment": {
    "commentsFormSubmitButton": "Shrani",
    "commentsFormCancelButton": "Prekliči",
    "errorInSubmittingComment": "Urejanj ni bilo mogoče shraniti.",
    "emptyCommentMessage": "Zahtevana vrednost",
    "placeHolderText": "",
    "noCommentsAvailableText": "Ni razpoložljivih zapisov",
    "remainingTextCount": "Preostalo je ${0} znakov",
    "showNoText": "Ne",
    "selectAttachments": "Priloge",
    "selectFileText": "Prebrskaj",
    "attachmentSelectedMsg": "izbranih prilog",
    "attachmentHeaderText": "Priloge",
    "addRecordText": "Dodaj zapis",
    "unknownCommentAttachment": "DATOTEKA",
    "unableToAddOrEditCommentMessage": "Za izvajanje tega dejanja nimate dovoljenja."
  },
  "main": {
    "noGroup": "Ni konfiguriranih skupin",
    "basemapGalleryText": "Galerija temeljnih kart",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Zahtevani geoobjekt ni najden"
  },
  "search": {
    "searchIconTooltip": "Preišči ta sloj",
    "noResultFoundText": "Ni najdenih rezultatov",
    "searchInEditModeAlert": "Iskanje med urejanjem ni na voljo"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Osveži",
    "confirmManualRefreshText": "Vse izbire in neshranjene spremembe bodo zavržene"
  },
  "help": {
    "helpIconTooltip": "Pomoč"
  },
  "filter": {
    "noFeatureFoundText": "Za to vrednost ni mogoče najti geoobjekta.",
    "distinctQueryFailed": "Za to polje ni najdenih razlikovalnih vrednosti.",
    "andText": "in",
    "filterInEditModeAlert": "Filtri med urejanjem niso na voljo.",
    "dropdownSelectOption": "Izberi",
    "filterInShowSelectedEditModeAlert": "Filtri niso na voljo v načinu »Prikaži izbrano«."
  },
  "detailsPanel": {
    "editContentText": "Urejanje zapisa"
  },
  "signOutPage": {
    "signOutMessage": "Uspešno ste se odjavili",
    "reSignInMessage": "Za prijavo kliknite tukaj"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Možnosti izbire",
    "showAllOptionText": "Pokaži vse",
    "showSelectedOptionText": "Prikaži izbrano"
  }
});