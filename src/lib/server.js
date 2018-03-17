/*eslint no-console: 0*/
const express = require('express');
const sudoku = require('./sudoku');

const PORT = process.env.PORT || 8080;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('success!');
});

app.get('/sudoku/board', (req, res) => {
  let {cell,value} = req.query;
  let board = null;
  if (typeof cell !== 'undefined' && typeof value !== 'undefined') {
    cell = parseInt(cell);
    value = parseInt(value);
    board = sudoku.getEmptyBoard();
    board[cell] = value;
  }
  else {
    board = sudoku.generate();
  }
  board = sudoku.solve(board);
  res.json(board);
});

const server = app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});

module.exports = server;
