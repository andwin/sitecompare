const chai = require('chai'),
      expect = chai.expect,
      util = require('../lib/util');

describe('util', () => {
  describe('diffNotaion', () => {
    it('Added line', () => {
      let diffs = [
        {
          value: 'Added text\nline2',
          added: true,
        },
      ];

      let result = util.addDiffNotations(diffs);

      let expected = [
        {
          value: '> Added text\n> line2',
          added: true,
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Removed line', () => {
      let diffs = [
        {
          value: 'Removed text\nline2',
          removed: true,
        },
      ];

      let result = util.addDiffNotations(diffs);

      let expected = [
        {
          value: '< Removed text\n< line2',
          removed: true,
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Unchanged', () => {
      let diffs = [
        {
          value: 'Unchanged text\nline2',
        },
      ];

      let result = util.addDiffNotations(diffs);

      let expected = [
        {
          value: '= Unchanged text\n= line2',
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Multiple diffs', () => {
      let diffs = [
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

      let result = util.addDiffNotations(diffs);

      let expected = [
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

  describe('shortenNonDiffs', () => {
    it('Displays first and last five lines of text that is the same in both versions', () => {
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

  describe('removeWhitespaceDiffs', () => {
    it('Removes diffs with only whitespaces', () => {
      let diffs = [
        {
          value: 'Removed text',
          removed: true,
        },
        {
          value: 'Unchanged text\nline2',
        },
        {
          value: '\n\n',
          added: true,
        },
        {
          value: 'Removed text\nline2',
          added: true,
        },
      ];

      let result = util.removeWhitespaceDiffs(diffs);

      let expected = [
        {
          value: 'Removed text',
          removed: true,
        },
        {
          value: 'Unchanged text\nline2',
        },
        {
          value: 'Removed text\nline2',
          added: true,
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Combines remove-diffs if there are two in a row after whitespace diffs are removed', () => {
      let diffs = [
        {
          value: 'Text 1\n',
          removed: true,
        },
        {
          value: '\n\n',
          added: true,
        },
        {
          value: 'Text 2\n',
          removed: true,
        },
      ];

      let result = util.removeWhitespaceDiffs(diffs);

      let expected = [
        {
          value: 'Text 1\nText 2\n',
          removed: true,
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Combines added-diffs if there are two in a row after whitespace diffs are removed', () => {
      let diffs = [
        {
          value: 'Text 1\n',
          added: true,
        },
        {
          value: '\n\n',
          removed: true,
        },
        {
          value: 'Text 2\n',
          added: true,
        },
      ];

      let result = util.removeWhitespaceDiffs(diffs);

      let expected = [
        {
          value: 'Text 1\nText 2\n',
          added: true,
        },
      ];

      expect(result).to.eql(expected);
    });

    it('Combines unchanged-diffs if there are two in a row after whitespace diffs are removed', () => {
      let diffs = [
        {
          value: 'Text 1\n',
        },
        {
          value: '\n\n',
          removed: true,
        },
        {
          value: 'Text 2\n',
        },
      ];

      let result = util.removeWhitespaceDiffs(diffs);

      let expected = [
        {
          value: 'Text 1\nText 2\n',
        },
      ];

      expect(result).to.eql(expected);
    });
  });
});
