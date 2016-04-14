import * as config from '../config';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import handleErrors from '../lib/handleErrors';
import nano from 'gulp-cssnano';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('sass', () => {
  return gulp.src(config.tasks.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.tasks.sass.autoprefixer))
    .pipe(gulpif(process.env.NODE_ENV == 'production', nano({ zindex: false })))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
