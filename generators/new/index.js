const Generator = require('yeoman-generator');
const intro = require('./modules/intro');
const checkVersion = require('../app/modules/checkVersion');
const prompts = require('./modules/prompts');
const files = require('./modules/files');
const install = require('./modules/install');

class Bannertime extends Generator {}

Bannertime.prototype.intro = intro;
Bannertime.prototype.checkVersion = checkVersion;
Bannertime.prototype.prompts = prompts;
Bannertime.prototype.files = files;
Bannertime.prototype.install = install;

module.exports = Bannertime;
