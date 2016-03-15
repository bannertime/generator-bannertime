import * as config from '../config';
import expect from 'gulp-expect-file';
import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';

gulp.task('backup-image', () => {
  const readSync = fs.readdirSync;
  const statSync = fs.statSync;
  const getFolders = p => readSync(p).filter(f => statSync(path.join(p, f)).isDirectory());
  const bannerDirectory = getFolders(`${config.src}`);
  const base = bannerDirectory.indexOf('base');
  if (base > -1) bannerDirectory.splice(base, 1);
  const tasks = bannerDirectory.map((directory) => {
    return gulp.src([`public/${directory}/images/*`])
      .pipe(expect({
        reportUnexpected: false,
        reportMissing: true
      },
      `public/${directory}/images/backup.jpg`));
  });
  return tasks;
});
