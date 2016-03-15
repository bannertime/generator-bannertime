import * as config from '../config';
import gulp from 'gulp';
import express from 'express';
import gutil from 'gulp-util';
import open from 'open';

gulp.task('server', () => {
  const url = `http://localhost:${config.tasks.server.port}`;
  express()
    .use('/', express.static(config.tasks.server.root, config.tasks.server.staticOptions))
    .listen(config.tasks.server.port);
  gutil.log('Production server started on ' + gutil.colors.green(url));
  open(url);
});
