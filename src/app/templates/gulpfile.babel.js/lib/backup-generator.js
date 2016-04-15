import * as config from '../config';
import Connect from 'connect';
import Fs from 'fs';
import GulpUtil from 'gulp-util';
import Path from 'path';
import ServeStatic from 'serve-static';
import Through from 'through2';
import Url from 'url';
import Webshot from 'webshot';

export default function (options) {
  const red = GulpUtil.colors.red;
  const green = GulpUtil.colors.green;
  const cyan = GulpUtil.colors.cyan;
  const magenta = GulpUtil.colors.magenta;

  GulpUtil.log('This may take a few minutes...');
  GulpUtil.log(red('Please be patient!'));

  const opt = {};

  opt.p = options.p || 9000;
  opt.root = options.root || config.dest;
  opt.dest = options.dest || config.src;
  opt.overwrite = options.overwrite || false;
  // opt.takeShotOnCallback = options.takeShotOnCallback || true;
  opt.captureSelector = options.captureSelector || '.banner';
  opt.position = options.position || false;
  opt.hideObjects = options.hideObjects || [];
  opt.onLoadFinished = options.onLoadFinished || {
    function() {
      const timeout = this.renderDelay - 1000;
      setTimeout(() => {
        if (!this.position) {
          window.banner.timeline.totalProgress(1, false).pause();
        } else {
          window.banner.timeline.seek(this.position, false).pause();
        }
        for (let i = 0; i < this.hideObjects.length; i++) {
          window.banner[this.hideObjects[i]].set({ autoAlpha: 0 });
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

  if (options.overwrite) GulpUtil.log(red('Overwrite mode on.'));

  const app = Connect();
  const resolvedRoot = Path.resolve(options.root);
  app.use(ServeStatic(resolvedRoot));
  const server = app.listen(options.p);

  let numSaved = 0;
  let numSkipped = 0;
  let numFailed = 0;

  return Through.obj(function screenshot(file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new GulpUtil.PluginError('backup-generator', 'Streaming not supported'));
      return cb();
    }

    let basePath;
    if (options.root) {
      basePath = Path.relative(options.root, Path.dirname(file.path));
    }

    const fileType = (!options.streamType) ? '.jpg' : `.${options.streamType}`;
    const parsep = Path.basename(file.relative);
    let fileName = Path.join(basePath, 'images', `backup${fileType}`);
    fileName = Path.join(options.dest, fileName);
    const relativeFilePath = Path.join(Path.sep, basePath, parsep);
    const urlPath = Url.resolve(`http://localhost:${options.p}`, relativeFilePath);
    const backupImage = Path.join(
      config.dest,
      Path.relative(options.root, Path.dirname(file.path)),
      '/images/backup.jpg'
    );

    /**
     * [takeScreenshot]
     * @param  {Function} cb
     */
    const takeScreenshot = (callback) => {
      Webshot(urlPath, fileName, options, (err) => {
        if (err) {
          GulpUtil.log(`backup-generator: ${urlPath} ${red('FAILED')}`);
          this.emit('error', new GulpUtil.PluginError('backup-generator', err));
          // server.close();
          numFailed++;
          callback();
        } else {
          GulpUtil.log(`backup-generator: ${green('✔')} ${fileName} ${magenta('SAVED')}`);
          numSaved++;
          callback();
        }
      });
      this.push(file);
    };

    /**
     * [checkFileExists]
     * @param  {String}   file
     * @param  {Function} cb
     */
    const checkFileExists = (checkFile, callback) => {
      Fs.exists(checkFile, (exists) => {
        if (exists) {
          numSkipped++;
          GulpUtil.log(`backup-generator: ${cyan(checkFile)} already exists ${magenta('SKIP')}`);
          callback();
        } else {
          takeScreenshot(callback);
        }
      });
    };

    if (!options.overwrite) {
      checkFileExists(backupImage, cb);
    } else {
      takeScreenshot(cb);
    }

    return false;
  }, (cb) => {
    server.close(() => {
      GulpUtil.log(`backups saved: ${cyan(numSaved)}`);
      GulpUtil.log(`backups skipped: ${magenta(numSkipped)}`);
      GulpUtil.log(`backups failed: ${red(numFailed)}`);
      cb();
    });
  });
}
