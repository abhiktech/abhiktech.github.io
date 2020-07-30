//This file contains useful functions that are constantly used by the sudoku solving algorithms.

//Checks if a cell is the first cell of a row.
function firstElement(col){
  return (col == 0);
}

//Checks if a cell is the last element of a row.
function lastElement(col){
  return (col == sudoku.length - 1);
}

//Accepts the whole row and the value of the element and validates.
function validateRow(row, val){
  for(var i = 0; i < row.length; ++i){
    if(row[i] == val){
      return false;
    }
  }
  return true;
}

//Accepts the whole grid, column number, and the value of the element and validates.
function validateCol(grid, col, val){
  for(var i = 0; i < grid.length; ++i){
    if(grid[i][col] == val){
      return false;
    }
  }
  return true;
}

//Accepts grid, row, col, and possible value and validates.
function validateSubgrid(grid, row, col, val){
  var sub = Math.sqrt(grid.length);
  var limRow = 0, limCol = 0;
  while(limRow + sub <= row){
    limRow = limRow + sub;
  }
  while(limCol + sub <= col){
    limCol = limCol + sub;
  }
  for(i = limRow; i < limRow + sub; ++i){
    for(j = limCol; j < limCol + sub; ++j){
      if(grid[i][j] == val){
        return false;
      }
    }
  }
  return true;
}

//Calls validity functionss
function isValid(grid, row, col, val){
  return (validateRow(grid[row], val) && validateCol(grid, col, val) && validateSubgrid(grid, row, col, val));
}
