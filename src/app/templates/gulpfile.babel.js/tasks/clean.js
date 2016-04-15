import * as config from '../config';
import Del from 'del';
import Gulp from 'gulp';

Gulp.task('clean', () => {
  Del([config.dest]);
});
