var gulp = require('gulp'),
  cssfont64 = require('gulp-cssfont64');

gulp.task('CSSifying fonts', function () {
  return gulp.src('./app/static/webfonts/*.ttf')
    .pipe(cssfont64())
    .pipe(gulp.dest('./build/css'));
});