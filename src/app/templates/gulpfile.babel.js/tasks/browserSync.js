import * as config from '../config';
import BrowserSync from 'browser-sync';
import Gulp from 'gulp';

Gulp.task('browserSync', () => {
  return BrowserSync(config.tasks.browserSync);
});
