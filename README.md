# sudoku-solver

Website link : https://abhiktech.github.io/sudoku-solver/

Motivation Behind this Project:

I have been fascinated by sudoku puzzles ever since I was a child. My first interaction with the world of sudoku was when my mother
got a new Nokia phone which had a sudoku game pre-installed in it. I remember spending hours after hours trying to solve the first sudoku
puzzle with no progress. Frustrated, I stopped playing the game for a while. Years later, I came across another sudoku puzzle and after
struggling with it at first, I started to understand the tricks, logic, and mathematical beauty of sudoku puzzles. This project is a
demonstration of my affinity towards sudoku puzzles and algorithmic thinking in general.

Tools and Technologies used:
- HTML5
- CSS3
- JavaScript
- jQuery Libraries
- Google Charts Packages

Objectives of this Project:
- To create an interactive, user-friendly, accessible, single-page application.
- To allow users to solve sudoku puzzles of any level of difficulty using 5 different models.
- To ensure that the algorithms are correctly implemented and are as space and time efficient as possible.
- To graphically analyze and compare the performance of the different algorithms for the given sudoku puzzle.

Components of this Projects:

Visuals Folder (Static Viewable Content)

- index.htm : The page that the user views on the browser
- styles.css : Responsible for making the HTML elements visually appealing
- background.png, sidebackground.jpg, sudokulogo.jpg : Viewable images

UIFunctionality Folder (Interactive User Interface)

- userInterface.js : Provides user interactivity and relevant functionality
- sudokuSize.js : Dynamically sets sudoku size based on user's choice
- sudokuSet.js : Resets sudoku table or sets the solved sudoku table
- sudokuEvaluate.js : Responsible for extracting user input, validating it, and invoking algorithm solving functions or displaying
  relevant messages

SolvingAlgorithms Folder (Algorithm Implementation)
- bruteForce.js : Implementation of brute force algorithm
- backTracking.js : Implementation of back tracking algorithm
- crook.js : Implementation of crook's algorithm
- nakedSingle.js : Implementation of naked single's algorithm
- loneRanger.js : Implementation of lone ranger's algorithm
- validElement.js : Evaluates whether the current value abides by sudoku's constraints
- global.js : Important global entities

Grpah Folder (Graph Implementation)
- graph.js : Implements and manipulates individual graphs, bar charts, and the left sidebar

Tested on Google Chrome, Microsoft Edge.

I hope you find this project interesting. For any bugs/issues/recommendations contact me at :
- abhikmaz@umich.edu
- https://www.linkedin.com/in/abhik-mazumder-46b03619a/
