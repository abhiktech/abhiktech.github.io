/*This file contains the implmenation of the Lone Ranger's Algorithm. Here we seee whether there is only one
  possible cell in a certain row, column, and subgrid that can store a certain value without violating any of the
  constraints. If yes, store that value. After iterating through every value for every row (then column and subgrid)
  if required, use crook's algorithm.
  Advantages : Redusces number of steps for crook's algorithm
  Disadvantages : All of crook's along with additional time consumption
*/

//Checks whether a value has only one possibility in a row
function singleValueRow(row, val){
  var upperLim = row * sudoku.length + sudoku.length, numOccurs = 0, col;
  for(var i = row * sudoku.length; i < upperLim; ++i){
    if(possibleVal[i].length == 0){
      if(val == sudoku[row][i % sudoku.length]){
        return -1;
      }
    }
    for(var j = 0; j < possibleVal[i].length; ++j){
      if(possibleVal[i][j] == val){
        ++numOccurs;
        col = i % sudoku.length;
      }
    }
  }
  if(numOccurs == 1){
    return col;
  }
  return -1;
}

//Checks whether a value has only one possibility in a column
function singleValueCol(col, val){
  var numOccurs = 0, index = 0;
    for(var i = 0; i < sudoku.length; ++i){
      index = i * sudoku.length + col;
      if(possibleVal[index].length == 0){
        if(sudoku[i][col] == val){
          return false;
        }
      }
      for(var j = 0; j < possibleVal[index].length; ++j){
        if(possibleVal[index][j] == val){
          ++numOccurs;
        }
      }
    }
    if(numOccurs == 1){
      return true;
    }
    return false;
}

//Checks whether a value has only one possibility in a subgrid
function singleValueSubGrid(row, col, val){
  var numOccurs = 0;
  var len = Math.sqrt(sudoku.length);
  var lowerRowLim = row - row % len;
  var lowerColLim = col - col % len;
  for(var i = lowerRowLim; i < lowerRowLim + len; ++i){
    for(var j = lowerColLim; j < lowerColLim + len; ++j){
      if(userInput[i][j]){
        if(sudoku[i][j] == val){
          return false;
        }
      } else {
        for(var k = 0; k < possibleVal[i * sudoku.length + j].length; ++k){
          if(possibleVal[i * sudoku.length + j][k] == val){
            ++numOccurs;
          }
        }
      }
    }
  }
  if(numOccurs == 1){
    return true;
  }
  return false;
}

//Assigns values to respectibve cells if the conditions are satisfied
function assignLoneRangers(){
  for(var i = 0; i < sudoku.length; ++i){
    for(var val = 1; val <= sudoku.length; ++val){
      if(!compare){
        plotPoints();
      }
      var col = singleValueRow(i, val);
      if(col != - 1){
        if(singleValueCol(col, val) && singleValueSubGrid(i, col, val)){
          sudoku[i][col] = val;
          userInput[i][col] = true;
          possibleVal[i * sudoku.length + col] = [];
        }
      }
    }
  }
}

//Main function
function ruleBased2Main(s){
  //Same thing basically
  graphData = [];
  t1 = performance.now();
  var row = new Array();
  var rowInput = new Array();
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
  assignLoneRangers();
  var solvable = solveCrook();
  t2 = performance.now();
  if(t2 - t1 > 5000){
    if(!compare){
    alert("Backtracking Algorithm took too long to execute!");
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
      barChartData.push(['LR', t2 - t1, 'yellow']);
    }
    setSudoku(sudoku, solvable, t2 - t1);
    if(!compare){
      if(solvable){
        drawGraph();
        openGraphSideBar();
        runtime();
      }
    } else {
      if(solvable){
        drawBarChart();
        openGraphSideBar();
        runtime();
      }
      compare = false;
    }
  }
  setGlobalToDefault();
}
