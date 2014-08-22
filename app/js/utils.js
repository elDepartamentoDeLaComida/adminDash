module.exports = {
    addError: function (err) {
        return ("<div class='label label-danger'>" +
            err +
            "</div>");
    },
    checkAuth: function (self) {
        if (!($.cookie("auth"))) {
            self.navigate("", {trigger: true});
        }
    },
    keepTabActive: function (self, href) {
        self.app.sidebar.onMenuClick({target: "a[href='" + href + "']"}, true);
    }
};