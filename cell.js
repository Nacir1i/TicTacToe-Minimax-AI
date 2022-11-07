class Cell {
  x = 0;
  player = "none";
  newCell = null;

  constructor(x) {
    const board = document.querySelector(".boardDiv");
    const newCell = document.createElement("div");

    newCell.classList.add("newCell");
    newCell.classList.add("flexCenter");
    board.appendChild(newCell);

    newCell.addEventListener(
      "click",
      () => {
        if (!gameOver && this.player === "none") {
          this.placeMark("o");
          nextTurn();
        }
      },
      {
        once: true,
      }
    );

    this.x = x;
    this.newCell = newCell;
  }

  placeMark(mark) {
    const playerMark = document.createElement("h1");
    const index = availableMoves.indexOf(this.x);

    playerMark.textContent = mark;
    this.newCell.appendChild(playerMark);
    this.player = mark;
    availableMoves.splice(index, 1);
  }

  undoMark() {
    this.newCell.innerHTML = "";
    this.player = "none";
    availableMoves.push(this.x);
  }
}
