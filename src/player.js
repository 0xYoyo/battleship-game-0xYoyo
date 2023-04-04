import { Ship } from "../src/ship";
import { GameBoard } from "../src/gameBoard";
import { randomCoords } from "../helpers/helpers";

const Player = () => {
  let name;
  const attack = (x, y, board) => {
    // console.log(board.getGrid()[x][y]);
    if (board.getGrid()[x][y] != "hit" && board.getGrid()[x][y] != "miss") {
      board.receiveAttack(x, y);
    }
  };

  const randomAttack = (board) => {
    attack(...randomCoords(), board);
  };
  return { attack, randomAttack };
};

export { Player };
