var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    el: "form",
    id: "logOrder",
    template: require("../../templates/logOrder.html"),
    rowTemplate: require("../../templates/orderRow.html"),
    initialize: function () {
        console.log("initializing log order form");
        this.render();
    },
    render: function () {
        console("log order render");
        this.$el.html(this.template);
        this.$(".labels").after(this.rowTemplate);
        return this;
    }
});