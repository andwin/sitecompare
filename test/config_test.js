const chai = require('chai'),
      expect = chai.expect,
      Config = require('../lib/config');

describe('Config', function() {
  describe('parse', function() {
    it('parses config', function() {
      let configYaml = `
        BaseUrlExpected: http://www.example.com
        BaseUrlActual: http://staging.example.com
        Paths:
          - /
          - /about
          - /search?q=hello
      `;

      let result = Config.parse(configYaml);

      let expected = [{
        expected: 'http://www.example.com/',
        actual: 'http://staging.example.com/',
      }, {
        expected: 'http://www.example.com/about',
        actual: 'http://staging.example.com/about',
      }, {
        expected: 'http://www.example.com/search?q=hello',
        actual: 'http://staging.example.com/search?q=hello',
      }]

      expect(result).to.eql(expected);
    });
  });
});
