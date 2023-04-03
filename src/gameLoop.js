import { Player } from "../src/player";
import { randomCoords, initBoards } from "../helpers/helpers";
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

  const renderBoard = (board) => {};
  return { renderBoard };
};

export { newGame };
