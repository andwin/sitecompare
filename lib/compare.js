const colors = require('colors'),
      jsdiff = require('diff'),
      u = require('./util');

colors.setTheme({
  ok: 'green',
  error: 'red',
});

let compare = function(actual, expected) {
  let options = {
    ignoreWhitespace: true,
  };
  let diffs = jsdiff.diffLines(expected, actual, options);

  diffs = u.removeWhitespaceDiffs(diffs);
  diffs = u.addDiffNotations(diffs);
  diffs = u.shortenNonDiffs(diffs);

  for (let diff of diffs) {
    let color = diff.added ? 'green' : diff.removed ? 'red' : 'grey';
    console.log(diff.value[color]);
  };
};

module.exports = compare;
