'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var config = require('../config/sass');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var handleErrors = require('../lib/handleErrors');
var minify = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return sass(config.src)
    .pipe(sourcemaps.init())
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulpif(process.env.NODE_ENV == 'production', minify()))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
