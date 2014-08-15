window.app.views.LoginPage = Backbone.View.extend({
  template: JST["app/templates/login.us"],

  initialize: function (options) {
    this.Authenticate = options.Authenticate;
    _.bindAll(this);
  },

  events: {
    "events form" : "login"
  },
  user: false,
  login: function (event) {
    event.preventDefault();
    var credentials = {
      username: $("input[name='username']").val(),
      password: $("input[name='password']").val()
    };
    this.Authenticate.login(credentials)
      .success(this.onLoginSuccess)
      .fail(this.onLoginFail);

    onLoginSuccess: function (response) {
      console.log(response);
      Backbone.history.navigate("menu", true);
    },
    onLoginFail: function 
  }
});