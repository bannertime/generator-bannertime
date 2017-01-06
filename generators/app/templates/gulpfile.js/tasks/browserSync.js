'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var config = require('../config');

gulp.task('browserSync', function() {
  return browserSync(config.tasks.browserSync);
});
