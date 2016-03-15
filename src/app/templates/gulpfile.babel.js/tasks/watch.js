import * as config from '../config';
import gulp from 'gulp';
import watch from 'gulp-watch';

gulp.task('watch', ['browserSync'], () => {
  watch(config.tasks.images.src, () => gulp.start('images'));
  watch(config.tasks.sass.src, () => gulp.start('sass'));
  watch(config.tasks.svgSprite.src, () => gulp.start('svg-sprite'));
  watch(config.tasks.fonts.src, () => gulp.start('fonts'));
  watch(config.tasks.html.src, () => gulp.start('html'));
  watch(config.tasks.js.src, () => gulp.start('js'));
  watch(config.tasks.json.src, () => gulp.start('json'));
});
