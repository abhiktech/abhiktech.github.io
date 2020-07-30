/*This file contains the implementation of the Brute Force Algorithm to solve the sudoku table.
  In this algorithm, we generate all possible sudoku combinations and validate whether the sudoku generated abides by
  all constraints associated with sudoku puzzles.
  Advantage : Guaranteed Solution
  Disadvantage : Long Exectuion Time
*/

//Recursive function. If possible, solves the sudoku puzzle, if too time consuming or unsolvable returns appropriately.
function solveBruteForce(row, col){
  plotPoints();
  t2 = performance.now();
  //If time limit exceeded
  if(t2 - t1 > 5000){
    return true;
  }
  //furthest point of recursion
  if(row == sudoku.length){
    return isValidSudoku(sudoku);
  }
  //If the given cell was input by the user
  if(userInput[row][col]){
    if(lastElement(col)){
      if(solveBruteForce(row + 1, 0)){
        return true;
      }
    } else {
        if(solveBruteForce(row, col + 1)){
        return true;
        }
      }
  } else {
    //For non-user input
    for(var val = 1; val <= sudoku.length; ++val){//Iterating through every possible value for non-user entered cells
      sudoku[row][col] = val;
      if(lastElement(col)){
        if(solveBruteForce(row + 1, 0)){
          return true;
        }
      } else {
        if(solveBruteForce(row, col + 1)){
          return true;
        }
      }
    }
  }
  return false;
}

//Main function for this algorithm
function bruteForceMain(s){
  graphData = [];
  t1 = performance.now();
  var row = new Array();
  var rowInput = new Array();
  for(var i = 0; i < s.length; ++i){
    for(var j = 0; j < s[i].length; ++j){
      plotPoints();
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
  var solvable = solveBruteForce(0, 0);
  if(t2 - t1 > 5000){//If time limit is exceeded
    alert("Time limit exceeded! Brute Force often takes too long to execute.");
    cursorpos = 1;
    document.getElementById(1).focus();
  } else {
    t2 = performance.now();
    graphData.push([steps, t2 - t1]);
    setSudoku(sudoku, solvable, t2 - t1);
    if(solvable){//If the sudoku is solvable, call graphing functions
      drawGraph();
      openGraphSideBar();
      runtime();
    }
  }
  setGlobalToDefault();
}
