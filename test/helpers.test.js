const { expect } = require('chai');
const { compare, shuffle, unique } = require('../src/lib/helpers');

describe('helpers', () => {

  describe('#compare', () => {

    it('should return true when two arrays have equivalent values', () => {
      const a = [1,2,3];
      const b = [3,2,1];
      expect(compare(a,b)).to.equal(true);
    });

    it('should return false when two array do not have equivalent values', () => {
      const a = [1,2,3];
      const b = [3,4,5];
      expect(compare(a,b)).to.equal(false);
    });

  });

  describe('#shuffle', () => {

    it('should shuffle an array', () => {
      const a = [1,2,3,4,5];
      const b = shuffle(a.slice());
      expect(a).to.not.equal(b);
      expect(a.length).to.equal(b.length);
    });

  });

  describe('#unique', () => {

    it('return true if all values in array are unique', () => {
      const a = [1,2,3];
      const b = unique(a);
      expect(compare(a,b)).to.equal(true);
    });

    it('return false if array contains duplicate values', () => {
      const a = [1,2,3,2];
      const b = unique(a);
      expect(compare(a,b)).to.equal(false);
      expect(compare([1,2,3],b)).to.equal(true);
    });

  });

});
