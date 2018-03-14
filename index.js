/*eslint no-console: 0*/
const express = require('express');
const sudoku = require('./lib/sudoku.js');

const PORT = 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('success!');
});

app.get('/sudoku/board', (req, res) => {
  let board = sudoku.generate();
  board = sudoku.solve(board);
  res.json(board);
});

app.listen(PORT, () => console.log(`running on ${PORT}`));
