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
    "error": "Nebolo možné vytvoriť mapu",
    "licenseError": {
      "message": "Váš účet nezahŕňa licenciu na použitie Konfigurovateľných aplikácií, ktoré nie sú verejné. Požiadajte správcu vašej organizácie, aby vám priradil typ používateľa, ktorý zahŕňa Esenciálne aplikácie alebo doplnkovú licenciu Esenciálnych aplikácií",
      "title": "Nelicencované"
    },
    "warningMessageTitle": "Obmedzená podpora prehliadača",
    "warningMessageAGOL": "Používate zastaraný prehliadač. Niektoré časti tejto aplikácie nemusia v tomto prehliadači pracovať optimálne alebo vôbec. Podpora tohto prehliadača bude v budúcnosti ukončená.</br></br> Používajte najnovšie verzie prehliadača <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> alebo <edge-link>Microsoft Edge</edge-link>.</br></br> Ďalšie informácie o podpore prehliadača nájdete v našej dokumentácii. Poskytnite vašu spätnú väzbu cez <feedback-link>GeoNet, Esri komunitu</feedback-link>.",
    "warningMessageEnterprise": "Používate prehliadač, ktorý už nie je podporovaný. Niektoré časti tejto aplikácie nemusia v tomto prehliadači fungovať optimálne alebo vôbec. </br></br>Použite najnovšie verzie prehľadávača <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> alebo <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Vlastník",
    "created": "Dátum vytvorenia",
    "modified": "Dátum úpravy",
    "description": "Popis",
    "snippet": "Súhrn",
    "licenseInfo": "Obmedzenia prístupu a používania",
    "accessInformation": "Kredity",
    "tags": "Štítky",
    "numViews": "Počet zobrazení",
    "avgRating": "Hodnotenie",
    "noWebMapInGroup": "Konfigurovaná skupina je neplatná alebo s ňou ešte neboli zdieľané žiadne položky",
    "infoBtnToolTip": "Informácie o mape",
    "openWebmapList": "Otvoriť panel",
    "closeWebmapList": "Zatvoriť panel"
  },
  "geoform": {
    "enterInformation": "Podrobnosti",
    "selectAttachments": "Prílohy",
    "selectFileText": "Prehľadať",
    "enterLocation": "Umiestnenie",
    "reportItButton": "Odoslať",
    "cancelButton": "Zrušiť",
    "requiredField": "(požadované)",
    "selectDefaultText": "Vybrať&hellip;",
    "invalidInputValue": "Prosím zadajte platnú hodnotu.",
    "noFieldsConfiguredMessage": "Polia vrstiev nie sú nakonfigurované na zaznamenávanie údajov",
    "invalidSmallNumber": "Zadajte celé číslo",
    "invalidNumber": "Zadajte celé číslo",
    "invalidFloat": "Zadajte číslo",
    "invalidDouble": "Zadajte číslo",
    "requiredFields": "Zadajte hodnoty pre všetky povinné polia",
    "selectLocation": "Vyberte umiestnenie svojho prehľadu",
    "numericRangeHintMessage": "${openStrong}Hint:${closeStrong} Minimálna hodnota ${minValue} a Maximálna hodnota ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hint:${closeStrong} Minimálny dátum ${minValue} a Maximálny dátum ${maxValue}",
    "errorsInApplyEdits": "Správu nebolo možné odoslať.",
    "attachmentSelectedMsg": "vybrané prílohy",
    "attachmentUploadStatus": "${failed} z ${total} príloh nebolo možné nahrať.",
    "attachmentDeleteStatus": "${failed} z ${total} príloh nebolo možné vymazať.",
    "featureUpdateStatus": "${failed} z ${total} prvkov nebolo možné aktualizovať.",
    "geoLocationError": "Aktuálna poloha nie je k dispozícii",
    "geoLocationOutOfExtent": "Aktuálna poloha je mimo rozsahu základnej mapy",
    "submitButtonTooltip": "Uložiť",
    "cancelButtonTooltip": "Zrušiť",
    "geoformBackButtonTooltip": "Návrat na zoznam správ",
    "updateFeaturesConfirmationMsg": "${count} prvkov bude aktualizovaných",
    "attachmentHeaderText": "Prílohy",
    "unknownPopupAttachment": "SÚBOR",
    "unableToEditPopupMessage": "Nemáte oprávnenie na vykonanie tejto akcie.",
    "invalidFeatureCreatorMessage": "Nie ste autorizovaný na úpravu tohto prvku.",
    "userSpecificFeatureUpdateMessage": "Nahraté boli iba prvky vytvorené ${username}.",
    "anonymousUserText": "Anonymný"
  },
  "mapViewer": {
    "zoomInToolTip": "Priblížiť",
    "zoomOutToolTip": "Oddialiť"
  },
  "applicationHeader": {
    "signInOption": "Prihlásiť sa",
    "signOutOption": "Odhlásiť sa",
    "pleaseSignInText": "Prosím prihláste sa"
  },
  "dataviewer": {
    "noIssuesReported": "Nie sú k dipozícii žiadne správy",
    "noFeatureGeometry": "Prvok nie je možné zobraziť",
    "ascendingFlagTitle": "Zoradiť vzostupne",
    "descendingFlagTitle": "Zoradiť zostupne",
    "filterLabel": "Filter",
    "valueRadioButtonLabel": "Hodnota",
    "uniqueRadioButtonLabel": "Jedinečný",
    "selectLayerToBegin": "Začnite výberom kategórie",
    "layerFeatureCount": "${selectedFeatureCount} vybraných / ${featureCount} záznamov",
    "exportToCsvSuccessMessage": "CSV súbor bol úspešne exportovaný.",
    "exportToCsvErrorMessage": "Pri exportovaní vybratých prvkov do CSV súboru došlo k chybe. Skúste prosím znova.",
    "exportToCSVButtonTooltip": "Exportovať do CSV",
    "showAllButtonTooltip": "Zobraziť všetko",
    "showSelectedButtonTooltip": "Zobraziť vybrané",
    "selectAllButtonTooltip": "Vybrať všetko",
    "clearSelectionButtonTooltip": "Vyčistiť výber"
  },
  "timeSlider": {
    "timeSliderLabel": "Časový rozsah",
    "timeSliderInEditModeAlert": "Posúvač času nie je k dispozícii počas úprav"
  },
  "comment": {
    "commentsFormSubmitButton": "Uložiť",
    "commentsFormCancelButton": "Zrušiť",
    "errorInSubmittingComment": "Úpravy sa nepodarilo uložiť.",
    "emptyCommentMessage": "Vyžaduje sa hodnota.",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nie sú k dipozícii žiadne záznamy.",
    "remainingTextCount": "Zostáva ${0} znakov",
    "showNoText": "Nie",
    "selectAttachments": "Prílohy",
    "selectFileText": "Prehľadať",
    "attachmentSelectedMsg": "príloh vybraných",
    "attachmentHeaderText": "Prílohy",
    "addRecordText": "Pridať záznam",
    "unknownCommentAttachment": "SÚBOR",
    "unableToAddOrEditCommentMessage": "Nemáte oprávnenie na vykonanie tejto akcie."
  },
  "main": {
    "noGroup": "Žiadne nakonfigurované skupiny",
    "basemapGalleryText": "Galéria základných máp",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Nebol nájdený požadovaný prvok."
  },
  "search": {
    "searchIconTooltip": "Vyhľadať v tejto vrstve",
    "clearSearchIconTooltip": "Vyčistiť vyhľadávanie",
    "noResultFoundText": "Neboli nájdené žiadne výsledky",
    "searchInEditModeAlert": "Vyhľadávanie nie je k dispozícii počas úprav"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Obnoviť",
    "confirmManualRefreshText": "Všetky výbery a neuložené zmeny budú stratené",
    "confirmHardRefreshText": "Všetky filtre, výbery a neuložené zmeny budú stratené"
  },
  "help": {
    "helpIconTooltip": "Pomocník"
  },
  "filter": {
    "noFeatureFoundText": "Nebol nájdený žiadny prvok pre túto hodnotu",
    "distinctQueryFailed": "Pre toto pole sa nenašli žiadne jedinečné hodnoty.",
    "andText": "a",
    "filterInEditModeAlert": "Filtre nie sú k dispozícii počas úprav",
    "dropdownSelectOption": "Vybrať",
    "filterInShowSelectedEditModeAlert": "Filtre nie sú k dispozícii v režime „Zobraziť vybrané“."
  },
  "detailsPanel": {
    "editContentText": "Upraviť záznam"
  },
  "signOutPage": {
    "signOutMessage": "Boli ste úspešne odhlásený.",
    "reSignInMessage": "Pre prihlásenie kliknite sem"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Možnosti výberu",
    "showAllOptionText": "Zobraziť všetko",
    "showSelectedOptionText": "Zobraziť vybrané"
  }
});