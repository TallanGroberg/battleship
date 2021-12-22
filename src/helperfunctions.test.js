

const random = require("./helperfunctions").random;
const placeShip = require("./helperfunctions").placeShip;


test('random numbers to be less than 10', () => {
  expect(random(0,9)).toBeLessThan(10);
  expect(random(0,8)).toBeLessThan(9);
  expect(random(0,7)).toBeLessThan(8);
  expect(random(3,3)).toBe(3);
});

test('x and y coords less than ten', () => {
  var ship = placeShip(random(0,10), random(0,10))
  
  expect(ship.x < 10)
  expect(ship.y < 10)
});
