'use strict';

var gulp = require('gulp');
var express = require('express');
var config = require('../config');
var gutil = require('gulp-util');
var open = require('open');

gulp.task('server', function() {
  var url = 'http://localhost:' + config.tasks.server.port;

  express()
    .use('/', express.static(config.tasks.server.root, config.tasks.server.staticOptions))
    .listen(config.tasks.server.port);

  gutil.log('Production server started on ' + gutil.colors.green(url));
  open(url);
});
