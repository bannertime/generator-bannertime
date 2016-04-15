'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var handleErrors = require('../lib/handleErrors');
var nano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src(config.tasks.sass.src)
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.tasks.sass.autoprefixer))
    .pipe(gulpif(process.env.NODE_ENV == 'production', nano({zindex: false})))
    .pipe(gulp.dest(config.tasks.sass.dest))
    .pipe(browserSync.stream());
});
