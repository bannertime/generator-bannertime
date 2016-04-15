import * as config from '../config';
import BrowserSync from 'browser-sync';
import Gulp from 'gulp';

Gulp.task('manifest', () => {
  return Gulp.src(config.tasks.manifest.src)
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});
