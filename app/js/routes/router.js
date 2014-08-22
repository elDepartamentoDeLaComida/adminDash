var $ = require("jquery"),
    Backbone = require("backbone"),
    handlers = require("./routeHandlers");
Backbone.$ = $;

module.exports = Backbone.Router.extend({
    routes: {
        "": handlers.login,
        "logout": "logout",
        "dashboard": handlers.dashboard,
        "dashboard/reports": "reports",
        "dashboard/analytics": "analytics",
        "dashboard/reminders": "reminders",
        "employees": "employees",
        "orders": "orders",
        "sales": "sales",
        "inventory": "inventory"
    },
    initialize: function (options) {
        this.app = options.app;
        console.log("initializing router");
    }
});