var $ = require("jquery"),
    Backbone = require("backbone"),
    Router = require("../routes/router"),
    LoginView = require("./loginView"),
    SidebarView = require("./sidebarView"),
    DashView = require("./dashView");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    el: ".row",

    initialize: function () {
        console.log("initializing appView");
        this.router = new Router({app: this});
        Backbone.history.start();
    },
    startDash: function () {
        console.log("starting dash");
        if (!this.sidebar) {
            this.sidebar = new SidebarView();
            this.$el.html(this.sidebar.el);
        }
        if (!this.dash) {
            this.dash = new DashView();
            this.$el.append(this.dash.el);
        } else {
            this.sidebar.onMenuClick({target: "a[href='#dashboard']"}, true);
            this.dash.render();
        }
        this.listenTo(this.sidebar, "menuClick", this.handlePageReq);
    },
    startLogin: function () {
        console.log("starting login");
        this.$el.empty();
        if (!this.login) {
            this.login = new LoginView();
        }
        this.$el.html(this.login.el);
    },

    loginSuccess: function (data) {
        $.cookie("auth", "true", {expires: 1});
        this.user = data;
        this.login.remove();
        console.log("login success");
        this.router.navigate("dashboard", {trigger: true});
    },

    handlePageReq: function (page) {
        console.log("page", page);
        if (page.hash) {
            console.log("accessing", page.hash);
            this.router.navigate(page.hash, {trigger: true});
        }
    }
});