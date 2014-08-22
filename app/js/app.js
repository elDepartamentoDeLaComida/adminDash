var $ = require("jquery"),
    App = require("./views/appView");
require("jquery.cookie");

$(function () {
    window.$ = $;
    window.app = new App();
});