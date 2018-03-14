const { expect } = require('chai');
const sudoku = require('../lib/sudoku');

describe('sudoko', () => {

  describe('helpers', () => {

    it('should shuffle an array', () => {
      const a = [1,2,3,4,5];
      const b = sudoku.shuffle(a.slice());
      expect(a).to.not.equal(b);
    });

  });

  describe('#solve', () => {

    it ('should have no empty spaces after solving', () => {
      let board = sudoku.generate();
      board = sudoku.solve(board);
      expect(board.indexOf(0)).to.equal(-1);
    });

    it('should find the correct solution', () => {

    });

  });

});
