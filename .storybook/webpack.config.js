const config = require('../webpack.config');

module.exports = Object.assign({}, config, { externals: [] });
