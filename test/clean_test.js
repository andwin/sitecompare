const chai = require('chai'),
      expect = chai.expect,
      cleaner = require('../lib/clean');

describe('clean', () => {
  it('parses config file', () => {
    let content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porttitor egestas faucibus.';
    let patterns = [
      'ipsum',
      '\\b\\w{4}\\b',
    ];

    let result = cleaner(content, patterns);

    let expected = 'Lorem  dolor sit , consectetur adipiscing . Suspendisse porttitor egestas faucibus.';
    expect(result).to.eql(expected);
  });
});
