import gulp from 'gulp';
import gutil from 'gulp-util';

gulp.task('help', () => {
  gutil.log('There are 2 basic commands');
  gutil.log('--------------------------');
  gutil.log(gutil.colors.green('gulp'), 'compiles source files and fires up dev server');
  gutil.log(gutil.colors.green('gulp prod'), 'prepares files for production');
  gutil.log('--------------------------');
});
