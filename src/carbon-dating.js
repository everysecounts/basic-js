const { NotImplementedError } = require('../lib');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  try {
    const activity = Number(sampleActivity);

    const isValid = typeof sampleActivity === 'string'
      && sampleActivity.trim() !== ''
      && Number.isFinite(activity)
      && activity > 0
      && activity <= MODERN_ACTIVITY;

    if (!isValid) {
      return false;
    }

    return Math.ceil(
      HALF_LIFE_PERIOD * Math.log2(MODERN_ACTIVITY / activity)
    );
  } catch (error) {
    return false;
  }
}

module.exports = {
  dateSample
};
