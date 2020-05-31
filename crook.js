/*This file contains the implementaion of Crook's algorithm - a modification of the Backtracking Algorithm.
  It is as follows :
  1. Iterate through the user entered sudoku table and for each empty cell, store the
     acceptable, possible values.
  2. After that just apply the backtracking algorithm with one modification -
      Instead of iterating from current cell value + 1 to sudoku size, iterate from next possible value of the
      current cell to the last possible value. If nothing valid is found, set the element to 0.
  Advantages : Less steps encountered
  Disadvantages : The process of finding and storing possible values for each cell leads to additional space
                  and time complexity.
  */

//Assigns the valid, possible values for each cell.
function assignPossibleValues(){
  var ele = new Array;
  ele = [];
  for(var i = 0; i < sudoku.length; ++i){
    for(var j = 0; j < sudoku[i].length; ++j){
      if(!userInput[i][j]){
        for(var val = 1; val <= sudoku.length; ++val){
          if(!compare){
          plotPoints();
          }
          if(isValid(sudoku, i, j, val)){
            ele.push(val);
          }
        }
      }
      possibleVal.push(ele);
      ele = [];
    }
  }
}

//Solves the sudoku table using Crook's algorithm
function solveCrook(){
  var row = 0, col = 0, front = true, a, b, c = 0;
  while(row != -1 && row != sudoku.length){
    if(t2 - t1 > 5000){
      return false;
    }
    if(userInput[row][col]){
      //Moving front
      if(front){
        if(lastElement(col)){
          ++row;
          col = 0;
        } else {
          ++col;
        }
        //Backtracking
      } else {
        if(firstElement(col)){
          --row;
          col = sudoku.length - 1;
        } else {
        --col;
        }
      }
    } else {
    //For an empty cell
    a = (row * sudoku.length) + col;
    if(possibleVal[a].length == 0){//No possible value
      return false;
    }
    if(sudoku[row][col] == 0){//If the cell has been reseted to zero
      b = 0;
    } else {
        for(c = 0; c < possibleVal[a].length; ++c){//Storing the index of the next possible value
          if(sudoku[row][col] == possibleVal[a][c]){
            b = c + 1;
            break;
          }
        }
    }

    while(b < possibleVal[a].length){//Iterating through the possible values
      //If the current value is valid
      if(isValid(sudoku, row, col, possibleVal[a][b])){
        front = true;
        sudoku[row][col] = possibleVal[a][b];
        if(lastElement(col)){
          ++row;
          col = 0;
        } else {
          ++col;
        }
        break;
      }
      ++b;
    }
    if(b == possibleVal[a].length){
      front = false;
    //If none of the values satisfied.
     sudoku[row][col] = 0;
      if(firstElement(col)){
        --row;
        col = sudoku.length - 1;
      } else {
        --col;
      }
    }
  }
  if(!compare){
  plotPoints();
  }
}
  if(row == -1){
    return false;
  } else {
    return true;
  }
}

//Main function
function crookMain(s){
  //Code is pretty similar to the main functions for other algorithm implementations
  graphData = [];
  t1 = performance.now();
  var row = new Array;
  var rowInput = new Array;
  for(var i = 0; i < s.length; ++i){
    for(var j = 0; j < s[i].length; ++j){
      if(!compare){
        plotPoints();
      }
      row.push(s[i][j]);
      if(s[i][j] != 0){
        rowInput.push(true)
      } else {
        rowInput.push(false);
      }
    }
    sudoku.push(row);
    userInput.push(rowInput);
    row = [];
    rowInput = [];
  }
  assignPossibleValues();
  var solvable = solveCrook();
  t2 = performance.now();
  if(t2 - t1 > 5000){
    if(!compare){
    alert("Crook's Algorithm took too long to execute!");
    cursorpos = 1;
    document.getElementById(1).focus();
    } else {
    alert("This sudoku took too long to solve!");
    cursorpos = 1;
    document.getElementById(1).focus();
    setGlobalToDefault();
    compare = false;
    return -1;
    }
  } else {
    if(!compare){
      graphData.push([steps, t2 - t1]);
    } else {
      barChartData.push(['Crooks', t2 - t1, 'green']);
    }
    if(!compare){
      setSudoku(sudoku, solvable, t2 - t1);
      if(solvable){
        drawGraph();
        openGraphSideBar();
        runtime();
      }
    }
  }
  setGlobalToDefault();
}
