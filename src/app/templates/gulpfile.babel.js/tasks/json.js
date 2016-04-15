import * as config from '../config';
import BrowserSync from 'browser-sync';
import Gulp from 'gulp';

Gulp.task('json', () => {
  return Gulp.src(config.tasks.json.src)
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});
