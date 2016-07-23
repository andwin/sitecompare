const async = require('async'),
      colors = require('colors'),
      configParser = require('./lib/config'),
      fetch = require('./lib/fetch'),
      clean = require('./lib/clean'),
      compare = require('./lib/compare');

if (!process.argv[2]) {
  console.log('Usage: sitecompare <config file>');
  process.exit(1);
}

colors.setTheme({
  ok: 'green',
  error: 'red',
});

let configFile = process.argv[2];
let config = configParser.parseFile(configFile);

async.eachSeries(config.urls, (url, callback) => {
  console.log();
  console.log('Comparing ' + url.actual + ' against ' + url.expected);

  async.parallel({
    expected: fetch(url.expected),
    actual: fetch(url.actual),
  }, (err, response) => {
    if (err) {
      console.log(err.toString());
      return;
    }

    if (response.actual.statusCode !== response.expected.statusCode) {
      console.log(`Expected response code ${response.expected.statusCode}. Actual response code  ${response.actual.statusCode}`);
    } else if (response.actual.statusCode !== 200) {
      console.log(`Response code ${response.actual.statusCode}`);
    }

    let actualContent = clean(response.actual.body, config.removeContentRegex.actual);
    let expectedContent = clean(response.expected.body, config.removeContentRegex.expected);

    let diffs = compare(actualContent, expectedContent);
    report(diffs);

    callback();
  });
}, () => {
  console.log();
  console.log('Done!');
});

let report = function(diffs) {
  let added = 0,
      removed = 0;

  for (let diff of diffs) {
    if (diff.added) {
      added += diff.count;
    } else if (diff.removed) {
      removed += diff.count;
    }
  }

  if (!added && !removed) {
    console.log(colors.ok('No diffs found'));
  } else {
    console.log(colors.error(`Diffs found: ${added} lines added and ${removed} lines removed`));
    console.log();

    let numberOfDiffsToDisplay = 5;
    for (let diff of diffs.slice(0, numberOfDiffsToDisplay)) {
      let color = diff.added ? 'green' : diff.removed ? 'red' : 'grey';
      console.log(diff.value[color]);
    }
  }
};
