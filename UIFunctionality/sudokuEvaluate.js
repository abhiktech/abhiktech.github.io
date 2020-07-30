/*This file evaluates extracts user input, checks validity, and corresspondingly calls solving functions or displays
  appropriate messages.*/

//Checks if the sudoku's rows are valid or not.
function validRow(sudoku){
  var map = {};
  for(var i = 0; i < sudoku.length; ++i){
    for(var j = 0; j < sudoku[i].length; ++j){
      if(sudoku[i][j] == 0){
        continue;
      }
      if(map[sudoku[i][j]]){
        return false;
      } else {
        map[sudoku[i][j]] = true;
      }
    }
    map = {};
  }
  return true;
}

//Checks if the sudoku's columns are valid or not.
function validCol(sudoku){
  var map = {};
  for(var i = 0; i < sudoku.length; ++i){
    for(var j = 0; j < sudoku[i].length; ++j){
      if(sudoku[j][i] == 0){
        continue;
      }
      if(map[sudoku[j][i]]){
        return false;
      } else {
        map[sudoku[j][i]] = true;
      }
    }
    map = {};
  }
  return true;
}

//Checks if the sudoku's subgrids are valid or not.
function validSubgrid(sudoku){
  var sub = Math.sqrt(sudoku.length);
  var map = {};
  var i, j, l, k;
  for(i = 0; i < sudoku.length; i = i + sub){
    for(j = 0; j < sudoku[i].length; j = j + sub){
      for(k = i; k < i + sub; ++k){
        for(l = j; l < j + sub; ++l){
          if(sudoku[k][l] == 0){
            continue;
          }
          if(map[sudoku[k][l]]){
            return false;
          }  else {
            map[sudoku[k][l]] = true;
          }
        }
      }
      map = {};
    }
  }
  return true;
}

//Calls all of the validity functions
function isValidSudoku(sudoku){
  return (validRow(sudoku) && validCol(sudoku) && validSubgrid(sudoku));
}

//Extracts user input, calls isValidSudoku(), and accordingly calls algorithms solving function or displays error message.
function evaluateSudoku(num){
  var i = 1;
  var invalidInput = false;
  var table = document.getElementsByClassName("sudokuTable");

  //Creating a 2D array.
  var sudoku = new Array(table[0].rows.length);

  for(var j = 0; j < table[0].rows.length; ++j){
    sudoku[j] = new Array(table[0].rows.length);
  }
  //Extracts user input
    for(r = 0; r < table[0].rows.length; ++r){
      var x = table[0].rows[r];
      for(c = 0; c < x.cells.length; ++c){
        //If value is entered, store it or else store a zero in its place.
          if(document.getElementById(i).value){
          sudoku[r][c] = parseInt(document.getElementById(i).value);
        } else {
          sudoku[r][c] = 0;
        }
        ++i;
      }
    }
    //If the sudoku is valid
  if(isValidSudoku(sudoku)){
    if(num == 1){
      bruteForceMain(sudoku);//Brute Force Algorithm
    } else if(num == 2){
      backTrackMain(sudoku);//Backtracking Algorithm
    } else if(num == 3){
      crookMain(sudoku);//Crook's Algorithm
    } else if(num == 4){
      ruleBasedMain(sudoku);//Naked Singles Algorithm
    } else if(num == 5){
      ruleBased2Main(sudoku);//Lone Rangers Algorithm
    } else {//User wants to compare the performance of all the algorithms
      compare = true;
      if(backTrackMain(sudoku) != -1 && crookMain(sudoku) != -1 && ruleBasedMain(sudoku) != -1 && ruleBased2Main(sudoku) != -1){
        //Yay the sudoku is solvable through all algorithms
      }
    }
  } else {//If the sudoku is invalid
    alert("Abide by the constraints of Sudoku.")
    cursorpos = 1;
    document.getElementById(1).focus();
  }
}
