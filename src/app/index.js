/**
 * Load the modules.
 */

import { Base } from 'yeoman-generator';
import checkVersion from './modules/checkVersion';
import intro from './modules/intro';
import checkConfig from './modules/checkConfig';
import prompts from './modules/prompts';
import files from './modules/files';
import install from './modules/install';
import end from './modules/end';

export default class Generator extends Base {
  constructor(...args) {
    super(...args);

    this.argument('name', {
      type: String,
      required: false,
    });

    this.option('skip-install', {
      desc: 'Do not install dependencies',
      type: Boolean,
      defaults: false,
    });
  }
}

Generator.prototype.intro = intro;
Generator.prototype.checkVersion = checkVersion;
Generator.prototype.checkConfig = checkConfig;
Generator.prototype.prompts = prompts;
Generator.prototype.files = files;
Generator.prototype.install = install;
Generator.prototype.end = end;
