const chai = require('chai'),
      expect = chai.expect,
      util = require('../lib/util');

describe('util', function() {
  describe('diffNotaion', function() {
    it('Added line', function() {
      var diffs = [
        {
          value: 'Added text\nline2',
          added: true,
        },
      ];

      var result = util.addDiffNotations(diffs);

      var expected = [
        {
          value: '> Added text\n> line2',
          added: true,
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Removed line', function() {
      var diffs = [
        {
          value: 'Removed text\nline2',
          removed: true,
        },
      ];

      var result = util.addDiffNotations(diffs);

      var expected = [
        {
          value: '< Removed text\n< line2',
          removed: true,
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Unchanged', function() {
      var diffs = [
        {
          value: 'Unchanged text\nline2',
        },
      ];

      var result = util.addDiffNotations(diffs);

      var expected = [
        {
          value: '= Unchanged text\n= line2',
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Multiple diffs', function() {
      var diffs = [
        {
          value: 'Added text\nline2',
          added: true,
        },
        {
          value: 'Unchanged text\nline2',
        },
        {
          value: 'Removed text\nline2',
          removed: true,
        },
      ];

      var result = util.addDiffNotations(diffs);

      var expected = [
        {
          value: '> Added text\n> line2',
          added: true,
        },
        {
          value: '= Unchanged text\n= line2',
        },
        {
          value: '< Removed text\n< line2',
          removed: true,
        },
      ];

      expect(result).to.eql(expected);
    });
  });
});
