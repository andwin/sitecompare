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
  let diff = jsdiff.diffLines(actual, expected, options);

  diff = u.addDiffNotations(diff);
  diff = u.shortenNonDiffs(diff);

  diff.forEach(function(part) {
    let color = part.added ? 'green' : part.removed ? 'red' : 'grey';
    console.log(part.value[color]);
  });
};

module.exports = compare;
