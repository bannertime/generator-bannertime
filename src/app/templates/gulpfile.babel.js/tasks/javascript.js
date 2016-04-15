import * as config from '../config';
import BrowserSync from 'browser-sync';
import Gulp from 'gulp';
import GulpIf from 'gulp-if';
import EsLint from 'gulp-eslint';
import handleErrors from '../lib/handleErrors';
import Named from 'vinyl-named';
import Path from 'path';
import Plumber from 'gulp-plumber';
import Webpack from 'webpack-stream';
import webpackConf from '../lib/webpack.conf';

const repath = (target, removal, pathOnly) => {
  return target.replace(removal, '')
    .replace(pathOnly ? /\.[^/.]+$/ : '', '')
    .replace(new RegExp(`\\${Path.sep} g`), '/');
};

Gulp.task('configure', () => {
  return Gulp.src([`${config.src}/**/js/banner.js`, `${config.src}/**/js/main.js`])
    .pipe(Named(function queue(file) {
      webpackConf.entry[repath(file.path, file.base, true)] = [`.${repath(file.path, file.cwd)}`];
      this.queue(file);
    }));
});

Gulp.task('js', ['configure', 'eslint'], () => {
  return Gulp.src(config.tasks.js.src)
    .pipe(Plumber({ errorHandler: handleErrors }))
    .pipe(Webpack(webpackConf))
    .pipe(Gulp.dest(config.dest))
    .pipe(BrowserSync.stream());
});

Gulp.task('eslint', () => {
  return Gulp.src([config.tasks.js.src, config.tasks.js.modules])
    .pipe(GulpIf(process.env.NODE_ENV === 'production', EsLint()))
    .pipe(GulpIf(process.env.NODE_ENV === 'production', EsLint.format()))
});
