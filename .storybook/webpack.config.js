module.exports = {
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
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      ],
    }],
  },
};