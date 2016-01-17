'use strict';

var config = require('../config');
var gulp = require('gulp');
var handleErrors = require('../lib/handleErrors');
var backupGenerator = require('../lib/backup-generator');

gulp.task('backup-generator', function() {
  return gulp.src([config.publicDirectory + '/**/*.html', '!' + config.publicDirectory + '/index.html'])
    .pipe(backupGenerator({
      root: config.publicDirectory,
      dest: config.sourceDirectory,
      // position: 10,
      // hideObjects: ['rollover', 'icon', 'edition'],
      errorIfJSException: true,
      quality: 75,
      streamType: 'jpg',
      renderDelay: 5000
    }))
    .on('error', handleErrors);
});
