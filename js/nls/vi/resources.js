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
    "error": "Không thể tạo bản đồ",
    "licenseError": {
      "message": "Tài khoản của bạn không được cấp phép để sử dụng ứng dụng có thể cấu hình mà không được công khai. Vui lòng yêu cầu quản trị viên của tổ chức bạn gán cho bạn loại người dùng nào có bao gồm các ứng dụng thiết yếu hoặc có giấy phép sử dụng các ứng dụng thiết yếu bổ trợ.",
      "title": "Không được cấp phép"
    }
  },
  "webMapList": {
    "owner": "Chủ sở hữu",
    "created": "Ngày tạo",
    "modified": "Ngày sửa đổi",
    "description": "Mô tả",
    "snippet": "Tóm tắt",
    "licenseInfo": "Những ràng buộc về Truy cập và Sử dụng",
    "accessInformation": "Service Credits",
    "tags": "Từ khóa",
    "numViews": "Số lần xem",
    "avgRating": "Xếp loại",
    "noWebMapInGroup": "Nhóm được cấu hình không hợp lệ hoặc vẫn chưa có mục nào được chia sẻ với nhóm này",
    "infoBtnToolTip": "Thông tin bản đồ",
    "openWebmapList": "Mở bảng điều khiển",
    "closeWebmapList": "Đóng bảng điều khiển"
  },
  "geoform": {
    "enterInformation": "Chi tiết",
    "selectAttachments": "Tệp đính kèm",
    "selectFileText": "Duyệt",
    "enterLocation": "Vị trí",
    "reportItButton": "Gửi",
    "cancelButton": "Hủy",
    "requiredField": "(bắt buộc)",
    "selectDefaultText": "Chọn&hellip;",
    "invalidInputValue": "Vui lòng nhập giá trị hợp lệ.",
    "noFieldsConfiguredMessage": "Các trường không được cấu hình để chụp dữ liệu",
    "invalidSmallNumber": "Vui lòng nhập số nguyên",
    "invalidNumber": "Vui lòng nhập số nguyên",
    "invalidFloat": "Vui lòng nhập một số",
    "invalidDouble": "Vui lòng nhập một số",
    "requiredFields": "Vui lòng cung cấp giá trị cho tất cả các trường yêu cầu",
    "selectLocation": "Vui lòng chọn vị trí cho báo cáo của bạn",
    "numericRangeHintMessage": "${openStrong}Gợi ý:${closeStrong} Giá trị tối thiểu ${minValue} và giá trị tối đa ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Gợi ý:${closeStrong} Ngày tối thiểu ${minValue} và Ngày tối đa ${maxValue}",
    "errorsInApplyEdits": "Không thể gửi báo cáo.",
    "attachmentSelectedMsg": "(các) tệp đính kèm được chọn",
    "attachmentUploadStatus": "Không thể tải lên ${failed} trên ${total} tệp đính kèm.",
    "attachmentDeleteStatus": "Không thể xóa ${failed} trên ${total} tệp đính kèm.",
    "featureUpdateStatus": "Không thể cập nhật ${failed} trên ${total} đối tượng.",
    "geoLocationError": "Vị trí hiện tại không khả dụng",
    "geoLocationOutOfExtent": "Vị trí hiện tại ngoài phạm vi bản đồ nền",
    "submitButtonTooltip": "Lưu",
    "cancelButtonTooltip": "Hủy",
    "geoformBackButtonTooltip": "Quay lại danh sách báo cáo",
    "updateFeaturesConfirmationMsg": "${count} đối tượng sẽ được cập nhật",
    "attachmentHeaderText": "Tệp đính kèm",
    "unknownPopupAttachment": "TỆP",
    "unableToEditPopupMessage": "Bạn không có quyền thực hiện thao tác này.",
    "invalidFeatureCreatorMessage": "Bạn không được phép chỉnh sửa đối tượng này.",
    "userSpecificFeatureUpdateMessage": "Chỉ các đối tượng do ${username} tạo ra được cập nhật.",
    "anonymousUserText": "Ẩn danh"
  },
  "mapViewer": {
    "zoomInToolTip": "Thu nhỏ",
    "zoomOutToolTip": "Phóng to"
  },
  "applicationHeader": {
    "signInOption": "Đăng nhập",
    "signOutOption": "Đăng xuất",
    "pleaseSignInText": "Vui lòng đăng nhập"
  },
  "dataviewer": {
    "noIssuesReported": "Không có báo cáo",
    "noFeatureGeometry": "Không thể hiển thị đối tượng",
    "ascendingFlagTitle": "Sắp xếp theo thứ tự tăng dần",
    "descendingFlagTitle": "Sắp xếp theo thứ tự giảm dần",
    "filterLabel": "Bộ lọc",
    "valueRadioButtonLabel": "Giá trị",
    "uniqueRadioButtonLabel": "Duy nhất",
    "selectLayerToBegin": "Chọn một danh mục để bắt đầu",
    "layerFeatureCount": "${selectedFeatureCount} được chọn / ${featureCount} hồ sơ",
    "exportToCsvSuccessMessage": "Xuất tệp CSV thành công.",
    "exportToCsvErrorMessage": "Lỗi xảy ra khi xuất các đối tượng đã chọn sang tệp CSV. Vui lòng thử lại.",
    "exportToCSVButtonTooltip": "Xuất ra CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Khoảng thời gian",
    "timeSliderInEditModeAlert": "Thanh trượt thời gian không khả dụng trong khi chỉnh sửa"
  },
  "comment": {
    "commentsFormSubmitButton": "Lưu",
    "commentsFormCancelButton": "Hủy",
    "errorInSubmittingComment": "Không thể lưu các chỉnh sửa.",
    "emptyCommentMessage": "Yêu cầu nhập giá trị",
    "placeHolderText": "",
    "noCommentsAvailableText": "Không có bản ghi nào",
    "remainingTextCount": "Còn ${0} ký tự",
    "showNoText": "Không",
    "selectAttachments": "Tệp đính kèm",
    "selectFileText": "Duyệt",
    "attachmentSelectedMsg": "(các) tệp đính kèm được chọn",
    "attachmentHeaderText": "Tệp đính kèm",
    "addRecordText": "Thêm Bản ghi",
    "unknownCommentAttachment": "TỆP",
    "unableToAddOrEditCommentMessage": "Bạn không có quyền thực hiện thao tác này."
  },
  "main": {
    "noGroup": "Không có nhóm nào được cấu hình",
    "basemapGalleryText": "Bộ sưu tập bản đồ nền",
    "legendText": "Chú giải",
    "featureNotFoundMessage": "Không tìm thấy đối tượng được yêu cầu"
  },
  "search": {
    "searchIconTooltip": "Tìm kiếm lớp này",
    "noResultFoundText": "Không tìm thấy kết quả",
    "searchInEditModeAlert": "Tìm kiếm không khả dụng trong khi chỉnh sửa"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Làm mới",
    "confirmManualRefreshText": "Tất cả các lựa chọn và các thay đổi chưa lưu sẽ bị hủy"
  },
  "help": {
    "helpIconTooltip": "Trợ giúp"
  },
  "filter": {
    "noFeatureFoundText": "Không tìm thấy đối tượng nào cho giá trị này.",
    "distinctQueryFailed": "Không tìm thấy giá trị riêng biệt nào cho trường.",
    "andText": "và",
    "filterInEditModeAlert": "Bộ lọc không khả dụng khi đang chỉnh sửa.",
    "dropdownSelectOption": "Chọn",
    "filterInShowSelectedEditModeAlert": "Bộ lọc không khả dụng trong chế độ \"Hiện Mục được Chọn\"."
  },
  "detailsPanel": {
    "editContentText": "Chỉnh sửa bản ghi"
  },
  "signOutPage": {
    "signOutMessage": "Bạn đã đăng xuất thành công",
    "reSignInMessage": "Bấm vào đây để đăng nhập"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Các Tùy chọn Lựa chọn",
    "showAllOptionText": "Hiển thị tất cả",
    "showSelectedOptionText": "Hiện Mục được Chọn"
  }
});