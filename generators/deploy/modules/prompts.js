'use strict';

var fs = require('fs');
var path = require('path');
var s = require('underscore.string');

module.exports = function(Bannertime) {

  /**
   * The questions that the sub-generator will ask.
   */
  Bannertime.prototype.prompts = function() {
    var done = this.async();
    var prompts = [{
      type: 'input',
      name: 'deployHomepage',
      message: 'Set the homepage of the deploy:',
      default: 'http://www.example.com/'
    }, {
      type: 'input',
      name: 'deployDomain',
      message: 'Set the domain name you would like to deploy to:',
      default: 'example.domain.com'
    }, {
      type: 'input',
      name: 'deployUsername',
      message: 'Set the user name you would like to deploy using:',
      default: 'username'
    }, {
      type: 'input',
      name: 'deployOrigin',
      message: 'Set the origin you would like to deploy using:',
      default: 'live'
    }, {
      type: 'input',
      name: 'deployBranch',
      message: 'Set the branch you would like to deploy to:',
      default: 'deploy'
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  };

};
