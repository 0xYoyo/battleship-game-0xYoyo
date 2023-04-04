const randomCoords = () => {
  const xNum = Math.floor(Math.random() * 10);
  const yNum = Math.floor(Math.random() * 10);
  return [xNum, yNum];
};

const initBoards = (board1, location1, board2, location2) => {
  let rowCount = 0;
  board1.getGrid().forEach((row) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location1.appendChild(cell);
      cell.classList.add("leftCell");
      cell.setAttribute("data-", `${[rowCount, i]}`);
      // console.log(cell.getAttribute("data-").charAt(2));
    }
    rowCount++;
  });
  rowCount = 0;
  board2.getGrid().forEach((row) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location2.appendChild(cell);
      cell.classList.add("rightCell");
      cell.setAttribute("data-", `${[rowCount, i]}`);
    }
    rowCount++;
  });
};

const renderBoards = (board1, board2) => {
  const leftCells = document.querySelectorAll(".leftCell");
  const rightCells = document.querySelectorAll(".rightCell");
  leftCells.forEach((cell) => {
    const rowNum = cell.getAttribute("data-").charAt(0);
    const colNum = cell.getAttribute("data-").charAt(2);
    const cellContent = board1.getGrid()[rowNum][colNum];
    if (cellContent == "hit") {
      cell.classList.add("hit");
    } else if (cellContent == "miss") {
      cell.classList.add("miss");
    } else if (cellContent != undefined) {
      cell.classList.add("ship");
    }
  });
  rightCells.forEach((cell) => {
    const rowNum = cell.getAttribute("data-").charAt(0);
    const colNum = cell.getAttribute("data-").charAt(2);
    const cellContent = board2.getGrid()[rowNum][colNum];
    if (cellContent == "hit") {
      cell.classList.add("hit");
    } else if (cellContent == "miss") {
      cell.classList.add("miss");
    }
  });
};

const attackValid = (x, y, board) => {
  if (board.getGrid()[x][y] != "hit" && board.getGrid()[x][y] != "miss") {
    return true;
  } else {
    return false;
  }
};

module.exports = { randomCoords, initBoards, renderBoards, attackValid };
