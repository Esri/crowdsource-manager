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
    "error": "Karte kann nicht erstellt werden",
    "licenseError": {
      "message": "Ihr Konto ist nicht für die Verwendung von nicht öffentlichen konfigurierbaren Apps lizenziert. Bitten Sie den Administrator der Organisation, Ihnen einen Benutzertyp mit Essential Apps oder eine Add-On-Lizenz für Essential Apps zuzuweisen.",
      "title": "Nicht lizenziert"
    }
  },
  "webMapList": {
    "owner": "Besitzer",
    "created": "Erstellungsdatum",
    "modified": "Änderungsdatum",
    "description": "Beschreibung",
    "snippet": "Zusammenfassung",
    "licenseInfo": "Zugriffs- und Nutzungsbeschränkungen",
    "accessInformation": "Quellennachweise",
    "tags": "Tags",
    "numViews": "Anzahl der Aufrufe",
    "avgRating": "Bewertung",
    "noWebMapInGroup": "Die konfigurierte Gruppe ist ungültig oder es wurden noch keine Elemente für diese Gruppe freigegeben",
    "infoBtnToolTip": "Karteninformationen",
    "openWebmapList": "Bereich öffnen",
    "closeWebmapList": "Bereich schließen"
  },
  "geoform": {
    "enterInformation": "Details",
    "selectAttachments": "Anlagen",
    "selectFileText": "Durchsuchen",
    "enterLocation": "Speicherort",
    "reportItButton": "Senden",
    "cancelButton": "Abbrechen",
    "requiredField": "(erforderlich)",
    "selectDefaultText": "Auswählen&hellip;",
    "invalidInputValue": "Geben Sie einen gültigen Wert ein.",
    "noFieldsConfiguredMessage": "Layer-Felder sind nicht für die Erfassung von Daten konfiguriert",
    "invalidSmallNumber": "Geben Sie einen ganzzahligen Wert ein",
    "invalidNumber": "Geben Sie einen ganzzahligen Wert ein",
    "invalidFloat": "Geben Sie eine Zahl ein",
    "invalidDouble": "Geben Sie eine Zahl ein",
    "requiredFields": "Geben Sie Werte für alle erforderlichen Felder ein",
    "selectLocation": "Wählen Sie den Speicherort für Ihren Bericht aus",
    "numericRangeHintMessage": "${openStrong}Hinweis:${closeStrong} Minimalwert ${minValue} und Maximalwert ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hinweis:${closeStrong} minimales Datum ${minValue} und maximales Datum ${maxValue}",
    "errorsInApplyEdits": "Bericht konnte nicht gesendet werden.",
    "attachmentSelectedMsg": "Anlage(n) ausgewählt",
    "attachmentUploadStatus": "${failed} von ${total} Anlage(n) konnte(n) nicht hochgeladen werden.",
    "attachmentDeleteStatus": "${failed} von ${total} Anlage(n) konnte(n) nicht gelöscht werden.",
    "featureUpdateStatus": "${failed} von ${total} Anlage(n) konnte(n) nicht aktualisiert werden.",
    "geoLocationError": "Aktuelle Position ist nicht verfügbar",
    "geoLocationOutOfExtent": "Aktuelle Position befindet sich außerhalb der Grundkartenausdehnung",
    "submitButtonTooltip": "Speichern",
    "cancelButtonTooltip": "Abbrechen",
    "geoformBackButtonTooltip": "Zur Berichtsliste zurückkehren",
    "updateFeaturesConfirmationMsg": "${count} Features werden aktualisiert",
    "attachmentHeaderText": "Anlagen",
    "unknownPopupAttachment": "DATEI",
    "unableToEditPopupMessage": "Sie sind nicht berechtigt, diese Aktion auszuführen.",
    "invalidFeatureCreatorMessage": "Sie sind nicht zur Bearbeitung dieses Features autorisiert.",
    "userSpecificFeatureUpdateMessage": "Nur Features, die von ${username} erstellt wurden, wurden aktualisiert.",
    "anonymousUserText": "Anonym"
  },
  "mapViewer": {
    "zoomInToolTip": "Vergrößern",
    "zoomOutToolTip": "Verkleinern"
  },
  "applicationHeader": {
    "signInOption": "Anmelden",
    "signOutOption": "Abmelden",
    "pleaseSignInText": "Melden Sie sich an"
  },
  "dataviewer": {
    "noIssuesReported": "Keine Berichte verfügbar",
    "noFeatureGeometry": "Feature kann nicht angezeigt werden",
    "ascendingFlagTitle": "Aufsteigend sortieren",
    "descendingFlagTitle": "Absteigend sortieren",
    "filterLabel": "Filtern",
    "valueRadioButtonLabel": "Wert",
    "uniqueRadioButtonLabel": "Eindeutig",
    "selectLayerToBegin": "Zum Einstieg eine Kategorie auswählen",
    "layerFeatureCount": "${selectedFeatureCount} ausgewählt / ${featureCount} Datensätze",
    "exportToCsvSuccessMessage": "CSV-Datei wurde erfolgreich exportiert.",
    "exportToCsvErrorMessage": "Fehler beim Exportieren der ausgewählten Features in CSV-Datei. Versuchen Sie es erneut.",
    "exportToCSVButtonTooltip": "In CSV exportieren"
  },
  "timeSlider": {
    "timeSliderLabel": "Zeitbereich",
    "timeSliderInEditModeAlert": "Zeitschieberegler ist während der Bearbeitung nicht verfügbar"
  },
  "comment": {
    "commentsFormSubmitButton": "Speichern",
    "commentsFormCancelButton": "Abbrechen",
    "errorInSubmittingComment": "Änderungen können nicht gespeichert werden.",
    "emptyCommentMessage": "Wert erforderlich",
    "placeHolderText": "",
    "noCommentsAvailableText": "Keine Datensätze verfügbar",
    "remainingTextCount": "${0} Zeichen verbleiben",
    "showNoText": "Nein",
    "selectAttachments": "Anlagen",
    "selectFileText": "Durchsuchen",
    "attachmentSelectedMsg": "Anlage(n) ausgewählt",
    "attachmentHeaderText": "Anlagen",
    "addRecordText": "Datensatz hinzufügen",
    "unknownCommentAttachment": "DATEI",
    "unableToAddOrEditCommentMessage": "Sie sind nicht berechtigt, diese Aktion auszuführen."
  },
  "main": {
    "noGroup": "Keine Gruppe konfiguriert",
    "basemapGalleryText": "Grundkartengalerie",
    "legendText": "Legende",
    "featureNotFoundMessage": "Das angeforderte Feature wurde nicht gefunden."
  },
  "search": {
    "searchIconTooltip": "Diesen Layer durchsuchen",
    "noResultFoundText": "Keine Ergebnisse gefunden",
    "searchInEditModeAlert": "Suchfunktion ist während der Bearbeitung nicht verfügbar"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Aktualisieren",
    "confirmManualRefreshText": "Gesamte Auswahl und nicht gespeicherte Änderungen werden verworfen"
  },
  "help": {
    "helpIconTooltip": "Hilfe"
  },
  "filter": {
    "noFeatureFoundText": "Für diesen Wert wurde kein Feature gefunden.",
    "distinctQueryFailed": "Für dieses Feld wurden keine eindeutigen Werte gefunden.",
    "andText": "und",
    "filterInEditModeAlert": "Filter sind während der Bearbeitung nicht verfügbar.",
    "dropdownSelectOption": "Auswählen",
    "filterInShowSelectedEditModeAlert": "Filter sind im Modus 'Anzeigen: Ausgewählte' nicht verfügbar."
  },
  "detailsPanel": {
    "editContentText": "Datensatz bearbeiten"
  },
  "signOutPage": {
    "signOutMessage": "Sie wurden erfolgreich abgemeldet",
    "reSignInMessage": "Klicken Sie hier, um sich anzumelden"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Auswahloptionen",
    "showAllOptionText": "Alle anzeigen",
    "showSelectedOptionText": "Ausgewählte anzeigen"
  }
});