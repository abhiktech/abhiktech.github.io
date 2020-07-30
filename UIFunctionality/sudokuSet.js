//This file sets and assigns the values of the sudoku puzzle.

//Resests the sudoku table
function resetSudoku(){
  var i = 1;
    var table = document.getElementsByClassName("sudokuTable");
    for(r = 0; r < table[0].rows.length; ++r){
      var x = table[0].rows[r];
      for(c = 0; c < x.cells.length; ++c){
          document.getElementById(i).value = "";//All of the cells now do not have any value
        ++i;
      }
    }
    //Defines user interface correctly
    cursorpos = 1;
    document.getElementById(1).focus();
    allTransparent(i - 1);
    onClick(i - 1);
    closeGraphSideBar()
  }
  //Assigns the sudoku table
  function setSudoku(sudoku, solvable, t){
    var k = 1;
    //If the sudoku is unsolvable
    if(!solvable){
      alert("This Sudoku is not solvable!");
    } else {
      //If the sudoku table is solvable, assign the cells.
    for(var i = 0; i < sudoku.length; ++i){
      for(var j = 0; j < sudoku[i].length; ++j){
        document.getElementById(k).value = sudoku[i][j];
        ++k;
      }
    }
  }
  //Sets user interface
    cursorpos = 1;
    document.getElementById(1).focus();
    allTransparent(k - 1);
    onClick(k - 1);
  }
