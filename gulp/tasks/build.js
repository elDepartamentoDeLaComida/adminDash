var gulp = require('gulp');

gulp.task('build', ['browserify', 'CSSifying fonts', 'Compiling less', 'Minifying images', 'Moving html', 'Moving views', 'Moving static']);