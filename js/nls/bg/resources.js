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
    "error": "Не може да се създаде карта",
    "licenseError": {
      "message": "Вашият акаунт не е лицензиран да използва Configurable Apps, които не са публични. Помолете администратора на Вашата организация да Ви направи тип потребител, който включва основни приложения или допълнителен лиценз за основни приложения.",
      "title": "Не е лицензиран"
    },
    "warningMessageTitle": "Ограничена поддръжка на браузър",
    "warningMessageAGOL": "Използвате остарял браузър. Някои части на това приложение може да не работят оптимално или изобщо да не работят с този браузър. Поддръжката на този браузър ще бъде преустановена в бъдеще. </br></br>Използвайте последните версии на<chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> или<edge-link>Microsoft Edge</edge-link>.</br></br>За повече информация относно поддръжката на браузъра вижте нашата документация. Напишете ни Вашия отзив през <feedback-link>GeoNet, Esri Community</feedback-link>.",
    "warningMessageEnterprise": "Използвате браузър, който вече не се поддържа. Някои части на това приложение може да не работят оптимално или изобщо да не работят с този браузър.</br></br>Използвайте последните версии на <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> или<edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Собственик",
    "created": "Дата на създаване",
    "modified": "Дата на промяна",
    "description": "Описание",
    "snippet": "Обобщение",
    "licenseInfo": "Достъп и използване на ограничения",
    "accessInformation": "Кредити",
    "tags": "Тагове",
    "numViews": "Брой гледания",
    "avgRating": "Оценка",
    "noWebMapInGroup": "Конфигурираната група е невалидна или все още не са споделени елементи с тази група",
    "infoBtnToolTip": "Информация за карта",
    "openWebmapList": "Отваряне на панел",
    "closeWebmapList": "Затваряне на панел"
  },
  "geoform": {
    "enterInformation": "Подробни данни",
    "selectAttachments": "Прикачени файлове",
    "selectFileText": "Зареждане",
    "enterLocation": "Местоположение",
    "reportItButton": "Изпращане",
    "cancelButton": "Отказ",
    "requiredField": "(задължително)",
    "selectDefaultText": "Избор",
    "invalidInputValue": "Моля, въведете валидна стойност.",
    "noFieldsConfiguredMessage": "Полетата на слоевете не са конфигурирани за прихващане на данни",
    "invalidSmallNumber": "Моля, въведете цяло число",
    "invalidNumber": "Моля, въведете цяло число",
    "invalidFloat": "Моля, въведете число",
    "invalidDouble": "Моля, въведете число",
    "requiredFields": "Моля, посочете стойности за всички задължителни полета",
    "selectLocation": "Моля, изберете местоположението за отчета",
    "numericRangeHintMessage": "${openStrong}Съвет:${closeStrong} Минимална стойност${minValue} и максимална стойност${maxValue}",
    "dateRangeHintMessage": "${openStrong}Съвет:${closeStrong} Минимална дата ${minValue} и максимална дата ${maxValue}",
    "errorsInApplyEdits": "Отчетът не може да бъде изпратен.",
    "attachmentSelectedMsg": "избран(и) прикачен(и) файл(ове)",
    "attachmentUploadStatus": "Неуспешно качване на ${failed} от ${total} прикачен(и) файл(а).",
    "attachmentDeleteStatus": "Неуспешно изтриване на ${failed} от ${total} прикачен(и) файл(а).",
    "featureUpdateStatus": "Неуспешно качване на ${failed} от ${total} обект(а).",
    "geoLocationError": "Текущото местоположение не е налично",
    "geoLocationOutOfExtent": "Текущото местоположение е извън обхвата на базовата карта",
    "submitButtonTooltip": "Запазване",
    "cancelButtonTooltip": "Отказ",
    "geoformBackButtonTooltip": "Връщане към списъка с отчети",
    "updateFeaturesConfirmationMsg": "Ще се актуализират ${count} обекта",
    "attachmentHeaderText": "Прикачени файлове",
    "unknownPopupAttachment": "ФАЙЛ",
    "unableToEditPopupMessage": "Нямате разрешение да извършите това действие.",
    "invalidFeatureCreatorMessage": "Нямате право да редактирате този обект.",
    "userSpecificFeatureUpdateMessage": "Актуализирани са само обектите, създадени от ${username}.",
    "anonymousUserText": "Анонимен"
  },
  "mapViewer": {
    "zoomInToolTip": "Приближаване",
    "zoomOutToolTip": "Отдалечаване"
  },
  "applicationHeader": {
    "signInOption": "Регистрация",
    "signOutOption": "Отписване",
    "pleaseSignInText": "Моля, влезте"
  },
  "dataviewer": {
    "noIssuesReported": "Няма налични отчети",
    "noFeatureGeometry": "Обектът не може да се покаже",
    "ascendingFlagTitle": "Сортиране по възходящ ред",
    "descendingFlagTitle": "Сортиране по низходящ ред",
    "filterLabel": "Филтър",
    "valueRadioButtonLabel": "Стойност",
    "uniqueRadioButtonLabel": "Уникални",
    "selectLayerToBegin": "Изберете категория, за да започнете",
    "layerFeatureCount": "${selectedFeatureCount} избрани/ ${featureCount} записа",
    "exportToCsvSuccessMessage": "CSV файлът е експортиран успешно.",
    "exportToCsvErrorMessage": "Грешка при експортиране на избрани обекти в CSV файл. Моля, опитайте отново.",
    "exportToCSVButtonTooltip": "Експортиране в CSV",
    "showAllButtonTooltip": "Показване на всички",
    "showSelectedButtonTooltip": "Показване на избраните",
    "selectAllButtonTooltip": "Избиране на всички",
    "clearSelectionButtonTooltip": "Изчистване на избора"
  },
  "timeSlider": {
    "timeSliderLabel": "Времеви диапазон",
    "timeSliderInEditModeAlert": "Плъзгачът на времето не е наличен при редактиране"
  },
  "comment": {
    "commentsFormSubmitButton": "Запазване",
    "commentsFormCancelButton": "Отказ",
    "errorInSubmittingComment": "Редакциите не могат да бъдат запазени.",
    "emptyCommentMessage": "Изисква се стойност",
    "placeHolderText": "",
    "noCommentsAvailableText": "Не са начлични записи",
    "remainingTextCount": "остава(т) ${0} символ(а)",
    "showNoText": "Не",
    "selectAttachments": "Прикачени файлове",
    "selectFileText": "Зареждане",
    "attachmentSelectedMsg": "избран(и) прикачен файл(ове)",
    "attachmentHeaderText": "Прикачени файлове",
    "addRecordText": "Добавяне на запис",
    "unknownCommentAttachment": "ФАЙЛ",
    "unableToAddOrEditCommentMessage": "Нямате разрешение да извършите това действие."
  },
  "main": {
    "noGroup": "Няма конфигурирана група",
    "basemapGalleryText": "Галерия с базови карти",
    "legendText": "Легенда",
    "featureNotFoundMessage": "Искания обект не е намерен"
  },
  "search": {
    "searchIconTooltip": "Търсене в този слой",
    "clearSearchIconTooltip": "Изчистване на търсенето",
    "noResultFoundText": "Няма намерени резултати",
    "searchInEditModeAlert": "Търсенето не е налично при редактиране"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Обновяване",
    "confirmManualRefreshText": "Всички избори и незаписани промени ще бъдат отхвърлени",
    "confirmHardRefreshText": "Всички филтри, избори и незаписани промени ще бъдат отхвърлени"
  },
  "help": {
    "helpIconTooltip": "Помощ"
  },
  "filter": {
    "noFeatureFoundText": "Няма намерен обект за тази стойност.",
    "distinctQueryFailed": "Не са намерени различни стойности за полето.",
    "andText": "и",
    "filterInEditModeAlert": "Филтрите не са налични при редактиране.",
    "dropdownSelectOption": "Избор",
    "filterInShowSelectedEditModeAlert": "Филтрите не са налични в режим „Показване на избраните“.",
    "operatorIs": "е",
    "operatorIsNot": "Не е",
    "stringOperatorStartsWith": "Започва с",
    "stringOperatorEndsWith": "Завършва на",
    "stringOperatorContains": "Съдържа",
    "stringOperatorDoesNotContain": "Не съдържа",
    "operatorIsBlank": "е празно",
    "operatorIsNotBlank": "не е празно",
    "numberOperatorIsAtLeast": "е най-малко",
    "numberOperatorIsLessThan": "е по-малко от",
    "numberOperatorIsAtMost": "е най-много",
    "numberOperatorIsGreaterThan": "е по-голямо от",
    "numberOperatorIsBetween": "е между",
    "numberOperatorIsNotBetween": "не е между"
  },
  "detailsPanel": {
    "editContentText": "Редактиране на запис"
  },
  "signOutPage": {
    "signOutMessage": "Вие успешно се отписахте",
    "reSignInMessage": "Натиснете тук, за да влезете"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Опции за избор",
    "showAllOptionText": "Показване на всички",
    "showSelectedOptionText": "Показване на избраните"
  }
});