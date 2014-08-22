var $ = require("jquery"),
    Backbone = require("backbone"),
    LoginView = require("../views/loginView"),
    util = require("../utils");
Backbone.$ = $;

module.exports = {
    login: function () {
        if ($.cookie("auth")) {
            this.navigate("dashboard", {trigger: true});
        }
        this.app.startLogin();
        this.app.listenTo(this.app.login, "success:login", this.app.loginSuccess);
    },
    logout: function () {
        $.removeCookie("auth", {expires: 1});
        this.navigate("");
        this.app.startLogin();
    },
    dashboard: function () {
        util.checkAuth(this);
        this.app.startDash();
    },
    logOrder: function () {
        util.checkAuth();
        if (!this.app.dash) {
            this.app.startDash();
            util.keepTabActive(this, "#orders/log");
        }
        this.app.dash.startLogOrder();
    },
    noOp: function () {
        console.log("no route declared yet!");
    }
};