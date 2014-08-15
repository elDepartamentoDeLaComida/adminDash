var changed = require('gulp-changed'),
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin');

gulp.task('Minifying images', function () {
  var dest = './build/img',
    src = './app/img/**';

  return gulp.src(src)
    .pipe(changed(dest))
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
});