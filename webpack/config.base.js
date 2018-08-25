const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
};
