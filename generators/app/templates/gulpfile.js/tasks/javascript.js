'use strict';

var browserSync  = require('browser-sync');
var config = require('../config/javascript');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulpif(process.env.NODE_ENV == 'production', uglify()))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
