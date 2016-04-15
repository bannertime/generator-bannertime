import * as config from '../config';
import BrowserSync from 'browser-sync';
import Changed from 'gulp-changed';
import Gulp from 'gulp';
import GulpIf from 'gulp-if';
import handleErrors from '../lib/handleErrors';
import ImageMin from 'gulp-imagemin';
import Plumber from 'gulp-plumber';

Gulp.task('images', () => {
  return Gulp.src(config.tasks.images.src)
    .pipe(Plumber({ errorHandler: handleErrors }))
    .pipe(Changed(config.dest))
    .pipe(GulpIf(process.env.NODE_ENV === 'production', ImageMin()))
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});
