'use strict';

var config = require('../config');
var expect = require('gulp-expect-file');
var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');

gulp.task('backup-image', function() {
  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }
  var folders = getFolders(config.root.src);
  var tasks = folders.map(function(folder) {
    if (folder != 'base') {
      return gulp.src(['public/' + folder + '/images/*'])
        .pipe(expect({
          reportUnexpected: false,
          reportMissing: true
        },
        'public/' + folder + '/images/backup.jpg'));
    }
  });
  return tasks;
});
