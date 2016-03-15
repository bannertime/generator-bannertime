import * as config from '../config';
import connect from 'connect';
import fs from 'fs';
import gutil from 'gulp-util';
import path from 'path';
import serveStatic from 'serve-static';
import through from 'through2';
import url from 'url';
import webshot from 'webshot';

export default function (options) {
  const red = gutil.colors.red;
  const green = gutil.colors.green;
  const cyan = gutil.colors.cyan;
  const magenta = gutil.colors.magenta;

  gutil.log('This may take a few minutes...');
  gutil.log(red('Please be patient!'));

  if (!options) {
    options = {};
  }

  options.p = options.p || 9000;
  options.root = options.root || config.dest;
  options.dest = options.dest || config.src;
  options.overwrite = options.overwrite || false;
  // options.takeShotOnCallback = options.takeShotOnCallback || true;
  options.captureSelector = options.captureSelector || '.banner';
  options.position = options.position || false;
  options.hideObjects = options.hideObjects || [];
  options.onLoadFinished = options.onLoadFinished || {
    fn: function() {
      const timeout = this.renderDelay - 1000;
      setTimeout(() => {
        if (!this.position) {
          banner.timeline.totalProgress(1, false).pause();
        } else {
          banner.timeline.seek(this.position, false).pause();
        }
        for (let i = 0; i < this.hideObjects.length; i++) {
          banner[this.hideObjects[i]].set({ autoAlpha: 0 });
        }
        // window.callPhantom('takeShot');
      }, timeout);
    },
    context: {
      position: options.position,
      hideObjects: options.hideObjects,
      renderDelay: options.renderDelay
    }
  };

  if (options.overwrite) gutil.log(red('Overwrite mode on.'));

  const app = connect();
  const resolvedRoot = path.resolve(options.root);
  app.use(serveStatic(resolvedRoot));
  const server = app.listen(options.p);

  let numSaved = 0;
  let numSkipped = 0;
  let numFailed = 0;

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('backup-generator', 'Streaming not supported'));
      return cb();
    }

    let basePath;
    if (options.root) {
      basePath = path.relative(options.root, path.dirname(file.path));
    }

    const fileType = (!options.streamType) ? '.jpg' : '.' + options.streamType;
    const parsep = path.basename(file.relative);
    let fileName = path.join(basePath, 'images', 'backup' + fileType);
    fileName = path.join(options.dest, fileName);
    const relativeFilePath = path.join(path.sep, basePath, parsep);
    const urlPath = url.resolve('http://localhost:' + options.p, relativeFilePath);
    const backupImage = path.join(
      config.dest,
      path.relative(options.root, path.dirname(file.path)),
      '/images/backup.jpg'
    );

    /**
     * [takeScreenshot]
     * @param  {Function} cb
     */
    const takeScreenshot = (cb) => {
      webshot(urlPath, fileName, options, (err, stream) => {
        if (err) {
          gutil.log(`backup-generator: ${urlPath} ${red('FAILED')}`);
          this.emit('error', new gutil.PluginError('backup-generator', err));
          // server.close();
          numFailed++;
          cb();
        } else {
          gutil.log(`backup-generator: ${green('✔')} ${fileName} ${magenta('SAVED')}`);
          numSaved++;
          cb();
        }
      });
      this.push(file);
    }


    /**
     * [checkFileExists]
     * @param  {String}   file
     * @param  {Function} cb
     */
    const checkFileExists = (file, cb) => {
      fs.exists(file, (exists) => {
        if (exists) {
          numSkipped++;
          gutil.log(`backup-generator: ${cyan(file)} already exists ${magenta('SKIP')}`);
          cb();
        } else {
          takeScreenshot(cb);
        }
      });
    }

    if (!options.overwrite) {
      checkFileExists(backupImage, cb);
    } else {
      takeScreenshot(cb);
    }

  }, (cb) => {
    server.close(() => {
      gutil.log(`backups saved: ${cyan(numSaved)}`);
      gutil.log(`backups skipped: ${magenta(numSkipped)}`);
      gutil.log(`backups failed: ${red(numFailed)}`);
      cb();
    });
  });
}
