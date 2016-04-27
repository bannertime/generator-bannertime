/**
 * Check which version of the generator the files were generated with.
 */

import chalk from 'chalk';
import fs from 'fs';
import info from 'package-info';
import pkg from '../../../package.json';
import repeating from 'repeating';
import stringLength from 'string-length';

export default function () {
  const cb = this.async();

  info(pkg.name, (err, npm) => {
    const newVer = chalk.red.bold(`${npm.version}`);
    const currentVer = chalk.dim(`current: ${pkg.version}`);
    const install = chalk.red(`npm install -g ${pkg.name}@2`);
    const line1 = ` This project is using an older version of bannertime. `;
    const line2 = ` Run ${install} to downgrade to bannertime v2. `;
    const contentWidth = Math.max(stringLength(line1), stringLength(line2));
    const line1rest = contentWidth - stringLength(line1);
    const line2rest = contentWidth - stringLength(line2);
    const top = chalk.red(`┌${repeating('─', contentWidth)}┐`);
    const bottom = chalk.red(`└${repeating('─', contentWidth)}┘`);
    const side = chalk.red('│');
    const message = `${top}\n` +
                    `${side}${line1}${repeating(' ', line1rest)}${side}\n` +
                    `${side}${line2}${repeating(' ', line2rest)}${side}\n` +
                    `${bottom}\n`;

    fs.access('src/modules', fs.R_OK, (err) => {
      if (err) {
        this.log(message);
      } else {
        cb();
      }
    });
  });
}
