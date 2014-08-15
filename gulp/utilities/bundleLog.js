var gutil = require("gulp-util"),
  prettyHrtime = require("pretty-hrtime"),
  startTime;

module.exports = {
  start: function () {
    startTime = process.hrtime();
    gutil.log("Running", gutil.colors.green("'bundle'") + "...");
  },

  end: function () {
    var prettyTime = prettyHrtime(process.hrtime(startTime));
    gutil.log('Finished', gutil.colors.green("'bundle'"), 'in', gutil.colors.magenta(prettyTime));
  }
};