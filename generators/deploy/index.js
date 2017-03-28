'use strict';
const Generator = require('yeoman-generator');
const intro = require('./modules/intro');
const checkVersion = require('../app/modules/checkVersion');
const prompts = require('./modules/prompts');
const files = require('./modules/files');

class Bannertime extends Generator {}

Bannertime.prototype.intro = intro;
Bannertime.prototype.checkVersion = checkVersion;
Bannertime.prototype.prompts = prompts;
Bannertime.prototype.files = files;

module.exports = Bannertime;
