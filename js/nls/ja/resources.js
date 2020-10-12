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
    "error": "マップを作成できません",
    "licenseError": {
      "message": "パブリックでないテンプレートを使用するためのライセンスがアカウントに付与されていません。 組織の管理者に Essential Apps またはアドオン Essential Apps ライセンスを含むユーザー タイプを割り当てるよう依頼してください。",
      "title": "ライセンスがありません。"
    }
  },
  "webMapList": {
    "owner": "所有者",
    "created": "作成日",
    "modified": "更新日",
    "description": "説明",
    "snippet": "サマリー",
    "licenseInfo": "アクセスと使用の制限",
    "accessInformation": "著作権",
    "tags": "タグ",
    "numViews": "ビュー数",
    "avgRating": "評価",
    "noWebMapInGroup": "構成済みのグループが無効であるか、アイテムがこのグループと共有されていません",
    "infoBtnToolTip": "マップ情報",
    "openWebmapList": "パネルを開く",
    "closeWebmapList": "パネルを閉じる"
  },
  "geoform": {
    "enterInformation": "詳細",
    "selectAttachments": "添付ファイル",
    "selectFileText": "参照",
    "enterLocation": "位置",
    "reportItButton": "送信",
    "cancelButton": "キャンセル",
    "requiredField": "(必須)",
    "selectDefaultText": "選択&hellip;",
    "invalidInputValue": "有効な値を入力してください。",
    "noFieldsConfiguredMessage": "レイヤー フィールドがデータを取得するように構成されていません",
    "invalidSmallNumber": "整数を入力してください",
    "invalidNumber": "整数を入力してください",
    "invalidFloat": "数字を入力してください",
    "invalidDouble": "数字を入力してください",
    "requiredFields": "すべての必須フィールドに値を指定してください",
    "selectLocation": "レポート対象の位置を選択してください",
    "numericRangeHintMessage": "${openStrong}ヒント:${closeStrong} 最小値 ${minValue} および最大値 ${maxValue}",
    "dateRangeHintMessage": "${openStrong}ヒント:${closeStrong} 最小日付 ${minValue} および最大日付 ${maxValue}",
    "errorsInApplyEdits": "レポートを送信できませんでした。",
    "attachmentSelectedMsg": "添付ファイルが選択されています",
    "attachmentUploadStatus": "${total} 件のうち、${failed} 件の添付ファイルをアップロードできませんでした。",
    "attachmentDeleteStatus": "${total} 件のうち、${failed} 件の添付ファイルを削除できませんでした。",
    "featureUpdateStatus": "${total} 件のうち、${failed} 件のフィーチャを更新できませんでした。",
    "geoLocationError": "現在の位置は利用できません",
    "geoLocationOutOfExtent": "現在の位置はベースマップの範囲外です",
    "submitButtonTooltip": "保存",
    "cancelButtonTooltip": "キャンセル",
    "geoformBackButtonTooltip": "レポート リストに戻る",
    "updateFeaturesConfirmationMsg": "${count} フィーチャが更新されます",
    "attachmentHeaderText": "添付ファイル",
    "unknownPopupAttachment": "ファイル",
    "unableToEditPopupMessage": "この操作を実行する権限がありません。",
    "invalidFeatureCreatorMessage": "このフィーチャを編集する権限がありません。",
    "userSpecificFeatureUpdateMessage": "${username} が作成したフィーチャのみが更新されました。",
    "anonymousUserText": "匿名"
  },
  "mapViewer": {
    "zoomInToolTip": "拡大",
    "zoomOutToolTip": "縮小"
  },
  "applicationHeader": {
    "signInOption": "サイン イン",
    "signOutOption": "サイン アウト",
    "pleaseSignInText": "サイン インしてください"
  },
  "dataviewer": {
    "noIssuesReported": "レポートがありません",
    "noFeatureGeometry": "フィーチャを表示できません",
    "ascendingFlagTitle": "昇順に並べ替え",
    "descendingFlagTitle": "降順に並べ替え",
    "filterLabel": "フィルター",
    "valueRadioButtonLabel": "値",
    "uniqueRadioButtonLabel": "個別値",
    "selectLayerToBegin": "開始するカテゴリを選択",
    "layerFeatureCount": "${selectedFeatureCount}/${featureCount} レコードが選択されました",
    "exportToCsvSuccessMessage": "CSV ファイルは正常にエクスポートされました。",
    "exportToCsvErrorMessage": "選択したフィーチャを CSV ファイルにエクスポート中にエラーが発生しました。 もう一度お試しください。",
    "exportToCSVButtonTooltip": "CSV にエクスポート",
    "showAllButtonTooltip": "すべて表示",
    "showSelectedButtonTooltip": "選択レイヤーの表示",
    "selectAllButtonTooltip": "すべて選択",
    "clearSelectionButtonTooltip": "選択の解除",
    "invalidFeatureMessage": "無効なフィーチャ ${invalidFeatureCount} 個を選択できません。"
  },
  "timeSlider": {
    "timeSliderLabel": "時間範囲",
    "timeSliderInEditModeAlert": "編集中はタイム スライダーを使用できません"
  },
  "comment": {
    "commentsFormSubmitButton": "保存",
    "commentsFormCancelButton": "キャンセル",
    "errorInSubmittingComment": "編集内容を保存できませんでした。",
    "emptyCommentMessage": "値が必要です",
    "placeHolderText": "",
    "noCommentsAvailableText": "レコードがありません",
    "remainingTextCount": "${0} 文字が残っています",
    "showNoText": "なし",
    "selectAttachments": "添付ファイル",
    "selectFileText": "参照",
    "attachmentSelectedMsg": "添付ファイルが選択されています",
    "attachmentHeaderText": "添付ファイル",
    "addRecordText": "レコードの追加",
    "unknownCommentAttachment": "ファイル",
    "unableToAddOrEditCommentMessage": "この操作を実行する権限がありません。"
  },
  "main": {
    "noGroup": "グループが構成されていません",
    "basemapGalleryText": "ベースマップ ギャラリー",
    "legendText": "凡例",
    "featureNotFoundMessage": "要求されたフィーチャが見つかりません"
  },
  "search": {
    "searchIconTooltip": "このレイヤーを検索",
    "noResultFoundText": "結果が見つかりませんでした",
    "searchInEditModeAlert": "編集中は検索を使用できません"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "更新",
    "confirmManualRefreshText": "すべての選択セットおよび保存されていない変更は破棄されます"
  },
  "help": {
    "helpIconTooltip": "ヘルプ"
  },
  "filter": {
    "noFeatureFoundText": "この値のフィーチャが見つかりません。",
    "distinctQueryFailed": "フィールドの個別値が見つかりません。",
    "andText": "および",
    "filterInEditModeAlert": "編集中はフィルターを使用できません。",
    "dropdownSelectOption": "選択",
    "filterInShowSelectedEditModeAlert": "[選択レイヤーの表示] モードではフィルターを使用できません。"
  },
  "detailsPanel": {
    "editContentText": "レコードの編集"
  },
  "signOutPage": {
    "signOutMessage": "正常にサイン アウトしました",
    "reSignInMessage": "ここをクリックしてサイン インします"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "選択オプション",
    "showAllOptionText": "すべて表示",
    "showSelectedOptionText": "選択レイヤーの表示"
  }
});