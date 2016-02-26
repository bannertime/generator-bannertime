'use strict';

var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var path = require('path');

describe('bannertime generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        features: []
      })
      .on('end', done);
  });

  it('the generator can be required without throwing', function (done) {
    require('../generators/app');
    done();
  });

  it('creates expected files', function (done) {
    assert.file([
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
    ], done());
  });
});
