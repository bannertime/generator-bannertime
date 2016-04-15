export const src = './src';
export const dest = './public';
export const tasks = {
  browserSync: {
    server: {
      baseDir: `${dest}`
    }
  },

  fonts: {
    src: `${src}/**/fonts/**/*`
  },

  html: {
    src: `${src}/**/*.html`,
    htmlmin: {
      collapseWhitespace: true
    }
  },

  images: {
    src: `${src}/**/images/**/*`
  },

  js: {
    src: `${src}/**/js/**/*.js`,
    modules: './modules/**/*'
  },

  json: {
    src: `${src}/**/*.json`
  },

  manifest: {
    src: `${src}/**/manifest.*`
  },

  sass: {
    src: `${src}/**/*.{sass,scss}`,
    autoprefixer: {
      browsers: 'last 3 version'
    }
  },

  server: {
    root: process.cwd() + dest.substr(1),
    port: process.env.PORT || 5000,
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
      extensions: ['html'],
      maxAge: '31556926'
    }
  },

  svgSprite: {
    src: `${src}/**/sprites/*.svg`
  },

  zip: {
    src: `${src}/**/*`,
    dest: './zip'
  }
};
