import { randomCoords } from "../helpers/helpers";
import { Ship } from "../src/ship";

const GameBoard = () => {
  // Initialize board
  const newGrid = [];
  for (let i = 0; i < 10; i++) {
    newGrid[i] = new Array(10);
  }
  let sunkCounter = 0;
  let direction = "horizontal";
  // Direction changer
  const changeDirection = () => {
    if (direction == "horizontal") {
      direction = "vertical";
    } else {
      direction = "horizontal";
    }
  };
  // Direction randomizer
  const randomDirection = () => {
    if (Math.random() > 0.5) {
      changeDirection();
    }
  };
  // Placement validation
  const validatePlace = (x, y, len) => {
    if (direction == "horizontal") {
      if (x + len >= 10) {
        return false;
      }
    } else {
      if (y + len >= 10) {
        return false;
      }
    }
    for (let i = 0; i < len; i++) {
      if (newGrid[x][y] != undefined) {
        return false;
      }
      if (direction == "horizontal") {
        x++;
      } else {
        y++;
      }
    }
    return true;
  };
  // Place ship on board
  const placeShip = (x, y, len) => {
    const newShip = Ship(len);
    for (let i = 0; i < len; i++) {
      newGrid[x][y] = newShip;
      //console.log([x, y]);
      if (direction == "horizontal") {
        x++;
      } else {
        y++;
      }
    }
  };
  // Randomly place ship on the board
  const randomlyPlaceShip = (shipLen, pBoard) => {
    randomDirection();
    const coords = randomCoords();
    if (pBoard.validatePlace(...coords, shipLen) == true) {
      pBoard.placeShip(...coords, shipLen);
    } else {
      randomlyPlaceShip(shipLen, pBoard);
    }
  };
  // Receives attacks on specific coordinates
  const receiveAttack = (x, y) => {
    if (newGrid[x][y] == undefined) {
      newGrid[x][y] = "miss";
      //return newGrid[x][y];
    } else if (
      newGrid[x][y] != undefined &&
      newGrid[x][y] != "hit" &&
      newGrid[x][y] != "miss"
    ) {
      newGrid[x][y].hit();
      if (newGrid[x][y].isSunk() == true) {
        sunkCounter++;
      }
      newGrid[x][y] = "hit";
      // return newGrid[x][y];
    } else {
      // return false;
    }
  };
  const getGrid = () => {
    return newGrid;
  };
  const allSunk = () => {
    if (sunkCounter == 5) {
      return true;
    } else {
      return false;
    }
  };
  return {
    placeShip,
    receiveAttack,
    getGrid,
    allSunk,
    changeDirection,
    randomDirection,
    validatePlace,
    randomlyPlaceShip,
  };
};

const createGrid = () => {
  const grid = [];
  for (let i = 0; i < 10; i++) {
    grid[i] = new Array(10);
  }
  return grid;
};

export { GameBoard, createGrid };
