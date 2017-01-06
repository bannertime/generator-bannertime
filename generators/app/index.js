const Generator = require('yeoman-generator');
const intro = require('./modules/intro');
const checkVersion = require('./modules/checkVersion');
const checkConfig = require('./modules/checkConfig');
const prompts = require('./modules/prompts');
const files = require('./modules/files');
const install = require('./modules/install');
const end = require('./modules/end');

class Bannertime extends Generator {
  constructor(...args) {
    super(...args);

    this.argument('name', {
      required: false,
      type: String
    });

    this.option('skip-install', {
      defaults: false,
      desc: 'Do not install dependencies',
      type: Boolean
    });
  }
}

Bannertime.prototype.intro = intro;
Bannertime.prototype.checkVersion = checkVersion;
Bannertime.prototype.checkConfig = checkConfig;
Bannertime.prototype.prompts = prompts;
Bannertime.prototype.files = files;
Bannertime.prototype.install = install;
Bannertime.prototype.end = end;

module.exports = Bannertime;
