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
    "error": "Неможливо створити карту",
    "licenseError": {
      "message": "Ваш обліковий запис не має ліцензії на використання настроюваних додатків, які не є публічними Попросіть адміністратора вашої організації призначити вам тип користувача, що включає основні додатки або додаткову ліцензію на основні додатки.",
      "title": "Немає ліцензії"
    }
  },
  "webMapList": {
    "owner": "Власник",
    "created": "Дата створення",
    "modified": "Дата зміни",
    "description": "Опис",
    "snippet": "Коротка інформація",
    "licenseInfo": "Отримати доступ та використовувати обмеження",
    "accessInformation": "Кредити",
    "tags": "Теги",
    "numViews": "Кількість переглядів",
    "avgRating": "Рейтинг",
    "noWebMapInGroup": "Налаштована група недійсна або елементи ще не було надано у спільне використання цій групі",
    "infoBtnToolTip": "Інформація про карту",
    "openWebmapList": "Відкрити панель",
    "closeWebmapList": "Закрити панель"
  },
  "geoform": {
    "enterInformation": "Детальна інформація",
    "selectAttachments": "Прикріплення",
    "selectFileText": "Переглянути",
    "enterLocation": "Місце розташування",
    "reportItButton": "Надіслати",
    "cancelButton": "Скасувати",
    "requiredField": "(потрібно)",
    "selectDefaultText": "Вибрати&hellip;",
    "invalidInputValue": "Введіть дійсне значення.",
    "noFieldsConfiguredMessage": "Поля шару не налаштовані для реєстрації даних",
    "invalidSmallNumber": "Введіть ціле число",
    "invalidNumber": "Введіть ціле число",
    "invalidFloat": "Введіть число",
    "invalidDouble": "Введіть число",
    "requiredFields": "Введіть значення у всі потрібні поля",
    "selectLocation": "Виберіть місце розташування для вашого звіту",
    "numericRangeHintMessage": "${openStrong}Підказка:${closeStrong} мінімальне значення ${minValue} та максимальне значення ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Підказка:${closeStrong} мінімальна дата ${minValue} та максимальна дата ${maxValue}",
    "errorsInApplyEdits": "ґ_Report could not be submitted_______________________________Ї.",
    "attachmentSelectedMsg": "додаток (додатки) вибрано",
    "attachmentUploadStatus": "ґ_${failed} of ${total} attachment(s) failed to upload____________________________Ї.",
    "attachmentDeleteStatus": "ґ_${failed} of ${total} attachment(s) failed to delete____________________________Ї.",
    "featureUpdateStatus": "ґ_${failed} of ${total} feature(s) failed to update__________________________Ї.",
    "geoLocationError": "Поточне місце розташування недоступне",
    "geoLocationOutOfExtent": "Поточне місце розташування знаходиться поза екстентом базової карти",
    "submitButtonTooltip": "Зберегти",
    "cancelButtonTooltip": "Скасувати",
    "geoformBackButtonTooltip": "Повернутись до списку звітів",
    "updateFeaturesConfirmationMsg": "${count} об'єктів буде оновлено",
    "attachmentHeaderText": "Прикріплення",
    "unknownPopupAttachment": "ФАЙЛ",
    "unableToEditPopupMessage": "Ви не маєте дозволу виконувати цю дію.",
    "invalidFeatureCreatorMessage": "ґ_You are not authorized to edit this feature_______________________Ї.",
    "userSpecificFeatureUpdateMessage": "ґ_Only features created by ${username} have been updated_____________________________Ї.",
    "anonymousUserText": "ґ_Anonymous___________________Ї"
  },
  "mapViewer": {
    "zoomInToolTip": "Збільшити масштаб",
    "zoomOutToolTip": "Зменшити масштаб"
  },
  "applicationHeader": {
    "signInOption": "Увійти в систему",
    "signOutOption": "Вийти із системи",
    "pleaseSignInText": "Увійдіть в систему"
  },
  "dataviewer": {
    "noIssuesReported": "Звіти недоступні",
    "noFeatureGeometry": "Об'єкт неможливо відобразити",
    "ascendingFlagTitle": "Сортувати у висхідному порядку",
    "descendingFlagTitle": "Сортувати у низхідному порядку",
    "filterLabel": "Фільтр",
    "valueRadioButtonLabel": "Значення",
    "uniqueRadioButtonLabel": "Унікальне",
    "selectLayerToBegin": "Виберіть категорію для початку роботи",
    "layerFeatureCount": "${selectedFeatureCount} вибрано / ${featureCount} записів",
    "exportToCsvSuccessMessage": "ґ_CSV file exported successfully_________________Ї.",
    "exportToCsvErrorMessage": "ґ_Error while exporting selected features to CSV file. Please try again____________________________________Ї.",
    "exportToCSVButtonTooltip": "ґ_Export to CSV______________Ї"
  },
  "timeSlider": {
    "timeSliderLabel": "Діапазон часу",
    "timeSliderInEditModeAlert": "Бігунок часу недоступний під час редагування"
  },
  "comment": {
    "commentsFormSubmitButton": "Зберегти",
    "commentsFormCancelButton": "Скасувати",
    "errorInSubmittingComment": "Зміни не вдалося зберегти.",
    "emptyCommentMessage": "Потрібне значення",
    "placeHolderText": "",
    "noCommentsAvailableText": "Записи недоступні",
    "remainingTextCount": "Залишився ${0} символ(-ів)",
    "showNoText": "Ні",
    "selectAttachments": "Прикріплення",
    "selectFileText": "Переглянути",
    "attachmentSelectedMsg": "додаток (додатки) вибрано",
    "attachmentHeaderText": "Прикріплення",
    "addRecordText": "Додати запис",
    "unknownCommentAttachment": "ФАЙЛ",
    "unableToAddOrEditCommentMessage": "Ви не маєте дозволу виконувати цю дію."
  },
  "main": {
    "noGroup": "Група не налаштована",
    "basemapGalleryText": "Галерея базових карт",
    "legendText": "Легенда",
    "featureNotFoundMessage": "Запитаний об’єкт не знайдено"
  },
  "search": {
    "searchIconTooltip": "Шукати цей шар",
    "noResultFoundText": "Результати не знайдено",
    "searchInEditModeAlert": "Пошук недоступний під час редагування"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Оновити",
    "confirmManualRefreshText": "Всі вибори та незбережені зміни будуть скасовані"
  },
  "help": {
    "helpIconTooltip": "Довідка"
  },
  "filter": {
    "noFeatureFoundText": "Об'єкт для цього значення не знайдено.",
    "distinctQueryFailed": "Різні значення для поля не знайдено.",
    "andText": "та",
    "filterInEditModeAlert": "Фільтри недоступні під час редагування.",
    "dropdownSelectOption": "Вибрати",
    "filterInShowSelectedEditModeAlert": "Фільтри недоступні у режимі «Показати вибрані»."
  },
  "detailsPanel": {
    "editContentText": "Редагувати запис"
  },
  "signOutPage": {
    "signOutMessage": "Ви успішно вийшли із системи",
    "reSignInMessage": "Клацніть тут, щоб увійти в систему"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Опції вибору",
    "showAllOptionText": "Показати всі",
    "showSelectedOptionText": "Показати вибрані"
  }
});