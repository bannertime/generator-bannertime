import * as config from '../config';
import BrowserSync from 'browser-sync';
import Changed from 'gulp-changed';
import Gulp from 'gulp';

Gulp.task('fonts', () => {
  return Gulp.src(config.tasks.fonts.src)
    .pipe(Changed(config.dest))
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});
