/*This file contains the implementaion of the Naked Singles Algorithm. Here we evaluate the possiblities of
  all empty cells. If a ceratin cell has only one possible value, assign it to that cell. Repeeat this process, until
  no empty cells have one possible value. After that, apply Crook's Algorithm for the unsolved cells.
  Advantages : Never has a terrible runtime, redues number of steps for Crook's algorithm
  Disadvantages : All of Crook's disadvantages plus the additional time complexity in finding naked singles
*/

//Assigns the naked singles to the cells
function assignNakedSingles(){
  numSingle = -1;
  //Runs until the number of naked singles is zero
  while(numSingle != 0){
    numSingle = 0;
    for(var i = 0; i < sudoku.length; ++i){
      for(var j = 0; j < sudoku[i].length; ++j){
        if(!userInput[i][j]){
          var k = i * sudoku.length + j;
          if(!compare){
            plotPoints();
          }
          if(possibleVal[k].length == 1){
            sudoku[i][j] = possibleVal[k][0];
            possibleVal[k].pop();
            userInput[i][j] = true;
            ++numSingle;
          }
        }
      }
    }
  }
}

//Main function
function ruleBasedMain(s){
  //Similar to other main functions
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
  assignNakedSingles();
  var solvable = solveCrook();
  t2 = performance.now();
  if(t2 - t1 > 5000){
    if(!compare){
      alert("Naked Singles Algorithm took too long to execute!");
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
      barChartData.push(['NS', t2 - t1, 'red']);
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
