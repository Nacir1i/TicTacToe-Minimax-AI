//DOM elements:
const gameResult = document.querySelector(".gameResult");
const popUp = document.querySelector(".popUp");
const hard = document.querySelector(".hard");
const easy = document.querySelector(".easy");

popUp.addEventListener("click", () => {
  popUp.classList.toggle("show");
});

hard.addEventListener("click", () => {
  isHard = true;
  startGame();
});

easy.addEventListener("click", () => {
  isHard = false;
  startGame();
});

//Properties :
const board = new Board();
const botPlayer = new bot("x");
const scores = {
  x: 10,
  o: -10,
  tie: 0,
};
const winPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let botsTurn = true,
  gameOver = true,
  isHard = false;

//Methods :
function startGame() {
  for (let i = 0; i < board.board.length; i++) {
    board.board[i].newCell.innerHTML = "";
    board.board[i].newCell.style.backgroundColor = "rgb(175, 175, 175)";
    board.board[i].player = "none";
    availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }
  gameOver = false;
  botsTurn = true;
  botsMove();
}

function nextTurn() {
  const gameState = isGameOver();
  if (gameState) {
    announceWinner(gameState);
    gameOver = true;
    return;
  }
  botsTurn = !botsTurn;
  botsMove();
}

function botsMove() {
  if (botsTurn) {
    botPlayer.playMove();
    nextTurn();
  }
}

function announceWinner(winner) {
  if (winner === "tie") {
    gameResult.innerHTML = `<img class="result" src="source/fortniteDefeat.png"></img>`;
  } else if (winner === "x") {
    gameResult.innerHTML = `<img class="result" src="source/Defeat.png"></img>`;
  } else {
    gameResult.innerHTML = `<img class="result" src="source/Victory.png"></img>`;
  }
  popUp.classList.toggle("show");
  console.log(winner);
}

function isGameOver() {
  if (botWins()) {
    return "x";
  }
  if (humanWins()) {
    return "o";
  }
  if (tie()) {
    return "tie";
  }

  return false;
}

function botWins() {
  return winPositions.some((position) => {
    return position.every((index) => {
      return board.board[index].player === "x";
    });
  });
}

function humanWins() {
  return winPositions.some((position) => {
    return position.every((index) => {
      return board.board[index].player === "o";
    });
  });
}

function tie() {
  if (availableMoves.length === 0) {
    return true;
  }
}
