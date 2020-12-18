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
    "error": "Imposibil de creat harta",
    "licenseError": {
      "message": "Contul dvs. nu este licențiat să utilizeze aplicații configurabile care nu sunt publice. Solicitați-i administratorului organizației să vă aloce un tip de utilizator care include aplicații esențiale sau o licență pentru aplicații esențiale de completare.",
      "title": "Nelicențiat"
    },
    "warningMessageTitle": "Asistență limitată pentru browser",
    "warningMessageAGOL": "Folosiți un browser depășit. Unele părți ale acestei aplicații pot să nu funcționeze optim sau deloc în acest browser. Asistența pentru acest browser va fi întreruptă în curând.</br></br>Utilizați ultimele versiuni <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> sau <edge-link>Microsoft Edge</edge-link>.</br></br>Pentru mai multe informații privind asistența pentru browser, consultați documentația noastră. Oferiți feedback prin <feedback-link>GeoNet, Comunitatea Esri</feedback-link>.",
    "warningMessageEnterprise": "Folosiți un browser care nu mai este acceptat. Unele părți ale acestei aplicații pot să nu funcționeze la nivel optim sau deloc în acest browser.</br></br>Utilizați ultimele versiuni <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> sau <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Proprietar",
    "created": "Data creării",
    "modified": "Dată modificată",
    "description": "Descriere",
    "snippet": "Rezumat",
    "licenseInfo": "Reguli de accesare şi utilizare",
    "accessInformation": "Credite",
    "tags": "Etichete",
    "numViews": "Număr de vizualizări",
    "avgRating": "Calificativ",
    "noWebMapInGroup": "Grupul configurat nu este valid sau niciun element nu a fost încă partajat cu grupul",
    "infoBtnToolTip": "Informaţii hartă",
    "openWebmapList": "Deschidere panou",
    "closeWebmapList": "Închidere panou"
  },
  "geoform": {
    "enterInformation": "Detalii",
    "selectAttachments": "Ataşări",
    "selectFileText": "Parcurgere",
    "enterLocation": "Locaţie",
    "reportItButton": "Trimitere",
    "cancelButton": "Anulare",
    "requiredField": "(obligatoriu)",
    "selectDefaultText": "Selectare&hellip;",
    "invalidInputValue": "Introduceţi o valoare validă.",
    "noFieldsConfiguredMessage": "Câmpurile straturilor tematice nu sunt configurate pentru a captura datele",
    "invalidSmallNumber": "Introduceţi un număr întreg",
    "invalidNumber": "Introduceţi un număr întreg",
    "invalidFloat": "Introduceţi un număr",
    "invalidDouble": "Introduceţi un număr",
    "requiredFields": "Furnizaţi valorile pentru toate câmpurile obligatorii",
    "selectLocation": "Selectaţi locaţia pentru raport",
    "numericRangeHintMessage": "${openStrong}Sugestie:${closeStrong} Valoarea minimă ${minValue} şi valoarea maximă ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Sugestie:${closeStrong} Data minimă ${minValue} şi Data maximă ${maxValue}",
    "errorsInApplyEdits": "Raportul nu a putut fi transmis.",
    "attachmentSelectedMsg": "ataşări selectate",
    "attachmentUploadStatus": "${failed} din ${total} ataşări nu au fost încărcate.",
    "attachmentDeleteStatus": "${failed} din ${total} ataşări nu au fost șterse.",
    "featureUpdateStatus": "${failed} din ${total} obiecte spaţiale nu au fost actualizate.",
    "geoLocationError": "Locaţia curentă nu este disponibilă",
    "geoLocationOutOfExtent": "Locaţia curentă se află în afara extinderii hărţii fundal",
    "submitButtonTooltip": "Salvare",
    "cancelButtonTooltip": "Anulare",
    "geoformBackButtonTooltip": "Reveniţi la lista de rapoarte",
    "updateFeaturesConfirmationMsg": "${count} obiecte spaţiale vor fi actualizate",
    "attachmentHeaderText": "Ataşări",
    "unknownPopupAttachment": "FIŞIER",
    "unableToEditPopupMessage": "Nu aveţi permisiunea pentru a efectua această acţiune.",
    "invalidFeatureCreatorMessage": "Nu sunteţi autorizat să editați acest obiect spaţial.",
    "userSpecificFeatureUpdateMessage": "Doar obiectele spațial create de ${username} au fost actualizate.",
    "anonymousUserText": "Anonim"
  },
  "mapViewer": {
    "zoomInToolTip": "Mărire",
    "zoomOutToolTip": "Micşorare"
  },
  "applicationHeader": {
    "signInOption": "Autentificare",
    "signOutOption": "Deconectare",
    "pleaseSignInText": "Autentificaţi-vă"
  },
  "dataviewer": {
    "noIssuesReported": "Nu există niciun raport disponibil",
    "noFeatureGeometry": "Obiectul spaţial nu poate fi afişat",
    "ascendingFlagTitle": "Sortare ascendentă",
    "descendingFlagTitle": "Sortare descendentă",
    "filterLabel": "Filtrare",
    "valueRadioButtonLabel": "Valoare",
    "uniqueRadioButtonLabel": "Unic",
    "selectLayerToBegin": "Selectaţi o categorie pentru a începe",
    "layerFeatureCount": "${selectedFeatureCount} selectat / ${featureCount} înregistrări",
    "exportToCsvSuccessMessage": "Fișierul CSV exportat cu succes.",
    "exportToCsvErrorMessage": "Eroare la exportarea obiectelor spaţiale selectate în fișierul CSV. Încercați din nou.",
    "exportToCSVButtonTooltip": "Export în CSV",
    "showAllButtonTooltip": "Afișare toate+",
    "showSelectedButtonTooltip": "Afişare obiecte selectate",
    "selectAllButtonTooltip": "Selectare toate",
    "clearSelectionButtonTooltip": "Golire selecţie"
  },
  "timeSlider": {
    "timeSliderLabel": "Interval de timp",
    "timeSliderInEditModeAlert": "Glisorul de timp nu este disponibil în timpul editării"
  },
  "comment": {
    "commentsFormSubmitButton": "Salvare",
    "commentsFormCancelButton": "Anulare",
    "errorInSubmittingComment": "Modificările nu au putut fi salvate.",
    "emptyCommentMessage": "Este necesară o valoare",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nu există înregistrări disponibile",
    "remainingTextCount": "${0} caractere rămase",
    "showNoText": "Nu",
    "selectAttachments": "Ataşări",
    "selectFileText": "Parcurgere",
    "attachmentSelectedMsg": "ataşări selectate",
    "attachmentHeaderText": "Ataşări",
    "addRecordText": "Adăugare înregistrare",
    "unknownCommentAttachment": "FIŞIER",
    "unableToAddOrEditCommentMessage": "Nu aveţi permisiunea pentru a efectua această acţiune."
  },
  "main": {
    "noGroup": "Niciun grup configurat",
    "basemapGalleryText": "Galerie de hărţi fundal",
    "legendText": "Legendă",
    "featureNotFoundMessage": "Obiectul spaţial nu a fost găsit"
  },
  "search": {
    "searchIconTooltip": "Căutare în acest strat tematic",
    "clearSearchIconTooltip": "Ștergeți căutarea",
    "noResultFoundText": "Nu a fost găsit niciun rezultat",
    "searchInEditModeAlert": "Căutarea nu este disponibilă în timpul editării"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Reîmprospătare",
    "confirmManualRefreshText": "Toate selecţiile şi modificările nesalvate vor fi eliminate",
    "confirmHardRefreshText": "Toate filtrele, selecțiile şi modificările nesalvate vor fi eliminate"
  },
  "help": {
    "helpIconTooltip": "Ajutor"
  },
  "filter": {
    "noFeatureFoundText": "Nu a fost găsit niciun obiect spaţia pentru această valoare.",
    "distinctQueryFailed": "Nu există valori distincte pentru câmp.",
    "andText": "şi",
    "filterInEditModeAlert": "Filtrele nu sunt disponibile în timpul editării.",
    "dropdownSelectOption": "Selectare",
    "filterInShowSelectedEditModeAlert": "Filtrele nu sunt disponibile în modul „Afişare elemente selectate”."
  },
  "detailsPanel": {
    "editContentText": "Editare înregistrare"
  },
  "signOutPage": {
    "signOutMessage": "V-aţi deconectat cu succes",
    "reSignInMessage": "Faceţi clic aici pentru a vă autentifica"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opţiuni selecţie",
    "showAllOptionText": "Afişare toate+",
    "showSelectedOptionText": "Afişare obiecte selectate"
  }
});