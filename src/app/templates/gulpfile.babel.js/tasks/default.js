import gulp from 'gulp';
import async from 'gulp-sequence';

gulp.task('default', (cb) => {
  global.watch = true;
  async(
    'build:development',
    ['watch', 'browserSync'],
    cb
  );
});
