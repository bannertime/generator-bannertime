'use strict';

var config = require('../config');
var deploy = require('../lib/handleDeploy');
var gulp = require('gulp');
var open = require('open');
var os = require('os');
var _package = require('../../package.json');
var path = require('path');

var settings = {
  url: _package.homepage,
  src: path.join(config.root.dest, '/**/*'),
  deploy: {
    projectName: _package.name,
    username: config.tasks.deploy.username,
    domain: config.tasks.deploy.domain,
    origin: config.tasks.deploy.origin,
    branch: config.tasks.deploy.branch,
    cacheDir: path.join(os.tmpdir(), _package.name)
  }
};

gulp.task('deploy', ['build:production'], function() {
  return gulp.src(settings.src)
    .pipe(deploy(settings.deploy))
    .on('update', function(){
      open(settings.url)
    });
});
