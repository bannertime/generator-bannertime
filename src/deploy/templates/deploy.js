import gulp from 'gulp';
import pkg from '../../package.json';
import { execSync } from 'child_process';

gulp.task('deploy', ['prod'], () => {
  execSync(`bash gulpfile.babel.js/lib/deploy.sh ${pkg.name}`);
});
