'use strict';

var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var config = require('../config');
var gulp = require('gulp');

gulp.task('fonts', function() {
  return gulp.src(config.tasks.fonts.src)
    .pipe(changed(config.tasks.fonts.dest))
    .pipe(gulp.dest(config.tasks.fonts.dest))
    .pipe(browserSync.stream());
});
