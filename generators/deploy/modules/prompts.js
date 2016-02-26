'use strict';

/**
 * The questions that the sub-generator will ask.
 */

export default function() {
  if (this.skipConfig) return;
  let cb = this.async();

  this.prompt([{
      type: 'input',
      name: 'deployUsername',
      message: 'Set the user name you would like to deploy using:',
      default: 'username'
    }, {
      type: 'input',
      name: 'deployDomain',
      message: 'Set the domain name you would like to deploy to:',
      default: 'example.domain.com'
    }], (props) => {
    this.props = props;
    cb();
  });
}
