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

  describe('shortenNonDiffs', function() {
    it('Displays first and last five lines of text that is the same in both versions', function() {
      let diffs = [
        {
          value: 'Removed text\nline2',
          removed: true,
        },
        {
          value: 'line1\nline2\nline3\nline4\nline5\nline6\nline7\nline8\nline9\nline10\nline11\nline12\nline13\nline14\nline15',
        },
        {
          value: 'Removed text\nline2',
          added: true,
        },
      ];

      let result = util.shortenNonDiffs(diffs);

      let expected = [
        {
          value: 'Removed text\nline2',
          removed: true,
        },
        {
          value: 'line1\nline2\nline3\nline4\nline5\n\n...\n\nline11\nline12\nline13\nline14\nline15',
        },
        {
          value: 'Removed text\nline2',
          added: true,
        },
      ];

      expect(result).to.eql(expected);
    });
  });
});
