'use strict';

var browserSync = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');

gulp.task('json', function() {
  return gulp.src(config.tasks.json.src)
    .pipe(gulp.dest(config.tasks.json.dest))
    .pipe(browserSync.stream());
});
