'use strict';

var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var filesize = require('gulp-filesize');
var config = require('../config');
var gulp = require('gulp');

gulp.task('videos', function() {
  return gulp.src(config.tasks.videos.src)
    .pipe(changed(config.tasks.videos.dest))
    .pipe(filesize())
    .pipe(gulp.dest(config.tasks.videos.dest))
    .pipe(browserSync.stream());
});
