'use strict';

var yeoman = require('yeoman-generator');
var Bannertime = yeoman.generators.Base.extend();

require('./modules/intro')(Bannertime);
// require('./modules/prompts')(Bannertime);
// require('./modules/files')(Bannertime);
// require('./modules/install')(Bannertime);
// require('./modules/end')(Bannertime);

module.exports = Bannertime;
