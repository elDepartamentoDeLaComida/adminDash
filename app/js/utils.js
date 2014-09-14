var $ = require("jquery");
require("jquery.cookie");

module.exports = {
    addError: function (err) {
        return ("<p class='bg-danger'>" +
            err +
            "</p>"
        );
    },
    checkAuth: function (self) {
        if (!($.cookie("auth"))) {
            self.navigate("", {trigger: true});
        }
    },
    keepTabActive: function (self, href) {
        self.app.sidebar.onMenuClick({target: "a[href='" + href + "']"}, true);
    },
    addSuccess: function (message) {
        return ("<p class='bg-success'>" +
            message +
            "</p>"
        );
    },
    addSubmit: function () {
        return ('<button class="btn btn-lrg btn-success" type="submit">Submit</button>');
    }
};