const expect = require('chai').expect;
const sudoku = require('../lib/sudoku');

describe('sudoko', () => {

  it('should shuffle an array', () => {
    const a = [1,2,3,4,5];
    const b = sudoku.shuffle(a.slice());
    expect(a).to.not.equal(b);
  });

  it ('should solve a board', () => {
    let board = sudoku.generate();
    board = sudoku.solve(board);
    expect(board.indexOf(0)).to.equal(-1);
  });

});
