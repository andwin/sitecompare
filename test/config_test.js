const chai = require('chai'),
      expect = chai.expect,
      Config = require('../lib/config');

describe('Config', function() {
  describe('parse', function() {
    it('parses config file', function() {
      let data = 'config data';

      let result = Config.parse(data);

      expect(result).to.equal(data);
    });
  });
});
