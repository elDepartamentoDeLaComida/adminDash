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
    dashboard: function () {
        util.checkAuth();
        this.app.startDash();
    }
};