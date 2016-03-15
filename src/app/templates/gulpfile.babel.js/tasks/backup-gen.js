import * as config from '../config';
import gulp from 'gulp';
import handleErrors from '../lib/handleErrors';
import backupGenerator from '../lib/backup-generator';

gulp.task('backup-gen', ['build:production'], () => {
  return gulp.src([`${config.dest}/**/*.html`, `!${config.dest}/index.html`])
    .pipe(backupGenerator({
      root: config.dest,
      dest: config.src,
      // overwrite: true,
      // position: 10,
      // hideObjects: ['rollover', 'icon', 'edition'],
      errorIfJSException: true,
      quality: 75,
      streamType: 'jpg',
      renderDelay: 5000,
    }))
    .on('error', handleErrors);
});
