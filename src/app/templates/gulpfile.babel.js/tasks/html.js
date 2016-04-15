import * as config from '../config';
import BrowserSync from 'browser-sync';
import Gulp from 'gulp';
import GulpIf from 'gulp-if';
import HtmlMin from 'gulp-htmlmin';

Gulp.task('html', () => {
  return Gulp.src(config.tasks.html.src)
    .pipe(GulpIf(process.env.NODE_ENV === 'production', HtmlMin(config.tasks.html.htmlmin)))
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});
