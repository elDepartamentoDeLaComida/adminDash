var $ = require("jquery"),
    Backbone = require("backbone"),
    _ = require("underscore"),
    util = require("../utils");
Backbone.$ = $;

module.exports = Backbone.View.extend({
    tagName: "form",
    id: "loginForm",
    template: require("../../templates/login.html"),
    endpoint: "/auth/login",

    ui: {
        submit: "input[type='submit']",
        username: "input[name='username']",
        password: "input[name='password']"
    },
    events: {
        "click input[type='submit']": "authenticate"
    },

    initialize: function () {
        console.log("initilizing login");
        this.render();
    },

    successLogin: function (data) {
        this.trigger("success:login", data);
    },

    failLogin: function (jqXHR) {
        if (!($(this.ui.submit).hasClass("btn-danger"))) {
            $(this.ui.submit).addClass("btn-danger");
            $("legend").after(util.addError(jqXHR.responseJSON.message));
        }
    },

    render: function () {
        console.log("login render!");
        this.$el.html(this.template);
        return this;
    },

    authenticate: function (event) {
        console.log("authenticating");
        event.preventDefault();
        var payload = {
            "username": $(this.ui.username).val(),
            "password": $(this.ui.password).val()
        };
        $.ajax({
            context: this,
            method: "POST",
            url: this.endpoint,
            data: payload,
            success: this.successLogin,
            error: this.failLogin
        });
    }
});