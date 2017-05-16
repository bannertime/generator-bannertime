'use strict';

var browserSync = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var removeCode = require('gulp-remove-code');
var uglify = require('gulp-uglify');

gulp.task('html', function() {
  return gulp.src(config.tasks.html.src)
    .pipe(gulpif(process.env.NODE_ENV == 'production', removeCode({ production: true })))
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(config.tasks.html.dest))
    .pipe(browserSync.stream());
});
