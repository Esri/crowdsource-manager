/*global define,$,dojoConfig,window */
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
    "dojo/text!./templates/comments.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "esri/layers/FeatureLayer",
    "dojo/on",
    "dojo/_base/array",
    "esri/tasks/RelationshipQuery",
    "esri/tasks/query",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/dom-style",
    "esri/dijit/PopupTemplate",
    "dijit/layout/ContentPane",
    "widgets/details-panel/comment-form",
    "dojo/_base/array",
    "dojo/DeferredList",
    "dojo/query",
    "dojo/domReady!"
], function (
    declare,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang,
    FeatureLayer,
    on,
    array,
    RelationshipQuery,
    Query,
    domConstruct,
    domClass,
    dom,
    domAttr,
    domStyle,
    PopupTemplate,
    ContentPane,
    CommentForm,
    arrayUtil,
    DeferredList,
    query
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        _commentPopupTable: null, // stores object of comments popup table
        _relatedRecords: [], // stores object of related record features
        _commentformInstance: null, // to store instance of comments form
        _addCommentBtnClickHandle: null, // to store click handle of add comments button
        _entireCommentsArr: null, // to store comments
        _entireAttachmentsArr: null, // to store attachments
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
        _featuresEditorsCanSeeObjArr: [
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": true,
                "allowOthersToUpdate": true,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": true,
                "allowAnonymousToDelete": true
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": false,
                "allowOthersToUpdate": false,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": false,
                "allowAnonymousToDelete": false
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": true,
                "allowOthersToUpdate": true,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": false,
                "allowAnonymousToDelete": false
            },
            ownershipBasedAccessControlForFeatures = {
                "allowOthersToQuery": false,
                "allowOthersToDelete": false,
                "allowOthersToUpdate": false,
                "allowAnonymousToQuery": true,
                "allowAnonymousToUpdate": true,
                "allowAnonymousToDelete": true
            }
        ],

        i18n: {}, // to stores nls strings

        /**
         * This function is called when widget is constructed
         * @param{object} parameters of widget
         * @memberOf widgets/details-panel/comments
         */
        constructor: function (options) {
            lang.mixin(this, options);
            this.i18n = this.appConfig.i18n;
        },

        /**
         * This function is designed to handle processing after any DOM fragments
         * have been actually added to the document.
         * @memberOf widgets/details-panel/comments
         */
        startup: function () {
            this._showComments(this.multipleFeatures[0], this.commentsContainer);
        },

        /**
         * Method will get related table info and check if any relationship exist for comments.
         * If Comments relationship exist as per the configured field then
         * it will get the related table info for further use
         * Considering only the first related table although the layer has many related table
         * @memberOf widgets/details-panel/comments
         */
        _showComments: function (graphic, parentDiv) {
            var relatedTableURL;
            this.appUtils.showLoadingIndicator();
            this._entireCommentsArr = null;
            this._entireAttachmentsArr = null;
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (this.selectedOperationalLayer.relationships && this.selectedOperationalLayer.relationships.length > 0) {
                // Construct the related table URL form operational layer URL and the related table id
                // We are considering only first related table although the layer has many related table.
                // Hence, we are fetching relatedTableId from relationships[0]
                // ie: "operationalLayer.relationships[0].relatedTableId"
                // Create Comments table if not exist from the first related table of the layer
                if (!this._commentsTable) {
                    relatedTableURL = this.selectedOperationalLayer.url.substr(0, this.selectedOperationalLayer.url.lastIndexOf('/') + 1) + this.selectedOperationalLayer.relationships[0].relatedTableId;
                    this._commentsTable = new FeatureLayer(relatedTableURL);
                    if (this.itemInfo && this.itemInfo.itemData && this.itemInfo.itemData.tables) {
                        array.some(this.itemInfo.itemData.tables, lang.hitch(this, function (currentTable) {
                            if (this._commentsTable && this._commentsTable.url) {
                                if (currentTable.url === this._commentsTable.url && currentTable.popupInfo) {
                                    this._commentPopupTable = currentTable;
                                    if (currentTable.layerDefinition && currentTable.layerDefinition.definitionExpression) {
                                        this._commentsTable.setDefinitionExpression(currentTable.layerDefinition.definitionExpression);
                                    }
                                }
                            }
                        }));
                    }
                }
                if (!this._commentsTable.loaded) {
                    on(this._commentsTable, "load", lang.hitch(this, function () {
                        this._loadCommentsIfExist(graphic, parentDiv);
                    }));
                } else {
                    this._loadCommentsIfExist(graphic, parentDiv);
                }
            } else {
                this.hideCommentsTab();
                this.appUtils.hideLoadingIndicator();
            }
        },

        /**
         * This function is used to check whether comments are available or not to display
         * @memberOf widgets/details-panel/comments
         */
        _loadCommentsIfExist: function (graphic, parentDiv) {
            if ((this.appConfig.usePopupConfigurationForComment) && (this._commentPopupTable) && (this._hasEditableField())) {
                this._displayAddCommentsButton();
                this._fetchComments(graphic, parentDiv);
            } else if ((!this.appConfig.usePopupConfigurationForComment) && (this._hasCommentsField() && (this._hasEditableField()))) {
                this._displayAddCommentsButton();
                this._fetchComments(graphic, parentDiv);
            } else {
                this.hideCommentsTab();
                this.appUtils.hideLoadingIndicator();
            }
        },

        /**
         * This function is used to display the comments button
         * @memberOf widgets/details-panel/comments
         */
        _displayAddCommentsButton: function () {
            if (this.selectedOperationalLayer.capabilities.indexOf("Create") > -1) {
                if (this.addCommentsBtnWrapperContainer) {
                    domClass.remove(this.addCommentsBtnWrapperContainer, "esriCTHidden");
                }
            } else {
                if (this.addCommentsBtnWrapperContainer) {
                    domClass.add(this.addCommentsBtnWrapperContainer, "esriCTHidden");
                }
            }
        },

        /**
         * This function is used to fetch comments from table
         * @param {object} graphic contains related feature object
         * @memberOf widgets/details-panel/comments
         */
        _fetchComments: function (graphic, parentDiv) {
            var relatedQuery, currentID, commentsTableDefinitionExpression;
            currentID = graphic.attributes[this.selectedOperationalLayer.objectIdField];
            relatedQuery = new RelationshipQuery();
            relatedQuery.outFields = ["*"];
            relatedQuery.relationshipId = this.selectedOperationalLayer.relationships[0].id;
            relatedQuery.objectIds = [currentID];
            commentsTableDefinitionExpression = this._commentsTable.getDefinitionExpression();
            if (this._commentsTable.hasOwnProperty("ownershipBasedAccessControlForFeatures") &&
                this._commentsTable.ownershipBasedAccessControlForFeatures !== null &&
                this._commentsTable.ownershipBasedAccessControlForFeatures !== undefined &&
                this._commentsTable.ownershipBasedAccessControlForFeatures !== "" &&
                this._isFeaturesOnlyEditorCanSeeOptionSelected(this._commentsTable.ownershipBasedAccessControlForFeatures)) {
                // when creatorField property is available
                if (this._commentsTable.hasOwnProperty("editFieldsInfo") &&
                    this._commentsTable.editFieldsInfo.hasOwnProperty("creatorField")) {
                    creatorFieldName = this._commentsTable.editFieldsInfo.creatorField;
                    if (this.appConfig.logInDetails.isUserSignedIn) {
                        if (commentsTableDefinitionExpression !== null && commentsTableDefinitionExpression !== "" &&
                            commentsTableDefinitionExpression !== undefined) {
                            commentsTableDefinitionExpression = commentsTableDefinitionExpression + " AND " + creatorFieldName + "=" + "'" + this.appConfig.logInDetails.userId + "'";
                        } else {
                            commentsTableDefinitionExpression = creatorFieldName + "=" + "'" + this.appConfig.logInDetails.userId + "'";
                        }
                    } else {
                        if (commentsTableDefinitionExpression !== null && commentsTableDefinitionExpression !== "" &&
                            commentsTableDefinitionExpression !== undefined) {
                            commentsTableDefinitionExpression = commentsTableDefinitionExpression + " AND " + creatorFieldName + "=" + "''";
                        } else {
                            commentsTableDefinitionExpression = creatorFieldName + "=" + "''";
                        }
                    }
                }
            }
            //If table has definition expression set in web map then apply it
            if (commentsTableDefinitionExpression !== null && commentsTableDefinitionExpression !== undefined &&
                commentsTableDefinitionExpression !== "") {
                relatedQuery.definitionExpression = commentsTableDefinitionExpression;
            }
            // Query for related features and showing comments
            this.selectedOperationalLayer.queryRelatedFeatures(relatedQuery, lang.hitch(this, function (relatedFeatures) {
                var commentsParentDiv, pThis, commentsContainerDiv, i, deferredListArr;
                deferredListArr = [];
                pThis = this;
                this._relatedRecords = relatedFeatures;
                commentsContainerDiv = domConstruct.create("div", {}, parentDiv);
                commentsParentDiv = domConstruct.create("div", {
                    "class": "esriCTCommentsParentDiv"
                }, commentsContainerDiv);
                function sortComments(a, b) {
                    if (a.attributes[pThis._commentsTable.objectIdField] > b.attributes[pThis._commentsTable.objectIdField]) {
                        return -1; // order a before b
                    }
                    if (a.attributes[pThis._commentsTable.objectIdField] < b.attributes[pThis._commentsTable.objectIdField]) {
                        return 1; // order b before a
                    }
                    return 0; // a & b have same date, so relative order doesn't matter
                }
                if (this._relatedRecords[currentID] && this._relatedRecords[currentID].features && this._relatedRecords[currentID].features.length > 0) {
                    this._attachEventToAddCommentButton();
                    this._relatedRecords[currentID].features.sort(sortComments);
                    for (i = 0; i < this._relatedRecords[currentID].features.length; i++) {
                        if (!this.appConfig.usePopupConfigurationForComment) {
                            this._createPopUpForSingleField(this._relatedRecords[currentID].features[i]);
                        }
                        deferredListArr.push(this._createPopUpContent(this._relatedRecords[currentID].features[i], commentsParentDiv));
                    }
                    this._getAllComments(deferredListArr);
                } else {
                    if (!this.appConfig.usePopupConfigurationForComment) {
                        this._createPopUpForSingleField();
                    }
                    this._attachEventToAddCommentButton();
                    this.showCommentsTab();
                    if (dom.byId("commentsTotalCount")) {
                        domAttr.set(dom.byId("commentsTotalCount"), "innerHTML", "(" + 0 + ")"); //ignore jslint
                    }
                    this.appUtils.hideLoadingIndicator();
                }
            }), lang.hitch(this, function () {
                this.hideCommentsTab();
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
         * This function is used to get all the comments
         * @memberOf widgets/details-panel/comments
         */
        _getAllComments: function (deferredListArr) {
            var deferredList;
            deferredList = new DeferredList(deferredListArr);
            deferredList.then(lang.hitch(this, function (response) {
                this._entireCommentsArr = response;
                if (this._entireCommentsArr.length > 0) {
                    if (this._commentsTable.hasAttachments) {
                        this._getAllAttachments();
                    } else {
                        this._displayCommentsAndAttachments();
                    }
                } else {
                    this.hideCommentsTab();
                    this.appUtils.hideLoadingIndicator();
                }
            }), lang.hitch(this, function () {
                this.hideCommentsTab();
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
         * This function is used to get all the attachments
         * @memberOf widgets/details-panel/comments
         */
        _getAllAttachments: function () {
            var deferredList, deferredListArr, i;
            deferredListArr = [];
            for (i = 0; i < this._entireCommentsArr.length; i++) {
                deferredListArr.push(this._commentsTable.queryAttachmentInfos(this._entireCommentsArr[i][1].features[0].attributes[this.selectedOperationalLayer.objectIdField]));
            }
            deferredList = new DeferredList(deferredListArr);
            deferredList.then(lang.hitch(this, function (response) {
                this._entireAttachmentsArr = response;
                this._displayCommentsAndAttachments();
            }), lang.hitch(this, function () {
                this.hideCommentsTab();
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
         * This function is used display comments and attachments
         * @memberOf widgets/details-panel/comments
         */
        _displayCommentsAndAttachments: function () {
            var i, commentContentPaneContainer, commentContentPane, commentsParentDiv;
            for (i = 0; i < this._entireCommentsArr.length; i++) {
                commentsParentDiv = query(".esriCTCommentsParentDiv")[0];
                commentContentPaneContainer = domConstruct.create("div", { "class": "esriCTCommentsPopup" }, commentsParentDiv);
                commentContentPane = new ContentPane({}, commentContentPaneContainer);
                if (!this._entireCommentsArr[i][1].features[0].infoTemplate) {
                    this._entireCommentsArr[i][1].features[0].setInfoTemplate(new PopupTemplate(this._commentPopupTable.popupInfo));
                }
                commentContentPane.startup();
                commentContentPane.set('content', this._entireCommentsArr[i][1].features[0].getContent());
                this._checkAttachments(commentContentPaneContainer, i);
                this._createCommentButton(commentContentPaneContainer, this._entireCommentsArr[i][1].features[0]);
            }
            this.showCommentsTab();
            if (dom.byId("commentsTotalCount")) {
                domAttr.set(dom.byId("commentsTotalCount"), "innerHTML", "(" + this._entireCommentsArr.length + ")");
            }
            this.appUtils.hideLoadingIndicator();
        },

        /**
         * This function is used to check whether one of the field is editable or not
         * @memberOf widgets/details-panel/comments
         */
        _hasEditableField: function () {
            var hasEditableField = false, k;
            if (this._commentPopupTable && this._commentPopupTable.popupInfo) {
                for (k = 0; k < this._commentPopupTable.popupInfo.fieldInfos.length; k++) {
                    if (this._commentPopupTable.popupInfo.fieldInfos[k].isEditable) {
                        hasEditableField = true;
                        break;
                    }
                }
            }
            return hasEditableField;
        },

        /**
         * This function is used to check whether comment's field that is configured is available in comments table or not.
         * @memberOf widgets/details-panel/comments
         */
        _hasCommentsField: function () {
            var k, hasCommentField = false;
            if (this.appConfig.commentField) {
                // if the related table contains comment field set commentIconFlag to true
                for (k = 0; k < this._commentsTable.fields.length; k++) {
                    if (this._commentsTable.fields[k].name === this.appConfig.commentField) {
                        hasCommentField = true;
                        break;
                    }
                }
            }
            return hasCommentField;
        },

        /**
         * This function is used to create common popup comment contents
         * @memberOf widgets/details-panel/comments
         */
        _createPopUpContent: function (currentFeature) {
            var whereClause, queryFeature, currentDateTime;
            currentDateTime = new Date().getTime();
            queryFeature = new Query();
            queryFeature.objectIds = [parseInt(currentFeature.attributes[this._commentsTable.objectIdField], 10)];
            queryFeature.outFields = ["*"];
            whereClause = currentDateTime + "=" + currentDateTime;
            queryFeature.where = whereClause;
            this._commentsTable.setInfoTemplate(new PopupTemplate(this._commentPopupTable.popupInfo));
            return this._commentsTable.queryFeatures(queryFeature);
        },

        /**
         * This function is used to check whether "Editors can only see their own features (requires tracking)" option
         * is selected or not
         * @param {*} ownershipBasedAccessControlForFeatures json that needs to be checked with predefined combination of json
         */
        _isFeaturesOnlyEditorCanSeeOptionSelected: function (ownershipBasedAccessControlForFeatures) {
            var isOptionSelected;
            isOptionSelected = false;
            array.forEach(this._featuresEditorsCanSeeObjArr, lang.hitch(this, function (featuresEditorsCanSeeObj) {
                if (JSON.stringify(featuresEditorsCanSeeObj) === JSON.stringify(ownershipBasedAccessControlForFeatures)) {
                    isOptionSelected = true;
                }
            }));
            return isOptionSelected;
        },

        /**
         * Check whether attachments are available in layer and enabled in webmap
         * @memberOf widgets/details-panel/comments
         */
        _checkAttachments: function (commentContentPaneContainer, index) {
            if (this._commentsTable.hasAttachments) {
                var attachmentsDiv = $(".attachmentsSection", commentContentPaneContainer)[0];
                if (attachmentsDiv) {
                    domConstruct.empty(attachmentsDiv);
                    domStyle.set(attachmentsDiv, "display", "block");
                    domClass.remove(attachmentsDiv, "hidden");
                    this._showAttachments(attachmentsDiv, index);
                }
            }
        },

        /**
         * Query layer to get attachments
         * @param{object} graphic
         * @param{object} attachmentContainer
         * @memberOf widgets/details-panel/comments
         */
        _showAttachments: function (attachmentContainer, index) {
            var fieldContent, i, attachmentWrapper, imageThumbnailContainer, imageThumbnailContent, imageContainer, fileTypeContainer, isAttachmentAvailable, imagePath, imageDiv;
            //check if attachments found
            if (this._entireAttachmentsArr[index][1] && this._entireAttachmentsArr[index][1].length > 0) {
                //Create attachment header text
                domConstruct.create("div", { "innerHTML": this.appConfig.i18n.comment.attachmentHeaderText, "class": "esriCTAttachmentHeader" }, attachmentContainer);
                fieldContent = domConstruct.create("div", { "class": "esriCTThumbnailContainer" }, attachmentContainer);
                // display all attached images in thumbnails
                for (i = 0; i < this._entireAttachmentsArr[index][1].length; i++) {
                    attachmentWrapper = domConstruct.create("div", {}, fieldContent);
                    imageThumbnailContainer = domConstruct.create("div", { "class": "esriCTNonImageContainer", "alt": this._entireAttachmentsArr[index][1][i].url }, attachmentWrapper);
                    this._setAttachmentDetails(imageThumbnailContainer, this._entireAttachmentsArr[index][1][i]);
                    imageThumbnailContent = domConstruct.create("div", { "class": "esriCTNonImageContent" }, imageThumbnailContainer);
                    imageContainer = domConstruct.create("div", {}, imageThumbnailContent);
                    fileTypeContainer = domConstruct.create("div", { "class": "esriCTNonFileTypeContent" }, imageThumbnailContent);
                    isAttachmentAvailable = true;
                    // set default image path if attachment has no image URL
                    imagePath = dojoConfig.baseURL + this.appConfig.noAttachmentIcon;
                    imageDiv = domConstruct.create("img", { "alt": this._entireAttachmentsArr[index][1][i].url, "class": "esriCTAttachmentImg", "src": imagePath }, imageContainer);
                    this._fetchDocumentContentType(this._entireAttachmentsArr[index][1][i], fileTypeContainer);
                    this._fetchDocumentName(this._entireAttachmentsArr[index][1][i], imageThumbnailContainer);
                    on(imageThumbnailContainer, "click", lang.hitch(this, this._displayImageAttachments));
                }
                if (!isAttachmentAvailable) {
                    domClass.add(attachmentContainer, "hidden");
                }
            }
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
        },

        /**
         * Function to fetch document content type
         * @param{object} attachment object
         * @memberOf widgets/details-panel/comments
         */
        _fetchDocumentContentType: function (attachmentData, fileTypeContainer) {
            var typeText, fileExtensionRegEx, fileExtension;
            fileExtensionRegEx = /(?:\.([^.]+))?$/; //ignore jslint
            fileExtension = fileExtensionRegEx.exec(attachmentData.name);
            if (fileExtension && fileExtension[1]) {
                typeText = "." + fileExtension[1].toUpperCase();
            } else {
                typeText = this.appConfig.i18n.comment.unknownCommentAttachment;
            }
            domAttr.set(fileTypeContainer, "innerHTML", typeText);
        },

        /**
         * Function to fetch document name
         * @param{object} attachment object
         * @param{object} dom node
         * @memberOf widgets/details-panel/comments
         */
        _fetchDocumentName: function (attachmentData, container) {
            var attachmentNameWrapper, attachmentName;
            attachmentNameWrapper = domConstruct.create("div", { "class": "esriCTNonImageName" }, container);
            attachmentName = domConstruct.create("div", {
                "class": "esriCTNonImageNameMiddle",
                "innerHTML": attachmentData.name
            }, attachmentNameWrapper);
        },

        /**
         * This function is used to show attachments in new window when user clicks on the attachment thumbnail
         * @param{object} evt
         * @memberOf widgets/details-panel/comments
         */
        _displayImageAttachments: function (evt) {
            window.open(domAttr.get(evt.currentTarget, "alt"));
        },

        /**
         * This function is used to create comments button
         * @memberOf widgets/details-panel/comments
         */
        _createCommentButton: function (parentDiv, graphic) {
            var commentBtnDiv, capabilities, isEditableLayer;
            isEditableLayer = false;
            commentBtnDiv = domConstruct.create("div", {
                "class": "esriCTCommentButton esrictfonticons esrictfonticons-pencil esriCTBodyTextColor",
                "title": this.appConfig.i18n.detailsPanel.editContentText
            }, parentDiv);
            // check if the layer is non-editable
            if (this.selectedOperationalLayer.capabilities) {
                capabilities = this.selectedOperationalLayer.capabilities;
                if ((capabilities.indexOf("Editing") > -1) && (capabilities.indexOf("Update") > -1)) {
                    isEditableLayer = true;
                }
            }
            // hide the editable icon for non-editable layer
            if (!isEditableLayer) {
                domClass.add(commentBtnDiv, "esriCTHidden");
            }
            on(commentBtnDiv, "click", lang.hitch(this, function (evt) {
                //If item id exist, check for the access property
                //If access is public, then allow all the users to perform the edits
                //If access is not public, then check user privileges
                if (!this.selectedOperationalLayer.itemId || (this.selectedOperationalLayer.itemId &&
                    this.appUtils.layerAccessInfoObj.hasOwnProperty(this.selectedOperationalLayer.itemId) &&
                    this.appUtils.layerAccessInfoObj[this.selectedOperationalLayer.itemId] === "public")) {
                    //If all the criteria's are passed
                    //Check if user has editing rights on layer level
                    this._checkCapabilityAndAllowEdit(existingAttachmentsArr, graphic);
                } else if (this.appConfig.logInDetails.canEditFeatures) {
                    // Fetch the existing attachments
                    var existingAttachmentsArr;
                    this.appUtils.showLoadingIndicator();
                    existingAttachmentsArr = this._getExistingAttachmentsArr(evt);
                    // 1. Is editor tracking enabled?
                    if (this._commentsTable.hasOwnProperty("ownershipBasedAccessControlForFeatures") &&
                        this._commentsTable.ownershipBasedAccessControlForFeatures !== null &&
                        this._commentsTable.ownershipBasedAccessControlForFeatures !== "" &&
                        this._commentsTable.ownershipBasedAccessControlForFeatures !== undefined) { // 1. Yes
                        // 2. Is the current user anonymous?
                        if (this.appConfig.logInDetails.isUserSignedIn) { // 2. No
                            this._checkCapabilityAndAllowEdit(existingAttachmentsArr, graphic);
                        } else { // 2. Yes
                            // 3. Do anonymous editors have the same editing privileges as named editors?
                            if (this._doAnonymousHaveSameEditingPrivilege()) { // 3. Yes, consider as a signed in user
                                this._checkCapabilityAndAllowEdit(existingAttachmentsArr, graphic);
                            } else { // 3. No, Only allow them to create related records
                                this.appUtils.hideLoadingIndicator();
                                this.appUtils.showMessage(this.appConfig.i18n.geoform.invalidFeatureCreatorMessage);
                            }
                        }
                    } else { // 1. No, Existing checks are fine
                        this._initializeCommentForm(existingAttachmentsArr, graphic);
                    }
                } else {
                    this.appUtils.hideLoadingIndicator();
                    this.appUtils.showMessage(this.appConfig.i18n.comment.unableToAddOrEditCommentMessage);
                }
            }));
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
         * This function is used hide comments Tab
         * @memberOf widgets/details-panel/comments
         */
        hideCommentsTab: function () {
            return;
        },

        /**
         * This function is used show comments Tab
         * @memberOf widgets/details-panel/comments
         */
        showCommentsTab: function () {
            return;
        },

        /**
         * Instantiate comment-form widget
         * @param {object} item contains selected feature object
         * @memberOf widgets/details-panel/comments
         */
        _createCommentForm: function (item, addComments, existingAttachmentsArr) {
            if (this._commentformInstance) {
                this._commentformInstance.destroy();
            }
            domConstruct.empty(dom.byId("commentformContainer"));
            //Create new instance of CommentForm
            this._commentformInstance = new CommentForm({
                config: this.appConfig,
                commentTable: this._commentsTable,
                commentPopupTable: this._commentPopupTable,
                itemInfos: this.itemInfo,
                appUtils: this.appUtils,
                nls: this.appConfig.i18n,
                item: item,
                selectedLayer: this.selectedOperationalLayer,
                addComments: addComments,
                existingAttachmentsArr: existingAttachmentsArr
            }, domConstruct.create("div", {}, dom.byId("commentformContainer")));
            this._commentformInstance.startup();
            // attach cancel button click event
            this._commentformInstance.onCancelButtonClick = lang.hitch(this, function () {
                this._showPanel(dom.byId("commentformContainer"));
                this._displayAddCommentsButton();
                this.isCommentFormOpen = false;
                this.isFormOpen(false);
                if (this.commentsContainer) {
                    domStyle.set(this.commentsContainer, "display", "block");
                    //Scroll to top position when clicked cancel need ID to use scrollTop
                    dom.byId("tabContent").scrollTop = 0;
                }
                this.appUtils.hideLoadingIndicator();
            });
            this._commentformInstance.onCommentFormSubmitted = lang.hitch(this, function () {
                //close the comment form after submitting new comment
                this._showPanel(dom.byId("commentformContainer"));
                this._displayAddCommentsButton();
                this.isCommentFormOpen = false;
                this.isFormOpen(false);
                if (this.commentsContainer) {
                    //update comment list
                    domConstruct.empty(this.commentsContainer);
                    domStyle.set(this.commentsContainer, "display", "block");
                    this._showComments(this.multipleFeatures[0], this.commentsContainer);
                }
                // this.appUtils.hideLoadingIndicator();
            });
            this._showPanel(dom.byId("commentformContainer"));
            //If Comment form is close, update the comment form open flag
            if (domClass.contains(dom.byId("commentformContainer"), "esriCTHidden")) {
                this.isCommentFormOpen = false;
                this.isFormOpen(false);
            } else {
                this.isCommentFormOpen = true;
                this.isFormOpen(true);
            }
        },

        /**
         * shows and hides the div content
         * @memberOf widgets/details-panel/comments
         */
        _showPanel: function (domNode) {
            if (domClass.contains(domNode, "esriCTHidden")) {
                domClass.remove(domNode, "esriCTHidden");
            } else {
                domClass.add(domNode, "esriCTHidden");
            }
        },

        /**
         * Empties the list of comments.
         * @memberOf widgets/details-panel/comments
         */
        _clearComments: function () {
            domConstruct.empty(this.commentsList);
            domConstruct.empty(this.noCommentsDiv);
        },

        /**
         * This function is used to attach click event to add comment button
         * @memberOf widgets/details-panel/comments
         */
        _attachEventToAddCommentButton: function () {
            if (this._addCommentBtnClickHandle) {
                this._addCommentBtnClickHandle.remove();
            }
            if (this.addCommentsBtnWrapperContainer) {
                this._addCommentBtnClickHandle = on(this.addCommentsBtnWrapperContainer, "click",
                    lang.hitch(this, function () {
                        //If item id exist, check for the access property
                        //If access is public, then allow all the users to perform the edits
                        //If access is not public, then check user privileges
                        if (!this.selectedOperationalLayer.itemId || (this.selectedOperationalLayer.itemId &&
                            this.appUtils.layerAccessInfoObj.hasOwnProperty(this.selectedOperationalLayer.itemId) &&
                            this.appUtils.layerAccessInfoObj[this.selectedOperationalLayer.itemId] === "public")) {
                            this.appUtils.showLoadingIndicator();
                            this._openAddCommentsForm();
                        } else if (this.appConfig.logInDetails.canEditFeatures) {
                            this.appUtils.showLoadingIndicator();
                            this._openAddCommentsForm();
                        } else {
                            this.appUtils.showMessage(this.appConfig.i18n.comment.unableToAddOrEditCommentMessage);
                        }
                    }));
            }
        },

        /**
         * This function is used to open add comments form
         * @memberOf widgets/details-panel/comments
         */
        _openAddCommentsForm: function () {
            var item = {};
            domStyle.set(this.commentsContainer, "display", "none");
            domClass.add(this.addCommentsBtnWrapperContainer, "esriCTHidden");
            item.attributes = {};
            // Initialize the related keyfield value as default
            item.attributes[this.selectedOperationalLayer.relationships[0].keyField] = this.multipleFeatures[0].attributes[this.selectedOperationalLayer.relationships[0].keyField];
            this._createCommentForm(item, true);
        },

        /**
         * This function is used to create popup template for single field
         * @param {object} currentFeature contains selected feature object
         * @memberOf widgets/details-panel/comments
         */
        _createPopUpForSingleField: function (currentFeature) {
            var popupInfo = {}, k, singlefieldComment;
            popupInfo.fieldInfos = [];
            popupInfo.mediaInfos = [];
            popupInfo.showAttachments = false;
            popupInfo.title = "";
            for (k = 0; k < this._commentsTable.fields.length; k++) {
                if (this._commentsTable.fields[k].name === this.appConfig.commentField && this._commentsTable.fields[k].editable && this._commentsTable.fields[k].type === "esriFieldTypeString") {
                    popupInfo.fieldInfos.push({
                        fieldName: this._commentsTable.fields[k].name,
                        format: null,
                        isEditable: this._commentsTable.fields[k].editable,
                        label: this._commentsTable.fields[k].alias,
                        stringFieldOption: "textarea",
                        tooltip: "",
                        visible: true
                    });
                    if (currentFeature) {
                        //check for blank single field comment and handle space for pencil icon
                        singlefieldComment = currentFeature.attributes[this.appConfig.commentField];
                        if (singlefieldComment && singlefieldComment !== "") {
                            popupInfo.description = "{" + this.appConfig.commentField + "}" + "\n <div class='commentRow'></div>";
                        } else {
                            popupInfo.description = "{" + this.appConfig.commentField + "}" + "\n <div class='commentRow'>&nbsp</div>";
                        }
                    }
                    break;
                }
            }
            this._commentPopupTable.popupInfo = popupInfo;
        },

        /**
         * sets the comments associated with an item.
         * @param {array} commentsArr contains related features array
         * @memberOf widgets/details-panel/comments
         */
        _setComments: function (commentsArr) {
            domConstruct.empty(this.commentsContainer);
            arrayUtil.forEach(commentsArr, lang.hitch(this, this._buildCommentDiv));
        },

        /**
         * display popup info for related features
         * @param {object} item is selected related feature
         * @memberOf widgets/details-panel/comments
         */
        _buildCommentDiv: function (item) {
            var commentDiv;
            commentDiv = domConstruct.create('div', { 'class': 'comment' }, this.commentsContainer);
            new ContentPane({ 'class': 'content small-text', 'content': item.getContent() }, commentDiv).startup();
        },

        /**
         * This function is used to initialize comment form
         */
        _initializeCommentForm: function (existingAttachmentsArr, graphic) {
            domClass.add(this.addCommentsBtnWrapperContainer, "esriCTHidden");
            this._createCommentForm(graphic, false, existingAttachmentsArr);
            domStyle.set(this.commentsContainer, "display", "none");
            $('#tabContent').animate({
                scrollTop: 0
            });
        },

        /**
         * This function is used to check whether anonymous user has same editing privilege as a named editors
         */
        _doAnonymousHaveSameEditingPrivilege: function () {
            var ownershipBasedAccessControlForFeaturesObj = this._commentsTable.ownershipBasedAccessControlForFeatures;
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
         * allow it to edit the feature.
         */
        _checkCapabilityAndAllowEdit: function (existingAttachmentsArr, graphic) {
            // get edit capability of the user, this works for both signed in & anonymous user
            var userEditCapability = this._commentsTable.getEditCapabilities({
                feature: graphic
            });
            // can user edit the feature, this works for both signed in & anonymous user
            if (userEditCapability &&
                userEditCapability.hasOwnProperty("canUpdate") &&
                userEditCapability.canUpdate) {
                this._initializeCommentForm(existingAttachmentsArr, graphic);
            } else {
                this.appUtils.hideLoadingIndicator();
                this.appUtils.showMessage(this.appConfig.i18n.geoform.invalidFeatureCreatorMessage);
            }
        }
    });
});