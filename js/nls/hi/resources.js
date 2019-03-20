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
    "error": "मानचित्र बनाने में अक्षम",
    "licenseError": {
      "message": "आपके खाते को ऐसे कॉन्फ़िगर करने योग्य ऐप्स का उपयोग करने के लिए लाइसेंस प्राप्त नहीं है जो गैर-सार्वजनिक हैं। कृपया अपने संगठन व्यवस्थापक से आपको एक ऐसा उपयोगकर्ता प्रकार असाइन करने के लिए कहें जिसमें आवश्यक ऐप्स या एड-ऑन आवश्यक ऐप्स लाइसेंस शामिल है।",
      "title": "लाइसेंस प्राप्त नहीं है"
    }
  },
  "webMapList": {
    "owner": "स्वामी",
    "created": "निर्माण तिथि",
    "modified": "संशोधित तिथि",
    "description": "विवरण",
    "snippet": "सार",
    "licenseInfo": "पहुँच करें और प्रतिबंधों का उपयोग करें",
    "accessInformation": "क्रेडिट्स",
    "tags": "टैग्स",
    "numViews": "दृश्यों की संख्या",
    "avgRating": "रेटिंग",
    "noWebMapInGroup": "विन्यासित किया गया समूह अमान्य है या इस समूह के साथ अभी तक कोई आइटम साझा नहीं किया गया है",
    "infoBtnToolTip": "मानचित्र की जानकारी",
    "openWebmapList": "पैनल खोलें",
    "closeWebmapList": "पैनल बंद करें"
  },
  "geoform": {
    "enterInformation": "विवरण",
    "selectAttachments": "अनुलग्नक",
    "selectFileText": "ब्राउज करें",
    "enterLocation": "स्थान",
    "reportItButton": "सबमिट करें",
    "cancelButton": "रद्द करें",
    "requiredField": "(आवश्यक है)",
    "selectDefaultText": "चुनें और मदद;",
    "invalidInputValue": "कृपया मान्य मान दर्ज करें।",
    "noFieldsConfiguredMessage": "लेयर की फील्ड डेटा हासिल करने के लिए विन्यासित नहीं की गई हैं",
    "invalidSmallNumber": "कृपया एक पूर्णांक दर्ज करें",
    "invalidNumber": "कृपया एक पूर्णांक दर्ज करें",
    "invalidFloat": "कृपया एक संख्या दर्ज करें",
    "invalidDouble": "कृपया एक संख्या दर्ज करें",
    "requiredFields": "सभी आवश्यक फ़ील्ड के लिए संख्या प्रदान करें",
    "selectLocation": "कृपया अपनी रिपोर्ट के लिए स्थान चुनें",
    "numericRangeHintMessage": "${OpenStrong} संकेत: ${closeStrong} न्यूनतम संख्या ${minValue} और अधिकतम संख्या ${maxValue}",
    "dateRangeHintMessage": "${OpenStrong} संकेत: ${closeStrong} न्यूनतम संख्या ${minValue} और अधिकतम संख्या ${maxValue}",
    "errorsInApplyEdits": "रिपोर्ट प्रस्तुत नहीं की जा सकी।",
    "attachmentSelectedMsg": "चयनित अनुलग्नक",
    "attachmentUploadStatus": "${total} अनुलग्नकों में से ${failed} अपलोड नहीं हो सके।",
    "attachmentDeleteStatus": "${total} अनुलग्नकों में से ${failed} नहीं हटाए जा सके।",
    "featureUpdateStatus": "${total} अनुलग्नकों में से ${failed} अपडेट नहीं हो सके।",
    "geoLocationError": "वर्तमान स्थान उपलब्ध नहीं है",
    "geoLocationOutOfExtent": "वर्तमान स्थान बेसमानचित्र की सीमा से बाहर है",
    "submitButtonTooltip": "सहेजें",
    "cancelButtonTooltip": "रद्द करें",
    "geoformBackButtonTooltip": "रिपोर्ट सूची पर वापस जाएँ",
    "updateFeaturesConfirmationMsg": "${count} विशेषताएं अद्यतन की जाएंगी",
    "attachmentHeaderText": "अनुलग्नक",
    "unknownPopupAttachment": "फ़ाइल",
    "unableToEditPopupMessage": "आप को इस कार्य को करने की अनुमति नहीं है।",
    "invalidFeatureCreatorMessage": "आप इस सुविधा को संपादित करने के लिए अधिकृत नहीं हैं।",
    "userSpecificFeatureUpdateMessage": "केवल ${username} दवारा बनाई गई सुविधाएं अपडेट की गई।",
    "anonymousUserText": "गुमनाम"
  },
  "mapViewer": {
    "zoomInToolTip": "ज़ूम इन",
    "zoomOutToolTip": "जूम आउट"
  },
  "applicationHeader": {
    "signInOption": "साइन इन करें",
    "signOutOption": "साइन आउट करें",
    "pleaseSignInText": "कृपया साइन इन करें"
  },
  "dataviewer": {
    "noIssuesReported": "कोई रिपोर्ट उपलब्ध नहीं है",
    "noFeatureGeometry": "विशेषता प्रदर्शित नहीं की जा सकती है",
    "ascendingFlagTitle": "आरोही क्रम में चुनें",
    "descendingFlagTitle": "अवरोही क्रम में चुनें",
    "filterLabel": "फिल्टर करें",
    "valueRadioButtonLabel": "मान",
    "uniqueRadioButtonLabel": "अद्वितीय",
    "selectLayerToBegin": "प्रारंभ करने के लिए श्रेणी चुनें",
    "layerFeatureCount": "${selectedFeatureCount} चयनित/ ${featureCount} रिकॉर्ड",
    "exportToCsvSuccessMessage": "CSV फ़ाइल को सफलतापूर्वक निर्यात किया गया।",
    "exportToCsvErrorMessage": "CSV फ़ाइल को चयनित सुविधाओं में निर्यात करते समय त्रुटि हुई। कृपया पुनः प्रयास करें।",
    "exportToCSVButtonTooltip": "CSV में निर्यात करें"
  },
  "timeSlider": {
    "timeSliderLabel": "समय सीमा",
    "timeSliderInEditModeAlert": "संपादन के समय टाइम स्लाइडर उपलब्ध नहीं है"
  },
  "comment": {
    "commentsFormSubmitButton": "सहेजें",
    "commentsFormCancelButton": "रद्द करें",
    "errorInSubmittingComment": "संपादन सहेजा नहीं जा सका।",
    "emptyCommentMessage": "मान आवश्यक है",
    "placeHolderText": "",
    "noCommentsAvailableText": "कोई रिकॉर्ड उपलब्ध नहीं है",
    "remainingTextCount": "${0} अक्षर शेष हैं",
    "showNoText": "नहीं",
    "selectAttachments": "अनुलग्नक",
    "selectFileText": "ब्राउज करें",
    "attachmentSelectedMsg": "चयनित अनुलग्नक",
    "attachmentHeaderText": "अनुलग्नक",
    "addRecordText": "रिकॉर्ड सम्मिलित करें",
    "unknownCommentAttachment": "फ़ाइल",
    "unableToAddOrEditCommentMessage": "आप को इस कार्य को करने की अनुमति नहीं है।"
  },
  "main": {
    "noGroup": "कोई समूह कॉन्फ़िगर नहीं",
    "basemapGalleryText": "Basemap गैलरी",
    "legendText": "लिजेंड",
    "featureNotFoundMessage": "अनुरोधित फीचर नहीं मिले"
  },
  "search": {
    "searchIconTooltip": "यह लेयर खोजें",
    "noResultFoundText": "कोई परिणाम नहीं मिला",
    "searchInEditModeAlert": "संपादन करते समय खोज उपलब्ध नहीं होती है"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "रीफ्रेश करें",
    "confirmManualRefreshText": "सभी अनुभाग और न सहेजे गए परिवर्तन छोड़ दिए जाएंगे"
  },
  "help": {
    "helpIconTooltip": "सहायता"
  },
  "filter": {
    "noFeatureFoundText": "इस मान के लिए कोई फीचर नहीं मिली।",
    "distinctQueryFailed": "इस फील्ड के लिए कोई विशिष्ट मान नहीं मिला।",
    "andText": "और",
    "filterInEditModeAlert": "संपादन करते समय फिल्टर उपलब्ध नहीं होते हैं।",
    "dropdownSelectOption": "चुनें",
    "filterInShowSelectedEditModeAlert": "'चयनित दिखाएँ' मोड में फिल्टर उपलब्ध नहीं होते हैं।"
  },
  "detailsPanel": {
    "editContentText": "रिकॉर्ड संपादित करें"
  },
  "signOutPage": {
    "signOutMessage": "आप सफलतापुर्वक साइन आउट हो गए हैं",
    "reSignInMessage": "साइन इन करने के लिए यहाँ क्लिक करें"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "चयन विकल्प",
    "showAllOptionText": "सभी दिखाएँ",
    "showSelectedOptionText": "चयनित दिखाएँ"
  }
});