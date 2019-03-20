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
    "error": "Žemėlapio sukurti nepavyko",
    "licenseError": {
      "message": "Jūsų paskyra nelicencijuota naudoti ne viešas konfigūruojamas aplikacijas. Kreipkitės į organizacijos administratorių, kad paskirtų jums vartotojo tipą, kuris turi svarbiausias aplikacijas, arba suteiktų jums papildomą svarbiausių aplikacijų licenciją.",
      "title": "Nelicencijuota"
    }
  },
  "webMapList": {
    "owner": "Savininkas",
    "created": "Sukūrimo data",
    "modified": "Paskutinis pakeitimas",
    "description": "Aprašas",
    "snippet": "Santrauka",
    "licenseInfo": "Prieigos ir naudojimo apribojimai",
    "accessInformation": "Autoriai",
    "tags": "Raktažodžiai",
    "numViews": "Peržiūrų skaičius",
    "avgRating": "Vertinimas",
    "noWebMapInGroup": "Sukonfigūruota grupė neteisinga arba šioje grupėje nebendrinamas nė vienas elementas",
    "infoBtnToolTip": "Žemėlapio informacija",
    "openWebmapList": "Atidaryti skydelį",
    "closeWebmapList": "Uždaryti skydelį"
  },
  "geoform": {
    "enterInformation": "Išsamiau",
    "selectAttachments": "Priedai",
    "selectFileText": "Parinkti",
    "enterLocation": "Vieta",
    "reportItButton": "Pateikti",
    "cancelButton": "Atšaukti",
    "requiredField": "(privalomas)",
    "selectDefaultText": "Pasirinkti&hellip;",
    "invalidInputValue": "Įveskite leistiną reikšmę.",
    "noFieldsConfiguredMessage": "Sluoksnio laukai nesukonfigūruoti kaupti duomenis",
    "invalidSmallNumber": "Įveskite sveikąjį skaičių",
    "invalidNumber": "Įveskite sveikąjį skaičių",
    "invalidFloat": "Įveskite skaičių",
    "invalidDouble": "Įveskite skaičių",
    "requiredFields": "Pateikite reikšmes visuose privalomuose laukuose",
    "selectLocation": "Nurodykite ataskaitos vietą",
    "numericRangeHintMessage": "${openStrong}Užuomina:${closeStrong} minimali vertė ${minValue} ir maksimali vertė ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Užuomina:${closeStrong} minimali data ${minValue} ir maksimali data ${maxValue}",
    "errorsInApplyEdits": "Ataskaitos pateikti nepavyko.",
    "attachmentSelectedMsg": "pasirinktas (-i) priedas (-ai)",
    "attachmentUploadStatus": "Nepavyko įkelti ${failed} iš ${total} priedo (-ų).",
    "attachmentDeleteStatus": "Nepavyko ištrinti ${failed} iš ${total} priedo (-ų).",
    "featureUpdateStatus": "Nepavyko atnaujinti ${failed} iš ${total} elemento (-ų).",
    "geoLocationError": "Informacijos apie esamą vietą nėra",
    "geoLocationOutOfExtent": "Dabartinė vieta yra už pagrindo žemėlapio ribų",
    "submitButtonTooltip": "Įrašyti",
    "cancelButtonTooltip": "Atšaukti",
    "geoformBackButtonTooltip": "Grįžti į ataskaitų sąrašą",
    "updateFeaturesConfirmationMsg": "Bus atnaujinta elementų: ${count}",
    "attachmentHeaderText": "Priedai",
    "unknownPopupAttachment": "FAILAS",
    "unableToEditPopupMessage": "Neturite leidimo atlikti šį veiksmą.",
    "invalidFeatureCreatorMessage": "Neturite įgaliojimų redaguoti šio elemento.",
    "userSpecificFeatureUpdateMessage": "Atnaujinti tik vartotojo ${username} sukurti elementai.",
    "anonymousUserText": "Anonimas"
  },
  "mapViewer": {
    "zoomInToolTip": "Artinti",
    "zoomOutToolTip": "Tolinti"
  },
  "applicationHeader": {
    "signInOption": "Prisijungti",
    "signOutOption": "Atsijungti",
    "pleaseSignInText": "Prisijunkite"
  },
  "dataviewer": {
    "noIssuesReported": "Ataskaitų nėra",
    "noFeatureGeometry": "Elemento parodyti negalima",
    "ascendingFlagTitle": "Rūšiuoti didėjančia tvarka",
    "descendingFlagTitle": "Rūšiuoti mažėjančia tvarka",
    "filterLabel": "Filtruoti",
    "valueRadioButtonLabel": "Reikšmė",
    "uniqueRadioButtonLabel": "Unikalios",
    "selectLayerToBegin": "Jei norite pradėti, pasirinkite kategoriją",
    "layerFeatureCount": "Pažymėtų įrašų: ${selectedFeatureCount} / Iš viso įrašų: ${featureCount}",
    "exportToCsvSuccessMessage": "CSV failas sėkmingai eksportuotas.",
    "exportToCsvErrorMessage": "Eksportuojant pasirinktus elementus į CSV failą įvyko klaida. Pabandykite dar kartą.",
    "exportToCSVButtonTooltip": "Eksportuoti į CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Laiko intervalas",
    "timeSliderInEditModeAlert": "Redaguojant laiko slankiklis nepasiekiamas"
  },
  "comment": {
    "commentsFormSubmitButton": "Įrašyti",
    "commentsFormCancelButton": "Atšaukti",
    "errorInSubmittingComment": "Redagavimų negalima įrašyti.",
    "emptyCommentMessage": "Reikalinga reikšmė",
    "placeHolderText": "",
    "noCommentsAvailableText": "Įrašų nėra",
    "remainingTextCount": "liko simbolių: ${0}",
    "showNoText": "Ne",
    "selectAttachments": "Priedai",
    "selectFileText": "Parinkti",
    "attachmentSelectedMsg": "pasirinktas (-i) priedas (-ai)",
    "attachmentHeaderText": "Priedai",
    "addRecordText": "Pridėti įrašą",
    "unknownCommentAttachment": "FAILAS",
    "unableToAddOrEditCommentMessage": "Neturite leidimo atlikti šį veiksmą."
  },
  "main": {
    "noGroup": "Sukonfigūruotų grupių nėra",
    "basemapGalleryText": "Pagrindo žemėlapiai",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Prašomas elementas nerastas"
  },
  "search": {
    "searchIconTooltip": "Ieškoti šiame sluoksnyje",
    "noResultFoundText": "Nieko nerasta",
    "searchInEditModeAlert": "Redaguojant paieška nepasiekiama"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Atnaujinti",
    "confirmManualRefreshText": "Visi pasirinkimai ir neišsaugoti pakeitimai bus atmesti"
  },
  "help": {
    "helpIconTooltip": "Pagalba"
  },
  "filter": {
    "noFeatureFoundText": "Šiai reikšmei elementų nerasta.",
    "distinctQueryFailed": "Šiam laukui atskirų reikšmių nerasta.",
    "andText": "ir",
    "filterInEditModeAlert": "Redaguojant filtrai nepasiekiami.",
    "dropdownSelectOption": "Pasirinkite",
    "filterInShowSelectedEditModeAlert": "Naudojant režimą „Rodyti pažymėtus“, filtrai nepasiekiami."
  },
  "detailsPanel": {
    "editContentText": "Redaguoti įrašą"
  },
  "signOutPage": {
    "signOutMessage": "Sėkmingai atsijungėte",
    "reSignInMessage": "Paspauskite prisijungti"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Pasirinkimo parinktys",
    "showAllOptionText": "Rodyti visus",
    "showSelectedOptionText": "Rodyti pažymėtus"
  }
});