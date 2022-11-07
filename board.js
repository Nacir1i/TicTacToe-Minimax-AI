class Board {
  board = [];
  constructor() {
    for (let i = 0; i < 9; i++) {
      this.board[i] = new Cell(i);
    }
  }
}
