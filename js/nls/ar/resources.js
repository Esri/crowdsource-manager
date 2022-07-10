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
    "error": "يتعذر إنشاء الخريطة",
    "licenseError": {
      "message": "حسابك غير مرخص لاستخدام التطبيقات القابلة للتكوين غير العامة. رجاءً اطلب من مسئولي المؤسسة تعيينك كنوع مستخدم يتضمن التطبيقات الأساسية أو ترخيص التطبيقات الأساسية المضافة.",
      "title": "غير مرخص"
    },
    "warningMessageTitle": "دعم مستعرض محدود",
    "warningMessageAGOL": "أنت تستخدم متصفحًا تم إيقافه. بعض أجزاء هذا التطبيق قد لا تعمل على النحو الأمثل أو لا تعمل على الإطلاق في هذا المتصفح. سيتوقف دعم هذا المتصفح في المستقبل، </br></br>يُرجى استخدام أحدث إصدارات <chrome-link>Google Chrome</chrome-link> أو <firefox-link>Mozilla Firefox</firefox-link> أو <safari-link>Apple Safari</safari-link> أو <edge-link>Microsoft Edge</edge-link>. </br></br>لمزيد من المعلومات حول دعم المتصفح، راجع الوثائق الخاصة بنا. قدم ملاحظاتك من خلال <feedback-link>GeoNet، مجتمع Esri</feedback-link>.",
    "warningMessageEnterprise": "المتصفح الذي تستخدمه لم يعد مدعومًا. قد لا تعمل بعض أجزاء هذا التطبيق على النحو الأمثل أو لا تعمل على الإطلاق في هذا المتصفح. </br></br>يُرجى استخدام أحدث إصدارات <chrome-link>Google Chrome</chrome-link> أو <firefox-link>Mozilla Firefox</firefox-link> أو <safari-link>Apple Safari</safari-link> أو <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "المالك",
    "created": "التاريخ الذي تم إنشائه",
    "modified": "تاريخ التعديل",
    "description": "الوصف",
    "snippet": "الملخص",
    "licenseInfo": "الدخول والاستخدام",
    "accessInformation": "اعتمادات",
    "tags": "علامات",
    "numViews": "عدد مرات العرض",
    "avgRating": "التقييم",
    "noWebMapInGroup": "المجموعات التي تم تكوينها غير صحيحة أو لم تتم مشاركة العناصر مع هذه المجموعة بعد",
    "infoBtnToolTip": "معلومات الخريطة",
    "openWebmapList": "افتح اللوحة",
    "closeWebmapList": "إغلاق اللوحة"
  },
  "geoform": {
    "enterInformation": "تفاصيل",
    "selectAttachments": "مرفقات",
    "selectFileText": "مربع حوار",
    "enterLocation": "الموقع",
    "reportItButton": "إرسال",
    "cancelButton": "إلغاء الأمر",
    "requiredField": "(مطلوب)",
    "selectDefaultText": "حدد&hellip;",
    "invalidInputValue": "يرجى إدخال قيمة صحيحة.",
    "noFieldsConfiguredMessage": "لم يتم تكوين حقول الطبقة لالتقاط البيانات",
    "invalidSmallNumber": "برجاء إدخال عدد صحيح",
    "invalidNumber": "برجاء إدخال عدد صحيح",
    "invalidFloat": "Please enter a number",
    "invalidDouble": "Please enter a number",
    "requiredFields": "برجاء توفير قيم لجميع الحقول المطلوبة",
    "selectLocation": "برجاء تحديد موقع التقرير",
    "numericRangeHintMessage": "${openStrong}Hint:${closeStrong} الحد الأدنى للقيمة ${minValue} والحد الأقصى للقيمة ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hint:${closeStrong} التاريخ الأدنى ${minValue} والتاريخ الأقصى ${maxValue}",
    "errorsInApplyEdits": "يتعذر إرسال التقرير.",
    "attachmentSelectedMsg": "المرفقات المحددة",
    "attachmentUploadStatus": "فشل تحميل المرفقات ${failed} من ${total}.",
    "attachmentDeleteStatus": "فشل حذف المرفقات ${failed} من ${total}.",
    "featureUpdateStatus": "فشل تحديث المعالم ${failed} من ${total}.",
    "geoLocationError": "الموقع الحالي غير متاح",
    "geoLocationOutOfExtent": "الموقع الحالي خارج نطاق الخريطة",
    "submitButtonTooltip": "حفظ",
    "cancelButtonTooltip": "إلغاء الأمر",
    "geoformBackButtonTooltip": "الرجوع إلى قائمة التقرير",
    "updateFeaturesConfirmationMsg": "سيتم تحديث المعالم ${count}",
    "attachmentHeaderText": "مرفقات",
    "unknownPopupAttachment": "ملف",
    "unableToEditPopupMessage": "لا يتوفر لديك إذن تنفيذ هذا الحدث.",
    "invalidFeatureCreatorMessage": "غير مصرح لك بتعديل هذا المعلم.",
    "userSpecificFeatureUpdateMessage": "لم يتم تحديث سوى المعالم التي تم إنشاؤها بواسطة ${username}.",
    "anonymousUserText": "مجهول"
  },
  "mapViewer": {
    "zoomInToolTip": "التكبير",
    "zoomOutToolTip": "التصغير."
  },
  "applicationHeader": {
    "signInOption": "تسجيل الدخول",
    "signOutOption": "تسجيل الخروج",
    "pleaseSignInText": "الرجاء تسجيل الدخول"
  },
  "dataviewer": {
    "noIssuesReported": "لا توجد تقارير متاحة",
    "noFeatureGeometry": "يتعذر عرض المعالم",
    "ascendingFlagTitle": "فرز بالترتيب التصاعدي",
    "descendingFlagTitle": "فرز بالترتيب التنازلي",
    "filterLabel": "تصفية",
    "valueRadioButtonLabel": "قيمة",
    "uniqueRadioButtonLabel": "فريد",
    "selectLayerToBegin": "تحديد فئة للبدء",
    "layerFeatureCount": "تم تحديد ${selectedFeatureCount} / تسجيلات ${featureCount}",
    "exportToCsvSuccessMessage": "تم تصدير ملف CSV بنجاح.",
    "exportToCsvErrorMessage": "حدث خطأ أثناء تصدير المعالم المحددة إلى ملف CSV. الرجاء إعادة المحاولة مرة أخرى.",
    "exportToCSVButtonTooltip": "تصدير إلى CSV",
    "showAllButtonTooltip": "إظهار الكل",
    "showSelectedButtonTooltip": "إظهار سجلات المعالم المحددة",
    "selectAllButtonTooltip": "تحديد الكل",
    "clearSelectionButtonTooltip": "مسح التحديد"
  },
  "timeSlider": {
    "timeSliderLabel": "النطاق الزمني",
    "timeSliderInEditModeAlert": "لا يتوفر منزلق الوقت أثناء التحرير"
  },
  "comment": {
    "commentsFormSubmitButton": "حفظ",
    "commentsFormCancelButton": "إلغاء الأمر",
    "errorInSubmittingComment": "لا يمكن حفظ عمليات التحرير.",
    "emptyCommentMessage": "القيمة المطلوبة",
    "placeHolderText": "",
    "noCommentsAvailableText": "لا توجد تسجيلات متاحة",
    "remainingTextCount": "يتبقى ${0} حرف",
    "showNoText": "لا",
    "selectAttachments": "مرفقات",
    "selectFileText": "مربع حوار",
    "attachmentSelectedMsg": "المرفقات المحددة",
    "attachmentHeaderText": "مرفقات",
    "addRecordText": "إضافة تسجيل",
    "unknownCommentAttachment": "ملف",
    "unableToAddOrEditCommentMessage": "لا يتوفر لديك إذن تنفيذ هذا الحدث."
  },
  "main": {
    "noGroup": "لم يتم تكوين المجموعة",
    "basemapGalleryText": "معرض خرائط الأساس",
    "legendText": "وسيلة الإيضاح",
    "featureNotFoundMessage": "لم يتم العثور على المعلم المطلوب"
  },
  "search": {
    "searchIconTooltip": "البحث عن هذه الطبقة",
    "clearSearchIconTooltip": "مسح البحث",
    "noResultFoundText": "لم يتم العثور على أية نتائج",
    "searchInEditModeAlert": "لا يتوفر البحث أثناء التحرير"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "تحديث",
    "confirmManualRefreshText": "سيتم تجاهل جميع عمليات التحديد والتغييرات غير المحفوظة",
    "confirmHardRefreshText": "سيتم تجاهل جميع عمليات التصفية والتحديد والتغييرات غير المحفوظة"
  },
  "help": {
    "helpIconTooltip": "مساعدة"
  },
  "filter": {
    "noFeatureFoundText": "لا توجد معالم للقيمة الحالية.",
    "distinctQueryFailed": "لا توجد قيم مُحددة للحقل.",
    "andText": "و",
    "filterInEditModeAlert": "لا تتوفر عوامل التصفية أثناء التحرير.",
    "dropdownSelectOption": "تحديد",
    "filterInShowSelectedEditModeAlert": "لا تتوفر عوامل التصفية في وضع 'العرض المُحدد'",
    "operatorIs": "يكون",
    "operatorIsNot": "ليس",
    "stringOperatorStartsWith": "يبدأ بـ",
    "stringOperatorEndsWith": "ينتهي بـ",
    "stringOperatorContains": "يتضمن",
    "stringOperatorDoesNotContain": "لا يحتوي على",
    "operatorIsBlank": "خالٍ",
    "operatorIsNotBlank": "غير خالٍ",
    "numberOperatorIsAtLeast": "على الأقل",
    "numberOperatorIsLessThan": "أقل من",
    "numberOperatorIsAtMost": "على الأكثر",
    "numberOperatorIsGreaterThan": "أكبر من",
    "numberOperatorIsBetween": "بين",
    "numberOperatorIsNotBetween": "ليس بين"
  },
  "detailsPanel": {
    "editContentText": "تحرير التسجيل"
  },
  "signOutPage": {
    "signOutMessage": "تم تسجيل الخروج بنجاح",
    "reSignInMessage": "انقر هنا لتسجيل الدخول"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "خيارات التحديد",
    "showAllOptionText": "إظهار الكل",
    "showSelectedOptionText": "إظهار سجلات المعالم المحددة"
  }
});