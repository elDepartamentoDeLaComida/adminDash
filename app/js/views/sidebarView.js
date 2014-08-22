var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "div",
    className: "col-sm-3 col-md-2 sidebar",
    template: _.template(require("../../templates/sidebar.html")),
    events: {
        "click li": "onMenuClick"
    },
    initialize: function () {
        console.log("init sidebar");
        this.render();
    },
    render: function () {
        console.log("sidebar render!");
        this.$el.html(this.template());
        return this;
    },
    onMenuClick: function (event, noTrigger) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        $(".active").removeClass("active");
        $(event.target).parent().addClass("active");
        if (!noTrigger) {
            this.trigger("menuClick", event.target);
        }
    }
});