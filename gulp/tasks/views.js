var gulp = require("gulp");

gulp.task("Moving views", function () {
  return gulp.src("./app/views/**")
    .pipe(gulp.dest("./build/views"));
});