var gulp = require("gulp"),
  csso = require("gulp-csso");

gulp.task('Minifying css', function () {
  return gulp.src("./build/css/**")
    .pipe(csso())
    .pipe(gulp.dest("./build/css"));
});