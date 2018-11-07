const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './demo.js'),
  devtool: 'source-map',
  output: {
    path: __dirname,
    filename: 'demo.dist.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }],
    }],
  },
};
