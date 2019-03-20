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
    "error": "Δεν είναι δυνατή η δημιουργία χάρτη",
    "licenseError": {
      "message": "Ο λογαριασμός σας δεν διαθέτει άδεια χρήσης για Παραμετροποιήσιμες Εφαρμογές που δεν είναι δημόσιες. Ζητήστε από τον διαχειριστή του οργανισμού σας να σας εκχωρήσει τύπο χρήστη που να περιλαμβάνει Βασικές Εφαρμογές ή πρόσθετη άδεια χρήσης για Βασικές Εφαρμογές.",
      "title": "Χωρίς άδεια χρήσης"
    }
  },
  "webMapList": {
    "owner": "Κάτοχος",
    "created": "Ημερομηνία δημιουργίας",
    "modified": "Ημερομηνία τροποποίησης",
    "description": "Περιγραφή",
    "snippet": "Σύνοψη",
    "licenseInfo": "Περιορισμοί στην πρόσβαση και τη χρήση",
    "accessInformation": "Συντελεστές",
    "tags": "Ετικέτες",
    "numViews": "Αριθμός προβολών",
    "avgRating": "Αξιολόγηση",
    "noWebMapInGroup": "Η παραμετροποιημένη ομάδα δεν είναι έγκυρη ή δεν έχει γίνει ακόμη κοινοποίηση στοιχείων σε αυτήν την ομάδα",
    "infoBtnToolTip": "Πληροφορίες χάρτη",
    "openWebmapList": "Άνοιγμα πλαισίου",
    "closeWebmapList": "Κλείσιμο πλαισίου"
  },
  "geoform": {
    "enterInformation": "Λεπτομ.",
    "selectAttachments": "Συνημμένα",
    "selectFileText": "Αναζήτηση",
    "enterLocation": "Τοποθεσία",
    "reportItButton": "Υποβολή",
    "cancelButton": "Ακύρωση",
    "requiredField": "(απαιτούμενο)",
    "selectDefaultText": "Επιλέξτε&hellip;",
    "invalidInputValue": "Εισαγάγετε μια έγκυρη τιμή.",
    "noFieldsConfiguredMessage": "Τα πεδία του θεματικού επιπέδου δεν έχουν παραμετροποιηθεί για την καταγραφή δεδομένων",
    "invalidSmallNumber": "Εισαγάγετε έναν ακέραιο αριθμό",
    "invalidNumber": "Εισαγάγετε έναν ακέραιο αριθμό",
    "invalidFloat": "Εισαγάγετε έναν αριθμό",
    "invalidDouble": "Εισαγάγετε έναν αριθμό",
    "requiredFields": "Δώστε τιμές για όλα τα απαιτούμενα πεδία.",
    "selectLocation": "Επιλέξτε τη θέση για την αναφορά σας",
    "numericRangeHintMessage": "${openStrong}Υπόδειξη:${closeStrong} Ελάχιστη τιμή ${minValue} και μέγιστη τιμή ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Υπόδειξη:${closeStrong} Ελάχιστη ημερομηνία ${minValue} και μέγιστη ημερομηνία ${maxValue}",
    "errorsInApplyEdits": "Δεν ήταν δυνατή η υποβολή της αναφοράς.",
    "attachmentSelectedMsg": "συνημμένα επιλέχθηκαν",
    "attachmentUploadStatus": "Απέτυχε η μεταφόρτωση ${failed} συνημμένου(-ων) από ${total}.",
    "attachmentDeleteStatus": "Απέτυχε η διαγραφή ${failed} συνημμένου(-ων) από ${total}.",
    "featureUpdateStatus": "Απέτυχε η ενημέρωση ${failed} στοιχείου(-ων) από ${total}.",
    "geoLocationError": "Η τρέχουσα τοποθεσία δεν είναι διαθέσιμη",
    "geoLocationOutOfExtent": "Η τρέχουσα τοποθεσία είναι εκτός της έκτασης του υποβάθρου",
    "submitButtonTooltip": "Αποθήκευση",
    "cancelButtonTooltip": "Ακύρωση",
    "geoformBackButtonTooltip": "Επιστροφή στη λίστα αναφορών",
    "updateFeaturesConfirmationMsg": "${count} στοιχεία θα ενημερωθούν",
    "attachmentHeaderText": "Συνημμένα",
    "unknownPopupAttachment": "ΑΡΧΕΙΟ",
    "unableToEditPopupMessage": "Δεν έχετε δικαίωμα να εκτελέσετε αυτή την ενέργεια.",
    "invalidFeatureCreatorMessage": "Δεν έχετε εξουσιοδότηση για τη επεξεργασία αυτού του στοιχείου.",
    "userSpecificFeatureUpdateMessage": "Έχουν ενημερωθεί μόνο όσα στοιχεία δημιουργήθηκαν από τον χρήστη ${username}.",
    "anonymousUserText": "Ανώνυμος"
  },
  "mapViewer": {
    "zoomInToolTip": "Εστίαση σε μεγαλύτερη κλίμακα",
    "zoomOutToolTip": "Απομάκρυνση σε μικρότερη κλίμακα"
  },
  "applicationHeader": {
    "signInOption": "Είσοδος",
    "signOutOption": "Έξοδος",
    "pleaseSignInText": "Εισέλθετε"
  },
  "dataviewer": {
    "noIssuesReported": "Δεν υπάρχουν διαθέσιμες αναφορές",
    "noFeatureGeometry": "Δεν είναι δυνατή η εμφάνιση του στοιχείου",
    "ascendingFlagTitle": "Ταξινόμηση με αύξουσα σειρά",
    "descendingFlagTitle": "Ταξινόμηση με φθίνουσα σειρά",
    "filterLabel": "Φίλτρο",
    "valueRadioButtonLabel": "Τιμή",
    "uniqueRadioButtonLabel": "Μοναδικό",
    "selectLayerToBegin": "Επιλέξτε μια κατηγορία για να ξεκινήσετε",
    "layerFeatureCount": "${selectedFeatureCount} επιλεγμένα / ${featureCount} εγγραφές",
    "exportToCsvSuccessMessage": "Η εξαγωγή του αρχείου CSV ολοκληρώθηκε με επιτυχία.",
    "exportToCsvErrorMessage": "Σφάλμα κατά την εξαγωγή επιλεγμένων στοιχείων σε αρχείο CSV. Προσπαθήστε ξανά.",
    "exportToCSVButtonTooltip": "Εξαγωγή σε CSV"
  },
  "timeSlider": {
    "timeSliderLabel": "Εύρος χρόνου",
    "timeSliderInEditModeAlert": "Η μπάρα κύλισης χρόνου δεν είναι διαθέσιμη κατά την επεξεργασία"
  },
  "comment": {
    "commentsFormSubmitButton": "Αποθήκευση",
    "commentsFormCancelButton": "Ακύρωση",
    "errorInSubmittingComment": "Δεν ήταν δυνατή η αποθήκευση αλλαγών.",
    "emptyCommentMessage": "Απαιτείται τιμή",
    "placeHolderText": "",
    "noCommentsAvailableText": "Δεν υπάρχουν διαθέσιμες εγγραφές",
    "remainingTextCount": "Απομένουν ${0} χαρακτήρες",
    "showNoText": "Όχι",
    "selectAttachments": "Συνημμένα",
    "selectFileText": "Αναζήτηση",
    "attachmentSelectedMsg": "συνημμένα επιλέχθηκαν",
    "attachmentHeaderText": "Συνημμένα",
    "addRecordText": "Προσθήκη εγγραφής",
    "unknownCommentAttachment": "ΑΡΧΕΙΟ",
    "unableToAddOrEditCommentMessage": "Δεν έχετε δικαίωμα να εκτελέσετε αυτή την ενέργεια."
  },
  "main": {
    "noGroup": "Δεν έχει παραμετροποιηθεί κάποια ομάδα",
    "basemapGalleryText": "Συλλογή υποβάθρων",
    "legendText": "Υπόμνημα",
    "featureNotFoundMessage": "Το ζητούμενο στοιχείο δεν βρέθηκε"
  },
  "search": {
    "searchIconTooltip": "Αναζήτηση σε αυτό το θεματικό επίπεδο",
    "noResultFoundText": "Δεν βρέθηκαν αποτελέσματα",
    "searchInEditModeAlert": "Η αναζήτηση δεν είναι διαθέσιμη κατά την επεξεργασία"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Ανανέωση",
    "confirmManualRefreshText": "Όλες οι επιλογές και οι μη αποθηκευμένες αλλαγές θα απορριφθούν"
  },
  "help": {
    "helpIconTooltip": "Βοήθεια"
  },
  "filter": {
    "noFeatureFoundText": "Δεν βρέθηκαν στοιχεία για αυτήν την τιμή.",
    "distinctQueryFailed": "Δεν βρέθηκαν διακριτές τιμές για το πεδίο.",
    "andText": "και",
    "filterInEditModeAlert": "Τα φίλτρα δεν είναι διαθέσιμα κατά την επεξεργασία.",
    "dropdownSelectOption": "Επιλογή",
    "filterInShowSelectedEditModeAlert": "Τα φίλτρα δεν είναι διαθέσιμα στη λειτουργία \"Εμφάνιση επιλεγμένων\"."
  },
  "detailsPanel": {
    "editContentText": "Επεξεργασία εγγραφής"
  },
  "signOutPage": {
    "signOutMessage": "Αποσυνδεθήκατε με επιτυχία",
    "reSignInMessage": "Κάντε κλικ εδώ για να συνδεθείτε"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Δυνατότητες επιλογής",
    "showAllOptionText": "Εμφάνιση όλων",
    "showSelectedOptionText": "Εμφάνιση επιλεγμένων"
  }
});