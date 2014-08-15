var gulp = require("gulp"),
  uglify = require("gulp-uglify");

gulp.task("Minifying js", function () {
  return gulp.src("./build/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build"));
});