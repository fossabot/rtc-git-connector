define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/Dialog",
    "dijit/form/TextBox",
    "dijit/form/Button",
    "dijit/form/Select",
    "dojo/text!../templates/MainLayout.html"
], function (declare, _AbstractActionWidget, _TemplateMixin, _WidgetsInTemplateMixin,
    Dialog, TextBox, Button, Select, template) {
    return declare("com.siemens.bt.jazz.workitemeditor.rtcGitConnector.ui.widget.mainLayout",
        [_AbstractActionWidget, _TemplateMixin, _WidgetsInTemplateMixin],
    {
        templateString: template,

        constructor: function () {
        },

        startup: function () {
            this.selectRegisteredGitRepository.maxHeight = -1;

            // Just for testing...
            this.buttonWidget.setDisabled(true);
            this.setOnClickHandlers();
        },

        setOnClickHandlers: function () {
            var self = this;

            this.showDialogButton.onClick = function (event) {
                self.myDialog.show();
            };

            this.submitDialogButton.onClick = function (event) {
                self.myDialog.hide();
            };

            this.cancelDialogButton.onClick = function (event) {
                self.myDialog.hide();
            };
        }
    });
});