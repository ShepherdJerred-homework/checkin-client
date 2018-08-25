const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    overlay: true,
    watchOptions: {
      ignored: [ 'node_modules', '**/*.spec.ts' ],
    },
  }
};
