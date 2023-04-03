import { Ship } from "../src/ship";

it("sinks the ship after 2 hits", () => {
  const newShip = Ship(2);
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
  expect(newShip.len).toBe(2);
});
