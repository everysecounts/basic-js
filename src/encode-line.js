const { NotImplementedError } = require('../lib');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */

function encodeLine(str) {
  const groups = str.match(/(.)\1*/g) || [];
  let result = '';
  groups.forEach((group) => {
    result += group.length > 1 ? group.length : '';
    result += group[0];
  });
  return result;
}

module.exports = {
  encodeLine
};
