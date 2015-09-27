'use strict';

var browserSync = require('browser-sync');
var config = require('../config/html');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');

gulp.task('html', function() {
  return gulp.src(config.src)
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.htmlmin)))
    .pipe(gulpif(process.env.NODE_ENV == 'production', usemin({ js: [ uglify() ] }), usemin()))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream: true}));
});
