//IMPORTANT GLOBAL ENTITIES

//Stores the values of the sudoku table
var sudoku = new Array;
//Stores true at cells for user entered values and vice versa
var userInput  = new Array;
//Stores the possible values of a cell
var possibleVal = new Array;
//Starting exectution time
var t1;
//Afterwards time
var t2;
//Stores the number of steps encountered in an algorithm
var steps = 0;
//Stores the graph data
var graphData = new Array;
//Stores the bar chart data
var barChartData = new Array;
//True if the algorithms are being comapred else false
var compare = false;

//Resets global enitities
function setGlobalToDefault(){
  t1 = 0;
  t2 = 0;
  steps = 0;
  sudoku = [];
  userInput = [];
  possibleVal = [];
}
