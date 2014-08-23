var $ = require("jquery"),
    App = require("./views/appView");
require("jquery.cookie");

$(function () {
    window.app = new App();
});