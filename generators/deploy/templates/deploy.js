'use strict';

var gulp  = require('gulp');
var pkg = require('../../package.json');
var execSync = require('child_process').execSync;

gulp.task('deploy', ['prod'], function() {
  execSync(['bash gulpfile.js/lib/deploy.sh ' + pkg.name], { stdio: 'inherit' });
});
