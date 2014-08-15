var gulp = require('gulp');

gulp.task('Watch', ['Setting Watch Status', 'browserSync'], function () {
  gulp.watch('./app/css/**', ['Compiling less']);
  gulp.watch('./app/img/**', ['Minifying images']);
  gulp.watch('./app/pages/**', ['Moving html']);
  gulp.watch('./app/static/**', ['Moving static']);
  gulp.watch('./app/views/**', ['Moving views']);
});