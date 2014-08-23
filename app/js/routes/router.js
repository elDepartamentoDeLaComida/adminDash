var $ = require("jquery"),
    Backbone = require("backbone"),
    handlers = require("./routeHandlers");
Backbone.$ = $;

module.exports = Backbone.Router.extend({
    routes: {
        "": handlers.login,
        "logout": handlers.logout,
        "dashboard": handlers.dashboard,
        "dashboard/reports": handlers.noOp,//"reports",
        "dashboard/analytics": handlers.noOp,//"analytics",
        "dashboard/reminders": handlers.noOp,//"reminders",
        "employees": handlers.noOp,//"employees",
        "orders": handlers.noOp,//"orders",
        "orders/log": "logOrder",
        "sales": handlers.noOp,//"sales",
        "sales/log": "logSale",
        "inventory": handlers.noOp//"inventory"
    },
    initialize: function (options) {
        this.app = options.app;
        console.log("initializing router");
    },
    logOrder: function () {
        handlers.log.call(this, "orders");
    },
    logSale: function () {
        handlers.log.call(this, "sales");
    }
});