'use strict';

var gulp = require('gulp');
var config = require('../config');
var watch = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  watch(config.tasks.images.src, function() { gulp.start('images') });
  watch(config.tasks.sass.src, function() { gulp.start('sass') });
  watch(config.tasks.svgSprite.src, function() { gulp.start('svg-sprite') });
  watch(config.tasks.fonts.src, function() { gulp.start('fonts') });
  watch(config.tasks.html.src, function() { gulp.start('html') });
  watch(config.tasks.js.src, function() { gulp.start('js') });
  watch(config.tasks.json.src, function() { gulp.start('json') });
});
