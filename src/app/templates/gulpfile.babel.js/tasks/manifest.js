import * as config from '../config';
import browserSync from 'browser-sync';
import gulp from 'gulp';

gulp.task('manifest', () => {
  return gulp.src(config.tasks.manifest.src)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
