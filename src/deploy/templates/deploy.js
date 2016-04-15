import Gulp  from 'gulp';
import pkg from '../../package.json';
import { execSync } from 'child_process';

Gulp.task('deploy', ['prod'], () => {
  execSync([`bash gulpfile.babel.js/lib/deploy.sh ${pkg.name}`], { stdio: 'inherit' });
});
