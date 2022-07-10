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
    "error": "無法建立地圖",
    "licenseError": {
      "message": "您的帳號未經授權，無法使用非公開的可配置應用程式。 請聯繫您的組織管理員，請其將包含基礎應用程式或附加元件基礎應用程式授權的使用者類型指派給您。",
      "title": "未經許可"
    },
    "warningMessageTitle": "有限的瀏覽器支援",
    "warningMessageAGOL": "您正在使用已淘汰的瀏覽器。 此應用程式的部分組件可能無法在此瀏覽器中正常運作或完全無法運作。 未來將中斷支援此瀏覽器。</br></br>請使用最新版的 <chrome-link>Google Chrome</chrome-link>、<firefox-link>Mozilla Firefox</firefox-link>、<safari-link>Apple Safari</safari-link> 或 <edge-link>Microsoft Edge</edge-link>。</br></br>有關瀏覽器支援的詳細資訊，請參閱我們的文件。 請透過 <feedback-link>Esri 社群 (即 GeoNet)</feedback-link> 提供您的回饋意見。",
    "warningMessageEnterprise": "您正在使用不再支援的瀏覽器。 此應用程式的某些部分可能無法在此瀏覽器中以最佳狀態執行，或完全無法執行。</br></br>請使用最新版的 <chrome-link>Google Chrome</chrome-link>、<firefox-link>Mozilla Firefox</firefox-link>、<safari-link>Apple Safari</safari-link> 或 <edge-link>Microsoft Edge</edge-link>。"
  },
  "webMapList": {
    "owner": "擁有者",
    "created": "建立日期",
    "modified": "修改日期",
    "description": "描述",
    "snippet": "摘要(S)",
    "licenseInfo": "存取和使用限制",
    "accessInformation": "點數",
    "tags": "標記",
    "numViews": "視圖數量",
    "avgRating": "評級次數",
    "noWebMapInGroup": "已配置的群組無效，或者沒有與該群組共用的任何項目",
    "infoBtnToolTip": "地圖資訊",
    "openWebmapList": "開啟面板",
    "closeWebmapList": "關閉面板"
  },
  "geoform": {
    "enterInformation": "詳細資訊",
    "selectAttachments": "附件",
    "selectFileText": "瀏覽",
    "enterLocation": "位置",
    "reportItButton": "提交",
    "cancelButton": "取消",
    "requiredField": "(必填)",
    "selectDefaultText": "選擇&hellip;",
    "invalidInputValue": "請輸入有效值。",
    "noFieldsConfiguredMessage": "圖層欄位未被配置為擷取資料",
    "invalidSmallNumber": "請輸入一個整數",
    "invalidNumber": "請輸入一個整數",
    "invalidFloat": "請輸入一個數字",
    "invalidDouble": "請輸入一個數字",
    "requiredFields": "請為所有必填欄位填寫值",
    "selectLocation": "請為您的報告選擇位置",
    "numericRangeHintMessage": "${openStrong}提示:${closeStrong} 最小值 ${minValue} 和最大值 ${maxValue}",
    "dateRangeHintMessage": "${openStrong}提示:${closeStrong} 最小日期 ${minValue} 和最大日期 ${maxValue}",
    "errorsInApplyEdits": "無法提交報告。",
    "attachmentSelectedMsg": "已選定附件",
    "attachmentUploadStatus": "無法上傳 ${failed} 個附件，總計 ${total} 個。",
    "attachmentDeleteStatus": "無法刪除 ${failed} 個附件，總計 ${total} 個。",
    "featureUpdateStatus": "無法更新 ${failed} 個圖徵，總計 ${total} 個。",
    "geoLocationError": "目前位置不可用",
    "geoLocationOutOfExtent": "目前位置不在底圖範圍之內",
    "submitButtonTooltip": "儲存",
    "cancelButtonTooltip": "取消",
    "geoformBackButtonTooltip": "傳回至報告清單",
    "updateFeaturesConfirmationMsg": "將更新 ${count} 個圖徵",
    "attachmentHeaderText": "附件",
    "unknownPopupAttachment": "檔案",
    "unableToEditPopupMessage": "您沒有執行此動作的權限。",
    "invalidFeatureCreatorMessage": "您沒有編輯此圖徵的授權。",
    "userSpecificFeatureUpdateMessage": "只有 ${username} 建立的圖徵已儲存。",
    "anonymousUserText": "匿名"
  },
  "mapViewer": {
    "zoomInToolTip": "放大",
    "zoomOutToolTip": "縮小"
  },
  "applicationHeader": {
    "signInOption": "登入",
    "signOutOption": "登出",
    "pleaseSignInText": "請登入"
  },
  "dataviewer": {
    "noIssuesReported": "無任何報告可用",
    "noFeatureGeometry": "無法顯示圖徵",
    "ascendingFlagTitle": "按遞增排列",
    "descendingFlagTitle": "按遞減排列",
    "filterLabel": "篩選程式",
    "valueRadioButtonLabel": "數值",
    "uniqueRadioButtonLabel": "唯一",
    "selectLayerToBegin": "選擇類別以開始使用",
    "layerFeatureCount": "已選擇 ${selectedFeatureCount} / ${featureCount} 筆記錄",
    "exportToCsvSuccessMessage": "已成功匯出 CSV 檔案。",
    "exportToCsvErrorMessage": "將選擇的圖徵匯出到 CSV 檔案時發生錯誤。 請再試一次。",
    "exportToCSVButtonTooltip": "匯出至 CSV",
    "showAllButtonTooltip": "顯示全部",
    "showSelectedButtonTooltip": "顯示所選",
    "selectAllButtonTooltip": "全選",
    "clearSelectionButtonTooltip": "清除所選內容(C)"
  },
  "timeSlider": {
    "timeSliderLabel": "時間範圍",
    "timeSliderInEditModeAlert": "編輯時無法使用時間滑桿"
  },
  "comment": {
    "commentsFormSubmitButton": "儲存",
    "commentsFormCancelButton": "取消",
    "errorInSubmittingComment": "無法儲存編輯。",
    "emptyCommentMessage": "需要值",
    "placeHolderText": "",
    "noCommentsAvailableText": "沒有可用的記錄",
    "remainingTextCount": "剩餘 ${0} 個字元",
    "showNoText": "否",
    "selectAttachments": "附件",
    "selectFileText": "瀏覽",
    "attachmentSelectedMsg": "已選定附件",
    "attachmentHeaderText": "附件",
    "addRecordText": "新增記錄",
    "unknownCommentAttachment": "檔案",
    "unableToAddOrEditCommentMessage": "您沒有執行此動作的權限。"
  },
  "main": {
    "noGroup": "未配置任何群組",
    "basemapGalleryText": "底圖庫",
    "legendText": "圖例",
    "featureNotFoundMessage": "找不到請求的功能"
  },
  "search": {
    "searchIconTooltip": "搜尋此圖層",
    "clearSearchIconTooltip": "清除搜尋",
    "noResultFoundText": "找不到任何結果",
    "searchInEditModeAlert": "編輯時無法使用搜尋"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "重新整理",
    "confirmManualRefreshText": "將放棄所有選擇和未儲存的更改",
    "confirmHardRefreshText": "將放棄所有篩選器、選擇和未儲存的變更"
  },
  "help": {
    "helpIconTooltip": "幫助"
  },
  "filter": {
    "noFeatureFoundText": "找不到此值的圖徵。",
    "distinctQueryFailed": "找不到欄位的不同值。",
    "andText": "和",
    "filterInEditModeAlert": "編輯時無法使用篩選器。",
    "dropdownSelectOption": "選擇",
    "filterInShowSelectedEditModeAlert": "無法在「顯示所選」模式中使用篩選器。",
    "operatorIs": "等於",
    "operatorIsNot": "不是",
    "stringOperatorStartsWith": "開頭為",
    "stringOperatorEndsWith": "結尾是",
    "stringOperatorContains": "包含",
    "stringOperatorDoesNotContain": "不包含",
    "operatorIsBlank": "為空白",
    "operatorIsNotBlank": "非空白",
    "numberOperatorIsAtLeast": "至少",
    "numberOperatorIsLessThan": "小於",
    "numberOperatorIsAtMost": "至多",
    "numberOperatorIsGreaterThan": "大於",
    "numberOperatorIsBetween": "介於",
    "numberOperatorIsNotBetween": "不介於"
  },
  "detailsPanel": {
    "editContentText": "編輯記錄"
  },
  "signOutPage": {
    "signOutMessage": "您已成功登出",
    "reSignInMessage": "按一下此處以登入"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "選擇選項",
    "showAllOptionText": "顯示全部",
    "showSelectedOptionText": "顯示所選"
  }
});