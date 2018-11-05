module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: 'ts-loader',
    exclude: /node_modules/
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};