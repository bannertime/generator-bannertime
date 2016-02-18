'use strict';

import {Base} from 'yeoman-generator';
import welcome from './modules/welcome';
import checkConfig from './modules/checkConfig';
import prompts from './modules/prompts';
import files from './modules/files';
import install from './modules/install';
import end from './modules/end';

export default class Generator extends Base {
  constructor(...args) {
    super(...args);

    this.argument('name', { type: String, required: false });

    this.option('skip-install', {
      desc: 'Do not install dependencies',
      type: Boolean,
      defaults: false
    });
  }
}

Generator.prototype.welcome = welcome;
Generator.prototype.checkConfig = checkConfig;
Generator.prototype.prompts = prompts;
Generator.prototype.files = files;
Generator.prototype.install = install;
Generator.prototype.end = end;
