import * as config from '../config';
import browserSync from 'browser-sync';
import gulp from 'gulp';

gulp.task('browserSync', () => {
  return browserSync(config.tasks.browserSync);
});
