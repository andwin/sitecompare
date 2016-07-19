const colors = require('colors'),
      jsdiff = require('diff'),
      u = require('./util');

let compare = function(actual, expected) {
  let options = {
    ignoreWhitespace: true,
  };
  let diffs = jsdiff.diffLines(expected, actual, options);

  diffs = u.removeWhitespaceDiffs(diffs);
  diffs = u.addDiffNotations(diffs);
  diffs = u.shortenNonDiffs(diffs);

  return diffs;
};

module.exports = compare;
