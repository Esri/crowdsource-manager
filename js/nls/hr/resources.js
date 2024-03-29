﻿/*global define */
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
    "error": "Nije moguće stvoriti kartu",
    "licenseError": {
      "message": "Vaš račun nije licenciran za upotrebu konfigurabilnih appova koji nisu javni. Obratite se administratoru svoje organizacije da vam dodijeli vrstu korisnika koja sadrži licencu za osnovne appove ili za dodatke za osnovne appove.",
      "title": "Nema licence"
    },
    "warningMessageTitle": "Ograničena podrška za preglednik",
    "warningMessageAGOL": "Koristite zastarjeli preglednik. Neki dijelovi ove aplikacije možda neće funkcionirati optimalno ili uopće neće funkcionirati u ovom pregledniku. Podrška za ovaj preglednik ukinut će se u budućnosti.</br></br>Koristite najnovije verzije preglednika <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, ili <edge-link>Microsoft Edge</edge-link>.</br></br>Za više informacija o podršci za preglednike pogledajte našu dokumentaciju. Pošaljite svoje povratne informacije kroz <feedback-link>GeoNet, Esrijevu zajednicu</feedback-link>.",
    "warningMessageEnterprise": "Upotrebljavate preglednik koji više nije podržan. Neki dijelovi ove aplikacije možda neće raditi optimalno ili uopće neće raditi u ovom pregledniku.</br></br>Koristite najnovije verzije preglednika <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, ili <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Vlasnik",
    "created": "Datum izrade",
    "modified": "Datum izmjene",
    "description": "Opis",
    "snippet": "Sažetak",
    "licenseInfo": "Ograničenja pristupa i upotrebe",
    "accessInformation": "Krediti",
    "tags": "Oznake",
    "numViews": "Broj prikaza",
    "avgRating": "Ocjena",
    "noWebMapInGroup": "Konfigurirana grupa nije valjana ili s grupom još nisu podijeljene stavke",
    "infoBtnToolTip": "Informacije o karti",
    "openWebmapList": "Otvori ploču",
    "closeWebmapList": "Zatvori ploču"
  },
  "geoform": {
    "enterInformation": "Pojedinosti",
    "selectAttachments": "Privici",
    "selectFileText": "Pregledaj",
    "enterLocation": "Lokacija",
    "reportItButton": "Pošalji",
    "cancelButton": "Ovdje pogledajte primjer primjene sa serijom klizača",
    "requiredField": "(obavezno)",
    "selectDefaultText": "Odabir&hellip;",
    "invalidInputValue": "Unesite valjanu vrijednost.",
    "noFieldsConfiguredMessage": "Polja slojeva nisu konfigurirana za prikupljanje podataka",
    "invalidSmallNumber": "Unesite cijeli broj",
    "invalidNumber": "Unesite cijeli broj",
    "invalidFloat": "Unesite broj",
    "invalidDouble": "Unesite broj",
    "requiredFields": "Upišite vrijednosti za sva obavezna polja",
    "selectLocation": "Odaberite lokaciju za izvješće",
    "numericRangeHintMessage": "${openStrong}Podsjetnik:${closeStrong} minimalna vrijednost ${minValue} i maksimalna vrijednost ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Podsjetnik:${closeStrong} minimalni datum ${minValue} i maksimalni datum ${maxValue}",
    "errorsInApplyEdits": "Nije moguće podnijeti izvješće.",
    "attachmentSelectedMsg": "odabrani privitak(-ci)",
    "attachmentUploadStatus": "${failed} od ${total} privit(a)ka nije poslano.",
    "attachmentDeleteStatus": "${failed} od ${total} privit(a)ka nije izbrisano.",
    "featureUpdateStatus": "${failed} od ${total} geoobjek(a)ta nije ažurirano.",
    "geoLocationError": "Trenutačna lokacija nije dostupna",
    "geoLocationOutOfExtent": "Trenutačna lokacija izvan je obuhvata kartografske podloge",
    "submitButtonTooltip": "Spremi",
    "cancelButtonTooltip": "Ovdje pogledajte primjer primjene sa serijom klizača",
    "geoformBackButtonTooltip": "Povratak na popis izvješća",
    "updateFeaturesConfirmationMsg": "Ažurirat će se ${count} geoobjek(a)t(a)",
    "attachmentHeaderText": "Privici",
    "unknownPopupAttachment": "DATOTEKA",
    "unableToEditPopupMessage": "Nemate dopuštenje za izvođenje ove radnje.",
    "invalidFeatureCreatorMessage": "Niste ovlašteni za uređivanje ovog geoobjekta.",
    "userSpecificFeatureUpdateMessage": "Ažurirani su samo geoobjekti koje je stvorio korisnik ${username}.",
    "anonymousUserText": "Anonimno"
  },
  "mapViewer": {
    "zoomInToolTip": "Povećaj",
    "zoomOutToolTip": "Smanji"
  },
  "applicationHeader": {
    "signInOption": "Prijava",
    "signOutOption": "Odjava",
    "pleaseSignInText": "Prijavite se"
  },
  "dataviewer": {
    "noIssuesReported": "Nema dostupnih izvješća",
    "noFeatureGeometry": "Geoobjekt se ne može prikazati",
    "ascendingFlagTitle": "Sortiraj uzlaznim redoslijedom",
    "descendingFlagTitle": "Sortiraj silaznim redoslijedom",
    "filterLabel": "Filtriraj",
    "valueRadioButtonLabel": "Vrijednost",
    "uniqueRadioButtonLabel": "Jedinstveno",
    "selectLayerToBegin": "Odaberite kategoriju za početak rada",
    "layerFeatureCount": "${selectedFeatureCount} odabrano / ${featureCount} zapis/a",
    "exportToCsvSuccessMessage": "CSV datoteka uspješno je izvezena.",
    "exportToCsvErrorMessage": "Pogreška prilikom izvoza odabranih geoobjekata u CSV datoteku. Pokušajte ponovno.",
    "exportToCSVButtonTooltip": "Izvezi u CSV",
    "showAllButtonTooltip": "Prikaži sve",
    "showSelectedButtonTooltip": "Prikaži odabrano",
    "selectAllButtonTooltip": "Odaberi sve",
    "clearSelectionButtonTooltip": "Očisti odabir"
  },
  "timeSlider": {
    "timeSliderLabel": "Vremenski raspon",
    "timeSliderInEditModeAlert": "Vremenski klizač nije dostupan tijekom uređivanja"
  },
  "comment": {
    "commentsFormSubmitButton": "Spremi",
    "commentsFormCancelButton": "Ovdje pogledajte primjer primjene sa serijom klizača",
    "errorInSubmittingComment": "Uređivanja se nisu mogla spremiti.",
    "emptyCommentMessage": "Potrebna vrijednost",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nema dostupnih zapisa",
    "remainingTextCount": "preostalo ${0} znakova",
    "showNoText": "Ne",
    "selectAttachments": "Privici",
    "selectFileText": "Pregledaj",
    "attachmentSelectedMsg": "odabrani privitak(-ci)",
    "attachmentHeaderText": "Privici",
    "addRecordText": "Dodaj zapis",
    "unknownCommentAttachment": "DATOTEKA",
    "unableToAddOrEditCommentMessage": "Nemate dopuštenje za izvođenje ove radnje."
  },
  "main": {
    "noGroup": "Nema konfiguriranih grupa",
    "basemapGalleryText": "Galerija kartografskih podloga",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Zatraženi geoobjekt nije pronađen"
  },
  "search": {
    "searchIconTooltip": "Pretraži ovaj sloj",
    "clearSearchIconTooltip": "Očisti pretragu",
    "noResultFoundText": "Nema rezultata",
    "searchInEditModeAlert": "Pretraživanje nije dostupno tijekom uređivanja"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Osvježi",
    "confirmManualRefreshText": "Odbacit će se svi odabiri i nespremljene promjene",
    "confirmHardRefreshText": "Odbacit će se svi filtri, odabiri i nespremljene promjene"
  },
  "help": {
    "helpIconTooltip": "Pomoć"
  },
  "filter": {
    "noFeatureFoundText": "Nema geoobjekata za ovu vrijednost.",
    "distinctQueryFailed": "Nema određenih vrijednosti za ovo polje.",
    "andText": "i",
    "filterInEditModeAlert": "Filtri nisu dostupni tijekom uređivanja.",
    "dropdownSelectOption": "Odaberi",
    "filterInShowSelectedEditModeAlert": "Filtri nisu dostupni u načinu „Prikaži odabrane”.",
    "operatorIs": "Je",
    "operatorIsNot": "Nije",
    "stringOperatorStartsWith": "Počinje s",
    "stringOperatorEndsWith": "Završava s",
    "stringOperatorContains": "Sadrži",
    "stringOperatorDoesNotContain": "Ne sadrži",
    "operatorIsBlank": "Je prazno",
    "operatorIsNotBlank": "Nije prazno",
    "numberOperatorIsAtLeast": "Je najmanje",
    "numberOperatorIsLessThan": "Je manje od",
    "numberOperatorIsAtMost": "Je najviše",
    "numberOperatorIsGreaterThan": "Je veće od",
    "numberOperatorIsBetween": "Je između",
    "numberOperatorIsNotBetween": "Nije između"
  },
  "detailsPanel": {
    "editContentText": "Uredi zapis"
  },
  "signOutPage": {
    "signOutMessage": "Uspješno ste se odjavili",
    "reSignInMessage": "Kliknite ovdje za prijavu"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opcije odabira",
    "showAllOptionText": "Prikaži sve",
    "showSelectedOptionText": "Prikaži odabrano"
  }
});