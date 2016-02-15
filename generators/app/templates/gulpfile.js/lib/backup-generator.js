'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var webshot = require('webshot');
var path = require('path');
var connect = require('connect');
var serveStatic = require('serve-static');
var url = require('url');
var fs = require('fs');

module.exports = function(opt) {

  gutil.log('This may take a few minutes...');
  gutil.log(gutil.colors.red('Please be patient!'));

  if (!opt) {
    opt = {};
  }

  opt.p = opt.p || 9000;
  opt.root = opt.root || './public';
  opt.dest = opt.dest || './src';
  opt.overwrite = opt.overwrite || false;
  // opt.takeShotOnCallback = opt.takeShotOnCallback || true;
  opt.captureSelector = opt.captureSelector || '.banner';
  opt.position = opt.position || false;
  opt.hideObjects = opt.hideObjects || [];
  opt.onLoadFinished = opt.onLoadFinished || {
    fn: function() {
      var _this = this;
      var timeout = _this.renderDelay - 1000;
      setTimeout(function() {
        if (!_this.position) {
          banner.timeline.totalProgress(1, false).pause();
        } else {
          banner.timeline.seek(_this.position, false).pause();
        }
        for (var i = 0; i < _this.hideObjects.length; i++) {
          banner[_this.hideObjects[i]].set({autoAlpha:0});
        }
        // window.callPhantom('takeShot');
      }, timeout);
    },
    context: {
      position: opt.position,
      hideObjects: opt.hideObjects,
      renderDelay: opt.renderDelay
    }
  };

  if (opt.overwrite) {
    gutil.log(gutil.colors.red('Overwrite mode on.'));
  }

  var app = connect();
  var resolvedRoot = path.resolve(opt.root);
  app.use(serveStatic(resolvedRoot));
  var server = app.listen(opt.p);

  var numSaved = 0;
  var numSkipped = 0;
  var numFailed = 0;

  return through.obj(function(file, enc, cb) {
    var backupImage = path.join('./public', path.relative(opt.root, path.dirname(file.path)), '/images/backup.jpg');

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('backup-generator', 'Streaming not supported'));
      return cb();
    }
    var basePath;
    if (opt.root) {
      basePath = path.relative(opt.root, path.dirname(file.path));
    }

    var fileType = (!opt.streamType) ? '.jpg' : '.' + opt.streamType;
    var parsep = path.basename(file.relative);
    var fileName = path.join(basePath, 'images', 'backup' + fileType);
    fileName = path.join(opt.dest, fileName);
    var relativeFilePath = path.join(path.sep, basePath, parsep);
    var urlPath = url.resolve('http://localhost:' + opt.p, relativeFilePath);

    var _this = this;
    /**
     * [takeScreenshot description]
     * @param  {Function} callback
     */
    function takeScreenshot(callback) {
      webshot(urlPath, fileName, opt, function(err, stream) {
        if (err) {
          gutil.log('backup-generator:', urlPath, gutil.colors.red('FAILED'));
          _this.emit('error', new gutil.PluginError('backup-generator', err));
          // server.close();
          numFailed++;
          callback();
        } else {
          gutil.log('backup-generator:', gutil.colors.green('✔'), fileName, gutil.colors.magenta('SAVED'));
          numSaved++;
          callback();
        }
      }.bind(_this));
      _this.push(file);
    }


    /**
     * [checkFileExists description]
     * @param  {String}   file
     * @param  {Function} callback
     */
    function checkFileExists(file, callback) {
      fs.exists(file, function (exists) {
        if (exists) {
          gutil.log('backup-generator:', gutil.colors.cyan(file),'already exists', gutil.colors.magenta('SKIP'));
          numSkipped++;
          callback();
        } else {
          takeScreenshot(callback);
        }
      });
    }

    if (!opt.overwrite) {
      checkFileExists(backupImage, cb);
    } else {
      takeScreenshot(cb);
    }

  },
  function(cb) {
    server.close(function() {
      gutil.log('backup-generator:', 'backups saved: ', gutil.colors.cyan(numSaved), 'backups skipped: ', gutil.colors.magenta(numSkipped), 'backups failed: ', gutil.colors.red(numFailed));
      cb();
    });
  });
};
