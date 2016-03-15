import * as config from '../config';
import del from 'del';
import filesize from 'gulp-filesize';
import fs from 'fs';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import path from 'path';
import zip from 'gulp-zip';

gulp.task('zip', () => {
  const readSync = fs.readdirSync;
  const statSync = fs.statSync;
  const getFolders = p => readSync(p).filter(f => statSync(path.join(p, f)).isDirectory());
  const bannerDirectory = getFolders(`${config.src}`);
  const base = bannerDirectory.indexOf('base');
  if (base > -1) bannerDirectory.splice(base, 1);
  const tasks = bannerDirectory.map((directory) => {
    return gulp.src(path.join(config.dest, directory, '/**/*'))
      .pipe(zip(`${directory}.zip`))
      .pipe(filesize())
      .pipe(gulp.dest(config.tasks.zip.dest));
  });
  return tasks;
});
