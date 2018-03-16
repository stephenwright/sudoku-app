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
      let board = sudoku.generate();
      board = sudoku.solve(board);
      expect(sudoku.validate(board)).to.equal(true);
    });

  });

  describe('#getEmptyBoard', () => {

    it ('should return a board with all cells set to 0', () => {
      let board = sudoku.getEmptyBoard();
      expect(board.length).to.equal(81);
      let zeros = 0;
      for (let i = 0; i < board.length; ++i){
        if (board[i] == 0) ++zeros;
      }
      expect(zeros).to.equal(81);
    });

  });

});
