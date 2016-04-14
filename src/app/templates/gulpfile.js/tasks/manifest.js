'use strict';

var browserSync = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');

gulp.task('manifest', function() {
  return gulp.src(config.tasks.manifest.src)
    .pipe(gulp.dest(config.tasks.manifest.dest))
    .pipe(browserSync.stream());
});
