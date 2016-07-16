const request = require('request');

let fetch = function(url) {
  return function(callback) {
    request(url, (err, response) => {
      callback(err, response);
    });
  };
};

module.exports = fetch;
