'use strict';

var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var size = require('gulp-size');
var config = require('../config');
var gulp = require('gulp');

gulp.task('videos', function() {
  return gulp.src(config.tasks.videos.src)
    .pipe(size({ title: 'videos:', gzip: true, showFiles: true }))
    .pipe(gulp.dest(config.tasks.videos.dest))
    .pipe(browserSync.stream());
});
