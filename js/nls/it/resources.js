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
    "error": "Impossibile creare la mappa",
    "licenseError": {
      "message": "L’account non dispone della licenza per l’uso di app configurabili non pubbliche. È necessario richiedere all’amministratore dell'organizzazione l’assegnazione di un tipo di utente che includa le app essenziali o una licenza aggiuntiva per le app essenziali.",
      "title": "Non Licenziato"
    }
  },
  "webMapList": {
    "owner": "Proprietario",
    "created": "Data creazione",
    "modified": "Data modifica",
    "description": "Descrizione",
    "snippet": "Riepilogo",
    "licenseInfo": "Vincoli di accesso e uso",
    "accessInformation": "Crediti",
    "tags": "Tag",
    "numViews": "Numero di visualizzazioni",
    "avgRating": "Classificazione",
    "noWebMapInGroup": "Il gruppo configurato non è valido oppure non sono stati ancora condivisi elementi con il gruppo.",
    "infoBtnToolTip": "Informazioni mappa",
    "openWebmapList": "Apri riquadro",
    "closeWebmapList": "Chiudi pannello"
  },
  "geoform": {
    "enterInformation": "Dettagli",
    "selectAttachments": "Allegati",
    "selectFileText": "Esplora",
    "enterLocation": "Posizione",
    "reportItButton": "Invia",
    "cancelButton": "Annulla",
    "requiredField": "(obbligatorio)",
    "selectDefaultText": "Seleziona&hellip;",
    "invalidInputValue": "Immettere un valore valido.",
    "noFieldsConfiguredMessage": "I campi del layer non sono configurati per acquisire dati",
    "invalidSmallNumber": "Immettere un numero intero",
    "invalidNumber": "Immettere un numero intero",
    "invalidFloat": "Si prega di immettere un numero",
    "invalidDouble": "Si prega di immettere un numero",
    "requiredFields": "Specificare valori per tutti i campi obbligatori",
    "selectLocation": "Selezionare la posizione del report",
    "numericRangeHintMessage": "${openStrong}Suggerimento:${closeStrong} valore minimo ${minValue} e valore massimo ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Suggerimento:${closeStrong} data minima ${minValue} e data massima ${maxValue}",
    "errorsInApplyEdits": "Impossibile inviare il rapporto.",
    "attachmentSelectedMsg": "allegato/i selezionato/i",
    "attachmentUploadStatus": "Impossibile caricare ${failed} di ${total} allegati.",
    "attachmentDeleteStatus": "Impossibile eliminare ${failed} di ${total} allegati.",
    "featureUpdateStatus": "Impossibile aggiornare ${failed} di ${total} allegati.",
    "geoLocationError": "Posizione corrente non disponibile",
    "geoLocationOutOfExtent": "Posizione corrente esterna all'estensione della mappa di base",
    "submitButtonTooltip": "Salva",
    "cancelButtonTooltip": "Annulla",
    "geoformBackButtonTooltip": "Torna all'elenco dei report",
    "updateFeaturesConfirmationMsg": "${count} feature verranno aggiornate",
    "attachmentHeaderText": "Allegati",
    "unknownPopupAttachment": "FILE",
    "unableToEditPopupMessage": "Non si è autorizzati a completare questa azione.",
    "invalidFeatureCreatorMessage": "Non si è autorizzati a modificare questa feature.",
    "userSpecificFeatureUpdateMessage": "Sono state aggiornate solo le feature create da ${username}.",
    "anonymousUserText": "Anonimo"
  },
  "mapViewer": {
    "zoomInToolTip": "Zoom avanti",
    "zoomOutToolTip": "Zoom indietro"
  },
  "applicationHeader": {
    "signInOption": "Accedi",
    "signOutOption": "Esci",
    "pleaseSignInText": "Effettuare l'accesso"
  },
  "dataviewer": {
    "noIssuesReported": "Nessun report disponibile",
    "noFeatureGeometry": "Impossibile visualizzare la feature",
    "ascendingFlagTitle": "Ordina in ordine crescente",
    "descendingFlagTitle": "Ordina in ordine decrescente",
    "filterLabel": "Filtro",
    "valueRadioButtonLabel": "Valore",
    "uniqueRadioButtonLabel": "Unico",
    "selectLayerToBegin": "Selezionare una categoria per iniziare",
    "layerFeatureCount": "${selectedFeatureCount} selezionato/ ${featureCount} record",
    "exportToCsvSuccessMessage": "File CSV esportato correttamente.",
    "exportToCsvErrorMessage": "Errore durante l'esportazione delle feature selezionate nel file CSV. Riprovare.",
    "exportToCSVButtonTooltip": "Esporta in CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Intervallo temporale",
    "timeSliderInEditModeAlert": "Cursore temporale non disponibile durante la modifica"
  },
  "comment": {
    "commentsFormSubmitButton": "Salva",
    "commentsFormCancelButton": "Annulla",
    "errorInSubmittingComment": "Impossibile salvare le modifiche.",
    "emptyCommentMessage": "Valore obbligatorio",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nessun record disponibile",
    "remainingTextCount": "${0} caratteri rimanenti",
    "showNoText": "No",
    "selectAttachments": "Allegati",
    "selectFileText": "Esplora",
    "attachmentSelectedMsg": "allegato/i selezionato/i",
    "attachmentHeaderText": "Allegati",
    "addRecordText": "Aggiungi record",
    "unknownCommentAttachment": "FILE",
    "unableToAddOrEditCommentMessage": "Non si è autorizzati a completare questa azione."
  },
  "main": {
    "noGroup": "Nessun gruppo configurato",
    "basemapGalleryText": "Galleria di mappe di base",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Feature richiesta non trovata"
  },
  "search": {
    "searchIconTooltip": "Cerca nel layer",
    "noResultFoundText": "Nessun risultato trovato",
    "searchInEditModeAlert": "Ricerca non disponibile durante la modifica"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Aggiorna",
    "confirmManualRefreshText": "Tutte le selezioni e le modifiche non salvate verranno ignorate"
  },
  "help": {
    "helpIconTooltip": "Guida"
  },
  "filter": {
    "noFeatureFoundText": "Nessuna feature trovata per questo valore.",
    "distinctQueryFailed": "Nessun valore distinto trovato per il campo.",
    "andText": "e",
    "filterInEditModeAlert": "Filtri non disponibili durante la modifica.",
    "dropdownSelectOption": "Seleziona",
    "filterInShowSelectedEditModeAlert": "Filtri non disponibili nella modalità 'Mostra selezionate'."
  },
  "detailsPanel": {
    "editContentText": "Modifica record"
  },
  "signOutPage": {
    "signOutMessage": "Disconnessione riuscita",
    "reSignInMessage": "Fare clic qui per effettuare l'accesso"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opzioni di selezione",
    "showAllOptionText": "Mostra tutto",
    "showSelectedOptionText": "Mostra selezionate"
  }
});