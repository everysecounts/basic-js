const { NotImplementedError } = require('../lib');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = (() => {
  let links = [];
  return {
    getLength() {
      return links.length;
    },

    addLink(value) {
      links.push(arguments.length === 0 ? '' : String(value));
      return this;
    },

    removeLink(position) {
      if (
        typeof position !== 'number' ||
        !Number.isInteger(position) ||
        position < 1 ||
        position > links.length
      ) {
        links = [];
        throw new Error("You can't remove incorrect link!");
      }
      links.splice(position - 1, 1);
      return this;
    },

    reverseChain() {
      links.reverse();
      return this;
    },

    finishChain() {
      const result = links.map((value) => `( ${value} )`).join('~~');
      links = [];
      return result;
    },
  };
})();

module.exports = {
  chainMaker,
};
