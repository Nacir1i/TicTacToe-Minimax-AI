//DOM elements:
const gameResult = document.querySelector(".gameResult");
const popUp = document.querySelector(".popUp");

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
let botsTurn = false;
let gameOver = false;

//Methods :
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
  } else if (winner === "x") {
    gameResult.innerHTML = `<img class="result" src="/source/Defeat.png"></img>`;
  } else {
    gameResult.innerHTML = `<img class="result" src="/source/Victory.png"></img>`;
  }
  // popUp.classList.toggle("show");
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

botsMove();
