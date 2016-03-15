import * as config from '../config';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import uglify from 'gulp-uglify';

gulp.task('html', () => {
  return gulp.src(config.tasks.html.src)
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
