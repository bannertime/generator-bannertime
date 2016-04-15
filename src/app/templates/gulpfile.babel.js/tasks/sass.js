import * as config from '../config';
import AutoPrefixer from 'gulp-autoprefixer';
import BrowserSync from 'browser-sync';
import Gulp from 'gulp';
import GulpIf from 'gulp-if';
import handleErrors from '../lib/handleErrors';
import Nano from 'gulp-cssnano';
import Plumber from 'gulp-plumber';
import Sass from 'gulp-sass';
import SourceMaps from 'gulp-sourcemaps';

Gulp.task('sass', () => {
  return Gulp.src(config.tasks.sass.src)
    .pipe(SourceMaps.init())
    .pipe(Plumber({ errorHandler: handleErrors }))
    .pipe(Sass())
    .pipe(SourceMaps.write())
    .pipe(AutoPrefixer(config.tasks.sass.autoprefixer))
    .pipe(GulpIf(process.env.NODE_ENV === 'production', Nano({ zindex: false })))
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});
