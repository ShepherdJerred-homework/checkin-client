const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(require('./config.base'), {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, '../public'),
    historyApiFallback: true,
    hot: true,
    overlay: true,
    watchOptions: {
      ignored: [ 'node_modules', '**/*.spec.ts' ],
    },
    disableHostCheck: true,
    host: '0.0.0.0',
  }
});

console.log(module.exports);
