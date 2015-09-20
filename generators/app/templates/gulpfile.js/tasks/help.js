'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('help', function() {
  gutil.log(gutil.colors.red('bannertime'), 'help');
  gutil.log('--------------------------');
  gutil.log('There are 3 basic commands.');
  gutil.log(gutil.colors.yellow('gulp'), ': for dev use, spins up server w livereload as you edit files');
  gutil.log(gutil.colors.yellow('gulp build'), ': minifies files from the dev directory into the', gutil.colors.red('dist'), 'directory');
  gutil.log('and creates a zip of these files in', gutil.colors.red('delivery'), 'directory');
  gutil.log(gutil.colors.yellow('gulp archive'), 'takes files from the '+ gutil.colors.red('dev'), 'directory' + ' plus other important files');
  gutil.log('and zips them in the', gutil.colors.red('archive'), 'directory for archival purposes.');
  gutil.log('--------------------------');
});
