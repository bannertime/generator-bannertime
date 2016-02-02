'use strict';

var git = require('./git');
var gutil = require('gulp-util');
var Transform = require('readable-stream/transform');
var vinylFs = require('vinyl-fs');
var wrapPromise = require('wrap-promise');

/*
 * Public: Push to deploy branch
 *
 * options - {Object} that contains all the options of the plugin
 *   - remoteUrl: The {String} remote url (repository) of the project,
 *   - origin: The {String} origin of the git repository (default to `"origin"`),
 *   - branch: The {String} branch where deploy will by done (default to `"deploy"`),
 *   - cacheDir: {String} where the git repo will be located. (default to a temporary folder)
 *   - push: {Boolean} to know whether or not the branch should be pushed (default to `true`)
 *   - message: {String} commit message (default to `"deploy: [timestamp]"`)
 *
 * Returns `Stream`.
**/
module.exports = function deploy(options) {
  options = options || {};
  var projectName = options.projectName;
  var username = options.username;
  var domain = options.domain;
  var remoteUrl = username + '@' + domain + ':htdocs/' + projectName + '/git';
  var origin = options.origin || 'preview';
  var branch = options.branch || 'deploy';
  var message = options.message || 'deploy: ' + new Date().toISOString();

  var files = [];
  var TAG;
  if (branch !== 'deploy') {
    TAG = '[deploy (' + branch + ')]';
  } else {
    TAG = '[deploy]';
  }

  return new Transform({
    objectMode: true,
    transform: function collectFiles(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }

      if (file.isStream()) {
        cb(new gutil.PluginError('deploy', 'Stream content is not supported'));
        return;
      }

      files.push(file);
      cb(null, file);
    },
    flush: function publish(cb) {
      var _this = this;

      if (files.length === 0) {
        gutil.log(TAG, gutil.colors.red('No files in the stream.'));
        cb();
        return;
      }

      var newBranchCreated = false;

      git.prepareRepo(remoteUrl, origin, options.cacheDir || '.publish')

      /**
       * Create temporary repo.
       */
      .then(function(repo) {
        gutil.log(TAG, gutil.colors.green('Cloning repo'));
        if (repo._localBranches.indexOf(branch) > -1) {
          gutil.log(TAG, gutil.colors.green('Checkout branch `' + branch + '`'));
          return repo.checkoutBranch(branch);
        }

        if (repo._remoteBranches.indexOf(origin + '/' + branch) > -1) {
          gutil.log(TAG, gutil.colors.green('Checkout remote branch `' + branch + '`'));
          return repo.checkoutBranch(branch);
        }

        gutil.log(TAG, gutil.colors.green('Create branch `' + branch + '` and checkout'));
        newBranchCreated = true;
        return repo.createAndCheckoutBranch(branch);
      })

      /**
       * Copy the files to the temporary repo.
       */
      .then(function(repo) {
        gutil.log(TAG, gutil.colors.green('Copying files to repository'));

        return wrapPromise(function(resolve, reject) {
          var destStream = vinylFs.dest(repo._repo.path)
          .on('error', reject)
          .on('end', function() {
            resolve(repo);
          })
          .resume();

          files.forEach(function(file) {
            destStream.write(file);
          });

          destStream.end();
        });
      })


      /**
       * Add files to git stage.
       */
      .then(function(repo) {
        return repo.addFiles('.', {force: options.force || false});
      })

      /**
       * Set commit message.
       */
      .then(function(repo) {
        var filesToBeCommitted = Object.keys(repo._staged).length;
        if (filesToBeCommitted === 0) {
          gutil.log(TAG, gutil.colors.red('No files have changed.'));
          cb();
          return;
        }

        gutil.log(TAG, gutil.colors.green('Adding ' + filesToBeCommitted + ' files.'));
        gutil.log(TAG, gutil.colors.green('Committing "' + message + '"'));
        repo.commit(message)

        /**
         * Push to remote.
         */
        .then(function(newRepo) {
          if (options.push === undefined || options.push) {
            gutil.log(TAG, gutil.colors.green('Pushing to remote.'));
            newRepo._repo.git('push', {
              'set-upstream': true
            }, [remoteUrl, newRepo._currentBranch], function(err) {
              _this.emit('update')
              if (err) {
                cb(err);
                return;
              }
              cb();
            });
            return;
          }
          cb();
        }, cb);
      })
      .catch(function(err) {
        setImmediate(function() {
          cb(new gutil.PluginError('deploy', (err)));
        });
      });
    }
  });
};
