import * as config from '../config';
import BrowserSync from 'browser-sync';
import Gulp from 'gulp';
import handleErrors from '../lib/handleErrors';
import ImageMin from 'gulp-imagemin';
import Plumber from 'gulp-plumber';
import SvgStore from 'gulp-svgstore';
import SvgFallback from 'gulp-svgfallback';

Gulp.task('svg-sprite', ['svg-fallback'], () => {
  return Gulp.src(config.tasks.svgSprite.src)
    .pipe(Plumber({ errorHandler: handleErrors }))
    .pipe(ImageMin())
    .pipe(SvgStore())
    .on('error', handleErrors)
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});

Gulp.task('svg-fallback', () => {
  return Gulp.src(config.tasks.svgSprite.src)
    .pipe(Plumber({ errorHandler: handleErrors }))
    .pipe(SvgFallback())
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});
