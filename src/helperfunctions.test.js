

const random = require("./helperfunctions").random;
const placeShip = require("./helperfunctions").placeShip;
const inBounds = require("./helperfunctions").inBounds;
const makeCol = require("./helperfunctions").makeCol;
const makeRow = require("./helperfunctions").makeRow;
const checkForShips = require("./helperfunctions").checkForShips;
const playerFactory = require("./helperfunctions").playerFactory;
const makeBoard = require("./helperfunctions").makeBoard;
const printBoard = require("./helperfunctions").printBoard;


test('random numbers to be less than 10', () => {
  expect(random(0,9)).toBeLessThan(10);
  expect(random(0,8)).toBeLessThan(9);
  expect(random(0,7)).toBeLessThan(8);
  expect(random(3,3)).toBe(3);
});

test('x and y coords less than ten', () => {
    var coord = placeShip(random(0,9), random(0,9))
    expect(coord.x < 10)
    expect(coord.y < 10)

});

test('expect x and y to be between 0 and 9 inclusive', () => {
  expect(inBounds({x: 10, y: 1})).toBe(false);
  expect(inBounds(placeShip(9, -1))).toBe(false);
  expect(inBounds(placeShip(9, 10))).toBe(false);
  expect(inBounds(placeShip(10, 0))).toBe(false);
  expect(inBounds(placeShip(-1, 0))).toBe(false);

  expect(inBounds(placeShip(9, 0))).toBe(true);
  expect(inBounds(placeShip(5, 5))).toBe(true);
})


test('makeCol will not let a ships coords go out of bounds', () => {
  let ship = {horiz: 0, type: 5, coords: [{x:8, y:9}]}
  ship = makeCol(ship, {ships: []});
  expect(ship.length).toBe(5)
  
  ship = {horiz: 0, type: 5, coords: [{x:8, y:0}]}
  ship = makeCol(ship, {ships: []});
  expect(ship.length).toBe(5)

  ship = {horiz: 0, type: 5, coords: [{x:8, y:3}]}
  ship = makeCol(ship, {ships: []});
  expect(ship.length).toBe(5)

  ship = {horiz: 0, type: 5, coords: [{x:0, y:6}]}
  ship = makeCol(ship, {ships: []});
  expect(ship.length).toBe(5)

})
test('makeRow will not let a ships coords go out of bounds', () => {

  let ship = {horiz: 0, type: 5, coords: [{x:9, y:8}]}
  ship = makeRow(ship,{ships: []});
  expect(ship.length).toBe(5)
  
  ship = {horiz: 0, type: 5, coords: [{x:0, y:8}]}
  ship = makeRow(ship,{ships: []});
  expect(ship.length).toBe(5)

  ship = {horiz: 0, type: 5, coords: [{x:3, y:8}]}
  ship = makeRow(ship,{ships: []});
  expect(ship.length).toBe(5)

  ship = {horiz: 0, type: 5, coords: [{x:6, y:0}]}
  ship = makeRow(ship,{ships: []});
  expect(ship.length).toBe(5)
})

test('checkForShips should not let a ship get built where another ship exists', () => {
  var player = {
                ships: [ // ships
                          { coords: [ {x: 1, y: 2}, {x:2, y:2} ] }, 
                          { coords: [ {x: 0, y: 0}, {x:1, y:0} ] }, 
                          { coords: [{x: 4, y: 1}, {x:4, y:2}, {x: 4, y:3}] },
                          { coords: [ {x: 0, y: 0}, {x:0, y:1} ] },
                          { coords: [ {x: 0, y: 5},  {x: 0, y: 6}] },
                        ]
                }
      expect(checkForShips(player, {x: 2,y:2}, 2, true)).toBeFalsy()
      expect(checkForShips(player, {x: 2,y:2}, 2, false)).toBeFalsy()
      expect(checkForShips(player, {x: 1,y:1}, 2, false)).toBeFalsy()
      expect(checkForShips(player, {x: 1,y:2}, 2, false)).toBeFalsy()
      expect(checkForShips(player, {x: 2,y:1}, 2, true)).toBeTruthy()
      expect(checkForShips(player, {x: 3,y:1}, 3, true)).toBeTruthy()
      expect(checkForShips(player, {x: 3,y:1}, 4, true)).toBeFalsy()
      expect(checkForShips(player, {x: 1,y:1}, 3, true)).toBeTruthy()
      expect(checkForShips(player, {x: 1,y:1}, 4, true)).toBeFalsy()
      expect(checkForShips(player, {x: 0,y:3}, 2, false)).toBeTruthy()

      expect(checkForShips(player, {x: 0,y:4}, 2, false)).toBeTruthy()
      expect(checkForShips(player, {x: 0,y:2}, 2, false)).toBeTruthy()
      expect(checkForShips(player, {x: 0,y:4}, 3, false)).toBeTruthy()
      expect(checkForShips(player, {x: 0,y:2}, 3, false)).toBeTruthy()
      expect(checkForShips(player, {x: 0,y:4}, 4, false)).toBeFalsy()
      expect(checkForShips(player, {x: 0,y:2}, 4, false)).toBeFalsy()

      expect(checkForShips(player, {x: 0,y:7}, 4, false)).toBeFalsy()
      expect(checkForShips(player, {x: 0,y:9}, 4, false)).toBeFalsy()
      expect(checkForShips(player, {x: 0,y:9}, 3, false)).toBe('up')


      // expect(checkForShips(player, {x: 2,y:2}) === false)
      // expect(checkForShips(player, {x: 1,y:2}) === false)
      
      // expect(checkForShips(player, {x: 3,y:1}) === true)
      // expect(checkForShips(player, {x: 4,y:1}) === false)
      // expect(checkForShips(player, {x: 4,y:2}) === false)
      // expect(checkForShips(player, {x: 4,y:3}) === false)

      // expect(checkForShips(player, {x: 0,y:1}) === false)
      // expect(checkForShips(player, {x: 1,y:0}) === false)
      // expect(checkForShips(player, {x: 2,y:0}) === false)



})

test('PlayerFactory should create a new player with everything they would need to start a game.', () => {
  var player = playerFactory()
  // console.log(player)
  for(var i = 0; i < player.ships.length; i++) {
    expect(typeof(player.ships[i].x) === typeof(Number) )
    expect(typeof(player.ships[i].y) === typeof(Number) )
  }
  expect(player.ships[0].coords.length).toBe(2)
  expect(player.ships[1].coords.length).toBe(3)
  expect(player.ships[2].coords.length).toBe(3)
  expect(player.ships[3].coords.length).toBe(4)
  expect(player.ships[4].coords.length).toBe(5)
})

test("prints board to console", () => {
  var player = playerFactory()
  var board = makeBoard(player)
  printBoard(board)
})




