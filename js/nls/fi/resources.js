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
    "error": "Karttaa ei voi luoda",
    "licenseError": {
      "message": "Tiliäsi ei ole lisensoitu käyttämään muunneltavissa olevia sovelluksia, jotka eivät ole julkisia. Pyydä organisaatiosi pääkäyttäjää määrittämään sinulle käyttäjätyyppi, joka sisältää keskeiset sovellukset tai keskeisten sovellusten lisäosan lisenssin.",
      "title": "Ei lisenssiä"
    },
    "warningMessageTitle": "Rajoitettu selaimen tuki",
    "warningMessageAGOL": "Käytät vanhentunutta selainta. Jotkin tämän sovelluksen osat eivät ehkä toimi parhaalla mahdollisella tavalla tai ollenkaan tässä selaimessa. Tämän selaimen tuki päättyy myöhemmin.</br></br>Käytä <chrome-link>Google Chromen</chrome-link>, <firefox-link>Mozilla Firefoxin</firefox-link>, <safari-link>Apple Safarin</safari-link> tai <edge-link>Microsoft Edgen</edge-link> uusinta versiota.</br></br>Lisätietoja selaimen tuesta on dokumentaatiossa. Anna palautteesi <feedback-link>Esrin GeoNet-yhteisön, Esri Communityn </feedback-link> kautta.",
    "warningMessageEnterprise": "Käytät selainta, jota ei enää tueta. Jotkin tämän sovelluksen osat eivät ehkä toimi parhaalla mahdollisella tavalla tai ollenkaan tässä selaimessa.</br></br>Käytä <chrome-link>Google Chromen</chrome-link>, <firefox-link>Mozilla Firefoxin</firefox-link>, <safari-link>Apple Safarin</safari-link> tai <edge-link>Microsoft Edgen</edge-link> uusinta versiota."
  },
  "webMapList": {
    "owner": "Omistaja",
    "created": "Luontipäivämäärä",
    "modified": "Muokkauspäivämäärä",
    "description": "Kuvaus",
    "snippet": "Yhteenveto",
    "licenseInfo": "Käyttörajoitukset",
    "accessInformation": "Krediitit",
    "tags": "Tunnisteet",
    "numViews": "Näkymien määrä",
    "avgRating": "Arviointi",
    "noWebMapInGroup": "Määritetty ryhmä on virheellinen tai tämän ryhmän kanssa ei ole vielä jaettu yhtään kohdetta",
    "infoBtnToolTip": "Kartan tiedot",
    "openWebmapList": "Avaa ruutu",
    "closeWebmapList": "Sulje ruutu"
  },
  "geoform": {
    "enterInformation": "Yksityiskohdat",
    "selectAttachments": "Liitteet",
    "selectFileText": "Selaa",
    "enterLocation": "Sijainti",
    "reportItButton": "Lähetä",
    "cancelButton": "Peruuta",
    "requiredField": "(pakollinen)",
    "selectDefaultText": "Valitse&hellip;",
    "invalidInputValue": "Anna kelvollinen arvo.",
    "noFieldsConfiguredMessage": "Karttatason kenttiä ei ole määritetty aineiston keräämistä varten",
    "invalidSmallNumber": "Kirjoita kokonaisluku",
    "invalidNumber": "Kirjoita kokonaisluku",
    "invalidFloat": "Kirjoita numero",
    "invalidDouble": "Kirjoita numero",
    "requiredFields": "Määritä arvot kaikille pakollisille kentille",
    "selectLocation": "Valitse raportin sijainti",
    "numericRangeHintMessage": "${openStrong}Vihje:${closeStrong} Vähimmäisarvo ${minValue} ja enimmäisarvo ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Vihje:${closeStrong} aikaisin ${minValue} ja myöhäisin päivämäärä ${maxValue}",
    "errorsInApplyEdits": "Raportin lähetys ei onnistunut.",
    "attachmentSelectedMsg": "liite(ttä) on valittu",
    "attachmentUploadStatus": "${failed}/${total} liitteen lataus epäonnistui.",
    "attachmentDeleteStatus": "${failed}/${total} liitteen poisto epäonnistui.",
    "featureUpdateStatus": "${failed}/${total} kohteen päivitys epäonnistui.",
    "geoLocationError": "Nykyinen sijainti ei ole käytettävissä",
    "geoLocationOutOfExtent": "Nykyinen sijainti ei ole taustakartan rajoissa",
    "submitButtonTooltip": "Tallenna",
    "cancelButtonTooltip": "Peruuta",
    "geoformBackButtonTooltip": "Palaa raporttiluetteloon",
    "updateFeaturesConfirmationMsg": "${count} kohdetta päivitetään",
    "attachmentHeaderText": "Liitteet",
    "unknownPopupAttachment": "TIEDOSTO",
    "unableToEditPopupMessage": "Sinulla ei ole oikeuksia tämän toiminnon toteuttamiseen.",
    "invalidFeatureCreatorMessage": "Sinulla ei ole tämän kohteen muokkausoikeuksia.",
    "userSpecificFeatureUpdateMessage": "Vain käyttäjän ${username} luomat kohteet on päivitetty.",
    "anonymousUserText": "Anonyymi"
  },
  "mapViewer": {
    "zoomInToolTip": "Lähennä",
    "zoomOutToolTip": "Loitonna"
  },
  "applicationHeader": {
    "signInOption": "Kirjaudu sisään",
    "signOutOption": "Kirjaudu ulos",
    "pleaseSignInText": "Kirjaudu sisään"
  },
  "dataviewer": {
    "noIssuesReported": "Yhtään raporttia ei ole saatavilla",
    "noFeatureGeometry": "Kohdetta ei voi näyttää",
    "ascendingFlagTitle": "Lajittele nousevassa järjestyksessä",
    "descendingFlagTitle": "Lajittele laskevassa järjestyksessä",
    "filterLabel": "Suodata",
    "valueRadioButtonLabel": "Arvo",
    "uniqueRadioButtonLabel": "Yksilöllinen",
    "selectLayerToBegin": "Aloita valitsemalla luokka",
    "layerFeatureCount": "${selectedFeatureCount} valittu / ${featureCount} tietuetta",
    "exportToCsvSuccessMessage": "CSV-tiedoston vienti onnistui.",
    "exportToCsvErrorMessage": "Virhe vietäessä valittuja kohteita CSV-tiedostoon. Yritä uudelleen.",
    "exportToCSVButtonTooltip": "Vie CSV-tiedostoon",
    "showAllButtonTooltip": "Näytä kaikki",
    "showSelectedButtonTooltip": "Näytä valitut kohteet",
    "selectAllButtonTooltip": "Valitse kaikki",
    "clearSelectionButtonTooltip": "Tyhjennä valinta"
  },
  "timeSlider": {
    "timeSliderLabel": "Aikaväli",
    "timeSliderInEditModeAlert": "Ajan liukusäädin ei ole käytettävissä muokkauksen aikana"
  },
  "comment": {
    "commentsFormSubmitButton": "Tallenna",
    "commentsFormCancelButton": "Peruuta",
    "errorInSubmittingComment": "Muokkausten tallennus epäonnistui.",
    "emptyCommentMessage": "Arvo on pakollinen",
    "placeHolderText": "",
    "noCommentsAvailableText": "Tietueita ei ole saatavilla",
    "remainingTextCount": "${0} merkki(ä) jäljellä",
    "showNoText": "Ei",
    "selectAttachments": "Liitteet",
    "selectFileText": "Selaa",
    "attachmentSelectedMsg": "liite(ttä) on valittu",
    "attachmentHeaderText": "Liitteet",
    "addRecordText": "Lisää tietue",
    "unknownCommentAttachment": "TIEDOSTO",
    "unableToAddOrEditCommentMessage": "Sinulla ei ole oikeuksia tämän toiminnon toteuttamiseen."
  },
  "main": {
    "noGroup": "Yhtään ryhmää ei ole määritetty",
    "basemapGalleryText": "Taustakartat",
    "legendText": "Selite",
    "featureNotFoundMessage": "Pyydettyä kohdetta ei löydy"
  },
  "search": {
    "searchIconTooltip": "Hae tätä karttatasoa",
    "clearSearchIconTooltip": "Tyhjennä haku",
    "noResultFoundText": "Tuloksia ei löytynyt",
    "searchInEditModeAlert": "Haku ei ole käytettävissä muokkauksen aikana"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Päivitä",
    "confirmManualRefreshText": "Kaikki valinnat ja tallentamattomat muutokset ohitetaan",
    "confirmHardRefreshText": "Kaikki suodattimet, valinnat ja tallentamattomat muutokset ohitetaan"
  },
  "help": {
    "helpIconTooltip": "Ohje"
  },
  "filter": {
    "noFeatureFoundText": "Tälle arvolle ei löytynyt kohdetta.",
    "distinctQueryFailed": "Kentälle ei löytynyt erillisiä arvoja.",
    "andText": "ja",
    "filterInEditModeAlert": "Suodattimet eivät ole käytettävissä muokkauksen aikana.",
    "dropdownSelectOption": "Valitse",
    "filterInShowSelectedEditModeAlert": "Suodattimet eivät ole käytettävissä Näytä valitut kohteet -tilassa.",
    "operatorIs": "On",
    "operatorIsNot": "Ei ole",
    "stringOperatorStartsWith": "Alkaa merkillä",
    "stringOperatorEndsWith": "Päättyy merkkiin",
    "stringOperatorContains": "Sisältää",
    "stringOperatorDoesNotContain": "Ei sisällä",
    "operatorIsBlank": "On tyhjä",
    "operatorIsNotBlank": "Ei ole tyhjä",
    "numberOperatorIsAtLeast": "On vähintään",
    "numberOperatorIsLessThan": "On pienempi kuin",
    "numberOperatorIsAtMost": "On enintään",
    "numberOperatorIsGreaterThan": "On suurempi kuin",
    "numberOperatorIsBetween": "On väliltä",
    "numberOperatorIsNotBetween": "Ei ole väliltä"
  },
  "detailsPanel": {
    "editContentText": "Muokkaa tietuetta"
  },
  "signOutPage": {
    "signOutMessage": "Uloskirjautuminen onnistui",
    "reSignInMessage": "Kirjaudu sisään napsauttamalla tätä"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Valinta-asetukset",
    "showAllOptionText": "Näytä kaikki",
    "showSelectedOptionText": "Näytä valitut kohteet"
  }
});