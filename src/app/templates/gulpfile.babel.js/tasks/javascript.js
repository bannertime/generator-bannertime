import * as config from '../config';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import handleErrors from '../lib/handleErrors';
import uglify from 'gulp-uglify';

gulp.task('js', () => {
  return gulp.src(config.tasks.js.src)
    .pipe(gulpif(process.env.NODE_ENV == 'production', eslint()))
    .pipe(gulpif(process.env.NODE_ENV == 'production', eslint.format()))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulpif(process.env.NODE_ENV == 'production', uglify()))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
