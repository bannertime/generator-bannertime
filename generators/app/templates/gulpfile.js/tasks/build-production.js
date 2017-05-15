'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:production', function(cb) {
  process.env.NODE_ENV = 'production';
  gulpSequence('clean', ['videos'], ['fonts', 'images', 'svg-sprite'], ['sass', 'js', 'json', 'manifest', 'html'], ['zip', 'backup-image'], cb);
});
