module.exports = {
    addError: function (err) {
        return ("<div class='label label-danger'>" +
            err +
            "</div>");
    },
    checkAuth: function () {
        if (!($.cookie("auth"))) {
            this.navigate("", {trigger: true});
        }
    }
};