var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils"),
    ProductRowView = require("./productRowView"),
    OrderCollection = require("../collections/orderRowCollection");
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
        "click #addProduct": "createRow",
        "change input[type='number']": "updateTotal",
        "change input[type='checkbox']": "updateTotal"
    },

    initialize: function (options) {
        console.log("initializing log" + options.type + "form");
        this.type = options.type;

        this.collection = new OrderCollection();

        this.getFirst = this.type === "sales" ? true : false;
        this.endPoint = this[this.type + "EndPoint"];
        this.template = this[this.type + "Template"];

        this.productRows = [];
        this.render();

        this.ui = {
            shippingBox: this.$("#shipping")[0],
            shippingCosts: this.$("#shippingCosts"),
            subtotal: this.$("#subtotal"),
            total: this.$("#total")
        };
    },
    createRow: function () {
        var len = this.productRows.length;
        this.productRows.push(new ProductRowView(
            {
                type: this.type,
                id: len,
                logForm: this
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
    req: function (method) {
        console.log(this.$el.serialize());
        $.ajax({
            context: this,
            url: this.endPoint,
            method: method,
            data: this.$el.serialize(),
            success: function (data) {
                this.handleReply(this.$(".farmerInfo"), data);
                this.$el.trigger("reset");
            },
            error: function (jqXHR) {
                this.handleReply(this.$(".farmerInfo"), jqXHR);
                console.log(jqXHR);
            }
        });
    },
    handleReply: function ($el, data) {
        //if success
        if (data.hasOwnProperty("logStatus")) {
            $el.before(util.addSuccess(data.logStatus));
            setTimeout(function () {
                console.log("removing message");
                $(".bg-success").empty();
            }, 1000);
        } else {
            //indicates failure
            $el.before(util.addError(data.responseJSON.message));
        }
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
    calcShipping: function (subtotal) {
        var shippingCosts;
        console.log(subtotal);
        if (this.ui.shippingBox.checked) {
            shippingCosts = Math.max(
                subtotal * 0.1,
                10
            );
        } else {
            shippingCosts = 0;
        }
        return shippingCosts;
    },
    updateTotal: function () {
        var shippingCosts, subtotal;
        console.log("product price update");
        subtotal = this.productRows.reduce(function (prev, curr) {
            return prev + parseFloat(curr.total);
        }, 0);
        if (isNaN(subtotal)) {
            subtotal = 0;
        }

        shippingCosts = this.calcShipping(subtotal);
        this.ui.shippingCosts.html(shippingCosts);
        this.ui.subtotal.html(subtotal.toFixed(2));

        this.total = subtotal + shippingCosts;
        this.ui.total.html(this.total.toFixed(2));
    }
});