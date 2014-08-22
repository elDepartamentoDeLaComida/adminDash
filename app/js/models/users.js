var $ = require("jquery"),
    Backbone = require("backbone");
Backbone.$ = $;

var User = Backbone.Model.extend({
    idAttribute: "_id",
    defaults: {
        email: '',
        name: '',
        scope: 3
    }
});