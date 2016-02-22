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
      name: 'deployUsername',
      message: 'Set the user name you would like to deploy using:',
      default: 'username'
    }, {
      type: 'input',
      name: 'deployDomain',
      message: 'Set the domain name you would like to deploy to:',
      default: 'example.domain.com'
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  };

};
