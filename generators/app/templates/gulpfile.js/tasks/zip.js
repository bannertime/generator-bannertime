'use strict';

var config = require('../config/zip');
var del = require('del');
var filesize = require('gulp-filesize');
var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('zip', function() {
  return gulp.src(config.src)
    .pipe(zip(config.archiveName))
    .pipe(filesize())
    .pipe(gulp.dest(config.dest));
});
