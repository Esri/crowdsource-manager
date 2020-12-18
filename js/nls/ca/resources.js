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
    "error": "No es pot crear el mapa",
    "licenseError": {
      "message": "El vostre compte no té llicència per utilitzar aplicacions configurables que no siguin públiques. Demaneu a l'administrador de l'organització que us assigni un tipus d'usuari que inclogui les aplicacions bàsiques o una llicència d'aplicacions bàsiques de complement.",
      "title": "Sense llicència"
    },
    "warningMessageTitle": "Suport limitat per al navegador",
    "warningMessageAGOL": "Esteu utilitzant un navegador que està obsolet. És possible que algunes parts d'aquesta aplicació no funcionin de manera òptima o que no funcionin en aquest navegador. Aquest navegador deixarà de ser compatible.</br></br>Utilitzeu les versions més recents del <chrome-link>Google Chrome</chrome-link>, el <firefox-link>Mozilla Firefox</firefox-link>, l'<safari-link>Apple Safari</safari-link> o el <edge-link>Microsoft Edge</edge-link>.</br></br>Per obtenir més informació sobre la compatibilitat amb els navegadors, consulteu la nostra documentació. Valoreu-nos a través de <feedback-link>GeoNet, la Comunitat d’Esri</feedback-link>.",
    "warningMessageEnterprise": "Esteu utilitzant un navegador que ja no és compatible. És possible que algunes parts d'aquesta aplicació no funcionin de manera òptima o que no funcionin en aquest navegador.</br></br>Utilitzeu les versions més recents del <chrome-link>Google Chrome</chrome-link>, el <firefox-link>Mozilla Firefox</firefox-link>, l'<safari-link>Apple Safari</safari-link> o el <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Propietari",
    "created": "Data de creació",
    "modified": "Data de modificació",
    "description": "Descripció",
    "snippet": "Resum",
    "licenseInfo": "Restriccions d'ús i d'accés",
    "accessInformation": "Crèdits",
    "tags": "Etiquetes",
    "numViews": "Nombre de visualitzacions",
    "avgRating": "Qualificació",
    "noWebMapInGroup": "El grup que s'ha configurat no és vàlid o no s'ha compartit cap element amb aquest grup encara",
    "infoBtnToolTip": "Informació del mapa",
    "openWebmapList": "Obre la subfinestra",
    "closeWebmapList": "Tanca la subfinestra"
  },
  "geoform": {
    "enterInformation": "Detalls",
    "selectAttachments": "Fitxers adjunts",
    "selectFileText": "Navega",
    "enterLocation": "Ubicació",
    "reportItButton": "Envia",
    "cancelButton": "Cancel·la",
    "requiredField": "(obligatori)",
    "selectDefaultText": "Selecciona&hellip;",
    "invalidInputValue": "Introduïu un valor vàlid.",
    "noFieldsConfiguredMessage": "Els camps de la capa no estan configurats per capturar dades",
    "invalidSmallNumber": "Introduïu un enter",
    "invalidNumber": "Introduïu un enter",
    "invalidFloat": "Introduïu un nombre",
    "invalidDouble": "Introduïu un nombre",
    "requiredFields": "Proporcioneu valors per a tots els camps obligatoris",
    "selectLocation": "Seleccioneu la ubicació per a l'informe",
    "numericRangeHintMessage": "${openStrong}Suggeriment:${closeStrong} valor mínim ${minValue} i valor màxim ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Suggeriment:${closeStrong} data mínima ${minValue} i data màxima ${maxValue}",
    "errorsInApplyEdits": "L'informe no s'ha pogut enviar.",
    "attachmentSelectedMsg": "fitxers adjunts seleccionats",
    "attachmentUploadStatus": "No s'han pogut pujar ${failed} de ${total} fitxers adjunts.",
    "attachmentDeleteStatus": "No s'han pogut suprimir ${failed} de ${total} fitxers adjunts.",
    "featureUpdateStatus": "No s'han pogut actualitzar ${failed} de ${total} entitats.",
    "geoLocationError": "Ubicació actual no disponible",
    "geoLocationOutOfExtent": "La ubicació actual està fora de l'extensió del mapa base",
    "submitButtonTooltip": "Desa",
    "cancelButtonTooltip": "Cancel·la",
    "geoformBackButtonTooltip": "Torna a la llista d'informes",
    "updateFeaturesConfirmationMsg": "${count} entitats s'actualitzaran",
    "attachmentHeaderText": "Fitxers adjunts",
    "unknownPopupAttachment": "FILE",
    "unableToEditPopupMessage": "No teniu permís per fer aquesta acció.",
    "invalidFeatureCreatorMessage": "No teniu autorització per editar aquesta entitat.",
    "userSpecificFeatureUpdateMessage": "Només s'han actualitzat les entitats que ha creat ${username}.",
    "anonymousUserText": "Anònim"
  },
  "mapViewer": {
    "zoomInToolTip": "Amplia",
    "zoomOutToolTip": "Redueix"
  },
  "applicationHeader": {
    "signInOption": "Inicia la sessió",
    "signOutOption": "Tanca la sessió",
    "pleaseSignInText": "Inicieu la sessió"
  },
  "dataviewer": {
    "noIssuesReported": "No hi ha cap informe disponible",
    "noFeatureGeometry": "L'entitat no es pot mostrar",
    "ascendingFlagTitle": "Ordena en ordre ascendent",
    "descendingFlagTitle": "Ordena en ordre descendent",
    "filterLabel": "Filtre",
    "valueRadioButtonLabel": "Valor",
    "uniqueRadioButtonLabel": "Únic",
    "selectLayerToBegin": "Seleccioneu una categoria per començar",
    "layerFeatureCount": "${selectedFeatureCount} seleccionades/${featureCount} registres",
    "exportToCsvSuccessMessage": "El fitxer CSV s'ha exportat correctament.",
    "exportToCsvErrorMessage": "Error en exportar les entitats seleccionades al fitxer CSV. Torneu-ho a provar.",
    "exportToCSVButtonTooltip": "Exporta a CSV",
    "showAllButtonTooltip": "Mostra-ho tot",
    "showSelectedButtonTooltip": "Mostra els seleccionats",
    "selectAllButtonTooltip": "Selecciona-ho tot",
    "clearSelectionButtonTooltip": "Esborra la selecció"
  },
  "timeSlider": {
    "timeSliderLabel": "Interval de temps",
    "timeSliderInEditModeAlert": "El control lliscant de temps no està disponible durant l'edició"
  },
  "comment": {
    "commentsFormSubmitButton": "Desa",
    "commentsFormCancelButton": "Cancel·la",
    "errorInSubmittingComment": "Els canvis no s'han pogut desar.",
    "emptyCommentMessage": "Valor necessari",
    "placeHolderText": "",
    "noCommentsAvailableText": "No hi ha cap registre disponible",
    "remainingTextCount": "${0} caràcters restants",
    "showNoText": "No",
    "selectAttachments": "Fitxers adjunts",
    "selectFileText": "Navega",
    "attachmentSelectedMsg": "fitxers adjunts seleccionats",
    "attachmentHeaderText": "Fitxers adjunts",
    "addRecordText": "Afegeix un registre",
    "unknownCommentAttachment": "FILE",
    "unableToAddOrEditCommentMessage": "No teniu permís per fer aquesta acció."
  },
  "main": {
    "noGroup": "No hi ha cap grup configurat",
    "basemapGalleryText": "Galeria de mapes base",
    "legendText": "Llegenda",
    "featureNotFoundMessage": "L'entitat sol·licitada no s'ha trobat"
  },
  "search": {
    "searchIconTooltip": "Cerca en aquesta capa",
    "clearSearchIconTooltip": "Esborra la cerca",
    "noResultFoundText": "No s'ha trobat cap resultat",
    "searchInEditModeAlert": "La cerca no està disponible durant l'edició"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Actualitza",
    "confirmManualRefreshText": "Es descartaran totes les seleccions i els canvis sense desar",
    "confirmHardRefreshText": "Es descartaran tots els filtres, totes les seleccions i tots els canvis sense desar"
  },
  "help": {
    "helpIconTooltip": "Ajuda"
  },
  "filter": {
    "noFeatureFoundText": "No s'ha trobat cap entitat per a aquest valor.",
    "distinctQueryFailed": "No s'ha trobat cap valor diferenciat per al camp.",
    "andText": "i",
    "filterInEditModeAlert": "Els filtres no estan disponibles durant l'edició.",
    "dropdownSelectOption": "Selecciona",
    "filterInShowSelectedEditModeAlert": "Els filtres no estan disponibles en el mode \"Mostra els seleccionats\"."
  },
  "detailsPanel": {
    "editContentText": "Edita el registre"
  },
  "signOutPage": {
    "signOutMessage": "Heu tancat la sessió correctament",
    "reSignInMessage": "Feu clic aquí per iniciar la sessió"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opcions de selecció",
    "showAllOptionText": "Mostra-ho tot",
    "showSelectedOptionText": "Mostra els seleccionats"
  }
});