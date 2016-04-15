import Gulp from 'gulp';
import Async from 'gulp-sequence';

Gulp.task('build:development', (cb) => {
  Async('clean',
    ['fonts'],
    ['sass', 'js', 'json', 'manifest', 'html'],
    ['images'],
  cb);
});
