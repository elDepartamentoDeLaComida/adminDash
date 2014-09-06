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
        "change input": "updateTotal"
    },
    initialize: function (options) {
        this.type = options.type;
        this.logForm = options.logForm;
        this.id = options.id;
        this.model = options.model;
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
        if (this.model) {
            this.renderWithModel(this.model);
        }
        return this;
    },
    renderWithModel: function (model) {
        var attr;
        for (attr in model.attributes) {
            this.$("input." + attr).val(model.get(attr));
            console.log(attr, model.get(attr));
        }
    },
    delete: function (event) {
        event.preventDefault();
        console.log(this.logForm);
        this.logForm.productRows.splice(this.id, 1);
        this.logForm.updateTotal();
        this.remove();
    },
    updateTotal: function () {
        console.log("updating");
        this.total = parseFloat(this.$(".price").val(), 10) *
            parseFloat(this.$(".quantity").val(), 10);

        if (isNaN(this.total)) {
            this.total = 0;
        }
        this.$(".productPrice").html(this.total.toFixed(2));
    }

});