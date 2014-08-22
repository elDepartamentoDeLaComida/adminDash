var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils"),
    LogOrderView = require("./logOrdersView");

Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "div",
    className: "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main",
    id: "dash",
    template: _.template(require("../../templates/dash.html")),
    initialize: function () {
        console.log("Initializing dash view");
        this.render();
    },
    render: function () {
        this.$el.empty();
        console.log("dash render!");
        this.$el.html(this.template());
        return this;
    },
    startLogOrder: function () {
        this.$el.empty();
        if (!this.logOrdersView) {
            this.logOrdersView = new LogOrderView();
        }
        this.$el.html(this.logOrdersView.el);
    }
});