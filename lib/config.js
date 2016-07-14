const fs = require('fs'),
      url = require('url'),
      yaml = require('js-yaml');

let parseFile = function(path) {
  let yamlConfig = fs.readFileSync(path, 'utf8');
  return this.parse(yamlConfig);
};

let parse = function(yamlConfig) {
  let doc = yaml.safeLoad(yamlConfig);

  let urls = doc.Paths.map(path => {
    return {
      expected: url.resolve(doc.Expected.BaseUrl, path),
      actual: url.resolve(doc.Actual.BaseUrl, path),
    };
  });

  return {
    urls: urls,
    removeContent: {
      expected: doc.Expected.RemoveContent,
      actual: doc.Actual.RemoveContent,
    },
  };
};

module.exports = {
  parseFile: parseFile,
  parse: parse,
};
