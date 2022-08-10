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
    "error": "Impossible de créer la carte",
    "licenseError": {
      "message": "La licence de votre compte ne permet pas d’utiliser des applications configurables non publiques. Demandez à l’administrateur de votre organisation de vous attribuer un type d’utilisateur qui inclut une licence Essential Apps ou une licence Essential Apps additionnelle.",
      "title": "Pas de licence"
    },
    "warningMessageTitle": "Prise en charge limitée du navigateur",
    "warningMessageAGOL": "Vous utilisez un navigateur obsolète. Certaines parties de cette application risquent de ne pas fonctionner de manière optimale ou de ne pas fonctionner du tout dans ce navigateur. Ce navigateur ne sera plus pris en charge à l’avenir.</br></br>Utilisez les dernières versions de <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> ou <edge-link>Microsoft Edge</edge-link>.</br></br>Pour plus d’informations sur les navigateurs pris en charge, consultez la documentation. Envoyez vos commentaires via <feedback-link>GeoNet, la communauté Esri</feedback-link>.",
    "warningMessageEnterprise": "Vous utilisez un navigateur qui n’est plus pris en charge. Certaines parties de cette application risquent de ne pas fonctionner de manière optimale ou de ne pas fonctionner du tout dans ce navigateur.</br></br>Utilisez les dernières versions de <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> ou <edge-link>Microsoft Edge</edge-link>."
  },
  "webMapList": {
    "owner": "Propriétaire",
    "created": "Date de création",
    "modified": "Date de modification",
    "description": "Description",
    "snippet": "Résumé",
    "licenseInfo": "Restrictions d'accès et d'utilisation",
    "accessInformation": "Crédits",
    "tags": "Balises",
    "numViews": "Nombre de vues",
    "avgRating": "Evaluation",
    "noWebMapInGroup": "Le groupe configuré n'est pas valide ou aucun élément n'a encore été partagé avec ce groupe",
    "infoBtnToolTip": "Informations sur la carte",
    "openWebmapList": "Ouvrir le volet",
    "closeWebmapList": "Fermer le volet"
  },
  "geoform": {
    "enterInformation": "Détails",
    "selectAttachments": "Pièces jointes",
    "selectFileText": "Parcourir",
    "enterLocation": "Emplacement",
    "reportItButton": "Envoyer",
    "cancelButton": "Annuler",
    "requiredField": "(requis)",
    "selectDefaultText": "Sélectionner&hellip;",
    "invalidInputValue": "Entrez une valeur valide.",
    "noFieldsConfiguredMessage": "Les champs de couche ne sont pas configurés pour capturer les données",
    "invalidSmallNumber": "Entrez un entier",
    "invalidNumber": "Entrez un entier",
    "invalidFloat": "Entrez un nombre",
    "invalidDouble": "Entrez un nombre",
    "requiredFields": "Indiquez des valeurs pour tous les champs requis",
    "selectLocation": "Sélectionnez l'emplacement de votre rapport",
    "numericRangeHintMessage": "${openStrong}Hint:${closeStrong} Valeur minimum ${minValue} et valeur maximum ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hint:${closeStrong} Date minimum ${minValue} et date maximum ${maxValue}",
    "errorsInApplyEdits": "Impossible d’envoyer le rapport.",
    "attachmentSelectedMsg": "pièce(s) jointe(s) sélectionnée(s)",
    "attachmentUploadStatus": "Échec du chargement de ${failed} sur ${total} pièce(s) jointe(s).",
    "attachmentDeleteStatus": "Échec de la suppression de ${failed} sur ${total} pièce(s) jointe(s).",
    "featureUpdateStatus": "Échec de la mise à jour de ${failed} sur ${total} entités(s).",
    "geoLocationError": "Localisant actuel non disponible",
    "geoLocationOutOfExtent": "L'étendue courante est en dehors de l'étendue du fond de carte",
    "submitButtonTooltip": "Enregistrer",
    "cancelButtonTooltip": "Annuler",
    "geoformBackButtonTooltip": "Revenir à la liste des rapports",
    "updateFeaturesConfirmationMsg": "${count} entités vont être mises à jour",
    "attachmentHeaderText": "Pièces jointes",
    "unknownPopupAttachment": "FICHIER",
    "unableToEditPopupMessage": "Vous n’êtes pas autorisé à effectuer cette action.",
    "invalidFeatureCreatorMessage": "Vous n’êtes pas autorisé à mettre à jour cette entité.",
    "userSpecificFeatureUpdateMessage": "Seules les entités créées par ${username} ont été mises à jour.",
    "anonymousUserText": "Anonyme"
  },
  "mapViewer": {
    "zoomInToolTip": "Zoom avant",
    "zoomOutToolTip": "Zoom arrière"
  },
  "applicationHeader": {
    "signInOption": "Connexion",
    "signOutOption": "Déconnexion",
    "pleaseSignInText": "Connectez-vous"
  },
  "dataviewer": {
    "noIssuesReported": "Aucun rapport disponible",
    "noFeatureGeometry": "Impossible d'afficher l'entité",
    "ascendingFlagTitle": "Trier par ordre croissant",
    "descendingFlagTitle": "Trier par ordre décroissant",
    "filterLabel": "Filtre",
    "valueRadioButtonLabel": "Valeur",
    "uniqueRadioButtonLabel": "Unique",
    "selectLayerToBegin": "Sélectionnez une catégorie pour commencer",
    "layerFeatureCount": "${selectedFeatureCount} sélectionnées / ${featureCount} enregistrements",
    "exportToCsvSuccessMessage": "Le fichier CSV a été exporté.",
    "exportToCsvErrorMessage": "Une erreur s’est produite lors de l’exportation des entités sélectionnées vers le fichier CSV. Réessayez ultérieurement.",
    "exportToCSVButtonTooltip": "Exporter au format CSV",
    "showAllButtonTooltip": "Afficher tout",
    "showSelectedButtonTooltip": "Afficher la sélection",
    "selectAllButtonTooltip": "Sélectionner tout",
    "clearSelectionButtonTooltip": "Effacer la sélection"
  },
  "timeSlider": {
    "timeSliderLabel": "Période",
    "timeSliderInEditModeAlert": "Le curseur temporel est indisponible pendant la mise à jour"
  },
  "comment": {
    "commentsFormSubmitButton": "Enregistrer",
    "commentsFormCancelButton": "Annuler",
    "errorInSubmittingComment": "Impossible d'enregistrer les mises à jour.",
    "emptyCommentMessage": "Valeur requise",
    "placeHolderText": "",
    "noCommentsAvailableText": "Aucun enregistrement disponible",
    "remainingTextCount": "${0} caractère(s) restant(s)",
    "showNoText": "Non",
    "selectAttachments": "Pièces jointes",
    "selectFileText": "Parcourir",
    "attachmentSelectedMsg": "pièce(s) jointe(s) sélectionnée(s)",
    "attachmentHeaderText": "Pièces jointes",
    "addRecordText": "Ajouter un enregistrement",
    "unknownCommentAttachment": "FICHIER",
    "unableToAddOrEditCommentMessage": "Vous n’êtes pas autorisé à effectuer cette action."
  },
  "main": {
    "noGroup": "Aucun groupe configuré",
    "basemapGalleryText": "Bibliothèque de fonds de carte",
    "legendText": "Légende",
    "featureNotFoundMessage": "Entité demandée introuvable"
  },
  "search": {
    "searchIconTooltip": "Rechercher dans cette couche",
    "clearSearchIconTooltip": "Effacer la recherche",
    "noResultFoundText": "Aucun résultat trouvé",
    "searchInEditModeAlert": "La recherche est indisponible pendant la mise à jour"
  },
  "manualRefresh": {
    "manualRefreshIconTooltip": "Actualiser",
    "confirmManualRefreshText": "Toutes les sélections et les modifications non enregistrées seront ignorées",
    "confirmHardRefreshText": "Tous les filtres, toutes les sélections et toutes les modifications non enregistrées seront effacés"
  },
  "help": {
    "helpIconTooltip": "Aide"
  },
  "filter": {
    "noFeatureFoundText": "Aucune entité trouvée pour cette valeur.",
    "distinctQueryFailed": "Aucune valeur distincte trouvée pour le champ.",
    "andText": "et",
    "filterInEditModeAlert": "Les filtres sont indisponibles pendant la mise à jour.",
    "dropdownSelectOption": "Sélectionner",
    "filterInShowSelectedEditModeAlert": "Les filtres sont indisponibles en mode Afficher les entités sélectionnées.",
    "operatorIs": "Est",
    "operatorIsNot": "N’est pas",
    "stringOperatorStartsWith": "Commence par",
    "stringOperatorEndsWith": "Se termine par",
    "stringOperatorContains": "Contient",
    "stringOperatorDoesNotContain": "Ne contient pas",
    "operatorIsBlank": "Est vide",
    "operatorIsNotBlank": "N’est pas vide",
    "numberOperatorIsAtLeast": "Est au moins",
    "numberOperatorIsLessThan": "Est inférieur à",
    "numberOperatorIsAtMost": "Est au plus",
    "numberOperatorIsGreaterThan": "Est supérieur à",
    "numberOperatorIsBetween": "Est entre",
    "numberOperatorIsNotBetween": "N’est pas entre"
  },
  "detailsPanel": {
    "editContentText": "Mettre à jour l'enregistrement"
  },
  "signOutPage": {
    "signOutMessage": "Vous avez été déconnecté",
    "reSignInMessage": "Cliquez ici pour vous connecter"
  },
  "selectionOptions": {
    "selectionOptionsIconTooltip": "Options de sélection",
    "showAllOptionText": "Afficher tout",
    "showSelectedOptionText": "Afficher les entités sélectionnées"
  }
});