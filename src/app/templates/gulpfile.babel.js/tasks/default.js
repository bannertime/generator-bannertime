import Gulp from 'gulp';
import Async from 'gulp-sequence';

Gulp.task('default', (cb) => {
  global.watch = true;
  Async(
    'build:development',
    ['watch', 'browserSync'],
    cb
  );
});
