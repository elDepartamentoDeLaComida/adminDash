var gulp = require('gulp');

gulp.task('Moving html', function () {
  return gulp.src('./app/pages/**')
    .pipe(gulp.dest('./build'));
});