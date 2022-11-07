class bot {
  constructor(player) {
    this.player = player;
  }

  playMove() {
    if (isHard) {
      this.bestMove();
    } else {
      this.randomMoves();
    }
  }

  randomMoves() {
    const randomMove =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];

    board.board[randomMove].placeMark(this.player);
  }

  bestMove() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.board.length; i++) {
      if (board.board[i].player === "none") {
        board.board[i].placeMark(this.player);
        const score = this.minimax(board.board, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
        board.board[i].undoMark();
      }
    }
    board.board[bestMove].placeMark("x");
  }

  minimax(moves, depth, isMax, memo = {}) {
    const gameState = isGameOver();
    if (gameState) {
      if (gameState === "x") {
        return scores[gameState] - depth;
      } else if (gameState === "o") {
        return scores[gameState] + depth;
      } else {
        return scores[gameState];
      }
    }

    if (isMax) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].player === "none") {
          moves[i].placeMark("x");
          const score = this.minimax(moves, depth++, false, memo);
          bestScore = Math.max(score, bestScore);
          moves[i].undoMark();
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].player === "none") {
          moves[i].placeMark("o");
          const score = this.minimax(moves, depth++, true, memo);
          bestScore = Math.min(score, bestScore);
          moves[i].undoMark();
        }
      }
      return bestScore;
    }
  }
}
