var gulp = require("gulp"),
  awspublish = require("gulp-awspublish"),
  errorHandler = require('../utilities/errorHandler'),
  config = require("../utilities/aws.config");

gulp.task("publish", ["build"], function () {
  var publisher = awspublish.create({
    key: config.key,
    secret: config.secret,
    bucket: config.buckets.dev
  });
  var headers = {
    "Cache-Control": "max-age=100000, no-transform, public"
  };

  return gulp.src('./build/**/*')
    //.pipe(awspublish.gzip({ext: '.gz'}))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .on("error", errorHandler)
    .pipe(awspublish.reporter());
});
