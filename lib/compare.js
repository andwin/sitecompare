const async = require('async'),
      request = require('request'),
      colors = require('colors'),
      jsdiff = require('diff');

colors.setTheme({
  ok: 'green',
  error: 'red',
});

const compareUrls = function(urls) {
  async.eachSeries(urls, function(url, callback) {
    compareUrl(url, callback);
  }, function() {
    console.log('done');
  });
};

const compareUrl = function(url, done) {
  console.log('Comparing ' + url.expected + ' vs ' + url.actual);
  async.parallel([
    function(callback) {
      fetchContent(url.expected, callback);
    },
    function(callback) {
      fetchContent(url.actual, callback);
    },
  ],
  function(err, results) {
    if (results[0] == results[1]) {
      console.log(colors.ok('Same'));
    } else {
      console.log(colors.error('Different'));

      let diff = jsdiff.diffLines(results[0], results[1]);

      diff.forEach(function(part){
        let color = part.added ? 'green' : part.removed ? 'red' : 'grey';
        console.log(part.value[color]);
      });

    }
    console.log('');

    done();
  });
};

const fetchContent = function(url, callback) {
  request(url, function (err, response, body) {
    if (err) {
      console.log(colors.error('Error getting content from ' + url.expected));
    }

    callback(err, body);
  });
};

module.exports = {
  compareUrls: compareUrls,
};
