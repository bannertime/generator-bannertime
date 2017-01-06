/**
 * The questions that the sub-generator will ask.
 */

const _ = require('lodash');

module.exports = function prompts() {
  if (this.skipConfig) return true;

  return this.prompt([{
    type: 'input',
    name: 'deployUsername',
    message: 'Set the user name you would like to deploy using:',
    default: 'username'
  }, {
    type: 'input',
    name: 'deployDomain',
    message: 'Set the domain name you would like to deploy to:',
    default: 'example.domain.com'
  }]).then((props) => {
    this.props = _.merge(this.props, props);
  });
};
