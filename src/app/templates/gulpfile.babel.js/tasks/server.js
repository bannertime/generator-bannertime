import * as config from '../config';
import Gulp from 'gulp';
import Express from 'express';
import GulpUtil from 'gulp-util';
import Open from 'open';

Gulp.task('server', () => {
  const url = `http://localhost:${config.tasks.server.port}`;
  Express()
    .use('/', Express.static(config.tasks.server.root, config.tasks.server.staticOptions))
    .listen(config.tasks.server.port);
  GulpUtil.log(`Production server started on ${GulpUtil.colors.green(url)}`);
  Open(url);
});
