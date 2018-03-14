
const DIGITS = [1,2,3,4,5,6,7,8,9];

// ----- Helpers

function shuffle(arr) {
  for (let i = arr.length; i > 0;) {
    let j = Math.floor(Math.random() * i);
    i -= 1;
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function compare(a1, a2) {
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

function unique(arr) {
  return arr.filter((v, i, self) => {
    return self.indexOf(v) === i;
  });
}

function intersect(a1, a2) {  // eslint-disable-line no-unused-vars
  return a1.filter((v) => {
    return a2.indexOf(v) !== -1;
  });
}

function range(arr, start, length) {
  return arr.slice(start, start + length);
}

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

// -----

function generate() {
  const board = [];

  for (let i = 0; i < 81; ++i) {
    board[i] = 0;
  }

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

function grid(board) {  // eslint-disable-line no-unused-vars
  let s = '|---+---+---|---+---+---|---+---+---|\n';
  for (let i = 0; i < 9; ++i) {
    s += '| ' + range(board, i*9, 9).join(' | ') + ' |\n';
    s += '|---+---+---|---+---+---|---+---+---|\n';
  }
  return s;
}

function solve(board) {
  let b = null;
  let x = 0;
  start: for (; x < 5000; x++) {
    b = board.slice(); // copy the original state of the board
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
  //console.info(grid(b), { attempts: x });
  return b;
}

// -----

module.exports = {
  generate,
  validate,
  solve,
  shuffle,
};
