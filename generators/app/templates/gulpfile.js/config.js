'use strict';

var src = './src';
var dest = './public';

module.exports = {
  'root': {
    'src': src,
    'dest': dest
  },

  'tasks': {
    'browserSync': {
      'server': {
        'baseDir': dest
      }
    },

    'fonts': {
      'src': src + '/**/fonts/**/*',
      'dest': dest
    },

    'html': {
      'src': src + '/**/*.html',
      'dest': dest,
      'htmlmin': {
        'collapseWhitespace': true
      }
    },

    'images': {
      'src': src + '/**/images/**/*',
      'dest': dest
    },

    'js': {
      'src': src + '/**/js/**/*.js',
      'dest': dest
    },

    'json': {
      'src': src + '/**/*.json',
      'dest': dest
    },

    'manifest': {
      'src': src + '/**/manifest.*',
      'dest': dest
    },

    'sass': {
      'src': src + '/**/*.{sass,scss}',
      'dest': dest,
      'autoprefixer': {
        'browsers': ['last 3 version']
      }
    },

    'server': {
      'root': process.cwd() + dest.substr(1),
      'port': process.env.PORT || 5000,
      'logLevel': process.env.NODE_ENV ? 'combined' : 'dev',
      'staticOptions': {
        'extensions': ['html'],
        'maxAge': '31556926'
      }
    },

    'svgSprite': {
      'src': src + '/**/sprites/*.svg',
      'dest': dest
    },

    'zip': {
      'src': src + '/**/*',
      'dest': './zip'
    }
  }
}
