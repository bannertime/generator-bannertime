import gulp from 'gulp';
import async from 'gulp-sequence';

gulp.task('build:development', (cb) => {
  async('clean',
    ['fonts', 'images', 'svg-sprite'],
    ['sass', 'js', 'json', 'manifest', 'html'],
  cb);
});
