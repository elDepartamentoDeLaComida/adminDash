var $ = require("jquery"),
    Backbone = require("backbone");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
    defaults: {
        product: "",
        quanitity: 0,
        unit: "none",
        price: 0,
        totalPrice: 0
    }
});