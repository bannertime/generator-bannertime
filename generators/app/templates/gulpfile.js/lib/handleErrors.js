'use strict';

var notify = require('gulp-notify');

module.exports = function(errorObject, callback) {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);
  if (typeof this.emit === 'function') this.emit('end');
};
