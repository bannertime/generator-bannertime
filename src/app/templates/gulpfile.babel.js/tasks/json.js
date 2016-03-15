import * as config from '../config';
import browserSync from 'browser-sync';
import gulp from 'gulp';

gulp.task('json', () => {
  return gulp.src(config.tasks.json.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
