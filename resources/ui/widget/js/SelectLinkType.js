define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/on",
    "dojo/query",
    "./MainDataStore",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!../templates/SelectLinkType.html"
], function (declare, domClass, domStyle, on, query,
    MainDataStore,
    _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,
    template) {
    return declare("com.siemens.bt.jazz.workitemeditor.rtcGitConnector.ui.widget.selectLinkType",
        [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin],
    {
        templateString: template,
        mainDataStore: null,

        constructor: function () {
            this.mainDataStore = MainDataStore.getInstance();
        },

        startup: function () {
            this.watchDataStore()
            this.setEventHandlers();
        },

        watchDataStore: function () {
            var self = this;

            // React when the selected repository link type changes in the store
            this.mainDataStore.selectedRepositorySettings.watch("linkType", function (name, oldValue, value) {
                // Hide the hole widget if the linkType is null
                domStyle.set("rtcGitConnectorSelectLinkTypeContainer", "display", value === null ? "none" : "block");

                // Set the selected type in the view
                if (value !== null) {
                    self.setSelectedLinkType(value);
                    self.setRequestsText(self.mainDataStore.selectedRepositorySettings.get("gitHost"));
                }
            });
        },

        setEventHandlers: function () {
            var self = this;

            // Set the clicked link type in the data store
            query(".rtcGitConnectorSelectLinkType").on(".linkTypeItem:click", function (event) {
                self.mainDataStore.selectedRepositorySettings.set("linkType", event.target.getAttribute("data-link-type"));
            });
        },

        // Add the selected class to the specified type. Remove it from the other types
        setSelectedLinkType: function (linkType) {
            query(".rtcGitConnectorSelectLinkType .linkTypeItem").forEach(function (node) {
                if (node.getAttribute("data-link-type") === linkType) {
                    domClass.add(node, "selected");
                } else {
                    domClass.remove(node, "selected");
                }
            });
        },

        // Set the requests text to Pull Requests for GitHub or Merge Requests for GitLab
        setRequestsText: function (gitHost) {
            var requestsText = "Requests";

            if (gitHost === "GITHUB") {
                requestsText = "Pull " + requestsText;
            } else if (gitHost === "GITLAB") {
                requestsText = "Merge " + requestsText;
            }

            // Find the element using the data attribute
            query(".rtcGitConnectorSelectLinkType .linkTypeItem[data-link-type='REQUEST']")[0].innerHTML = requestsText;
        }
    });
});