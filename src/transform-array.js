const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const commands = [
    '--discard-next',
    '--discard-prev',
    '--double-next',
    '--double-prev',
  ];

  const elementsCount = arr.map((element) =>
    commands.includes(element) ? 0 : 1,
  );

  arr.forEach((element, index) => {
    switch (element) {
      case '--discard-next':
        if (index + 1 < arr.length) {
          elementsCount[index + 1] = 0;
        }
        break;

      case '--double-next':
        if (index + 1 < arr.length) {
          elementsCount[index + 1] += 1;
        }
        break;

      case '--discard-prev':
        if (index > 0 && elementsCount[index - 1] > 0) {
          elementsCount[index - 1] -= 1;
        }
        break;

      case '--double-prev':
        if (index > 0 && elementsCount[index - 1] > 0) {
          elementsCount[index - 1] += 1;
        }
        break;

      default:
        break;
    }
  });

  return arr.flatMap((element, index) =>
    Array(elementsCount[index]).fill(element),
  );
}

module.exports = {
  transform
};
