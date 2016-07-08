const colors = require('colors'),
      jsdiff = require('diff');

colors.setTheme({
  ok: 'green',
  error: 'red',
});

let compare = function(actual, expected) {
  let diff = jsdiff.diffLines(actual, expected);

  diff.forEach(function(part){
    let color = part.added ? 'green' : part.removed ? 'red' : 'grey';
    console.log(part.value[color]);
  });
};


module.exports = compare;
