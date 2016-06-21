const fs = require('fs'),
      url = require('url'),
      yaml = require('js-yaml');

class Config {
  static parseFile(path) {
    let yamlConfig = fs.readFileSync('config.yml', 'utf8');
    return this.parse(yamlConfig);
  }

  static parse(yamlConfig) {
    let doc = yaml.safeLoad(yamlConfig);

    let urls = doc.Paths.map(function(path) {
      return {
        expected: url.resolve(doc.BaseUrlExpected, path),
        actual: url.resolve(doc.BaseUrlActual, path),
      }
    });

    return urls;
  }
}

module.exports = Config;
