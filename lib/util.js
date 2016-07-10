let addDiffNotations = function(diffs) {
  return diffs.map(diff => {
    let notation = diff.added ? '> ' : diff.removed ? '< ' : '= ';
    let lines = diff.value.split('\n');

    lines = lines.map(line => {
      return notation + line;
    });

    diff.value = lines.join('\n');

    return diff;
  });
};

module.exports = {
  addDiffNotations: addDiffNotations,
};
