window.app.router = Backbone.router.extend({
  routes: {
    "" : "login"
  },

  login: function() {

  },

  renderPage: function(PageClass, options) {
    var page = new PageClass(options);
    ("#view").empty().append(page.render().el);
  }
});

$(function () {
  window.router = new window.app.router();
  Backbone.history.start();
});