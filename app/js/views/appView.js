var $ = require("jquery"),
    Backbone = require("backbone"),
    Router = require("../routes/router"),
    LoginView = require("./loginView"),
    SidebarView = require("./sidebarView"),
    DashView = require("./dashView"),
    LogOrderView = require("./logOrdersView");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    el: ".row",

    initialize: function () {
        console.log("initializing appView");
        this.router = new Router({app: this});
        Backbone.history.start();
    },
    startDash: function () {
        this.$el.empty();
        if (!this.sidebar) {
            this.sidebar = new SidebarView();
        }
        if (!this.dash) {
            this.dash = new DashView();
        }
        this.$el.html(this.sidebar.el);
        this.$el.append(this.dash.el);
    },
    startLogin: function () {
        this.$el.empty();
        if (!this.login) {
            this.login = new LoginView();
        }
        this.$el.html(this.login.el);
    },
    
    loginSuccess: function (data) {
        $.cookie("auth", "true");
        this.user = data;
        this.login.remove();
        console.log("WIN");
        this.router.navigate("dashboard", {trigger: true});
    },
    renderPage: function (page) {
        console.log("accessing", page);
        this.$el.html(page.el);
    }
});