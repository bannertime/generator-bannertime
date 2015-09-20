'use strict';

var browserSync = require('browser-sync');
var config = require('../config/html');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');

gulp.task('html', function() {
  return gulp.src(config.src)
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.htmlmin)))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
