// initialize empty array for squares on the game board
var squaresArray = [];
// selects the gameBoard element
var gameBoard = document.getElementById("gameBoard");
// selects the container element
var container = document.getElementById("container");
// determines which player's turn it is, starting with X's
var turnSwitch = false;
// sets to true if a player has won the game
var gameWon = false;

// restarts game when button is pressed
var restartGame = function(restartButton, winnerText) {
  console.log("restart");
  gameWon = false;
  turnSwitch = false;
  for (var i = 0; i < 9; i++) {
    squaresArray[i].style.color = "";
    squaresArray[i].style.background = "";
  }
  container.removeChild(restartButton);
  container.removeChild(winnerText);
}

// restart game option appears
var enableRestart = function() {
  //creates restart button
  var restartButton = document.createElement("BTN");
  restartButton.setAttribute("id", "restart");
  restartButton.innerText = "restart game";
  container.appendChild(restartButton);

  // displays which player won
  var winnerText = document.createElement("DIV");
  winnerText.setAttribute("id", "winnerText");
  if (turnSwitch == true) {
    winnerText.innerText = "Winner: X's";
  } else {
    winnerText.innerText = "Winner: O's";
  }
  container.appendChild(winnerText);

  // calls restartGame function when clicked
  restartButton.onclick = function() {restartGame(restartButton, winnerText)};
}

// pushes current status of each box into an array in order to check win status
var getColorsArray = function(colorsArray) {
  for (var i = 0; i < 9; i++) {
    var color = squaresArray[i].style.color;
    colorsArray.push(color);
  }
}

// checks for diagonal win possibilites
var checkDiagonal = function() {
  var colorsArray = [];
  getColorsArray(colorsArray);
  if (colorsArray[4] != ""
    && (colorsArray[0] == colorsArray[4] && colorsArray[4] == colorsArray[8]
    || colorsArray[2] == colorsArray[4] && colorsArray[4] == colorsArray[6]))
  {
    console.log(colorsArray[4]);
    gameWon = true;
    enableRestart();
    console.log("WIN");
  }
}

// determines wins for horizontal and vertical possibilities
var checkPossibilities = function(colorsArray, direction) {
  var dirArr = [];
  var colorIndex;
  if (direction == "horizontal") {
    dirArr = [1, 2];
  } else {
    dirArr = [3, 6];
  }
  for (var i = 0; i < 3; i++) {
    if (direction == "horizontal") {
      colorIndex = i * 3;
    } else {
      colorIndex = i;
    }
    if (colorsArray[colorIndex] != "" && colorsArray[colorIndex + dirArr[0]] != "" && colorsArray[colorIndex + dirArr[1]] != "") {
      if (colorsArray[colorIndex] == colorsArray[colorIndex + dirArr[0]] && colorsArray[colorIndex + dirArr[0]] == colorsArray[colorIndex + dirArr[1]]) {
        gameWon = true;
        enableRestart();
        console.log("WIN");
      }
    }
  }
}

// checks for horizontal win possibilites
var checkHorizontal = function() {
  var colorsArray = [];
  getColorsArray(colorsArray);
  checkPossibilities(colorsArray, "horizontal");
}

// checks for vertical win possibilites
var checkVertical = function() {
  var colorsArray = [];
  getColorsArray(colorsArray);
  checkPossibilities(colorsArray, "vertical");

}
// checks board to see if there has been a winner
var checkForWin = function() {
  checkHorizontal();
  checkVertical();
  checkDiagonal();
}

// adds X or O to the board dependent on which user's turn it is
var addPlayerMove = function(currentSquare) {
  if (currentSquare.style.color == "") {
    if (turnSwitch == true) {
      currentSquare.setAttribute("style", "background-image: url('./images/o.png'); background-size: contain; color: red");
      turnSwitch = false;
    }
    else {
      currentSquare.setAttribute("style", "background-image: url('./images/x.png'); background-size: contain; color: yellow");
      turnSwitch = true;
    }
    checkForWin();
  }
}

// locates id of selected square
var getSquare = function(e) {
  if (gameWon != true) {
    var clickedSquare = document.getElementById(`${e.target.id}`);
    addPlayerMove(clickedSquare);
  }
}

// creates squares within the gameBoard element
var createBoard = function() {
  for (var i = 0; i < 9; i++) {
    var currentSquare = document.createElement("DIV");
    currentSquare.setAttribute(`id`, `${i}`);
    currentSquare.setAttribute("class", "singleSquare");
    gameBoard.appendChild(currentSquare);
    squaresArray.push(currentSquare);
  }
  console.log(squaresArray);
}

createBoard();
gameBoard.onclick = function(e) {getSquare(e)};
