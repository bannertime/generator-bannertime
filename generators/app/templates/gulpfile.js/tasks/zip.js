'use strict';

var config = require('../config');
var del = require('del');
var filesize = require('gulp-filesize');
var fs = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var path = require('path');
var rename = require('gulp-rename');
var zip = require('gulp-zip');

gulp.task('zip', function() {
  function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
  }
  var separate = (process.argv.indexOf('--separate-backups') >= 0 || process.argv.indexOf('--sb') >= 0) ? true : false;
  var folders = getFolders(config.root.dest);
  var tasks = folders.map(function(folder) {
    if (folder != 'base') {
      return gulp.src(path.join(config.root.dest, folder, '/**/*'))
      .pipe(gulpif(separate && 'images/backup.jpg',
        rename(function (path) {
          path.dirname = './';
          path.basename = folder + '-backup';
          return path;
        })
      ))
      .pipe(gulpif('!' + folder + '-backup.jpg', zip(folder + '.zip')))
      .pipe(filesize())
      .pipe(gulp.dest(config.tasks.zip.dest));
    }
  });
  return tasks;
});
