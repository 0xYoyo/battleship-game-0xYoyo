import { Player } from "../src/player";
import {
  randomCoords,
  initBoards,
  renderBoards,
  attackValid,
  disableBoards,
} from "../helpers/helpers";
import { GameBoard, createGrid } from "../src/gameBoard";
import { Ship } from "../src/ship";

const newGame = () => {
  const container = document.querySelector(".container");
  const left = document.createElement("div");
  container.appendChild(left);
  left.classList.add("left");
  const right = document.createElement("div");
  container.appendChild(right);
  right.classList.add("right");
  const popUpWin = document.querySelector("#popupW");
  const popUpLose = document.querySelector("#popupL");
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
        if (p2Board.allSunk()) {
          disableBoards();
          popUpWin.style.display = "block";
        } else {
          setTimeout(() => {
            p2.randomAttack(p1Board);
            renderBoards(p1Board, p2Board);
            if (p1Board.allSunk()) {
              disableBoards();
              popUpLose.style.display = "block";
            }
          }, 400);
        }
        console.log(p2Board.getGrid());
      } else {
        return;
      }
    });
  });
};

const restartGame = () => {
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  right.remove();
  left.remove();
  newGame();
};

export { newGame, restartGame };
