'use strict';

var babel = require('gulp-babel');
var browserSync  = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var handleErrors = require('../lib/handleErrors');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src(config.tasks.js.src)
    .pipe(gulpif(process.env.NODE_ENV == 'production', jshint()))
    .pipe(gulpif(process.env.NODE_ENV == 'production', jshint.reporter('default')))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulpif(process.env.NODE_ENV == 'production', uglify()))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.tasks.js.dest))
    .pipe(browserSync.stream());
});
