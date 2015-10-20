'use strict';

var browserSync = require('browser-sync');
var config = require('../config/json');
var gulp = require('gulp');

gulp.task('json', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
