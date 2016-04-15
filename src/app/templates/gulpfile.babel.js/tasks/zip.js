import * as config from '../config';
import FileSize from 'gulp-filesize';
import Fs from 'fs';
import Gulp from 'gulp';
import Path from 'path';
import GulpZip from 'gulp-zip';

Gulp.task('zip', () => {
  const readSync = Fs.readdirSync;
  const statSync = Fs.statSync;
  const getFolders = p => readSync(p).filter(f => statSync(Path.join(p, f)).isDirectory());
  const bannerDirectory = getFolders(`${config.src}`);
  const base = bannerDirectory.indexOf('base');
  if (base > -1) bannerDirectory.splice(base, 1);
  const tasks = bannerDirectory.map(directory => {
    return Gulp.src(Path.join(config.dest, directory, '/**/*'))
      .pipe(GulpZip(`${directory}.zip`))
      .pipe(FileSize())
      .pipe(Gulp.dest(config.tasks.zip.dest));
  });
  return tasks;
});
