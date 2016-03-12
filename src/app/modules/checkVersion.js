'use strict';

/**
 * Check for newer versions of the generator.
 */

import chalk from 'chalk';
import info from 'package-info';
import pkg from '../../../package.json';
import repeating from 'repeating';
import stringLength from 'string-length';

export default function() {
  let cb = this.async();

  info(pkg.name, (err, npm) => {
    let line1 = ' Update available: ' + chalk.red.bold(npm.version) + chalk.dim(' (current: ' + pkg.version + ')') + ' ';
    let line2 = ' Run ' + chalk.red('npm install -g ' + pkg.name) + ' to update. ';
    let contentWidth = Math.max(stringLength(line1), stringLength(line2));
    let line1rest = contentWidth - stringLength(line1);
    let line2rest = contentWidth - stringLength(line2);
    let top = chalk.red('┌' + repeating('─', contentWidth) + '┐');
    let bottom = chalk.red('└' + repeating('─', contentWidth) + '┘');
    let side = chalk.red('│');
    let message = top + '\n' +
    side + line1 + repeating(' ', line1rest) + side + '\n' +
    side + line2 + repeating(' ', line2rest) + side + '\n' +
    bottom + '\n';

    if (npm.version > pkg.version) {
      this.log(message)
    }

    cb();
  });
}
