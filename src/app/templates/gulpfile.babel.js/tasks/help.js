import Gulp from 'gulp';
import GulpUtil from 'gulp-util';

Gulp.task('help', () => {
  GulpUtil.log('There are 2 basic commands');
  GulpUtil.log('--------------------------');
  GulpUtil.log(GulpUtil.colors.green('gulp'), 'compiles source files and fires up dev server');
  GulpUtil.log(GulpUtil.colors.green('gulp prod'), 'prepares files for production');
  GulpUtil.log('--------------------------');
});
