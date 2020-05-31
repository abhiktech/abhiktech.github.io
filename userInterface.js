/*One of the most important files which handles the user interface and manages user interactivity and enchances
  functionality.*/

var cursorpos = 1;//Defines cursor position

//Sets all cells to their default background colors
function allTransparent(ele){
  //ele represents the number of cells
  var size = Math.sqrt(ele);//size of the grid
  var sub = Math.sqrt(size);//size of the sub-grid
  var option = 2;
  if(sub % 2 != 0){//For 9x9 grids
    for(var row = 0; row < size; row = row + sub){
      for(var col = 0; col < size; col = col + sub){
        option = (option == 1)? 2:1;
        for(var i = row; i < row + sub; ++i){
          for(var j = col; j < col + sub; ++j){
            var index  = i * size + j + 1;
            if(option == 1){
              document.getElementById(index).style.backgroundColor = '#6CAEFB';
            } else {
              document.getElementById(index).style.backgroundColor = '#B3D4FC';
            }
            document.getElementById(index).style.border = 'solid 1px';
          }
        }
      }
    }
  } else {//For 4x4 and 16x16 grids
    var gridEnds = false;
    for(var row = 0; row < size; row = row + sub){
      for(var col = 0; col < size; col = col + sub){
        if(!gridEnds){
        option = (option == 1)? 2:1;
        }
        for(var i = row; i < row + sub; ++i){
          for(var j = col; j < col + sub; ++j){
            var index  = i * size + j + 1;
            if(option == 1){
              document.getElementById(index).style.backgroundColor = '#6CAEFB';
            } else {
              document.getElementById(index).style.backgroundColor = '#B3D4FC';
            }
            document.getElementById(index).style.border = 'solid 1px';
          }
        }
        gridEnds = false;
      }
      gridEnds = true;
    }
  }
}

//Colors the corresponding cells when one cell is selected
function colorCells(id, size){
  //Colors subgrid
  var row = (id - 1) / size, col = (id - 1) % size, gridId;
  var lowerRowLim = row - row % Math.sqrt(size);
  var lowerColLim = col - col % Math.sqrt(size);
  for(var i = lowerRowLim; i < lowerRowLim + Math.sqrt(size); ++i){
    for(var j = lowerColLim; j < lowerColLim + Math.sqrt(size); ++j){
        gridId = i * size + j + 1;
        if(document.getElementById(gridId).value == document.getElementById(id).value && document.getElementById(id).value != ""){
          document.getElementById(gridId).style.backgroundColor = '#F15353';
          continue;
        }
        document.getElementById(gridId).style.backgroundColor = '#FBA8DF';
    }
  }
  //Colors row
  if(id % size == 0){
    for(var rowId = id - size + 1; rowId <= id; ++rowId){
      if(document.getElementById(rowId).value == document.getElementById(id).value && document.getElementById(id).value != ""){
        document.getElementById(rowId).style.backgroundColor = '#F15353';
        continue;
      }
      document.getElementById(rowId).style.backgroundColor = '#D187F5';
    }
  } else {
    for(var rowId = id - id % size + 1; rowId <= id - id % size + size; ++rowId){
      if(document.getElementById(rowId).value == document.getElementById(id).value && document.getElementById(id).value != ""){
        document.getElementById(rowId).style.backgroundColor = '#F15353';
        continue;
      }document.getElementById(rowId).style.backgroundColor = '#D187F5';
    }
  }

  //Colors column
  if(id % size == 0){
    for(var colId = size; colId <= size * size; colId = colId + size){
    if(document.getElementById(colId).value == document.getElementById(id).value  && document.getElementById(id).value != ""){
      document.getElementById(colId).style.backgroundColor = '#F15353';
      continue;
    }
      document.getElementById(colId).style.backgroundColor = '#D187F5';
    }
  } else {
      for(var colId = id % size; colId <= size * size; colId = colId + size){
        if(document.getElementById(colId).value == document.getElementById(id).value  && document.getElementById(id).value != ""){
          document.getElementById(colId).style.backgroundColor = '#F15353';
          continue;
        }
        document.getElementById(colId).style.backgroundColor = '#D187F5';
      }
  }
}

//Deals with the event when one cell is clicked
function onClick(ele){
  $(document).ready(function () {
  //Handles the event click tags
    $('input').click(function () {
      var size = Math.sqrt(ele);
      allTransparent(ele);
      var curId = this.id;
      colorCells(curId, size);
      this.style.backgroundColor = '#D82EFA';
      cursorpos = curId;
    });
  });
}

//Allows us to navigate and modify cells using our device's keyboard
function allowNavigation(){
$(document).ready(function () {
  $('input').keyup(function (e) {
    if((e.which >= 49 && e.which <= 57) || e.which == 8){
      closeGraphSideBar();
      }
    var table = document.getElementsByClassName("sudokuTable");
    var len = table[0].rows.length;
    if (e.which == 37) {//Left
      buttonUpdateSudoku('l');
    } else if(e.which == 39){//Right
      buttonUpdateSudoku('r');
    } else if(e.which == 38){//Up
      buttonUpdateSudoku('u');
    } else if(e.which == 40){//Down
      buttonUpdateSudoku('d');
    } else if(e.which >= 49 && e.which <= 57){//If a number from 1 to 9 is entered
      if(len != 16){//For 4x4 and 9x9 grids
        if(e.which - 48 > len){
          if(document.getElementById(cursorpos).value.length == 2){
            document.getElementById(cursorpos).value = document.getElementById(cursorpos).value[0];
          } else {
            document.getElementById(cursorpos).value = "";
          }
        } else {
          document.getElementById(cursorpos).value = e.which - 48;
        }
      } else {//For 16x16 grids
        if(document.getElementById(cursorpos).value.length == 1){
          document.getElementById(cursorpos).value = e.which - 48;
        } else {
          if(document.getElementById(cursorpos).value.length == 2){
            if(document.getElementById(cursorpos).value > 16){
              document.getElementById(cursorpos).value = document.getElementById(cursorpos).value[1];
            }
          } else {
              document.getElementById(cursorpos).value =  parseInt(document.getElementById(cursorpos).value[0] * 10) + parseInt(document.getElementById(cursorpos).value[1]);
          }
        }
      }
    } else if(e.which == 48 && len == 16 && document.getElementById(cursorpos).value == 10){
      //Do nothing
    } else if(e.which == 8){
      //Do nothing
    } else {
      if(document.getElementById(cursorpos).value.length == 3){
          document.getElementById(cursorpos).value = parseInt(document.getElementById(cursorpos).value[0]) * 10 + parseInt(document.getElementById(cursorpos).value[1]);
      } else if(document.getElementById(cursorpos).value.length == 2){
        document.getElementById(cursorpos).value = document.getElementById(cursorpos).value[0];
      } else {
        document.getElementById(cursorpos).value = '';
      }
    }
    allTransparent(len * len);
    colorCells(cursorpos, len);
    document.getElementById(cursorpos).style.backgroundColor = '#D82EFA';
    document.getElementById(cursorpos).focus();
    });
  });
}

//Allows us to modify/navigate through cells using the virtual keypad
function buttonUpdateSudoku(val){
  if(!isNaN(val) || val == 'b'){
    closeGraphSideBar();
  }
  var table = document.getElementsByClassName("sudokuTable");
  var len = table[0].rows.length;
  var command = parseInt(cursorpos);
  //If a number is entered.
  if(!isNaN(val)){
    if(val == 0){
      if(len == 16 && document.getElementById(command).value == 1){
        document.getElementById(command).value = 10;
      }
    } else if(len != 16){
      if(val <= len){
      document.getElementById(command).value = val;
      }
    } else {
      if(document.getElementById(command).value.length == 0){
        document.getElementById(command).value = val;
      } else {
        if(document.getElementById(command).value * 10 + val <= 16){
          document.getElementById(command).value = document.getElementById(command).value * 10 + val;
        } else {
          if(document.getElementById(command).value.length != 2){
            document.getElementById(command).value = val;
          }
        }
      }
    }
  } else {
    if(val == 'u'){
      if(command <= len){
        command = len * len - len + command;
      } else {
        command = command - len;
      }
    } else if(val == 'l'){
      if(command % len == 1){
        command = command + len - 1;
      } else {
        command = command - 1
      }
    } else if(val == 'r'){
      if(command % len == 0){
        command = command - len + 1;
      } else {
        command = command + 1;
      }
    } else if(val == 'd'){
      if(command > len * len - len){
        command = command - len * len + len;
      } else {
        command = command + len;
      }
    } else if(val == 'b'){
      if(document.getElementById(command).value.length == 2){
        document.getElementById(command).value = document.getElementById(command).value[0]
      } else {
        document.getElementById(command).value = '';
      }
    }
  }
  cursorpos = command;
  allTransparent(len * len);
  colorCells(cursorpos, len);
  document.getElementById(cursorpos).style.backgroundColor = '#D82EFA';
  document.getElementById(cursorpos).focus();
}
