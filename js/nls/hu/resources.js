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
    "error": "Nem sikerült létrehozni a térképet",
    "licenseError": {
      "message": "Az Ön fiókjának licence nem terjed ki a nem nyilvános konfigurálható alkalmazásokra. Igényelje a szervezete adminisztrátorától, hogy rendeljen Önhöz olyan felhasználótípust, amely tartalmazza az alapvető alkalmazásokat, vagy egy kiegészítő alapvető alkalmazásokra vonatkozó licencet.",
      "title": "Nincs licence"
    },
    "warningMessageTitle": "Korlátozott böngésző támogatás",
    "warningMessageAGOL": "Elavult böngészőt használ. Az alkalmazás néhány funkciója, vagy az alkalmazás egésze ebben a böngészőben nem fog műkködni. A jövőben ennek a böngészőnek a terméktámogatása megszűnik.</br></br>Kérjük, használja a <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, vagy a <edge-link>Microsoft Edge</edge-link> legújabb verzióját.</br></br>A támogatott böngészőkkel kapcsolatos további ismertetésért lásd a dokumentációt. Küldje el a visszajelzését a <feedback-link>GeoNeten, az Esri közösségén keresztül</feedback-link>.",
    "warningMessageEnterprise": "Ön olyan böngészőt használ, amely már nem támogatott. Az alkalmazás néhány funkciója, vagy az alkalmazás egésze ebben a böngészőben nem fog működni.</br></br>Kérjük, használja a <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, vagy a <edge-link>Microsoft Edge</edge-link> legújabb verzióját."
  },
  "webMapList": {
    "owner": "Tulajdonos",
    "created": "Létrehozás dátuma",
    "modified": "Módosítás dátuma",
    "description": "Leírás",
    "snippet": "Összefoglalás",
    "licenseInfo": "Hozzáférési és használati korlátozások",
    "accessInformation": "Kreditek",
    "tags": "Címkék",
    "numViews": "Megtekintések száma",
    "avgRating": "Értékelés",
    "noWebMapInGroup": "A konfigurált csoport érvénytelen, vagy még nincsenek megosztva elemek ezzel a csoporttal",
    "infoBtnToolTip": "Térkép adatai",
    "openWebmapList": "Panel megnyitása",
    "closeWebmapList": "Panel bezárása"
  },
  "geoform": {
    "enterInformation": "Részletek",
    "selectAttachments": "Csatolmányok",
    "selectFileText": "Tallózás",
    "enterLocation": "Hely",
    "reportItButton": "Beküldés",
    "cancelButton": "Mégse",
    "requiredField": "(kötelező)",
    "selectDefaultText": "Kiválasztás&hellip;",
    "invalidInputValue": "Adjon meg érvényes értéket.",
    "noFieldsConfiguredMessage": "A réteg mezői nincsenek konfigurálva adatok rögzítésére",
    "invalidSmallNumber": "Adjon meg egy egész számot",
    "invalidNumber": "Adjon meg egy egész számot",
    "invalidFloat": "Adjon meg egy számot",
    "invalidDouble": "Adjon meg egy számot",
    "requiredFields": "Adjon meg értéket minden kötelező mezőben",
    "selectLocation": "Válasszon helyet a jelentés számára",
    "numericRangeHintMessage": "${openStrong}Tipp:${closeStrong} ${minValue} minimális érték és ${maxValue} maximális érték",
    "dateRangeHintMessage": "${openStrong}Tipp:${closeStrong} ${minValue} kezdő dátum és ${maxValue} záró dátum",
    "errorsInApplyEdits": "Nem sikerült elküldeni a jelentést.",
    "attachmentSelectedMsg": "csatolmány kiválasztva",
    "attachmentUploadStatus": "${failed} csatolmányt nem sikerült feltölteni (összesen: ${total}).",
    "attachmentDeleteStatus": "${failed} csatolmányt nem sikerült törölni (összesen: ${total}).",
    "featureUpdateStatus": "${failed} vektoros elemet nem sikerült frissíteni (összesen: ${total}).",
    "geoLocationError": "Az aktuális hely nem érhető el",
    "geoLocationOutOfExtent": "Az aktuális hely az alaptérkép kiterjedésén kívül van",
    "submitButtonTooltip": "Mentés",
    "cancelButtonTooltip": "Mégse",
    "geoformBackButtonTooltip": "Vissza a jelentéslistához",
    "updateFeaturesConfirmationMsg": "${count} vektoros elem lesz frissítve",
    "attachmentHeaderText": "Csatolmányok",
    "unknownPopupAttachment": "FÁJL",
    "unableToEditPopupMessage": "Nincs engedélye a művelet végrehajtására.",
    "invalidFeatureCreatorMessage": "Ön nem jogosult a vektoros elem szerkesztésére.",
    "userSpecificFeatureUpdateMessage": "Kizárólag a(z) ${username} felhasználó által létrehozott vektoros elemek frissültek.",
    "anonymousUserText": "Névtelen"
  },
  "mapViewer": {
    "zoomInToolTip": "Nagyítás",
    "zoomOutToolTip": "Kicsinyítés"
  },
  "applicationHeader": {
    "signInOption": "Bejelentkezés",
    "signOutOption": "Kijelentkezés",
    "pleaseSignInText": "Jelentkezzen be"
  },
  "dataviewer": {
    "noIssuesReported": "Nincsenek elérhető jelentések",
    "noFeatureGeometry": "A vektoros elem nem jeleníthető meg",
    "ascendingFlagTitle": "Rendezés növekvő sorrendben",
    "descendingFlagTitle": "Rendezés csökkenő sorrendben",
    "filterLabel": "Szűrő",
    "valueRadioButtonLabel": "Érték",
    "uniqueRadioButtonLabel": "Egyedi",
    "selectLayerToBegin": "Válasszon ki egy kategóriát a kezdéshez",
    "layerFeatureCount": "${selectedFeatureCount} kiválasztva / ${featureCount} rekord",
    "exportToCsvSuccessMessage": "A CSV-fájl exportálása sikeres volt.",
    "exportToCsvErrorMessage": "Hiba történt a kiválasztott vektoros elemek CSV-fájlba történő exportálása során. Próbálja meg újra.",
    "exportToCSVButtonTooltip": "Exportálás CSV-fájlba.",
    "showAllButtonTooltip": "Összes megjelenítése",
    "showSelectedButtonTooltip": "Kiválasztott elemek megjelenítése",
    "selectAllButtonTooltip": "Összes kijelölése",
    "clearSelectionButtonTooltip": "Kiválasztás megszüntetése"
  },
  "timeSlider": {
    "timeSliderLabel": "Időtartomány",
    "timeSliderInEditModeAlert": "Az Idő csúszka szerkesztés közben nem érhető el"
  },
  "comment": {
    "commentsFormSubmitButton": "Mentés",
    "commentsFormCancelButton": "Mégse",
    "errorInSubmittingComment": "Nem sikerült menteni a módosításokat.",
    "emptyCommentMessage": "Értéket kell megadni",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nincsenek elérhető rekordok",
    "remainingTextCount": "${0} karakter maradt",
    "showNoText": "Nem",
    "selectAttachments": "Csatolmányok",
    "selectFileText": "Tallózás",
    "attachmentSelectedMsg": "csatolmány kiválasztva",
    "attachmentHeaderText": "Csatolmányok",
    "addRecordText": "Rekord hozzáadása",
    "unknownCommentAttachment": "FÁJL",
    "unableToAddOrEditCommentMessage": "Nincs engedélye a művelet végrehajtására."
  },
  "main": {
    "noGroup": "Nincs konfigurálva csoport",
    "basemapGalleryText": "Alaptérkép-galéria",
    "legendText": "Jelmagyarázat",
    "featureNotFoundMessage": "A kért vektoros elem nem található"
  },
  "search": {
    "searchIconTooltip": "Keresés a rétegben",
    "clearSearchIconTooltip": "Keresés törlése",
    "noResultFoundText": "Nincs találat",
    "searchInEditModeAlert": "A keresés szerkesztés közben nem érhető el"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Frissítés",
    "confirmManualRefreshText": "Minden kijelölés és nem mentett módosítás figyelmen kívül lesz hagyva",
    "confirmHardRefreshText": "Minden szűrőt, kijelölést és nem mentett módosítást elvet a rendszer"
  },
  "help": {
    "helpIconTooltip": "Súgó"
  },
  "filter": {
    "noFeatureFoundText": "Nem található vektoros elem ehhez az értékhez.",
    "distinctQueryFailed": "Nincsenek egyedi értékek a mezőhöz.",
    "andText": "és",
    "filterInEditModeAlert": "A szűrők szerkesztés közben nem érhetők el.",
    "dropdownSelectOption": "Kiválasztás",
    "filterInShowSelectedEditModeAlert": "A szűrők a „Kiválasztott elemek megjelenítése” módban nem érhetők el."
  },
  "detailsPanel": {
    "editContentText": "Rekord szerkesztése"
  },
  "signOutPage": {
    "signOutMessage": "Sikeresen kijelentkezett",
    "reSignInMessage": "Kattintson ide a bejelentkezéshez"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Kiválasztási beállítások",
    "showAllOptionText": "Összes megjelenítése",
    "showSelectedOptionText": "Kiválasztott elemek megjelenítése"
  }
});