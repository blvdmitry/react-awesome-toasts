const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [{
        // iso-morphic-style-loader is used here to prevent errors in SSR
        // since all toasts are shown only on client and you don't need styles to be rendered before
        loader: 'iso-morphic-style-loader',
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      }],
    }],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
};
