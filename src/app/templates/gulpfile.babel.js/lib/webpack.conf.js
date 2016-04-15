const webpackConf = {
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [/node_modules/]
    }]
  },
  entry: {},
  output: {
    filename: '[name].js'
  }
};

export default webpackConf;
