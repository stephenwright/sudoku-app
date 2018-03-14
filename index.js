const express = require('express');
const sudoku = require('./lib/sudoku.js');

const PORT = 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('success!');
});

app.get('/sudoku/board', (req, res) => {
  res.json(sudoku.generate());
});

app.listen(PORT, () => console.log(`running on ${PORT}`));
