let addDiffNotations = function(diffs) {
  return diffs.map(diff => {
    let notation = diff.added ? '> ' : diff.removed ? '< ' : '= ';
    let lines = diff.value.split('\n');

    lines = lines.map(line => {
      return notation + line;
    });

    if (lines[lines.length - 1] == notation) {
      lines[lines.length - 1] = '';
    }

    diff.value = lines.join('\n');

    return diff;
  });
};

let shortenNonDiffs = function(diffs) {
  return diffs.map(diff => {
    if (diff.removed || diff.added) {
      return diff;
    }

    let lines = diff.value.split('\n');
    if (lines.length > 13) {
      let shortened = lines.slice(0, 5);
      shortened.push('');
      shortened.push('...');
      shortened.push('');
      shortened = shortened.concat(lines.slice(-5));
      diff.value = shortened.join('\n');
    }

    return diff;
  });
};

let removeWhitespaceDiffs = function(diffs) {
  diffs = diffs.filter(diff => {
    if (!diff.removed && !diff.added) {
      return true;
    }

    let lines = diff.value.split('\n');
    for (let line of lines) {
      if (line.trim() !== '') {
        return true;
      }
    }

    return false;
  });

  return combineDiffsOfSameType(diffs);
};

let combineDiffsOfSameType = function(diffs) {
  let combinedDiffs = [];

  for (let diff of diffs) {
    let lastDiff = combinedDiffs[combinedDiffs.length - 1];

    if (lastDiff && lastDiff.removed === diff.removed && lastDiff.added === diff.added ) {
      combinedDiffs[combinedDiffs.length - 1].value += diff.value;
    } else {
      combinedDiffs.push(diff);
    }
  }

  return combinedDiffs;
};

module.exports = {
  addDiffNotations: addDiffNotations,
  shortenNonDiffs: shortenNonDiffs,
  removeWhitespaceDiffs: removeWhitespaceDiffs,
};
