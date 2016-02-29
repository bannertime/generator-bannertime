/*global describe, it, beforeEach */
'use strict';

var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var path = require('path');

describe('Bannertime Generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.app = helpers.createGenerator(
        'bannertime:app', [
          '../../generators/app'
        ]);

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    require('../generators/app');
  });

  it('creates expected files', function () {
    helpers.mockPrompt(this.app, {
      bannerName: '300x250',
    });

    this.app.options['skip-install'] = false;

    this.app.run({}, function () {
      assert.file([
        'src/300x250/index.html',
        'src/300x250/images/logo.png',
        'src/300x250/js/banner.js',
        'src/300x250/js/banner.loader.js',
        'src/300x250/js/banner.animation.js',
        'src/300x250/styles/style.scss',
        'src/300x250/styles/base/_banner.scss',
        'src/300x250/styles/base/_preloader.scss',
        'src/base/images/desktop.png',
        'src/base/images/loading.gif',
        'src/base/images/logo.png',
        'src/base/js/main.js',
        'src/base/styles/style.scss',
        'src/index.html',
        '.editorconfig',
        '.gitignore',
        '.jshintrc',
        'package.json',
        'README.md',
      ]);
      done();
    });
  });
});
