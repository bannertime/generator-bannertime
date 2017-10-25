'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.tasks.images.src, function() { gulp.start('images') });
  gulp.watch(config.tasks.sass.src, function() { gulp.start('sass') });
  gulp.watch(config.tasks.svgSprite.src, function() { gulp.start('svg-sprite') });
  gulp.watch(config.tasks.fonts.src, function() { gulp.start('fonts') });
  gulp.watch(config.tasks.html.src, function() { gulp.start('html') });
  gulp.watch(config.tasks.js.src, function() { gulp.start('js') });
  gulp.watch(config.tasks.json.src, function() { gulp.start('json') });
});
