var $ = require("jquery"),
    Backbone = require("backbone"),
    OrderModel = require("../models/orderRowModel");
Backbone.$ = $;

module.exports = Backbone.Collection.extend({
    model: OrderModel,
    initialize: function () {
        console.log("initializing collection");
    }
});