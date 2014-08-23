var $ = require("jquery"),
    Backbone = require("backbone");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
    defaults: {
        product: "",
        quantity: 0,
        farmerInitials: ""
    }
});