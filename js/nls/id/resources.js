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
    "error": "Tidak dapat membuat peta",
    "licenseError": {
      "message": "Akun Anda tidak dilisensikan untuk menggunakan Aplikasi yang Dapat Dikonfigurasi yang bukan bersifat publik. Harap minta administrator organisasi Anda untuk menetapkan Anda jenis pengguna yang menyertakan lisensi Essential App atau add-on Essential App.",
      "title": "Tidak Dilisensikan"
    }
  },
  "webMapList": {
    "owner": "Pemilik",
    "created": "Tanggal dibuat",
    "modified": "Tanggal diubah",
    "description": "Deskripsi",
    "snippet": "Ringkasan",
    "licenseInfo": "Batasan akses dan penggunaan",
    "accessInformation": "Kredit",
    "tags": "Tag",
    "numViews": "Jumlah peninjauan",
    "avgRating": "Peringkat",
    "noWebMapInGroup": "Grup yang dikonfigurasi tidak valid atau belum ada item yang dibagikan dengan grup ini",
    "infoBtnToolTip": "Informasi peta",
    "openWebmapList": "Buka panel",
    "closeWebmapList": "Tutup panel"
  },
  "geoform": {
    "enterInformation": "Detail",
    "selectAttachments": "Lampiran",
    "selectFileText": "Telusuri",
    "enterLocation": "Lokasi",
    "reportItButton": "Kirim",
    "cancelButton": "Batal",
    "requiredField": "(harus diisi)",
    "selectDefaultText": "Pilih&hellip;",
    "invalidInputValue": "Masukkan nilai yang valid.",
    "noFieldsConfiguredMessage": "Kolom layer tidak dikonfigurasi untuk menangkap data",
    "invalidSmallNumber": "Masukkan bilangan bulat",
    "invalidNumber": "Masukkan bilangan bulat",
    "invalidFloat": "Masukkan angka.",
    "invalidDouble": "Masukkan angka.",
    "requiredFields": "Harap berikan nilai untuk semua kolom yang harus diisi",
    "selectLocation": "Pilih lokasi untuk laporan Anda",
    "numericRangeHintMessage": "${openStrong}Hint:${closeStrong} Nilai minimum ${minValue} dan nilai maksimum ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hint:${closeStrong} Tanggal minimum ${minValue} dan Tanggal maksimum ${maxValue}",
    "errorsInApplyEdits": "Laporan tidak dapat dikirimkan.",
    "attachmentSelectedMsg": "lampiran dipilih",
    "attachmentUploadStatus": "${failed} dari ${total} lampiran gagal diunggah.",
    "attachmentDeleteStatus": "${failed} dari ${total} lampiran gagal dihapus.",
    "featureUpdateStatus": "${failed} dari ${total} fitur gagal diperbarui.",
    "geoLocationError": "Lokasi saat ini tidak tersedia",
    "geoLocationOutOfExtent": "Lokasi saat ini di luar jangkauan peta dasar",
    "submitButtonTooltip": "Simpan",
    "cancelButtonTooltip": "Batal",
    "geoformBackButtonTooltip": "Kembali ke daftar laporan",
    "updateFeaturesConfirmationMsg": "${count} feature akan diperbarui",
    "attachmentHeaderText": "Lampiran",
    "unknownPopupAttachment": "FILE",
    "unableToEditPopupMessage": "Anda tidak memiliki izin untuk menjalankan tindakan ini.",
    "invalidFeatureCreatorMessage": "Anda tidak memiliki otorisasi untuk mengedit fitur ini.",
    "userSpecificFeatureUpdateMessage": "Hanya fitur yang dibuat oleh ${username} yang telah diperbarui.",
    "anonymousUserText": "Anonim"
  },
  "mapViewer": {
    "zoomInToolTip": "Perbesar",
    "zoomOutToolTip": "Perkecil"
  },
  "applicationHeader": {
    "signInOption": "Masuk",
    "signOutOption": "Keluar",
    "pleaseSignInText": "Harap masuk"
  },
  "dataviewer": {
    "noIssuesReported": "Tidak ada laporan",
    "noFeatureGeometry": "Fitur tidak dapat ditampilkan",
    "ascendingFlagTitle": "Sortir dalam urutan naik",
    "descendingFlagTitle": "Sortir dalam urutan turun",
    "filterLabel": "Filter",
    "valueRadioButtonLabel": "Nilai",
    "uniqueRadioButtonLabel": "Unik",
    "selectLayerToBegin": "Pilih kategori untuk mulai",
    "layerFeatureCount": "${selectedFeatureCount} dipilih / ${featureCount} rekaman (record)",
    "exportToCsvSuccessMessage": "File CSV berhasil diekspor.",
    "exportToCsvErrorMessage": "Ada kesalahan saat mengekspor fitur yang dipilih ke file CSV. Harap coba lagi.",
    "exportToCSVButtonTooltip": "Ekspor ke CSV",
    "showAllButtonTooltip": "Tampilkan Semua",
    "showSelectedButtonTooltip": "Tampilkan yang Dipilih",
    "selectAllButtonTooltip": "Pilih Semua",
    "clearSelectionButtonTooltip": "Hapus Pilihan"
  },
  "timeSlider": {
    "timeSliderLabel": "Rentang waktu",
    "timeSliderInEditModeAlert": "Penggeser waktu tidak tersedia saat pengeditan"
  },
  "comment": {
    "commentsFormSubmitButton": "Simpan",
    "commentsFormCancelButton": "Batal",
    "errorInSubmittingComment": "Edit tidak dapat disimpan.",
    "emptyCommentMessage": "Nilai harus diisi",
    "placeHolderText": "",
    "noCommentsAvailableText": "Tidak ada rekaman (record) tersedia",
    "remainingTextCount": "${0} karakter tersisa",
    "showNoText": "Tidak",
    "selectAttachments": "Lampiran",
    "selectFileText": "Telusuri",
    "attachmentSelectedMsg": "lampiran dipilih",
    "attachmentHeaderText": "Lampiran",
    "addRecordText": "Tambah Rekaman (Record)",
    "unknownCommentAttachment": "FILE",
    "unableToAddOrEditCommentMessage": "Anda tidak memiliki izin untuk menjalankan tindakan ini."
  },
  "main": {
    "noGroup": "Tidak ada grup yang dikonfigurasikan",
    "basemapGalleryText": "Galeri Peta Dasar",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Fitur yang diminta tidak ditemukan"
  },
  "search": {
    "searchIconTooltip": "Cari layer ini",
    "noResultFoundText": "Tidak ada hasil yang ditemukan",
    "searchInEditModeAlert": "Pencarian tidak tersedia saat pengeditan"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Segarkan",
    "confirmManualRefreshText": "Semua pilihan dan perubahan yang tidak disimpan akan hilang"
  },
  "help": {
    "helpIconTooltip": "Bantuan"
  },
  "filter": {
    "noFeatureFoundText": "Tidak ditemukan feature untuk nilai ini",
    "distinctQueryFailed": "Tidak ada nilai jelas yang ditemukan untuk kolom ini.",
    "andText": "dan",
    "filterInEditModeAlert": "Filter tidak tersedia saat pengeditan.",
    "dropdownSelectOption": "Pilih",
    "filterInShowSelectedEditModeAlert": "Filter tidak tersedia di mode 'Show Selected' (Tampilkan yang Dipilih)."
  },
  "detailsPanel": {
    "editContentText": "Edit rekaman (record)"
  },
  "signOutPage": {
    "signOutMessage": "Anda telah berhasil keluar",
    "reSignInMessage": "Klik di sini untuk masuk"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Opsi Pilihan",
    "showAllOptionText": "Tampilkan Semua",
    "showSelectedOptionText": "Tampilkan yang Dipilih"
  }
});