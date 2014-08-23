var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    OrderModel = require("../models/orderRowModel"),
    SaleModel = require("../models/orderRowModel");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "tr",
    className: "productRow",

    ordersTemplate: require("../../templates/orderRow.html"),
    salesTemplate: require("../../templates/saleRow.html"),

    ordersEvents: {
        "change input": "update"
    },
    initialize: function (options) {
        this.type = options.type;
        this.log = options.log;
        this.id = options.id;
        console.log("init row type", this.type);
        this.template = this[this.type + "Template"];
        this.events = this[this.type + "Events"];
        this.events = _.extend(
            {"click .btn-danger": "delete"},
            this.events
        );
        this.render();
    },
    render: function () {
        console.log("rendering row type", this.type);
        this.$el.html(this.template);
        return this;
    },
    delete: function (event) {
        event.preventDefault();
        this.log.productRows.splice(this.id, 1);
        this.log.update();
        this.remove();
    },
    update: function () {
        console.log("updating");
        this.total = parseFloat(this.$(".price").val(), 10) *
            parseFloat(this.$(".quantity").val(), 10);
        this.$(".productPrice").html(this.total.toFixed(2));
    }

});