const rp = require('request-promise');

function* fetch(urls) {
  for(let url of urls) {
    yield {
      expected: {
        content: rp(url.expected),
        url: url.expected,
      },
      actual: {
        content: rp(url.actual),
        url: url.actual,
      },
    };
  }
}

module.exports = fetch;
