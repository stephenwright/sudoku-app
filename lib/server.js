/*eslint no-console: 0*/
const express = require('express');
const sudoku = require('./sudoku');

const DEFAULT_PORT = 8080;

const app = express();

app.get('/', (req, res) => {
  res.send('success!');
});

app.get('/sudoku/board', (req, res) => {
  let board = sudoku.generate();
  board = sudoku.solve(board);
  res.json(board);
});

function start(port=DEFAULT_PORT) {
  const server = app.listen(port, () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
  });
}

module.exports = {
  start
};
