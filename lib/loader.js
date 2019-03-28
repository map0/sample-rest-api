/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const path = require('path');
const glob = require('glob');

/**
 * loads all files from within a namespace
 * they should get exposed via app.(models|controllers)
 */
module.exports = (app, namespace) => {
  const obj = {};
  const cwd = path.join(__dirname, '..');
  // glob.sync Perform a synchronous glob search.
  glob.sync(`${namespace}/*.js`, { cwd }).forEach((f) => {
    obj[path.basename(f, '.js')] = require(f)(app);
  });
  return obj;
};
