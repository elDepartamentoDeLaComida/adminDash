var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils"),
    ProductRowView = require("./productRowView"),
    SaleCollection = require("../collections/saleRowCollection"),
    OrderCollection = require("../collections/orderRowCollection");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "form",
    id: "logOrder",
    ordersTemplate: require("../../templates/logOrder.html"),
    salesTemplate: require("../../templates/logSale.html"),
    ordersEndPoint: "/api/orders",
    salesEndPoint: "/api/sales",

    salesCollection: SaleCollection,
    ordersCollection: OrderCollection,

    events: {
        "click button[type='submit']": "submitForm",
        "click #addProduct": "createRow",
        "click button[name='import']" : "importFarmerById",
        "change input[type='number']": "updateTotal",
        "change input[type='checkbox']": "updateTotal",
        "click #calc": "calcTotal"
    },
    //INTERNAL BUSINESS
    initialize: function (options) {
        console.log("initializing log" + options.type + "form");
        this.type = options.type;

        this.collection = new this[this.type + "Collection"]();
        this.Model = this[this.type + "Model"];
        this.listenTo(this.collection, "add", this.renderImport);
        this.endPoint = this[this.type + "EndPoint"];
        this.template = this[this.type + "Template"];

        this.productRows = [];
        this.render();

        if (this.type === "sales") {
            this.saleId = 0;
        }
        this.total = 0;
        this.subtotal = 0;
        this.shippingCosts = 0;

        this.ui = {
            shippingBox: this.$("#shipping")[0],
            shippingCosts: this.$("#shippingCosts"),
            subtotal: this.$("#subtotal"),
            total: this.$("#total"),
            status: this.$("#status")
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
        return this;
    },
    //END INTERNAL BUSINESS

    //IMPORT BUINESS
    importFarmerById: function (e) {
        var endpoint,
            error;
        e.preventDefault();

        this.farmerId = this.$("#farmerId").val();
        endpoint = "/api/orders/t1";
        console.log("getting import at", endpoint);
        if (!this.farmerId) {
            error = "Must Specify Farmer Id";
            this.handleReply({message: error});
        } else {
            this.req("GET", this.farmerId, endpoint)
                .success(function (data) {
                    this.processImport(data[0]);
                })
                .error(function (jqXHR) {
                    this.handleReply({message: jqXHR.responseJSON.message});
                });
        }
    },
    processImport: function (data) {
        var model,
            self = this;
        data.products.forEach(function (product, index) {
            model = {
                product: product,
                quantity: data.quantities[index],
                price: data.prices[index],
                unit: data.unit[index]
            };
            self.collection.add(new self.collection.model(model));
        });
    },
    renderImport: function () {
        var len,
            self = this;
        this.collection.forEach(function (model) {
            len = self.productRows.length;
            self.productRows.push(new ProductRowView({
                type: self.type,
                id: len,
                logForm: self,
                model: model
            }));
            self.productRows[len].updateTotal();
            self.updateTotal(true);
        });
        if (len < 1) {
            this.$(".labels").after(this.productRows[len].el);
        } else {
            this.$(".productRow:last-child").after(this.productRows[len].el);
        }
    },

    //END IMPORT BUSINESS
    //AJAX BUSINESS
    req: function (method, data, endpoint) {
        endpoint = (endpoint !== undefined ? endpoint : this.endPoint);
        if (!data) {
            data = this.$el.serialize();
        }
        return $.ajax({
            context: this,
            url: endpoint,
            method: method,
            data: data
        });
    },
    handleReply: function (data, $el) {
        //if success
        if (!$el) {
            $el = this.ui.status;
        }
        if (data.hasOwnProperty("logStatus")) {
            $el.before(util.addSuccess(data.logStatus));
            setTimeout(function () {
                $(".bg-success").empty();
            }, 1000);
        } else {
            //indicates failure
            $el.html(util.addError(data.message));
            setTimeout(function () {
                $(".bg-danger").empty();
            }, 2000);
        }
    },
    submitForm: function (event) {
        event.preventDefault();
        var data = false;
        if (this.type === "sales") {
            data = this.$el.serialize()
                + "&_id=" + this.saleId
                + "&subtotal=" + this.subtotal
                + "&total=" + this.total;
        }
        console.log("Submitting");
        this.req("POST", data)
            .success(function (data) {
                this.handleReply(data);
                this.trigger("reset", this.type);
            })
            .error(function (jqXHR) {
                this.handleReply({message: jqXHR.responseJSON.message});
            });
    },
    calcTotal: function (event) {
        event.preventDefault();
        this.req("GET")
            .success(function (data) {

                this.saleId = data._id;
                if (!($("button[type='submit']").length)) {
                    this.addSubmitButton($("#calc"));
                }
                this.updateTotal(data);
            })
            .error(function (jqXHR) {
                this.handleReply({message: jqXHR.responseJSON.message});
            });
    },
    //END AJAX BUSINESS
    //FORM DOM BUSINESS
    addSubmitButton: function ($el) {
        $el.after(util.addSubmit());
    },
    calcShipping: function (subtotal) {
        var shippingCosts = 0;
        if (this.ui.shippingBox.checked) {
            shippingCosts = Math.max(
                subtotal * 0.1,
                10
            );
        }
        return shippingCosts;
    },
    updateTotal: function (data) {
        if (data instanceof $.Event || data === true) {
            if (this.type === "orders") {
                this.subtotal = this.productRows.reduce(function (prev, curr) {
                    return prev + parseFloat(curr.total);
                }, 0);
            }
            if (isNaN(this.subtotal)) {
                this.subtotal = 0;
            }
            this.shippingCosts = this.calcShipping(this.subtotal);
            this.total = this.subtotal + this.shippingCosts;
        } else {
            this.subtotal = data.subtotal;
            this.shippingCosts = data.shippingCosts;
            this.total = data.total;
        }
        this.renderTotal();
    },
    renderTotal: function () {
        this.ui.shippingCosts.html(this.shippingCosts.toFixed(2));
        this.ui.subtotal.html(this.subtotal.toFixed(2));
        this.ui.total.html(this.total.toFixed(2));
    }
    //END DOM BUSINESS
});