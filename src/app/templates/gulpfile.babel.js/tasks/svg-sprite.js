import * as config from '../config';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import handleErrors from '../lib/handleErrors';
import imagemin from 'gulp-imagemin';
import svgstore from 'gulp-svgstore';
import svgfallback from 'gulp-svgfallback';

gulp.task('svg-sprite', ['svg-fallback'], () => {
  return gulp.src(config.tasks.svgSprite.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});

gulp.task('svg-fallback', ()  => {
  return gulp.src(config.tasks.svgSprite.src)
    .pipe(svgfallback())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
