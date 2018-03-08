'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('The Bannertime', () => {

  describe('App generator', () => {

    before((done) => {
      this.answers = {
        bannerName: 'test',
        bannerDesc: 'Its Duncan Bannertime!',
        bannerType: 'DoubleClick Studio',
        bannerRepo: 'https://github.com/bannertime/generator-bannertime',
        includeTimeline: false,
        includeOfflineScripts: false
      };

      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withGenerators([[helpers.createDummyGenerator(), 'bannertime:app']])
        .withPrompts(this.answers)
        .on('end', done);
    });

    it('can be required without throwing', () => {
      require('../generators/app');
    });

    it('creates expected files', (done) => {
      assert.file([
        'src/test-300x250/index.html',
        'src/test-300x250/images/logo.png',
        'src/test-300x250/js/banner.js',
        'src/test-300x250/js/banner.loader.js',
        'src/test-300x250/js/banner.animation.js',
        'src/test-300x250/styles/style.scss',
        'src/test-300x250/styles/base/_banner.scss',
        'src/test-300x250/styles/base/_preloader.scss',
        'src/base/images/loading.gif',
        'src/base/images/logo.png',
        'src/base/js/main.js',
        'src/base/styles/style.scss',
        'src/base/styles/partials/_base.scss',
        'src/base/styles/partials/_iframe.scss',
        'src/base/styles/partials/_scrubber.scss',
        'src/base/styles/partials/_sidebar.scss',
        'src/index.html',
        '.editorconfig',
        '.gitignore',
        '.jshintrc',
        'package.json',
        'package-lock.json',
        'README.md',
      ]);
      done();
    });

    it('creates expected package.json from template', () => {
      assert.file('package.json');
      assert.jsonFileContent('package.json', {
        name: this.answers.bannerName,
        description: this.answers.bannerDesc,
        repository: {
          url: this.answers.bannerRepo
        }
      });
    });

    it('creates expected README.md from template', () => {
      assert.file('README.md');
      assert.fileContent('README.md', '# test');
      assert.fileContent('README.md', 'Its Duncan Bannertime!');
    });
  });
});
