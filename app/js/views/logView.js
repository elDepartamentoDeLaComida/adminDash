var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils"),
    ProductRowView = require("./productRowView");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "form",
    id: "logOrder",
    ordersTemplate: require("../../templates/logOrder.html"),
    salesTemplate: require("../../templates/logSale.html"),
    ordersEndPoint: "/api/orders",
    salesEndPoint: "/api/sales",
    events: {
        "click button[type='submit']": "submitForm",
        "click #addProduct": "addProductRow",
        "change input[type='number']": "update",
    },

    initialize: function (options) {
        console.log("initializing log" + options.type + "form");
        this.type = options.type;
        this.getFirst = this.type === "sales" ? true : false;
        this.endPoint = this[this.type + "EndPoint"];
        this.productRows = [];
        this.template = this[this.type + "Template"];
        this.render();
    },
    createRow: function () {
        var len = this.productRows.length;
        this.productRows.push(new ProductRowView(
            {
                type: this.type,
                id: len,
                log: this
            }
        ));
        if (len < 1) {
            this.$(".labels").after(this.productRows[len].el);
        } else {
            this.$(".productRow:last-child").after(this.productRows[len].el);
        }
    },
    render: function () {
        console.log("log render type", this.type);
        this.$el.html(this.template);
        this.createRow();
        return this;
    },
    addProductRow: function () {
        console.log("adding row");
        this.createRow();
    },
    req: function (method) {
        $.ajax({
            url: this.endPoint,
            method: method,
            data: this.$el.serialize(),
            success: function (data) {
                console.log("SUCCESS", data);
            },
            error: function (jqXHR) {
                console.log(jqXHR);
            }
        });
    },
    submitForm: function (event) {
        event.preventDefault();
        console.log("Submitting");
        if (!this.getFirst) {
            this.req("POST");
        } else {
            this.req("GET");
            this.getFirst = false;
        }
    },
    update: function () {
        console.log("product price update");
        this.total = this.productRows.reduce(function (prev, curr) {
            return prev + parseFloat(curr.total);
        }, 0);
        this.$("#total").html(this.total);
    }
});