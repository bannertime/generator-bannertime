'use strict';

var browserSync = require('browser-sync');
var config = require('../config/svg-sprite');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgfallback = require('gulp-svgfallback');
var handleErrors = require('../lib/handleErrors');

gulp.task('svg-sprite', ['svg-fallback'], function() {
  return gulp.src(config.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('svg-fallback', function() {
  return gulp.src(config.src)
    .pipe(svgfallback())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
