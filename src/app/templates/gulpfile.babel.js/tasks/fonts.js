import * as config from '../config';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import gulp from 'gulp';

gulp.task('fonts', () => {
  return gulp.src(config.tasks.fonts.src)
    .pipe(changed(config.dest))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
