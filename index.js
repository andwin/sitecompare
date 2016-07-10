const configParser = require('./lib/config'),
      fetch = require('./lib/fetch'),
      clean = require('./lib/clean'),
      compare = require('./lib/compare');

let configFile = process.argv[2];
let config = configParser.parseFile(configFile);

let fetcher = fetch(config.urls);

for (let urlContent of fetcher) {
  Promise.all([urlContent.actual.content, urlContent.expected.content]).then(values => {
    let [actualContent, expectedContent] = values;

    actualContent = clean(actualContent, config.removeContent.actual);
    expectedContent = clean(expectedContent, config.removeContent.expected);

    console.log();
    console.log('Comparing ' + urlContent.actual.url + ' against ' + urlContent.expected.url);
    compare(actualContent, expectedContent);
  }).catch(exception => {
    console.log(exception.message);
  });
}
