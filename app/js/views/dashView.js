var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils"),
    LogView = require("./logView");

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
    startLog: function (type) {
        this.$el.empty();
        console.log("starting log", type);
        if (type === "orders" || type === "sales") {
            if (this.logView) {
                this.logView.remove();
            }
            this.logView = new LogView({type: type});
            this.$el.html(this.logView.el);
        } else {
            console.log("invalid log type");
        }
    },
});