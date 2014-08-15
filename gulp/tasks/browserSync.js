var browserSync = require('browser-sync'),
  gulp = require('gulp');

gulp.task('browserSync', ['build'], function () {
  browserSync.init(['./build/**'], {
    server: {
      baseDir: './build'
    }
  });
});