const { expect } = require('chai');
const { shuffle } = require('../lib/helpers');

describe('helpers', () => {

  it('should shuffle an array', () => {
    const a = [1,2,3,4,5];
    const b = shuffle(a.slice());
    expect(a).to.not.equal(b);
    expect(a.length).to.equal(b.length);
  });

});
