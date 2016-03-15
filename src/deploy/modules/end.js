/**
 * End sub-generator.
 */

import chalk from 'chalk';

export default function () {
  this.log(chalk.green(`Run ${chalk.cyan('gulp deploy')} to run the deploy task`));
}
