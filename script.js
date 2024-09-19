//The querySelectorAll() method returns a NodeList.
//NodeList is array-like collections (lists) of nodes (elements) extracted from a document. The nodes can be accessed by index numbers. The index starts at 0.
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//let's create a function to initialize the game
function initGame() {
  currentPlayer = "X";
  //intialy jab game start hoga sba empty hoga //yeh innerlogic hain //isse ui pe farq nahe padega
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //ui par bhe empty karna padega boxes ko
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    boxes[index].classList.remove("win");
  });
  //game jab start hoga tab new game ko hide rakhna hain
  newGameBtn.classList.remove("active");
  //starting me value Current Player X hone chaheye
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and should have same value
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is x
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      //now e X/O is winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }

    if (answer != "") {
      gameInfo.innerText = `Winner Player - ${answer}`;
      newGameBtn.classList.add("active");
      return;
    }

    //let's check wheather there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
      if (box != "") fillCount++;
    });

    //board is filled game is Tie
    if (fillCount == 9) {
      gameInfo.innerText = "Game Tied";
      newGameBtn.classList.add("active");
    }
  });
}
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  //UI update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function handleClick(index) {
  //if the value in that box is empty tab he me kuch karuga
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap karo turn ko
    swapTurn();
    //check karo koi jeta toh nahe hain
    checkGameOver();
  }
}
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
