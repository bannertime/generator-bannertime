'use strict';

import {Base} from 'yeoman-generator';
import welcome from './modules/welcome';
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
Generator.prototype.end = end;
