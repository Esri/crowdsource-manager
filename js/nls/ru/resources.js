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
    "error": "Не удалось создать карту",
    "licenseError": {
      "message": "Ваша учетная запись не лицензирована на использование не публичных Настраиваемых приложений. Обратитесь к администратору организации, чтобы получить тип пользователя, в который входит Essential Apps или лицензия дополнительного модуля Essential Apps.",
      "title": "Не лицензировано"
    },
    "warningMessageTitle": "Ограниченная поддержка браузера",
    "warningMessageAGOL": "Вы используете устаревший браузер. Некоторые части приложения могут работать не оптимально или вообще не работать в этом браузере. Поддержка этого браузера в дальнейшем не планируется.</br></br>Используйте последние версии <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> или <edge-link>Microsoft Edge</edge-link>.</br></br>Дополнительную информацию см. в документации. Предоставьте обратную связь с помощью <feedback-link>GeoNet, Esri Community</feedback-link>.",
    "warningMessageEnterprise": "Вы используете не поддерживающийся браузер. Некоторые функции этого приложения могут работать не оптимально в этом браузере.</br></br>Используйте последние версии <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, or <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Владелец",
    "created": "Время создания",
    "modified": "Дата изменения",
    "description": "Описание",
    "snippet": "Итоговая информация",
    "licenseInfo": "Ограничения доступа и использования",
    "accessInformation": "Сведения об авторах",
    "tags": "Теги",
    "numViews": "Количество просмотров",
    "avgRating": "Рейтинг",
    "noWebMapInGroup": "Настроенная группа недействительна, или в указанной группе нет доступных элементов.",
    "infoBtnToolTip": "Информация карты",
    "openWebmapList": "Открыть панель",
    "closeWebmapList": "Закрыть панель"
  },
  "geoform": {
    "enterInformation": "Детали",
    "selectAttachments": "Вложения",
    "selectFileText": "Просмотр",
    "enterLocation": "Местоположение",
    "reportItButton": "Подтвердить",
    "cancelButton": "Отмена",
    "requiredField": "(необходимо)",
    "selectDefaultText": "Выбрать&hellip;",
    "invalidInputValue": "Введите корректное значение.",
    "noFieldsConfiguredMessage": "Поля слоя не настроены для получения данных",
    "invalidSmallNumber": "Введите целое число",
    "invalidNumber": "Введите целое число",
    "invalidFloat": "Введите число",
    "invalidDouble": "Введите число",
    "requiredFields": "Укажите значения для всех обязательных полей",
    "selectLocation": "Выберите местоположение для отчета",
    "numericRangeHintMessage": "${openStrong}Подсказка:${closeStrong} Минимальное значение ${minValue} и максимальное значение ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hint:${closeStrong} Минимальная дата ${minValue} и Максимальная дата ${maxValue}",
    "errorsInApplyEdits": "Невозможно передать отчет.",
    "attachmentSelectedMsg": "выбранные вложения",
    "attachmentUploadStatus": "Не удалось выгрузить вложений: ${failed} из всего: ${total}.",
    "attachmentDeleteStatus": "Не удалось удалить вложений: ${failed} из всего: ${total}.",
    "featureUpdateStatus": "Не удалось удалить вложений: ${failed} из всего: ${total}.",
    "geoLocationError": "Текущее местоположение недоступно",
    "geoLocationOutOfExtent": "Текущее местоположение вне экстента базовой карты",
    "submitButtonTooltip": "Сохранить",
    "cancelButtonTooltip": "Отмена",
    "geoformBackButtonTooltip": "Вернуться к списку отчетов",
    "updateFeaturesConfirmationMsg": "${count} объектов будет обновлено",
    "attachmentHeaderText": "Вложения",
    "unknownPopupAttachment": "ФАЙЛ",
    "unableToEditPopupMessage": "У вас нет прав для выполнения этого действия.",
    "invalidFeatureCreatorMessage": "Вы не авторизованы для редактирования этого объекта.",
    "userSpecificFeatureUpdateMessage": "Можно обновлять только объекты, созданные ${username}.",
    "anonymousUserText": "Анонимный пользователь"
  },
  "mapViewer": {
    "zoomInToolTip": "Приблизить",
    "zoomOutToolTip": "Отдалить"
  },
  "applicationHeader": {
    "signInOption": "Вход",
    "signOutOption": "Выход",
    "pleaseSignInText": "Выполните вход"
  },
  "dataviewer": {
    "noIssuesReported": "Нет доступных отчетов",
    "noFeatureGeometry": "Объекты невозможно отобразить",
    "ascendingFlagTitle": "Сортировать по возрастанию",
    "descendingFlagTitle": "Сортировать по убыванию",
    "filterLabel": "Фильтр",
    "valueRadioButtonLabel": "Значение",
    "uniqueRadioButtonLabel": "Уникальное",
    "selectLayerToBegin": "Для начала работы выберите категорию",
    "layerFeatureCount": "${selectedFeatureCount} выбрано / ${featureCount} записей",
    "exportToCsvSuccessMessage": "Файл CSV экспортирован успешно.",
    "exportToCsvErrorMessage": "Ошибка при экспорте выбранных объектов в файл CSV. Повторите попытку еще раз.",
    "exportToCSVButtonTooltip": "Экспорт в CSV",
    "showAllButtonTooltip": "Показать все",
    "showSelectedButtonTooltip": "Показать выбранные",
    "selectAllButtonTooltip": "Выбрать все",
    "clearSelectionButtonTooltip": "Очистить выборку"
  },
  "timeSlider": {
    "timeSliderLabel": "Временной диапазон",
    "timeSliderInEditModeAlert": "Во время редактирования бегунок времени недоступен"
  },
  "comment": {
    "commentsFormSubmitButton": "Сохранить",
    "commentsFormCancelButton": "Отмена",
    "errorInSubmittingComment": "Невозможно сохранить изменения.",
    "emptyCommentMessage": "Необходимо значение",
    "placeHolderText": "",
    "noCommentsAvailableText": "Нет доступных записей",
    "remainingTextCount": "Символов осталось: ${0}",
    "showNoText": "Нет",
    "selectAttachments": "Вложения",
    "selectFileText": "Просмотр",
    "attachmentSelectedMsg": "выбранные вложения",
    "attachmentHeaderText": "Вложения",
    "addRecordText": "Добавить запись",
    "unknownCommentAttachment": "ФАЙЛ",
    "unableToAddOrEditCommentMessage": "У вас нет прав для выполнения этого действия."
  },
  "main": {
    "noGroup": "Не задана группа",
    "basemapGalleryText": "Галерея базовых карт",
    "legendText": "Легенда",
    "featureNotFoundMessage": "Требуемый объект не найден"
  },
  "search": {
    "searchIconTooltip": "Поиск в этом слое",
    "clearSearchIconTooltip": "Очистить поиск",
    "noResultFoundText": "Результаты не найдены",
    "searchInEditModeAlert": "Во время редактирования поиск недоступен"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Обновить",
    "confirmManualRefreshText": "Все выборки и несохраненные изменения будут удалены",
    "confirmHardRefreshText": "Все фильтры, выборки и несохраненные изменения будут удалены"
  },
  "help": {
    "helpIconTooltip": "Справка"
  },
  "filter": {
    "noFeatureFoundText": "Для этого значения не найдено ни одного объекта.",
    "distinctQueryFailed": "Для этого поля не найдено различающихся значений.",
    "andText": "и",
    "filterInEditModeAlert": "Во время редактирования фильтры недоступны.",
    "dropdownSelectOption": "Выбрать",
    "filterInShowSelectedEditModeAlert": "В режиме Показать выбранные фильтры недоступны.",
    "operatorIs": "Является",
    "operatorIsNot": "Не является",
    "stringOperatorStartsWith": "Начинается с",
    "stringOperatorEndsWith": "Заканчивается на",
    "stringOperatorContains": "Содержат",
    "stringOperatorDoesNotContain": "Не содержит",
    "operatorIsBlank": "Пустой",
    "operatorIsNotBlank": "Не пустой",
    "numberOperatorIsAtLeast": "Не менее",
    "numberOperatorIsLessThan": "Меньше чем",
    "numberOperatorIsAtMost": "Не более",
    "numberOperatorIsGreaterThan": "Больше чем",
    "numberOperatorIsBetween": "Между",
    "numberOperatorIsNotBetween": "Не между"
  },
  "detailsPanel": {
    "editContentText": "Редактировать запись"
  },
  "signOutPage": {
    "signOutMessage": "Выход успешно выполнен",
    "reSignInMessage": "Щелкните здесь, чтобы выполнить вход"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Опции выборки",
    "showAllOptionText": "Показать все",
    "showSelectedOptionText": "Показать выбранные"
  }
});