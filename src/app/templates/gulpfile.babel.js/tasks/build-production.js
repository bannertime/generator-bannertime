import gulp from 'gulp';
import async from 'gulp-sequence';

gulp.task('build:production', (cb) => {
  process.env.NODE_ENV = 'production';
  async('clean',
    ['fonts', 'images', 'svg-sprite'],
    ['sass', 'js', 'json', 'manifest', 'html'],
    ['zip', 'backup-image'],
  cb);
});
