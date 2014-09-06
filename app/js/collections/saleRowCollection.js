var $ = require("jquery"),
    Backbone = require("backbone"),
    SaleModel = require("../models/saleRowModel");
Backbone.$ = $;

module.exports = Backbone.Collection.extend({
    model: SaleModel,
    initialize: function () {
        console.log("initializing collection");
    }
});