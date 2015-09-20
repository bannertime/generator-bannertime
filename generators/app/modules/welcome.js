'use strict';

module.exports = function(Bannertime) {

  /**
   * The generator welcome message.
   */
  Bannertime.prototype.welcome = function welcome() {
    var welcome =
    // '\n     ...'.red +
    // '\n   ,\'   \'.'.red +
    // '\n  ;       ;'.red +
    // '\n  |       |'.red +
    // '\n  |       |'.red +
    // '\n  | _, ,_ |'.red +
    // '\n  \'´ | | `\''.red +
    // '\n     | |'.red + '    _    _'.yellow +
    // '\n     | |'.red + '  .|_|_,\' |'.yellow + '         ,--.'.blue +
    // '\n     | |'.red + '  |       |'.yellow + '        :   |'.blue +
    // '\n     | |'.red + '  `|`\'`-._|'.yellow + '        :   |'.blue +
    // '\n     | |'.red + '   | |'.yellow + '             :   |'.blue +
    // '\n     | |'.red + '   | |'.yellow + '             :   |'.blue +
    // '\n     | |'.red + '   | |'.yellow + '  .-------.'.green + '  :   |'.blue +
    // '\n     | |'.red + '   | |'.yellow + ' ,|   _O  |'.green + '  :   |'.blue +
    // '\n     | |'.red + '   | |'.yellow + ' ||_,     |'.green + '  :   |'.blue +
    // '\n     | |'.red + '   | |'.yellow + ' `|       |'.green + '  ;...:'.blue +
    // '\n     | |'.red + '   | |'.yellow + '  |       |'.green + ' /.--. '.blue +
    // '\n     | |'.red + '  |` |'.yellow + '  |       |'.green + ' |\'--\' |'.blue +
    // '\n     \'-\''.red + '  `--\''.yellow + '  \'-------\''.green + ' \'-----\' \n'.blue +
    '\n Its Duncan'.yellow +
    '\n  _____                     _   _'.green +
    '\n | __  |___ ___ ___ ___ ___| |_|_|_____ ___'.green +
    '\n | __ -| . |   |   | -_|  _|  _| |     | -_|'.green +
    '\n |_____|__,|_|_|_|_|___|_| |_| |_|_|_|_|___|\n'.green;
    console.log(welcome);
  };

};
