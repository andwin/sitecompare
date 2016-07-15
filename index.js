const async = require('async'),
      configParser = require('./lib/config'),
      fetch = require('./lib/fetch'),
      clean = require('./lib/clean'),
      compare = require('./lib/compare');

let configFile = process.argv[2];
let config = configParser.parseFile(configFile);

async.eachSeries(config.urls, (url, callback) => {
  console.log();
  console.log('Comparing ' + url.actual + ' against ' + url.expected);

  async.parallel({
    expected: fetch(url.expected),
    actual: fetch(url.actual),
  }, (err, content) => {
    let actualContent = clean(content.actual, config.removeContent.actual);
    let expectedContent = clean(content.expected, config.removeContent.expected);

    compare(actualContent, expectedContent);
    callback();
  });
}, () => {
  console.log();
  console.log('Done!');
});
