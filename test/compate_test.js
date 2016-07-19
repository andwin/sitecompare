const chai = require('chai'),
      expect = chai.expect,
      compare = require('../lib/compare');

describe('compare', () => {
  it('returns expected diffs', () => {
    let actual =
`Lorem ipsum dolor sit amet,
consectetur adipiscing elit.
Suspendisse porttitor egestas faucibus.`;

    let expected =
`Lorem ipsum dolor sit amet,
consectetur adipiscing elit!

Suspendisse porttitor egestas faucibus.`;

    let result = compare(actual, expected);

    let expectedResult = [
      {
        count: 1,
        value: '= Lorem ipsum dolor sit amet,\n= ',
      },
      {
        added: undefined,
        count: 2,
        removed: true,
        value: '< consectetur adipiscing elit!\n< \n< ',
      },
      {
        added: true,
        count: 1,
        removed: undefined,
        value: '> consectetur adipiscing elit.\n> ',
      },
      {
        count: 1,
        value: '= Suspendisse porttitor egestas faucibus.',
      },
    ];

    expect(result).to.eql(expectedResult);
  });
});
