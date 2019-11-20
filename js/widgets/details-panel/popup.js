/*global define,$,setTimeout,window,dojoConfig */
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
define([
    "dojo/_base/declare",
    "dojo/text!./templates/popup.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/on",
    "dijit/layout/ContentPane",
    "widgets/details-panel/popup-form",
    "esri/tasks/query",
    "dojo/_base/array",
    "esri/dijit/PopupTemplate",
    "dojo/query",
    "dojo/domReady!"
], function (
    declare,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang,
    dom,
    domAttr,
    domClass,
    domConstruct,
    on,
    ContentPane,
    PopupForm,
    Query,
    array,
    PopupTemplate,
    query
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        isShowSelectedClicked: null, // to notify that show selected option is clicked
        isShowAllClicked: null, // to notify that show all option is clicked
        _sameEditingPrivilegeForAnonymousObjArr: [
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": false,
                "allowOthersToUpdate": false,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": true,
                "allowAnonymousToDelete": true
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": true,
                "allowOthersToDelete": false,
                "allowOthersToUpdate": false,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": true,
                "allowAnonymousToDelete": true
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": true,
                "allowOthersToUpdate": true,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": true,
                "allowAnonymousToDelete": true
            },
        ],

        /**
         * This function is called when widget is constructed
         * @param{object} options contains parameters of widget
         * @memberOf widgets/details-panel/popup
         */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        startup: function () {
            //display popup panel
            this._showPopupPanel();
        },

        /**
         * Show selected feature's popup content
         * @memberOf widgets/details-panel/popup
         */
        _showPopupPanel: function () {
            //check whether multiple features selected
            if (this.multipleFeatures.length === 1) {
                //show popup info if single feature is selected
                this._hidePanel(this.popupFormContainer);
                this._showPanel(this.popupInfoParentContainer);
                this._displayPopupContent(this.multipleFeatures[0]);
                this.popupEditModeEnabled(false);
            } else {
                //create edit popup form if multiple feature selected
                this._createPopupForm();
            }
        },

        /**
         * display popup content for selected feature
         * @memberOf widgets/details-panel/popup
         */
        _displayPopupContent: function (selectedFeature) {
            if (selectedFeature) {
                var queryFeature, currentDateTime = new Date().getTime();
                queryFeature = new Query();
                queryFeature.objectIds = [parseInt(selectedFeature.attributes[this.selectedOperationalLayer.objectIdField], 10)];
                queryFeature.outFields = ["*"];
                queryFeature.outSpatialReference = this.selectedOperationalLayer.spatialReference;
                queryFeature.where = currentDateTime + "=" + currentDateTime;
                queryFeature.returnGeometry = true;
                this.selectedOperationalLayer.queryFeatures(queryFeature, lang.hitch(this, function (result) {
                    if (this.multipleFeatures[0]) {
                        var popupContentPane = new ContentPane({}, this.popupContainer);
                        if (!result.features[0].infoTemplate) {
                            result.features[0].setInfoTemplate(new PopupTemplate(this.popupInfo));
                        }
                        popupContentPane.startup();
                        popupContentPane.set("content", result.features[0].getContent());
                        this._checkAttachments();
                        this._createEditFormButton();
                    }
                }));
            }
        },

        /**
         * This function is used to create edit button
         * @memberOf widgets/details-panel/popup
         */
        _createEditFormButton: function () {
            var isEditableLayer, capabilities, editFeatureButton;
            isEditableLayer = false;
            // create edit icon to edit feature
            editFeatureButton = domConstruct.create("div", {
                "class": "esriCTEditFeatureButton esrictfonticons esrictfonticons-pencil esriCTBodyTextColor",
                "title": this.appConfig.i18n.detailsPanel.editContentText
            }, this.popupContainer);
            // check if the layer is non-editable
            array.forEach(this.itemInfo.itemData.operationalLayers, lang.hitch(this, function (operationalLayer) {
                if (this.selectedOperationalLayer.id === operationalLayer.id) {
                    if (operationalLayer.resourceInfo.capabilities) {
                        capabilities = operationalLayer.resourceInfo.capabilities;
                        // 1. Add, update, and delete features ->
                        // "Create,Delete,Query,Update,Editing" -> show edit icon
                        // 2. Add and update features -> "Create,Query,Update,Editing" -> show edit icon
                        // 3. Add features -> "Create,Query,Editing" -> hide edit icon
                        // 4. Update features -> "Query,Update,Editing" -> show edit icon
                        // 5. Update attributes only -> "Query,Update,Editing" -> show edit icon
                        if ((capabilities.indexOf("Editing") > -1) && (capabilities.indexOf("Update") > -1)) {
                            isEditableLayer = true;
                        }
                    }
                }
            }));
            // hide the editable icon for non-editable layer
            if (!isEditableLayer) {
                domClass.add(editFeatureButton, "esriCTHidden");
            }
            // attach 'click event on edit button to display form
            on(editFeatureButton, "click", lang.hitch(this, function (evt) {
                var existingAttachmentsArr;
                existingAttachmentsArr = this._getExistingAttachmentsArr(evt);
                if (this.appConfig.logInDetails.canEditFeatures) {
                    // 1. Is editor tracking enabled?
                    if (this.selectedOperationalLayer.hasOwnProperty("ownershipBasedAccessControlForFeatures") &&
                        this.selectedOperationalLayer.ownershipBasedAccessControlForFeatures !== null &&
                        this.selectedOperationalLayer.ownershipBasedAccessControlForFeatures !== "" &&
                        this.selectedOperationalLayer.ownershipBasedAccessControlForFeatures !== undefined) { // 1. Yes
                        // 2. Is the current user anonymous?
                        if (this.appConfig.logInDetails.isUserSignedIn) { // 2. No
                            this._checkCapabilityAndAllowEdit(existingAttachmentsArr);
                        } else { // 2. Yes
                            // 3. Do anonymous editors have the same editing privileges as named editors?
                            if (this._doAnonymousHaveSameEditingPrivilege()) { // 3. Yes, consider as a signed in user
                                this._checkCapabilityAndAllowEdit(existingAttachmentsArr);
                            } else { // 3. No, Only allow them to create related records
                                this.appUtils.showMessage(this.appConfig.i18n.geoform.invalidFeatureCreatorMessage);
                            }
                        }
                    } else { // 1. No, Existing checks are fine
                        this._createPopupForm(existingAttachmentsArr);
                    }
                } else {
                    this.appUtils.showMessage(this.appConfig.i18n.geoform.unableToEditPopupMessage);
                }
            }));
        },

        /**
         * This function is used to check whether anonymous user has same editing privilege as a named editors
         */
        _doAnonymousHaveSameEditingPrivilege: function () {
            var ownershipBasedAccessControlForFeaturesObj = this.selectedOperationalLayer.ownershipBasedAccessControlForFeatures;
            var hasSamePrivilege;
            hasSamePrivilege = false;
            array.forEach(this._sameEditingPrivilegeForAnonymousObjArr, lang.hitch(this, function (sameEditingPrivilegeForAnonymousObj) {
                if (JSON.stringify(sameEditingPrivilegeForAnonymousObj) === JSON.stringify(ownershipBasedAccessControlForFeaturesObj)) {
                    hasSamePrivilege = true;
                }
            }));
            return hasSamePrivilege;
        },

        /**
         * This function is used to check the edit capability of the user and
         * allow it to edit the feature
         */
        _checkCapabilityAndAllowEdit: function (existingAttachmentsArr) {
            // get edit capability of the user, this works for both signed in & anonymous user
            var userEditCapability = this.selectedOperationalLayer.getEditCapabilities({
                feature: this.multipleFeatures[0]
            });
            // can user edit the feature, this works for both signed in & anonymous user
            if (userEditCapability &&
                userEditCapability.hasOwnProperty("canUpdate") &&
                userEditCapability.canUpdate) {
                this._createPopupForm(existingAttachmentsArr);
            } else {
                this.appUtils.showMessage(this.appConfig.i18n.geoform.invalidFeatureCreatorMessage);
            }
        },

        /**
         * create form to update feature attributes
         * @memberOf widgets/details-panel/popup
         */
        _createPopupForm: function (existingAttachmentsArr) {
            //destroy existing popup-form instance
            if (this.popupFormInstance) {
                this.popupFormInstance.destroy();
            }
            domConstruct.empty(this.popupFormContainer);
            this.popupEditModeEnabled(true);

            //Create new instance of PopupForm
            this.popupFormInstance = new PopupForm({
                config: this.appConfig,
                itemInfos: this.itemInfo,
                appUtils: this.appUtils,
                nls: this.appConfig.i18n,
                selectedLayer: this.selectedOperationalLayer,
                popupInfo: this.popupInfo,
                selectedFeatures: this.multipleFeatures,
                existingAttachmentsArr: existingAttachmentsArr
            }, domConstruct.create("div", {}, this.popupFormContainer));
            this.popupFormInstance.startup();
            // attach handler on cancel button click
            this.popupFormInstance.onCancelButtonClick = lang.hitch(this, this._onFeatureUpdateCancel);
            // attach handler on save button click
            this.popupFormInstance.onPopupFormSubmitted = lang.hitch(this, function (feature) {
                if ((!this.isShowSelectedClicked) || ((this.isShowSelectedClicked) && (this.multipleFeatures) && (this.multipleFeatures.length === 1))) {
                    // Close the popup form after submitting new feature
                    this._hidePanel(this.popupFormContainer);
                    this._showPanel(this.popupInfoParentContainer);
                }
                this.onFeatureUpdated(feature, this.isShowSelectedClicked);
            });
            this._showPanel(this.popupFormContainer);
            this._hidePanel(this.popupInfoParentContainer);
        },

        /**
         * hide popup form on canceling editing
         * @memberOf widgets/details-panel/popup
         */
        _onFeatureUpdateCancel: function () {
            // if not show selected
            // if show selected & only one features is selected
            if ((!this.isShowSelectedClicked) || ((this.isShowSelectedClicked) && (this.multipleFeatures) && (this.multipleFeatures.length === 1))) {
                this._hidePanel(this.popupFormContainer);
                this._showPanel(this.popupInfoParentContainer);
                //display popup content for recently selected feature
                if (this.multipleFeatures.length > 1) {
                    var selectedFeature = this.multipleFeatures[this.multipleFeatures.length - 1];
                    this.onMultipleFeatureEditCancel(selectedFeature);
                }
                //Scroll to top position when clicked cancel need ID to use scrollTop
                dom.byId("tabContent").scrollTop = 0;
                this.popupEditModeEnabled(false);
            }
        },

        /**
         * shows and hides the div content
         * @memberOf widgets/details-panel/popup
         */
        _showPanel: function (domNode) {
            if (domClass.contains(domNode, "esriCTHidden")) {
                domClass.remove(domNode, "esriCTHidden");
            }
        },

        /**
         * shows and hides the div content
         * @memberOf widgets/details-panel/popup
         */
        _hidePanel: function (domNode) {
            if (!domClass.contains(domNode, "esriCTHidden")) {
                domClass.add(domNode, "esriCTHidden");
            }
        },

        /**
         * handler when popup form gets submitted successfully
         * @memberOf widgets/details-panel/popup
         */
        onFeatureUpdated: function (feature) {
            return feature;
        },

        /**
         * handler when multiple feature editing gets canceled
         * @memberOf widgets/details-panel/popup
         */
        onMultipleFeatureEditCancel: function (feature) {
            return feature;
        },

        /**
         * check whether attachments are available in layer and enabled in webmap
         * @memberOf widgets/details-panel/popup
         */
        _checkAttachments: function () {
            if (this.selectedOperationalLayer.hasAttachments && this.popupInfo.showAttachments) {
                var attachmentsDiv = $(".attachmentsSection", this.popupContainer)[0];
                if (attachmentsDiv) {
                    domConstruct.empty(attachmentsDiv);
                    domClass.remove(attachmentsDiv, "hidden");
                    this._loadAttachmentTimer = setTimeout(lang.hitch(this, function () {
                        this._showAttachments(this.multipleFeatures[0], attachmentsDiv);
                    }), 500);
                }
            }
        },

        /**
         * query layer to get attachments
         * @param{object} graphic
         * @param{object} attachmentContainer
         * @memberOf widgets/details-panel/popup
         */
        _showAttachments: function (graphic, attachmentContainer) {
            var objectID, fieldContent, imageDiv, imagePath, i, isAttachmentAvailable = false, imageThumbnailContainer, attachmentWrapper, imageThumbnailContent, imageContainer, fileTypeContainer;
            if (graphic) {
                objectID = graphic.attributes[this.selectedOperationalLayer.objectIdField];
                domConstruct.empty(attachmentContainer);
                this.selectedOperationalLayer.queryAttachmentInfos(objectID, lang.hitch(this, function (infos) {
                    // check if a hyperlink contains tiff image, then convert it into a non-image document
                    infos = this._checkForHyperlinks(infos);
                    // check if infoMedia contains tiff images then show them as non-image document
                    infos = this._checkTiffFormatImagesInPopupMedia(infos);
                    //check if attachments found
                    if (infos && infos.length > 0) {
                        //Create attachment header text
                        domConstruct.create("div", {
                            "innerHTML": this.appConfig.i18n.geoform.attachmentHeaderText,
                            "class": "esriCTAttachmentHeader"
                        }, attachmentContainer);

                        fieldContent = domConstruct.create("div", {
                            "class": "esriCTThumbnailContainer"
                        }, attachmentContainer);

                        // display all attached images in thumbnails
                        for (i = 0; i < infos.length; i++) {
                            // check if a attachment is of tiff image, then convert it into a non-image document
                            if (infos[i].contentType.indexOf("image") !== -1 && infos[i].contentType.match(/(\/tiff)/)) {
                                infos[i].contentType = "application/tiff";
                            }
                            if (((infos[i].contentType.indexOf("image") === -1) &&
                                    (infos[i].contentType.indexOf("mp4") === -1) &&
                                    (!this.appConfig.enableEditingAttachments)) ||
                                (this.appConfig.enableEditingAttachments)) {

                                attachmentWrapper = domConstruct.create("div", {}, fieldContent);

                                imageThumbnailContainer = domConstruct.create("div", {
                                    "class": "esriCTNonImageContainer",
                                    "alt": infos[i].url
                                }, attachmentWrapper);

                                this._setAttachmentDetails(imageThumbnailContainer, infos[i]);

                                imageThumbnailContent = domConstruct.create("div", {
                                    "class": "esriCTNonImageContent"
                                }, imageThumbnailContainer);

                                imageContainer = domConstruct.create("div", {}, imageThumbnailContent);

                                fileTypeContainer = domConstruct.create("div", {
                                    "class": "esriCTNonFileTypeContent"
                                }, imageThumbnailContent);

                                isAttachmentAvailable = true;
                                //set default image path if attachment has no image URL
                                imagePath = dojoConfig.baseURL + this.appConfig.noAttachmentIcon;
                                imageDiv = domConstruct.create("img", {
                                    "alt": infos[i].url,
                                    "class": "esriCTAttachmentImg",
                                    "src": imagePath
                                }, imageContainer);
                                this._fetchDocumentContentType(infos[i], fileTypeContainer);
                                this._fetchDocumentName(infos[i], imageThumbnailContainer);
                                on(imageThumbnailContainer, "click", lang.hitch(this, this._displayImageAttachments));
                            }
                        }
                        if (!isAttachmentAvailable) {
                            domClass.add(attachmentContainer, "hidden");
                        }
                    }
                }));
            }
        },

        /**
         * Function to fetch document content type
         * @param{object} attachment object
         * @memberOf widgets/details-panel/popup
         */
        _fetchDocumentContentType: function (attachmentData, fileTypeContainer) {
            var typeText, fileExtensionRegEx, fileExtension;
            fileExtensionRegEx = /(?:\.([^.]+))?$/; //ignore jslint
            fileExtension = fileExtensionRegEx.exec(attachmentData.name);
            if (fileExtension && fileExtension[1]) {
                typeText = "." + fileExtension[1].toUpperCase();
            } else {
                typeText = this.appConfig.i18n.geoform.unknownPopupAttachment;
            }
            domAttr.set(fileTypeContainer, "innerHTML", typeText);
        },

        /**
         * Function to fetch document name
         * @param{object} attachment object
         * @param{object} dom node
         * @memberOf widgets/details-panel/popup
         */
        _fetchDocumentName: function (attachmentData, container) {
            var attachmentNameWrapper, attachmentName;
            attachmentNameWrapper = domConstruct.create("div", {
                "class": "esriCTNonImageName"
            }, container);

            attachmentName = domConstruct.create("div", {
                "class": "esriCTNonImageNameMiddle",
                "innerHTML": attachmentData.name
            }, attachmentNameWrapper);
        },

        /**
         * This function is used to show attachments in new window when user clicks on the attachment thumbnail
         * @param{object} evt
         * @memberOf widgets/details-panel/popup
         */
        _displayImageAttachments: function (evt) {
            window.open(domAttr.get(evt.currentTarget, "alt"));
        },

        /**
         * Event listener for edit mode
         * @memberOf widgets/details-panel/popup
         */
        popupEditModeEnabled: function (isEditMode) {
            return isEditMode;
        },

        /**
         * This function is used to get tiff images from hyperlinks
         * @param{object} contains attachments information
         * @memberOf widgets/details-panel/popup
         */
        _checkForHyperlinks: function (infos) {
            var attributes, name;
            attributes = [];
            attributes = this.multipleFeatures[0].attributes;
            for (name in attributes) {
                if (attributes.hasOwnProperty(name) && attributes[name] && String(attributes[name]).match(/^(http(s?):)/) && String(attributes[name]).match(/\.(tif|tiff)(\/|$)/i)) {
                    // if the hyperlink contains a tiff image
                    infos.push(this._getTiffImageObject(attributes[name]));
                }
            }
            return infos;
        },

        /**
         * This function is use to get tiff images from media info
         * @param{object} contains attachments information
         * @memberOf widgets/details-panel/popup
         */
        _checkTiffFormatImagesInPopupMedia: function (infos) {
            var mediaInfos;
            if (this.selectedOperationalLayer.infoTemplate && this.selectedOperationalLayer.infoTemplate.info && this.selectedOperationalLayer.infoTemplate.info.mediaInfos && this.selectedOperationalLayer.infoTemplate.info.mediaInfos.length > 0) {
                mediaInfos = this.selectedOperationalLayer.infoTemplate.info.mediaInfos;
                // loop all the media info array for tiff image
                array.forEach(mediaInfos, lang.hitch(this, function (mediaInfo) {
                    if (mediaInfo.type === "image" && mediaInfo.value.sourceURL !== "" && mediaInfo.value.sourceURL.match(/\.(tiff|tif)/)) {
                        // if the hyperlink contains a tiff image
                        infos.push(this._getTiffImageObject(mediaInfo.value.sourceURL));
                    }
                }));
            }
            return infos;
        },

        /**
         * This function will return an object as document type of tiff image
         * @param{string} contains url
         * @memberOf widgets/details-panel/popup
         */
        _getTiffImageObject: function (url) {
            var tiffImageObject = {};
            tiffImageObject.contentType = 'application/tiff';
            tiffImageObject.url = url;
            tiffImageObject.name = url.substr(url.lastIndexOf('/') + 1);
            return tiffImageObject;
        },

        /**
         * This function is used get the array of existing attachments
         * @param {*} evt node in which attachments needs to be queried
         */
        _getExistingAttachmentsArr: function (evt) {
            var existingAttachmentsArr, existingAttachments;
            existingAttachmentsArr = [];
            existingAttachments = query(".esriCTNonImageContainer", evt.target.parentNode);
            array.forEach(existingAttachments, lang.hitch(this, function (existingAttachment) {
                var existingAttachmentObj;
                existingAttachmentObj = {};
                existingAttachmentObj.contentType = domAttr.get(existingAttachment, "attachmentContentType");
                existingAttachmentObj.id = domAttr.get(existingAttachment, "attachmentId");
                existingAttachmentObj.keywords = domAttr.get(existingAttachment, "attachmentKeywords");
                existingAttachmentObj.name = domAttr.get(existingAttachment, "attachmentName");
                existingAttachmentObj.objectId = domAttr.get(existingAttachment, "attachmentObjectId");
                existingAttachmentObj.parentObjectId = domAttr.get(existingAttachment, "attachmentParentObjectId");
                existingAttachmentObj.size = domAttr.get(existingAttachment, "attachmentSize");
                existingAttachmentObj.url = domAttr.get(existingAttachment, "attachmentUrl");
                existingAttachmentsArr.push(existingAttachmentObj);
            }));
            return existingAttachmentsArr;
        },

        /**
         * This function is used to set the attachment details as a attribute to the div
         * @param {*} node object of div
         * @param {*} attachment object containing details of attachment
         */
        _setAttachmentDetails: function (node, attachment) {
            if (attachment.hasOwnProperty("contentType")) {
                domAttr.set(node, "attachmentContentType", attachment.contentType);
            }
            if (attachment.hasOwnProperty("id")) {
                domAttr.set(node, "attachmentId", attachment.id);
            }
            if (attachment.hasOwnProperty("keywords")) {
                domAttr.set(node, "attachmentKeywords", attachment.keywords);
            }
            if (attachment.hasOwnProperty("name")) {
                domAttr.set(node, "attachmentName", attachment.name);
            }
            if (attachment.hasOwnProperty("objectId")) {
                domAttr.set(node, "attachmentObjectId", attachment.objectId);
            }
            if (attachment.hasOwnProperty("parentObjectId")) {
                domAttr.set(node, "attachmentParentObjectId", attachment.parentObjectId);
            }
            if (attachment.hasOwnProperty("size")) {
                domAttr.set(node, "attachmentSize", attachment.size);
            }
            if (attachment.hasOwnProperty("url")) {
                domAttr.set(node, "attachmentUrl", attachment.url);
            }
        }
    });
});