var browserify = require("browserify"),
  watchify = require('watchify'),
  bundleLog = require('../utilities/bundleLog'),
  gulp = require('gulp'),
  errorHandler = require('../utilities/errorHandler'),
  source = require('vinyl-source-stream');

gulp.task("browserify", function () {

  var bundler = browserify({
    //watchify stuffs
    cache: {},
    packageCache: {},
    fullPaths: true,
    //browserify stuffs
    entries: ['./app/js/app.js'],
    //debug: true
  });

  bundler.transform({
    global: true
}, "uglifyify");

  var bundle = function () {
    bundleLog.start();

    return bundler.bundle()
      .on('error', errorHandler)
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build/'))
      .on('end', bundleLog.end);
  };

  if (global.isWatching) {
    bundler = watchify(bundler);
    bundler.on("update", bundle);
  }

  return bundle();
});
