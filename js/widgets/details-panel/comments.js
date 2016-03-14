/*global define,dojo,alert,moment,$,console */
/*jslint sloppy:true,unparam:true,indent:4 */
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
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/dom-style",
    "esri/dijit/PopupTemplate",
    "dijit/layout/ContentPane",
    "widgets/details-panel/comment-form",
    "dojo/_base/array",
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
    domConstruct,
    domClass,
    dom,
    domAttr,
    domStyle,
    PopupTemplate,
    ContentPane,
    CommentForm,
    arrayUtil
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _commentPopupTable: null, // stores object of comments popup table
        _relatedRecords: [], // stores object of related record fatures
        _commentformInstance: null,

        /**
        * This function is called when widget is constructed
        * @param{object} parameters of widget
        * @memberOf widgets/details-panel/comments
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This function is designed to handle processing after any DOM fragments have been actually added to the document.
        * @memberOf widgets/details-panel/comments
        */
        startup: function () {
            this._showComments(this.multipleFeatures[0], this.commentsContainer);
        },

        /**
        * Method will get related table info and check if any relationship exist for comments.
        * If Comments relationship exist as per the configured field then it will get the related table info for further use
        * Considering only the first related table although the layer has many related table
        * @memberOf widgets/details-panel/comments
        */
        _showComments: function (graphic, parentDiv) {
            var relatedTableURL;
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (this.selectedOperationalLayer.relationships.length > 0) {
                // Construct the related table URL form operational layer URL and the related table id
                // We are considering only first related table although the layer has many related table.
                // Hence, we are fetching relatedTableId from relationships[0] ie:"operationalLayer.relationships[0].relatedTableId"
                // Create Comments table if not exist from the first related table of the layer
                if (!this._commentsTable) {
                    relatedTableURL = this.selectedOperationalLayer.url.substr(0, this.selectedOperationalLayer.url.lastIndexOf('/') + 1) + this.selectedOperationalLayer.relationships[0].relatedTableId;
                    this._commentsTable = new FeatureLayer(relatedTableURL);
                    if (this.itemInfo && this.itemInfo.itemData && this.itemInfo.itemData.tables) {
                        array.some(this.itemInfo.itemData.tables, lang.hitch(this, function (currentTable) {
                            if (this._commentsTable && this._commentsTable.url) {
                                if (currentTable.url === this._commentsTable.url && currentTable.popupInfo) {
                                    this._commentPopupTable = currentTable;
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
                this._fetchComments(graphic, parentDiv);
            } else if ((!this.appConfig.usePopupConfigurationForComment) && (this._hasCommentsField() && (this._hasEditableField()))) {
                this._fetchComments(graphic, parentDiv);
            } else {
                this.hideCommentsTab();
                this.appUtils.hideLoadingIndicator();
            }
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
        _createPopUpContent: function (currentFeature, commentsParentDiv, currentID) {
            var commentContentPaneContainer, commentContentPane;
            currentFeature.setInfoTemplate(new PopupTemplate(this._commentPopupTable.popupInfo));
            commentContentPaneContainer = domConstruct.create("div", { "class": "esriCTCommentsPopup" }, commentsParentDiv);
            commentContentPane = new ContentPane({}, commentContentPaneContainer);
            commentContentPane.startup();
            commentContentPane.set('content', currentFeature.getContent());
            this._createCommentButton(commentContentPaneContainer, currentID, currentFeature.attributes[this.selectedOperationalLayer.objectIdField], currentFeature);
        },

        /**
        * This function is used to create comments button
        * @memberOf widgets/details-panel/comments
        */
        _createCommentButton: function (parentDiv, relationID, objectID, graphic) {
            var commentBtnnDiv = domConstruct.create("div", { "class": "esriCTCommentButton" }, parentDiv);
            on(commentBtnnDiv, "click", lang.hitch(this, function () {
                this._createCommentForm(graphic);
                domStyle.set(this.commentsContainer, "display", "none");
            }));
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
        * @memberOf widgets/details-panel/comments
        */
        _createCommentForm: function (item) {
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
                selectedLayer: this.selectedOperationalLayer
            }, domConstruct.create("div", {}, dom.byId("commentformContainer")));

            // attach cancel button click event
            this._commentformInstance.onCancelButtonClick = lang.hitch(this, function () {
                this._showPanel(dom.byId("commentformContainer"));
                this.isCommentFormOpen = false;
                //Check if application is running on android devices, and show/hide the details panel
                //This resolves the jumbling of content in details panel on android devices
                if (this.appUtils.isAndroid()) {
                    this.toggleDetailsPanel();
                }
                domStyle.set(this.commentsContainer, "display", "block");
                //SCroll to top position when clicked cancel need ID to use scrollTop
                dom.byId("tabContent").scrollTop = 0;

            });
            this._commentformInstance.onCommentFormSubmitted = lang.hitch(this, function (item) {
                //close the comment form after submitting new comment
                this._showPanel(dom.byId("commentformContainer"));
                this.isCommentFormOpen = false;
                //update comment list
                domConstruct.empty(this.commentsContainer);
                this._showComments(this.multipleFeatures[0], this.commentsContainer);
                domStyle.set(this.commentsContainer, "display", "block");
            });
            this._showPanel(dom.byId("commentformContainer"));
            //If Comment form is close, update the comment form open flag
            if (domClass.contains(dom.byId("commentformContainer"), "esriCTHidden")) {
                if (this.appUtils.isAndroid()) {
                    this.toggleDetailsPanel();
                }
                this.isCommentFormOpen = false;
            } else {
                this.isCommentFormOpen = true;
            }
        },

        /**
        * shows and hides the div content
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
        */
        _clearComments: function () {
            domConstruct.empty(this.commentsList);
            domConstruct.empty(this.noCommentsDiv);
        },

        /**
        * This function is used to fetch comments from table
        * @memberOf widgets/details-panel/comments
        */
        _fetchComments: function (graphic, parentDiv) {
            var relatedQuery, currentID;
            currentID = graphic.attributes[this.selectedOperationalLayer.objectIdField];
            relatedQuery = new RelationshipQuery();
            relatedQuery.outFields = ["*"];
            relatedQuery.relationshipId = this.selectedOperationalLayer.relationships[0].id;
            relatedQuery.objectIds = [currentID];
            // Query for related features and showing comments
            this.selectedOperationalLayer.queryRelatedFeatures(relatedQuery,
                lang.hitch(this, function (relatedFeatures) {
                    var commentsParentDiv, pThis, commentsContainerDiv, i;
                    pThis = this;
                    this._relatedRecords = relatedFeatures;
                    commentsContainerDiv = domConstruct.create("div", {}, parentDiv);
                    commentsParentDiv = domConstruct.create("div", { "class": "esriCTcommentsParentDiv" }, commentsContainerDiv);

                    function sortComments(a, b) {
                        if (a.attributes[pThis._commentsTable.objectIdField] >
                                b.attributes[pThis._commentsTable.objectIdField]) {
                            return -1; // order a before b
                        }
                        if (a.attributes[pThis._commentsTable.objectIdField] <
                                b.attributes[pThis._commentsTable.objectIdField]) {
                            return 1; // order b before a
                        }
                        return 0; // a & b have same date, so relative order doesn't matter
                    }

                    if (this._relatedRecords[currentID] && this._relatedRecords[currentID].features && this._relatedRecords[currentID].features.length > 0) {
                        this._relatedRecords[currentID].features.sort(sortComments);
                        for (i = 0; i < this._relatedRecords[currentID].features.length; i++) {
                            if (!this.appConfig.usePopupConfigurationForComment) {
                                this._createPopUpForSingleField(this._relatedRecords[currentID].features[i], currentID);
                            }
                            this._createPopUpContent(this._relatedRecords[currentID].features[i], commentsParentDiv, currentID);
                        }
                        this.showCommentsTab();
                    } else {
                        this.hideCommentsTab();
                    }
                    this.appUtils.hideLoadingIndicator();
                }), lang.hitch(this, function () {
                    this.appUtils.hideLoadingIndicator();
                }));
        },

        /**
        * This function is used to create popup template for single field
        * @memberOf widgets/details-panel/comments
        */
        _createPopUpForSingleField: function (currentFeature, currentID) {
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
                    //check for blank single field comment and handle space for pencil icon
                    singlefieldComment = currentFeature.attributes[this.appConfig.commentField];
                    if (singlefieldComment && singlefieldComment !== "") {
                        popupInfo.description = "{" + this.appConfig.commentField + "}" + "\n <div class='commentRow'></div>";
                    } else {
                        popupInfo.description = "{" + this.appConfig.commentField + "}" + "\n <div class='commentRow'>&nbsp</div>";
                    }
                    break;
                }
            }
            this._commentPopupTable.popupInfo = popupInfo;
        },

        /**
        * Retrieves the comments associated with an item.
        * @param {objectID} item Item whose comments are sought
        * @return {publish} "updatedCommentsList" with results of query
        */
        _queryComments: function (item) {
            var updateQuery = new RelationshipQuery();
            updateQuery.objectIds = [this.multipleFeatures[0].attributes[this.selectedOperationalLayer.objectIdField]];
            updateQuery.returnGeometry = true;
            updateQuery.outFields = ["*"];
            updateQuery.relationshipId = this.selectedOperationalLayer.relationships[0].id;
            //Show loading indicator
            this.appUtils.showLoadingIndicator();
            this.selectedOperationalLayer.queryRelatedFeatures(updateQuery, lang.hitch(this, function (results) {
                var pThis = this, fset, features, i;
                // Function for descending-OID-order sort
                function sortByOID(a, b) {
                    if (a.attributes[pThis._commentTable.objectIdField] > b.attributes[pThis._commentTable.objectIdField]) {
                        return -1;  // order a before b
                    }
                    if (a.attributes[pThis._commentTable.objectIdField] < b.attributes[pThis._commentTable.objectIdField]) {
                        return 1;  // order b before a
                    }
                    return 0;  // a & b have same date, so relative order doesn't matter
                }

                fset = results[this.multipleFeatures[0].attributes[this.selectedOperationalLayer.objectIdField]];
                features = fset ? fset.features : [];

                if (features.length > 0) {
                    // Sort by descending OID order
                    features.sort(sortByOID);

                    // Add the comment table popup
                    for (i = 0; i < features.length; ++i) {
                        features[i].setInfoTemplate(new PopupTemplate(this._commentPopupTable.popupInfo));
                    }
                }
                this._clearComments();
                if (features.length > 0) {
                    // Sort by descending OID order
                    features.sort(sortByOID);
                    this._setComments(results[this.multipleFeatures[0].attributes[this.selectedOperationalLayer.objectIdField]].features);
                    domClass.add(this.noCommentsDiv, "esriCTHidden");
                } else {
                    domClass.remove(this.noCommentsDiv, "esriCTHidden");
                    domAttr.set(this.noCommentsDiv, "innerHTML", this.appConfig.i18n.comment.noCommentsAvailableText);
                }
                //Hide loading indicator
                this.appUtils.hideLoadingIndicator();
            }), lang.hitch(this, function (err) {
                console.log(err.message || "queryRelatedFeatures");
                //Hide loading indicator
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * sets the comments associated with an item.
        * @param {commentsArr} item Item whose comments are sought
        */
        _setComments: function (commentsArr) {
            domConstruct.empty(this.commentsContainer);
            arrayUtil.forEach(commentsArr, lang.hitch(this, this._buildCommentDiv));
        },

        /**
        * Creates a ContentPane to hold the contents of a comment.
        * @param {object} comment Comment to display; its contents come from calling
        * getContent() on it
        */
        _buildCommentDiv: function (comment) {
            var commentDiv;
            commentDiv = domConstruct.create('div', { 'class': 'comment' }, this.commentsContainer);
            new ContentPane({ 'class': 'content small-text', 'content': comment.getContent() }, commentDiv).startup();
        }
    });
});
