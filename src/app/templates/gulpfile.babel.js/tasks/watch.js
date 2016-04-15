import * as config from '../config';
import Gulp from 'gulp';
import Watch from 'gulp-watch';

Gulp.task('watch', ['browserSync'], () => {
  Watch(config.tasks.images.src, () => Gulp.start('images'));
  Watch(config.tasks.sass.src, () => Gulp.start('sass'));
  Watch(config.tasks.svgSprite.src, () => Gulp.start('svg-sprite'));
  Watch(config.tasks.fonts.src, () => Gulp.start('fonts'));
  Watch(config.tasks.html.src, () => Gulp.start('html'));
  Watch([config.tasks.js.src, config.tasks.js.modules], () => Gulp.start('js'));
  Watch(config.tasks.json.src, () => Gulp.start('json'));
});
