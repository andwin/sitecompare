const async = require('async'),
      configParser = require('./lib/config'),
      fetch = require('./lib/fetch'),
      clean = require('./lib/clean'),
      compare = require('./lib/compare');

if (!process.argv[2]) {
  console.log('Usage: sitecompare <config file>');
  process.exit(1);
}

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

    let actualContent = clean(response.actual.body, config.removeContent.actual);
    let expectedContent = clean(response.expected.body, config.removeContent.expected);

    let diffs = compare(actualContent, expectedContent);

    for (let diff of diffs) {
      let color = diff.added ? 'green' : diff.removed ? 'red' : 'grey';
      console.log(diff.value[color]);
    }

    callback();
  });
}, () => {
  console.log();
  console.log('Done!');
});
