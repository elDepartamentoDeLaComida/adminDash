var gulp = require('gulp');

gulp.task('Moving static', function () {
  return gulp.src('./app/static/**')
    .pipe(gulp.dest('./build'))
});