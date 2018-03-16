const { shuffle, compare, range, unique } = require('./helpers');

const DIGITS = [1,2,3,4,5,6,7,8,9];

// -----

function getRow(board, cell) {
  const r = Math.floor(cell/9);
  const row = range(board, r*9, 9);
  return row;
}

function getCol(board, cell) {
  const c = cell % 9;
  const col = [];
  for (let i = 0; i < 9; ++i) {
    col[i] = board[c+i*9];
  }
  return col;
}

function getBox(board, cell) {
  const y = Math.floor(cell / 9 / 3) * 27;
  const x = Math.floor(cell % 9 / 3) * 3;

  let box = [].concat(
    range(board, x+y, 3),
    range(board, x+y+9, 3),
    range(board, x+y+18, 3)
  );
  return box;
}

function getPossibleValues(board, cell) {
  // start with all possible digits
  const possible = DIGITS.slice();
  // get values that are already present in the area of concern
  let present = [];
  const row = getRow(board, cell);
  const col = getCol(board, cell);
  const box = getBox(board, cell);
  // remove digits that are already present
  present = unique([].concat(row, col, box));
  //console.info('getPossibleValues:', { cell, present });
  for (let i = 0; i < present.length; ++i) {
    var x = possible.indexOf(present[i]);
    if (x === -1) continue;
    possible.splice(x,1);
  }
  // return what's left
  return possible;
}

function draw(board) {  // eslint-disable-line no-unused-vars
  let s = '|---+---+---|---+---+---|---+---+---|\n';
  for (let i = 0; i < 9; ++i) {
    s += '| ' + range(board, i*9, 9).join(' | ') + ' |\n';
    s += '|---+---+---|---+---+---|---+---+---|\n';
  }
  return s;
}

function getEmptyBoard() {
  const board = [];
  for (let i = 0; i < 81; ++i) {
    board[i] = 0;
  }
  return board;
}
// -----

function generate() {
  const board = getEmptyBoard();
  // seed the top corner
  let mix = shuffle(DIGITS.slice());
  for (let x = 0; x < 3; ++x) {
    for (let y = 0; y < 27; y += 9) {
      board[y+x] = mix.shift();
    }
  }
  return board;
}

function validate(board) {
  let valid = true;

  // check rows
  for (let row = 0; row < 9; ++row) {
    if (!compare(DIGITS, range(board, row*9, 9))) {
      return false;
    }
  }

  // check columns
  for (let c = 0; c < 9; ++c) {
    let col = [];
    for (let i = 0; i < 9; ++i) {
      col[i] = board[c+i*9];
    }
    if (!compare(DIGITS, col)) {
      return false;
    }
  }

  // check boxes
  for (let x = 0; x <= 6; x+=3) {
    for (let y = 0; y <= 54; y += 27) {
      let box = [].concat(
        range(board, x+y, 3),
        range(board, x+y+9, 3),
        range(board, x+y+18, 3)
      );
      if (!compare(DIGITS, box)) {
        return false;
      }
    }
  }

  return valid;
}

function solve(board) {
  let b = null;
  let x = 0;
  start: for (; x < 5000; x++) {
    // copy the original state of the board
    b = board.slice();
    for (let i = 0; i < 81; ++i) {
      if (b[i] !== 0) continue;
      let possible = getPossibleValues(b, i);
      if (possible.length === 0) {
        continue start;
      }
      b[i] = possible[Math.floor(Math.random()*possible.length)];
    }
    if (validate(b)) break;
  }
  //console.info(draw(b), { attempts: x });
  return b;
}

// -----

module.exports = {
  generate,
  validate,
  solve,
  getEmptyBoard,
};
