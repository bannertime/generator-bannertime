'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config');
var htmlConfig = require('../config/html');

gulp.task('clean', function (cb) {
  del([
    config.publicAssets,
    htmlConfig.dest,
  ], cb);
});
