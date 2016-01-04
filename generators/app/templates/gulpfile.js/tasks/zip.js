'use strict';

var config = require('../config');
var del = require('del');
var filesize = require('gulp-filesize');
var fs = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var path = require('path');
var zip = require('gulp-zip');

gulp.task('zip', function() {
  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }
  var folders = getFolders(config.root.dest);
  var tasks = folders.map(function(folder) {
    return gulp.src(path.join(config.root.dest, folder, '/**/*'))
      .pipe(gulpif(folder != 'base', zip(folder + '.zip')))
      .pipe(gulpif(folder != 'base', filesize()))
      .pipe(gulpif(folder != 'base', gulp.dest(config.tasks.zip.dest)));
  });
  return tasks;
});
