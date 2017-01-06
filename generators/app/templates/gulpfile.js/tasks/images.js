'use strict';

var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var config = require('../config');
var gulp = require('gulp');
var handleErrors = require('../lib/handleErrors');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');

gulp.task('images', function() {
  return gulp.src(config.tasks.images.src)
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(imagemin())
    .pipe(changed(config.tasks.images.dest))
    .pipe(gulp.dest(config.tasks.images.dest))
    .pipe(browserSync.stream());
});
