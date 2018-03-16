const { expect } = require('chai');
const sudoku = require('../src/lib/sudoku');

describe('sudoko', () => {

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
