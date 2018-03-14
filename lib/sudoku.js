
const digits = [1,2,3,4,5,6,7,8,9];

function comp(a1, a2) {
  const a = a1.slice().sort();
  const b = a2.slice().sort();

  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function generate() {
  board = [];

  for (let i = 0; i < 9*9; ++i) {
    board[i] = '';
  }

  return board;
}

function validate(board) {
  let valid = true;

  // check rows
  for (let row = 0; row < 9; ++row) {
    valid = valid && comp(digits, board.slice(row,9));
  }

  // check columns
  for (let x = 0; x < 9; ++x) {
    const offset = x * 9;
    const col = [
      board[x],
      board[x+1*9],
      board[x+2*9],
      board[x+3*9],
      board[x+4*9],
      board[x+5*9],
      board[x+6*9],
      board[x+7*9],
      board[x+8*9],
    ];
    valid = valid && comp(digits, col);
  }

  // check boxes
  for (let x = 0; x <= 9; x+=3) {
    for (let y = 0; y <= 81; y += 27) {
      const box = board.slice(x+y,3);
      box.push(board.slice(x+y+9,3));
      box.push(board.slice(x+y+18,3));
      valid = valid && comp(digits, box);
    }
  }

  return valid;
}

function solve() {

}

module.exports = {
  generate,
  validate,
  solve,
};
