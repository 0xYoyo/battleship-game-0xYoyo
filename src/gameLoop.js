import { Player } from "../src/player";
import {
  randomCoords,
  initBoards,
  renderBoards,
  attackValid,
} from "../helpers/helpers";
import { GameBoard, createGrid } from "../src/gameBoard";
import { Ship } from "../src/ship";

const newGame = () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  // Initialize game
  const p1 = Player();
  const p1Board = GameBoard();
  const p2 = Player();
  const p2Board = GameBoard();
  initBoards(p1Board, left, p2Board, right);
  // Place ships
  p2Board.randomlyPlaceShip(5, p2Board);
  p2Board.randomlyPlaceShip(4, p2Board);
  p2Board.randomlyPlaceShip(3, p2Board);
  p2Board.randomlyPlaceShip(3, p2Board);
  p2Board.randomlyPlaceShip(2, p2Board);
  p1Board.randomlyPlaceShip(5, p1Board);
  p1Board.randomlyPlaceShip(4, p1Board);
  p1Board.randomlyPlaceShip(3, p1Board);
  p1Board.randomlyPlaceShip(3, p1Board);
  p1Board.randomlyPlaceShip(2, p1Board);
  renderBoards(p1Board, p2Board);
  // Attack input event listener
  const rightCells = document.querySelectorAll(".rightCell");
  rightCells.forEach((cell) => {
    cell.addEventListener("click", function (event) {
      const rowNum = cell.getAttribute("data-").charAt(0);
      const colNum = cell.getAttribute("data-").charAt(2);
      if (attackValid(rowNum, colNum, p2Board)) {
        p1.attack(rowNum, colNum, p2Board);
        renderBoards(p1Board, p2Board);
        setTimeout(() => {
          p2.randomAttack(p1Board);
          renderBoards(p1Board, p2Board);
        }, 400);
        console.log(p2Board.getGrid());
      } else {
        return;
      }
    });
  });
  // Actual game loop
  //while (condition) {}
  return {};
};

export { newGame };
