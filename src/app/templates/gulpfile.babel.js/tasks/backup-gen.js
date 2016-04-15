import * as config from '../config';
import backupGenerator from '../lib/backup-generator';
import Gulp from 'gulp';
import handleErrors from '../lib/handleErrors';
import Plumber from 'gulp-plumber';

Gulp.task('backup-gen', ['build:production'], () => {
  return Gulp.src([`${config.dest}/**/*.html`, `!${config.dest}/index.html`])
    .pipe(Plumber({ errorHandler: handleErrors }))
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
});
