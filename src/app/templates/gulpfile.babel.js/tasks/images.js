import * as config from '../config';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import gulp from 'gulp';
import handleErrors from '../lib/handleErrors';
import imagemin from 'gulp-imagemin';

gulp.task('images', () => {
  return gulp.src(config.tasks.images.src)
    .pipe(changed(config.dest))
    .pipe(imagemin())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
