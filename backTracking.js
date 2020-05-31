/*This file contains the implemetation of the backtracking algorithm - a more efficient brute force approach.
  This algorithm is very intuitive and is as follows :
  1. Start from the first cell.
  2. If user input, move to the next cell.
  3. Else : a) Iterate from current cell value + 1 to sudoku's size and check for a value that satisfies row, column,
               and subgrid constraints. Note: Non-user input cells are assigned as 0 in evaluateSudoku().
            b) If a valid value is found, set that to the current cell and then move to the next cell.
            c) Else : Set the cell value to 0 and move to the previous cell.
  4. Go back to step 2 and repeat the steps until : row index = -1 (unsolvable) or row index = size + 1 (solved)
  5. Stop
  Advantages : Intuitive, Ease of Implementation, Generally more time efficient than other algorithms
  Disadvantage : Bad worst case complexity, Many steps involved
  */

//Solves the sudoku using the backtracking algorithm
function solveBackTrack(){
  //Iterative approach, avoids the problem of exceeding call stack.
  var row = 0, col = 0, front = true;
  while(row != -1 && row != sudoku.length){
    t2 = performance.now();
    if(t2 - t1 > 5000){//If the time of exectution is more than 5 seconds, terminate execution
      return false;
    }
    if(userInput[row][col]){//If the current cell was entered by the user
      //Moving front
      if(front){
        if(lastElement(col)){//If you are on the last cell of a row
          ++row;
          col = 0;
        } else {//Any other cell
          ++col;
        }
        //Backtracking
      } else {
        if(firstElement(col)){//If you are on the first cell of a row
          --row;
          col = sudoku.length - 1;
        } else {//Any other cell
        --col;
        }
      }
    } else {
    //For an empty cell
    for(var val = sudoku[row][col] + 1; val <= sudoku.length; ++val){
      //If the current value is valid and does not violate any constraints
      if(isValid(sudoku, row, col, val)){
        front = true;
        sudoku[row][col] = val;
        if(lastElement(col)){
          ++row;
          col = 0;
        } else {
          ++col;
        }
        break;
      }
    }
    if(val == sudoku.length + 1){
      front = false;//Backtrack in the next iteration
    //If none of the values satisfied.
    sudoku[row][col] = 0;//Set the cell to zero
      if(firstElement(col)){
        --row;
        col = sudoku.length - 1;
      } else {
        --col;
      }
    }
  }
  if(!compare){
  plotPoints();//Plotting the points in the graph
  }
}
  if(row == -1){//Unsolvable
    return false;
  } else {//Solvable
    return true;
  }
}

//Main function invoked by evaluateSudoku()
function backTrackMain(s) {
  graphData = [];//Stores data for graph
  barChartData = [['Algorithm', 'Runtime (in ms)', { role: 'style' }]];//Stores data for bar chart
  t1 = performance.now();
  var row = new Array();
  var rowInput = new Array();
  /*userInput is a global array that stores true at positions where the user enetered a value and vice versa
    sudoku is a global array that stores the user's input*/
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
  var solvable = solveBackTrack();
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
      graphData.push([steps, t2 - t1]);//Graphing data
    } else {
      barChartData.push(['BT', t2 - t1, 'blue']);//Bar chart data
    }
    if(!compare){
      setSudoku(sudoku, solvable, t2 - t1);//Setting the solved sudoku on the screen
      if(solvable){
        //Invoking graphing functions if solvable
        drawGraph();
        openGraphSideBar();
        runtime();
      }
    }
  }
  setGlobalToDefault();
}
