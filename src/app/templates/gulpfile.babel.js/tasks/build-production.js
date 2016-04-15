import Gulp from 'gulp';
import Async from 'gulp-sequence';

Gulp.task('build:production', (cb) => {
  process.env.NODE_ENV = 'production';
  Async('clean',
    ['fonts'],
    ['sass', 'js', 'json', 'manifest', 'html'],
    ['images'],
    ['zip', 'backup-image'],
  cb);
});
