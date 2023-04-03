const randomCoords = () => {
  const xNum = Math.floor(Math.random() * 10);
  const yNum = Math.floor(Math.random() * 10);
  return [xNum, yNum];
};

const initBoards = (board1, location1, board2, location2) => {
  board1.getGrid().forEach((column) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location1.appendChild(cell);
    }
  });
  board2.getGrid().forEach((column) => {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("button");
      location2.appendChild(cell);
    }
  });
};
module.exports = { randomCoords, initBoards };
