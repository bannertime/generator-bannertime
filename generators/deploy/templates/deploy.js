'use strict';

var gulp  = require('gulp');
var pkg = require('../../package.json');
var shell = require('gulp-shell');

gulp.task('deploy', ['prod'], function() {
  return gulp.src('*.js', {read: false})
    .pipe(shell(['bash gulpfile.js/lib/deploy.sh ' + pkg.name], {
      interactive: true
    }));
});
