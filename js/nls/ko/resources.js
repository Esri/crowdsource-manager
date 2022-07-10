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
    "error": "맵을 생성할 수 없음",
    "licenseError": {
      "message": "귀하의 계정에는 공개 상태가 아닌 구성 설정 앱을 사용할 수 있는 라이선스가 없습니다. 필수 앱 또는 애드온 필수 앱 라이선스가 포함된 사용자 유형을 업무 지시하려면 기관 관리자에게 문의하세요.",
      "title": "라이선스가 없음"
    },
    "warningMessageTitle": "제한된 브라우저 지원",
    "warningMessageAGOL": "사용 중인 브라우저는 더 이상 지원되지 않습니다. 이 브라우저에서는 이 응용프로그램의 일부가 최적으로 작동하지 않거나 전혀 작동하지 않을 수 있습니다. 향후에 이 브라우저에 대한 지원이 중단됩니다.</br></br>최신 버전의 <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, <edge-link>Microsoft Edge</edge-link>를 사용하세요.</br></br>브라우저 지원에 대한 자세한 내용은 문서를 참조하세요. <feedback-link>GeoNet(Esri 커뮤니티)</feedback-link>을 통해 피드백을 제공하세요.",
    "warningMessageEnterprise": "사용 중인 브라우저는 더 이상 지원되지 않습니다. 이 브라우저에서는 이 응용프로그램의 일부가 최적으로 작동하지 않거나 전혀 작동하지 않을 수 있습니다.</br></br>최신 버전의 <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link>, <edge-link>Microsoft Edge</edge-link>를 사용하세요."
  },
  "webMapList": {
    "owner": "소유자",
    "created": "생성된 날짜",
    "modified": "수정된 날짜",
    "description": "설명",
    "snippet": "요약",
    "licenseInfo": "접근 및 사용 제약 조건",
    "accessInformation": "크레딧",
    "tags": "태그",
    "numViews": "조회수",
    "avgRating": "평점",
    "noWebMapInGroup": "구성된 그룹이 유효하지 않거나 이 그룹과 공유된 항목이 아직 없습니다.",
    "infoBtnToolTip": "맵 정보",
    "openWebmapList": "패널 열기",
    "closeWebmapList": "패널 닫기"
  },
  "geoform": {
    "enterInformation": "세부정보",
    "selectAttachments": "첨부 파일",
    "selectFileText": "찾아보기",
    "enterLocation": "위치",
    "reportItButton": "제출",
    "cancelButton": "취소",
    "requiredField": "(필수)",
    "selectDefaultText": "선택&hellip;",
    "invalidInputValue": "유효한 값을 입력하세요.",
    "noFieldsConfiguredMessage": "데이터를 캡처하도록 레이어 필드가 구성되지 않음",
    "invalidSmallNumber": "정수를 입력하세요.",
    "invalidNumber": "정수를 입력하세요.",
    "invalidFloat": "숫자를 입력하세요.",
    "invalidDouble": "숫자를 입력하세요.",
    "requiredFields": "모든 필수 필드에 값을 제공하세요.",
    "selectLocation": "보고서의 위치를 선택하세요.",
    "numericRangeHintMessage": "${openStrong}힌트:${closeStrong} 최소값 ${minValue} 및 최대값 ${maxValue}",
    "dateRangeHintMessage": "${openStrong}힌트:${closeStrong} 최소 날짜 ${minValue} 및 최대 날짜 ${maxValue}",
    "errorsInApplyEdits": "보고서를 제출할 수 없습니다.",
    "attachmentSelectedMsg": "첨부 파일이 선택됨",
    "attachmentUploadStatus": "${total}개 중 ${failed}개 첨부 파일 업로드에 실패했습니다.",
    "attachmentDeleteStatus": "${total}개 중 ${failed}개 첨부 파일 삭제에 실패했습니다.",
    "featureUpdateStatus": "${total}개 중 ${failed}개 피처 업데이트에 실패했습니다.",
    "geoLocationError": "현재 위치를 사용할 수 없음",
    "geoLocationOutOfExtent": "현재 위치가 베이스맵 범위를 벗어남",
    "submitButtonTooltip": "저장",
    "cancelButtonTooltip": "취소",
    "geoformBackButtonTooltip": "보고서 목록으로 돌아가기",
    "updateFeaturesConfirmationMsg": "${count} 피처가 업데이트됨",
    "attachmentHeaderText": "첨부 파일",
    "unknownPopupAttachment": "파일",
    "unableToEditPopupMessage": "이 작업을 수행할 권한이 없습니다.",
    "invalidFeatureCreatorMessage": "이 피처를 편집할 수 있는 권한이 없습니다.",
    "userSpecificFeatureUpdateMessage": "${username}이(가) 생성한 피처만 업데이트되었습니다.",
    "anonymousUserText": "익명"
  },
  "mapViewer": {
    "zoomInToolTip": "확대",
    "zoomOutToolTip": "축소"
  },
  "applicationHeader": {
    "signInOption": "로그인",
    "signOutOption": "로그아웃",
    "pleaseSignInText": "로그인하세요."
  },
  "dataviewer": {
    "noIssuesReported": "보고서를 사용할 수 없음",
    "noFeatureGeometry": "피처를 표시할 수 없음",
    "ascendingFlagTitle": "오름차순으로 정렬",
    "descendingFlagTitle": "내림차순으로 정렬",
    "filterLabel": "필터",
    "valueRadioButtonLabel": "값",
    "uniqueRadioButtonLabel": "고유값",
    "selectLayerToBegin": "시작하려면 범주 선택",
    "layerFeatureCount": "${featureCount}개 레코드 중 ${selectedFeatureCount}개 선택됨",
    "exportToCsvSuccessMessage": "CSV 파일을 정상적으로 내보냈습니다.",
    "exportToCsvErrorMessage": "선택한 피처를 CSV 파일로 내보내는 중 오류가 발생했습니다. 다시 시도하세요.",
    "exportToCSVButtonTooltip": "CSV로 내보내기",
    "showAllButtonTooltip": "모두 보기",
    "showSelectedButtonTooltip": "선택한 항목 보기",
    "selectAllButtonTooltip": "모두 선택",
    "clearSelectionButtonTooltip": "선택 해제"
  },
  "timeSlider": {
    "timeSliderLabel": "시간 범위",
    "timeSliderInEditModeAlert": "편집 중에 시간 슬라이더를 사용할 수 없음"
  },
  "comment": {
    "commentsFormSubmitButton": "저장",
    "commentsFormCancelButton": "취소",
    "errorInSubmittingComment": "편집 내용을 저장할 수 없습니다.",
    "emptyCommentMessage": "값이 필요함",
    "placeHolderText": "",
    "noCommentsAvailableText": "레코드를 사용할 수 없음",
    "remainingTextCount": "${0}자 남음",
    "showNoText": "아니요",
    "selectAttachments": "첨부 파일",
    "selectFileText": "찾아보기",
    "attachmentSelectedMsg": "첨부 파일이 선택됨",
    "attachmentHeaderText": "첨부 파일",
    "addRecordText": "레코드 추가",
    "unknownCommentAttachment": "파일",
    "unableToAddOrEditCommentMessage": "이 작업을 수행할 권한이 없습니다."
  },
  "main": {
    "noGroup": "구성된 그룹 없음",
    "basemapGalleryText": "베이스맵 갤러리",
    "legendText": "범례",
    "featureNotFoundMessage": "요청한 피처가 없음"
  },
  "search": {
    "searchIconTooltip": "이 레이어 검색",
    "clearSearchIconTooltip": "검색 지우기",
    "noResultFoundText": "결과를 찾을 수 없음",
    "searchInEditModeAlert": "편집 중에 검색을 사용할 수 없음"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "새로 고침",
    "confirmManualRefreshText": "모든 선택 내역과 저장하지 않은 변경 내용이 취소됩니다.",
    "confirmHardRefreshText": "모든 필터, 선택 항목과 저장하지 않은 변경 내용이 취소됩니다."
  },
  "help": {
    "helpIconTooltip": "도움말"
  },
  "filter": {
    "noFeatureFoundText": "이 값에 대한 피처를 찾을 수 없습니다.",
    "distinctQueryFailed": "필드에 대한 고유값을 찾을 수 없습니다.",
    "andText": "및",
    "filterInEditModeAlert": "편집 중에 필터를 사용할 수 없습니다.",
    "dropdownSelectOption": "선택",
    "filterInShowSelectedEditModeAlert": "'선택한 항목 보기' 모드에서는 필터를 사용할 수 없습니다.",
    "operatorIs": "다음과 같음",
    "operatorIsNot": "다음과 같지 않음",
    "stringOperatorStartsWith": "다음으로 시작함",
    "stringOperatorEndsWith": "다음으로 끝남",
    "stringOperatorContains": "포함함",
    "stringOperatorDoesNotContain": "다음을 포함하지 않음",
    "operatorIsBlank": "비어 있음",
    "operatorIsNotBlank": "비어 있지 않음",
    "numberOperatorIsAtLeast": "다음 이상임",
    "numberOperatorIsLessThan": "다음보다 작음",
    "numberOperatorIsAtMost": "다음 이하임",
    "numberOperatorIsGreaterThan": "다음보다 큼",
    "numberOperatorIsBetween": "다음 사이에 속함",
    "numberOperatorIsNotBetween": "다음 사이에 속하지 않음"
  },
  "detailsPanel": {
    "editContentText": "레코드 편집"
  },
  "signOutPage": {
    "signOutMessage": "로그아웃되었습니다.",
    "reSignInMessage": "로그인하려면 여기를 클릭"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "선택 옵션",
    "showAllOptionText": "모두 보기",
    "showSelectedOptionText": "선택한 항목 보기"
  }
});