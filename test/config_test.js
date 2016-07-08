const chai = require('chai'),
      expect = chai.expect,
      config = require('../lib/config');

describe('config', function() {
  describe('parse', function() {
    it('parses config', function() {
      let configYaml = `
        Expected:
          BaseUrl: http://www.example.com
          RemoveContent:
            - <script src="/assets/vendor.js?(.*)">
            - https://img.example.com
        Actual:
          BaseUrl: http://staging.example.com
          RemoveContent:
            - <script src="/assets/vendor.js?(.*)">
            - https://img-staging.example.com
        Paths:
          - /
          - /about
          - /search?q=hello
      `;

      let result = config.parse(configYaml);

      let expected = {
        urls: [{
          expected: 'http://www.example.com/',
          actual: 'http://staging.example.com/',
        }, {
          expected: 'http://www.example.com/about',
          actual: 'http://staging.example.com/about',
        }, {
          expected: 'http://www.example.com/search?q=hello',
          actual: 'http://staging.example.com/search?q=hello',
        }],
        removeContent: {
          expected: [
            '<script src="/assets/vendor.js?(.*)">',
            'https://img.example.com',
          ],
          actual: [
            '<script src="/assets/vendor.js?(.*)">',
            'https://img-staging.example.com',
          ],
        },
      };

      expect(result).to.eql(expected);
    });

    it('parses config file', function() {
      let result = config.parseFile('test/config.yml');

      let expected = {
        urls: [{
          expected: 'http://www.example.com/',
          actual: 'http://staging.example.com/',
        }, {
          expected: 'http://www.example.com/about',
          actual: 'http://staging.example.com/about',
        }, {
          expected: 'http://www.example.com/search?q=hello',
          actual: 'http://staging.example.com/search?q=hello',
        }],
        removeContent: {
          expected: [
            '<script src="/assets/vendor.js?(.*)">',
            'https://img.example.com',
          ],
          actual: [
            '<script src="/assets/vendor.js?(.*)">',
            'https://img-staging.example.com',
          ],
        },
      };

      expect(result).to.eql(expected);
    });
  });
});
