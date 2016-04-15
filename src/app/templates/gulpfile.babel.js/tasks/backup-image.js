import * as config from '../config';
import Expect from 'gulp-expect-file';
import Fs from 'fs';
import Gulp from 'gulp';
import Path from 'path';

Gulp.task('backup-image', () => {
  const readSync = Fs.readdirSync;
  const statSync = Fs.statSync;
  const getFolders = p => readSync(p).filter(f => statSync(Path.join(p, f)).isDirectory());
  const bannerDirectory = getFolders(`${config.src}`);
  const base = bannerDirectory.indexOf('base');
  if (base > -1) bannerDirectory.splice(base, 1);
  const tasks = bannerDirectory.map((directory) => {
    return Gulp.src([`public/${directory}/images/*`])
      .pipe(Expect({
        reportUnexpected: false,
        reportMissing: true
      },
      `public/${directory}/images/backup.jpg`));
  });
  return tasks;
});
