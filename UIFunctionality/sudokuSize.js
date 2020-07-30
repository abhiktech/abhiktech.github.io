//This file is used to dynamically create sudoku puzzles of varying sizes.

//Sets the size of the sudoku puzzle based on the user's choice.
function newSize(newSize){
  //Destroying the present sudoku.
  var table = document.getElementsByClassName("sudokuTable");
  var r =  table[0].rows.length - 1, c = 0, i = 1;
  while(table[0].rows.length != 0){
    table[0].deleteRow(r)
    --r;
  }
  //Creating a new sudoku.
  for(r = 0; r < newSize; ++r){
    var x = table[0].insertRow(r);
    for(c = 0; c < newSize; ++c){
      var y = x.insertCell(c);
      var editBox = document.createElement("input");//Defining each cell with input ability
      editBox.type = "text";
      editBox.id = i;//Providing each cell with a unique id
      y.style.borderTop = "solid 1px";
      y.style.borderBottom = "solid 1px";
      y.style.borderLeft = "solid 1px";
      y.style.borderRight = "solid 1px";
      if(r % Math.sqrt(newSize) == 0){
        y.style.borderTop = "solid 5px";
      }
      if(r == newSize - 1){
        y.style.borderBottom = "solid 5px";
      }
      if(c % Math.sqrt(newSize) == 0){
        y.style.borderLeft = "solid 5px";
      }
      if(c == newSize - 1){
        y.style.borderRight = "solid 5px";
      }
      ++i;
      y.appendChild(editBox);
    }
  }
  //Sets user interface correctly
  cursorpos = 1;
  document.getElementById(1).focus();
  allTransparent(newSize * newSize);
  onClick(newSize * newSize);
  allowNavigation();
  closeGraphSideBar()
}
