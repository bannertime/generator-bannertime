'use strict';

var gulp = require('gulp');
var express = require('express');
var config = require('../config/server');
var gutil = require('gulp-util');
var open = require('open');

gulp.task('server', function() {
  var url = 'http://localhost:' + config.port;

  express()
    .use('/', express.static(config.root, config.staticOptions))
    .listen(config.port);

  gutil.log('Production server started on ' + gutil.colors.green(url));
  open(url);
});
