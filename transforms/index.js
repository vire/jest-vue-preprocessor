const transformTs = require('./transformTs');

module.exports = {
  ts: transformTs,
  typescript: transformTs,
  babel: require('./transformBabel'),
};
