import * as config from '../config';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';

gulp.task('js', () => {
  return gulp.src(config.tasks.js.src)
    .pipe(gulpif(process.env.NODE_ENV == 'production', eslint()))
    .pipe(gulpif(process.env.NODE_ENV == 'production', eslint.format()))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulpif(process.env.NODE_ENV == 'production', uglify()))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
