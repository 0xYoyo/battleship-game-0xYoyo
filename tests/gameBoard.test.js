import { GameBoard, createGrid } from "../src/gameBoard";
import { Ship } from "../src/ship";

it("creates a 10x10 grid", () => {
  const testGrid = createGrid();
  expect(testGrid.length).toBe(10);
  expect(testGrid[7].length).toBe(10);
  expect(testGrid[7][4]).toBe(undefined);
});

it("changes direction, validates & places ship, gets hit, track missed shots and reports win", () => {
  const testBoard = GameBoard();
  testBoard.changeDirection();
  if (testBoard.validatePlace() == true) {
    testBoard.placeShip(3, 4, 3);
  }
  testBoard.receiveAttack(3, 4);
  testBoard.receiveAttack(3, 5);
  testBoard.receiveAttack(3, 6);
  testBoard.receiveAttack(7, 2);
  // expect(testBoard.getGrid()[3][5].isSunk()).toBe(true);
  expect(testBoard.getGrid()[7][2]).toBe("miss");
  expect(testBoard.allSunk()).toBe(false);
  expect(testBoard.getGrid()[4][4]).toBe(undefined);
});
