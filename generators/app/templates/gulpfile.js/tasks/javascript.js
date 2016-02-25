'use strict';

var babel = require('gulp-babel');
var browserSync  = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src(config.tasks.js.src)
    .pipe(sourcemaps.init())
    .pipe(gulpif(process.env.NODE_ENV == 'production', jshint()))
    .pipe(gulpif(process.env.NODE_ENV == 'production', jshint.reporter('default')))
    .pipe(babel({presets: ['es2015']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulpif(process.env.NODE_ENV == 'production', uglify()))
    .pipe(gulp.dest(config.tasks.js.dest))
    .pipe(browserSync.reload({stream: true}));
});
