const fs = require('fs'),
      url = require('url'),
      async = require('async'),
      request = require('request'),
      yaml = require('js-yaml');

const compareUrls = function(urls) {
  async.eachSeries(urls, function(url, callback) {
    compareUrl(url, callback);
  }, function() {
    console.log('done')
  });
};

const compareUrl = function(url, done) {
  async.parallel([
    function(callback) {
      fetchContent(url.expected, callback);
    },
    function(callback) {
      fetchContent(url.actual, callback);
    }
  ],
  function(err, results) {
    console.log(results);
    done();
  });
};

const fetchContent = function(url, callback) {
  request(url, function (err, response, body) {
    if (err) {
      console.log('Error getting content from ' + url.expected);
    }

    callback(err, body);
  });
};

module.exports = {
  compareUrls: compareUrls,
};
