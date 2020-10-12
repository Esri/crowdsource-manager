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
    "error": "Nelze vytvořit mapu",
    "licenseError": {
      "message": "Váš účet nevlastní licenci k používání konfigurovatelných aplikací, které nejsou veřejné. Požádejte prosím správce své organizace, aby vám přidělil typ uživatele, jehož součástí jsou základní aplikace nebo doplňková licence základních aplikací.",
      "title": "Chybí licence"
    }
  },
  "webMapList": {
    "owner": "Vlastník",
    "created": "Datum vytvoření",
    "modified": "Datum změny",
    "description": "Popis",
    "snippet": "Souhrn",
    "licenseInfo": "Přístup a omezení použití",
    "accessInformation": "Poděkování",
    "tags": "Klíčová slova",
    "numViews": "Počet zobrazení",
    "avgRating": "Hodnocení",
    "noWebMapInGroup": "Nakonfigurovaná skupina je neplatné, případně s touto skupinou ještě nebyly sdíleny žádné položky.",
    "infoBtnToolTip": "Informace o mapě",
    "openWebmapList": "Otevřít panel",
    "closeWebmapList": "Zavřít panel"
  },
  "geoform": {
    "enterInformation": "Podrobnosti",
    "selectAttachments": "Přílohy",
    "selectFileText": "Procházet",
    "enterLocation": "Umístění",
    "reportItButton": "Odeslat",
    "cancelButton": "Storno",
    "requiredField": "(vyžadováno)",
    "selectDefaultText": "Výběr&hellip;",
    "invalidInputValue": "Zadejte platnou hodnotu.",
    "noFieldsConfiguredMessage": "Pole vrstvy nejsou nakonfigurovány pro sbírání dat.",
    "invalidSmallNumber": "Zadejte celé číslo.",
    "invalidNumber": "Zadejte celé číslo.",
    "invalidFloat": "Zadejte číslo.",
    "invalidDouble": "Zadejte číslo.",
    "requiredFields": "Zadejte hodnoty do všech vyžadovaných polí.",
    "selectLocation": "Vyberte umístění hlášení.",
    "numericRangeHintMessage": "${openStrong}Nápověda:${closeStrong} Minimální hodnota ${minValue} a maximální hodnota ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Nápověda:${closeStrong} Minimální datum ${minValue} a maximální datum ${maxValue}",
    "errorsInApplyEdits": "Zprávu se nepodařilo odeslat.",
    "attachmentSelectedMsg": "příloh vybráno",
    "attachmentUploadStatus": "Nepodařilo se nahrát ${failed} z ${total} příloh.",
    "attachmentDeleteStatus": "Nepodařilo se smazat ${failed} z ${total} příloh.",
    "featureUpdateStatus": "Nepodařilo se aktualizovat ${failed} z ${total} prvků.",
    "geoLocationError": "Současné umístění není k dispozici",
    "geoLocationOutOfExtent": "Aktuální umístění se nachází mimo rozsah podkladové mapy.",
    "submitButtonTooltip": "Uložit",
    "cancelButtonTooltip": "Storno",
    "geoformBackButtonTooltip": "Vrátit se do seznamu zpráv",
    "updateFeaturesConfirmationMsg": "Bude aktualizováno ${count} prvků",
    "attachmentHeaderText": "Přílohy",
    "unknownPopupAttachment": "SOUBOR",
    "unableToEditPopupMessage": "K této akci nemáte oprávnění.",
    "invalidFeatureCreatorMessage": "Nemáte oprávnění k editaci tohoto prvku.",
    "userSpecificFeatureUpdateMessage": "Aktualizovány byly pouze prvky vytvořené uživatelem ${username}.",
    "anonymousUserText": "Anonymní"
  },
  "mapViewer": {
    "zoomInToolTip": "Přiblížit",
    "zoomOutToolTip": "Oddálit"
  },
  "applicationHeader": {
    "signInOption": "Přihlásit",
    "signOutOption": "Odhlásit",
    "pleaseSignInText": "Prosím přihlaste se"
  },
  "dataviewer": {
    "noIssuesReported": "Nejsou k dispozici žádné zprávy.",
    "noFeatureGeometry": "Prvek nelze zobrazit.",
    "ascendingFlagTitle": "Seřadit vzestupně",
    "descendingFlagTitle": "Seřadit sestupně",
    "filterLabel": "Filtr",
    "valueRadioButtonLabel": "Hodnota",
    "uniqueRadioButtonLabel": "Jedinečný",
    "selectLayerToBegin": "Začněte výběrem kategorie",
    "layerFeatureCount": "${selectedFeatureCount} vybráno / ${featureCount} záznamů",
    "exportToCsvSuccessMessage": "Export souboru CSV proběhl úspěšně.",
    "exportToCsvErrorMessage": "Při exportování vybraných prvků do souboru CSV došlo k chybě. Zkuste to prosím znovu.",
    "exportToCSVButtonTooltip": "Exportovat do souboru CSV",
    "showAllButtonTooltip": "Zobrazit vše",
    "showSelectedButtonTooltip": "Zobrazit vybrané",
    "selectAllButtonTooltip": "Vybrat vše",
    "clearSelectionButtonTooltip": "Zrušit výběr",
    "invalidFeatureMessage": "Není možné vybrat ${invalidFeatureCount} neplatné prvky."
  },
  "timeSlider": {
    "timeSliderLabel": "Časový rozsah",
    "timeSliderInEditModeAlert": "Posuvník času při editaci není k dispozici"
  },
  "comment": {
    "commentsFormSubmitButton": "Uložit",
    "commentsFormCancelButton": "Storno",
    "errorInSubmittingComment": "Úpravy se nepodařilo uložit.",
    "emptyCommentMessage": "Hodnota je vyžadována",
    "placeHolderText": "",
    "noCommentsAvailableText": "Nejsou k dispozici žádné záznamy",
    "remainingTextCount": "Počet zbývajících znaků: ${0}",
    "showNoText": "Ne",
    "selectAttachments": "Přílohy",
    "selectFileText": "Procházet",
    "attachmentSelectedMsg": "příloh vybráno",
    "attachmentHeaderText": "Přílohy",
    "addRecordText": "Přidat záznam",
    "unknownCommentAttachment": "SOUBOR",
    "unableToAddOrEditCommentMessage": "K této akci nemáte oprávnění."
  },
  "main": {
    "noGroup": "Není nakonfigurována žádná skupina",
    "basemapGalleryText": "Galerie podkladových map",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Požadovaný prvek nebyl nalezen."
  },
  "search": {
    "searchIconTooltip": "Prohledat vrstvu",
    "noResultFoundText": "Nebyly nalezeny žádné výsledky.",
    "searchInEditModeAlert": "Při editaci není vyhledávání k dispozici"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Obnovit",
    "confirmManualRefreshText": "Všechny výběry a neuložené změny budou zrušeny."
  },
  "help": {
    "helpIconTooltip": "Nápověda"
  },
  "filter": {
    "noFeatureFoundText": "Pro tuto hodnotu nebyl nalezen žádný prvek.",
    "distinctQueryFailed": "Pro toto pole nebyly nalezeny žádné jedinečné hodnoty.",
    "andText": "a",
    "filterInEditModeAlert": "Při editaci nejsou filtry k dispozici.",
    "dropdownSelectOption": "Vybrat",
    "filterInShowSelectedEditModeAlert": "V režimu „Zobrazit vybrané“ nejsou filtry k dispozici."
  },
  "detailsPanel": {
    "editContentText": "Upravit záznam"
  },
  "signOutPage": {
    "signOutMessage": "Byli jste úspěšně odhlášeni.",
    "reSignInMessage": "Klikněte sem pro přihlášení."
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Možnosti výběru",
    "showAllOptionText": "Zobrazit vše",
    "showSelectedOptionText": "Zobrazovat vybrané"
  }
});