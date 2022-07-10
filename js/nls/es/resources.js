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
    "error": "No se puede crear el mapa",
    "licenseError": {
      "message": "Su cuenta no tiene licencia para utilizar aplicaciones configurables que no son públicas. Pídale al administrador de su organización que le asigne un tipo de usuario que incluya aplicaciones esenciales o una licencia complementaria de aplicaciones esenciales.",
      "title": "Sin licencia"
    },
    "warningMessageTitle": "Compatibilidad limitada de navegadores",
    "warningMessageAGOL": "Está usando un navegador que es obsoleto. Es posible que algunas partes de esta aplicación no funcionen de forma óptima, o no funcionen en absoluto, en este navegador. La compatibilidad para este navegador se interrumpirá en el futuro.</br></br>Utilice las últimas versiones de <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> o <edge-link>Microsoft Edge</edge-link>.</br></br>Para obtener más información sobre la compatibilidad de navegadores, consulte nuestra documentación. Proporcione sus comentarios a través de <feedback-link>GeoNet, la comunidad de Esri</feedback-link>.",
    "warningMessageEnterprise": "Está usando un navegador que ya no es compatible. Es posible que algunas partes de esta aplicación no funcionen de forma óptima, o no funcionen en absoluto, en este navegador.</br></br>Utilice las últimas versiones de <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> o <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Propietario",
    "created": "Fecha creada",
    "modified": "Fecha de modificación",
    "description": "Descripción",
    "snippet": "Resumen",
    "licenseInfo": "Restricciones de acceso y uso",
    "accessInformation": "Créditos",
    "tags": "Etiquetas",
    "numViews": "Número de vistas",
    "avgRating": "Calificación",
    "noWebMapInGroup": "El grupo configurado no es válido o todavía no se han compartido elementos con este grupo",
    "infoBtnToolTip": "Información del mapa",
    "openWebmapList": "Abrir panel",
    "closeWebmapList": "Cerrar panel"
  },
  "geoform": {
    "enterInformation": "Detalles",
    "selectAttachments": "Adjuntos",
    "selectFileText": "Examinar",
    "enterLocation": "Ubicación",
    "reportItButton": "Enviar",
    "cancelButton": "Cancelar",
    "requiredField": "(necesario)",
    "selectDefaultText": "Seleccionar&hellip;",
    "invalidInputValue": "Introduce un valor válido.",
    "noFieldsConfiguredMessage": "Los campos de la capa no están configurados para capturar datos",
    "invalidSmallNumber": "Introduce un entero",
    "invalidNumber": "Introduce un entero",
    "invalidFloat": "Por favor, entre un número",
    "invalidDouble": "Por favor, entre un número",
    "requiredFields": "Indica valores para todos los campos obligatorios",
    "selectLocation": "Selecciona la ubicación para el informe",
    "numericRangeHintMessage": "${openStrong}Sugerencia:${closeStrong} Valor mínimo ${minValue} y valor máximo ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Sugerencia:${closeStrong} Fecha mínima ${minValue} y fecha máxima ${maxValue}",
    "errorsInApplyEdits": "No se pudo enviar el informe.",
    "attachmentSelectedMsg": "adjuntos seleccionados",
    "attachmentUploadStatus": "Error al cargar ${failed} de ${total} adjuntos.",
    "attachmentDeleteStatus": "Error al eliminar ${failed} de ${total} adjuntos.",
    "featureUpdateStatus": "Error al actualizar ${failed} de ${total} adjuntos.",
    "geoLocationError": "Ubicación actual no disponible",
    "geoLocationOutOfExtent": "La ubicación actual está fuera de la extensión del mapa base",
    "submitButtonTooltip": "Guardar",
    "cancelButtonTooltip": "Cancelar",
    "geoformBackButtonTooltip": "Volver a la lista de informes",
    "updateFeaturesConfirmationMsg": "${count} entidades se actualizarán",
    "attachmentHeaderText": "Adjuntos",
    "unknownPopupAttachment": "ARCHIVO",
    "unableToEditPopupMessage": "No tiene permiso para realizar esta acción.",
    "invalidFeatureCreatorMessage": "No tiene autorización para editar esta entidad.",
    "userSpecificFeatureUpdateMessage": "Solamente se han actualizado las entidades creadas por ${username}.",
    "anonymousUserText": "Anónimo"
  },
  "mapViewer": {
    "zoomInToolTip": "Acercar",
    "zoomOutToolTip": "Alejar"
  },
  "applicationHeader": {
    "signInOption": "Iniciar sesión",
    "signOutOption": "Cerrar sesión",
    "pleaseSignInText": "Inicia sesión"
  },
  "dataviewer": {
    "noIssuesReported": "No hay informes disponibles",
    "noFeatureGeometry": "No se puede mostrar la entidad",
    "ascendingFlagTitle": "Orden ascendente",
    "descendingFlagTitle": "Orden descendente",
    "filterLabel": "Filtro",
    "valueRadioButtonLabel": "Valor",
    "uniqueRadioButtonLabel": "Única",
    "selectLayerToBegin": "Seleccione una categoría para empezar",
    "layerFeatureCount": "${selectedFeatureCount} seleccionadas / ${featureCount} registros",
    "exportToCsvSuccessMessage": "Archivo CSV exportado correctamente.",
    "exportToCsvErrorMessage": "Error al exportar las entidades seleccionadas a un archivo CSV. Inténtelo de nuevo.",
    "exportToCSVButtonTooltip": "Exportar a CSV",
    "showAllButtonTooltip": "Mostrar todo",
    "showSelectedButtonTooltip": "Mostrar seleccionado",
    "selectAllButtonTooltip": "Seleccionar todo",
    "clearSelectionButtonTooltip": "Borrar selección"
  },
  "timeSlider": {
    "timeSliderLabel": "Rango de tiempo",
    "timeSliderInEditModeAlert": "El control deslizante de tiempo no está disponible durante la edición"
  },
  "comment": {
    "commentsFormSubmitButton": "Guardar",
    "commentsFormCancelButton": "Cancelar",
    "errorInSubmittingComment": "Los cambios no se pueden guardar.",
    "emptyCommentMessage": "Valor obligatorio",
    "placeHolderText": "",
    "noCommentsAvailableText": "No hay registros disponibles",
    "remainingTextCount": "${0} caracteres restantes",
    "showNoText": "No",
    "selectAttachments": "Adjuntos",
    "selectFileText": "Examinar",
    "attachmentSelectedMsg": "adjuntos seleccionados",
    "attachmentHeaderText": "Adjuntos",
    "addRecordText": "Agregar registro",
    "unknownCommentAttachment": "ARCHIVO",
    "unableToAddOrEditCommentMessage": "No tiene permiso para realizar esta acción."
  },
  "main": {
    "noGroup": "No hay ningún grupo configurado",
    "basemapGalleryText": "Galería de mapas base",
    "legendText": "Leyenda",
    "featureNotFoundMessage": "No se encontró la entidad solicitada"
  },
  "search": {
    "searchIconTooltip": "Buscar en esta capa",
    "clearSearchIconTooltip": "Borrar búsqueda",
    "noResultFoundText": "Ningún resultado encontrado",
    "searchInEditModeAlert": "La búsqueda no está disponible durante la edición"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Actualizar",
    "confirmManualRefreshText": "Se descartarán todas las seleccione y cambios sin guardar",
    "confirmHardRefreshText": "Se descartarán todos los filtros, todas las selecciones y todos los cambios sin guardar"
  },
  "help": {
    "helpIconTooltip": "Ayuda"
  },
  "filter": {
    "noFeatureFoundText": "No se ha encontrado ninguna entidad para este valor.",
    "distinctQueryFailed": "No se han encontrado valores diferenciados para el campo.",
    "andText": "y",
    "filterInEditModeAlert": "Los filtros no están disponibles durante la edición.",
    "dropdownSelectOption": "Seleccionar",
    "filterInShowSelectedEditModeAlert": "Los filtros no están disponibles en el modo \"Mostrar seleccionado\"",
    "operatorIs": "Es",
    "operatorIsNot": "No es",
    "stringOperatorStartsWith": "Comienza por",
    "stringOperatorEndsWith": "Termina en",
    "stringOperatorContains": "Contiene",
    "stringOperatorDoesNotContain": "No contiene",
    "operatorIsBlank": "Está en blanco",
    "operatorIsNotBlank": "No está en blanco",
    "numberOperatorIsAtLeast": "Es como mínimo",
    "numberOperatorIsLessThan": "Es menor que",
    "numberOperatorIsAtMost": "Es como máximo",
    "numberOperatorIsGreaterThan": "Es mayor que",
    "numberOperatorIsBetween": "Está entre",
    "numberOperatorIsNotBetween": "No está entre"
  },
  "detailsPanel": {
    "editContentText": "Editar registro"
  },
  "signOutPage": {
    "signOutMessage": "Has cerrado sesión correctamente",
    "reSignInMessage": "Haz clic aquí para iniciar sesión"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opciones de selección",
    "showAllOptionText": "Mostrar todo",
    "showSelectedOptionText": "Mostrar seleccionado"
  }
});