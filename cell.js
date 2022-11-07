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

    newCell.addEventListener("click", () => {
      if (!gameOver && this.player === "none") {
        this.placeMark("o");
        nextTurn();
      }
    });

    this.x = x;
    this.newCell = newCell;
  }

  placeMark(mark) {
    const playerMark = document.createElement("h1");
    const index = availableMoves.indexOf(this.x);
    let color = "";

    playerMark.textContent = mark;
    this.newCell.appendChild(playerMark);
    if (mark === "x") {
      color = "#347474";
    } else {
      color = "rgb(175 67 98)";
    }
    this.newCell.style.backgroundColor = color;
    this.player = mark;
    availableMoves.splice(index, 1);
  }

  undoMark() {
    this.newCell.innerHTML = "";
    this.newCell.style.backgroundColor = "rgb(175, 175, 175)";
    this.player = "none";
    availableMoves.push(this.x);
  }
}
