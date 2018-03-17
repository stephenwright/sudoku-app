#!/bin/bash

docker build -t sudoku-ws:level-4 .
docker run -i -t --rm -p 8080:8080 sudoku-ws:level-4
