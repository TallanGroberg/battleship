



const random = require("../helperfunctions").random;
const matrixAt = require("../helperfunctions").matrixAt
const build = require("../helperfunctions").build
const assignDirection = require("../helperfunctions").assignDirection
const placeShip = require("../helperfunctions").placeShip;
const inBounds = require("../helperfunctions").inBounds;
const makeCol = require("../helperfunctions").makeCol;
const makeRow = require("../helperfunctions").makeRow;
const checkForShips = require("../helperfunctions").checkForShips;
const playerFactory = require("../helperfunctions").playerFactory;
const makeBoard = require("../helperfunctions").makeBoard;
const printBoard = require("../helperfunctions").printBoard;




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
    expect(coord.x >= 0)
    expect(coord.y >= 0)

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

test('assigning direction', () => {
  expect(assignDirection(0)).toBe("horiz")
  expect(assignDirection(1)).toBe("vert")
  expect(assignDirection(2)).toBe("NOT ASSIGNED")

})


test('makeCol will not let a ships coords go out of bounds', () => {


})
test('makeRow will not let a ships coords go out of bounds', () => {


})

test('checkForShips should not let a ship get built where another ship exists', () => {
  var player = {
                ships: [ // ships
                          { coords: [ {x: 1, y: 2}, {x:2, y:2} ] }, 
                          { coords: [{x: 4, y: 1}, {x:4, y:2}, {x: 4, y:3}] },
                          { coords: [{x: 1, y: 4}, {x:2, y:4}, {x: 3, y:4}] },
                          { coords: [ {x: 0, y: 2}, {x:0, y:3},{x: 0, y: 4}, {x:0, y:5} ] },
                          { coords: [ {x: 3, y: 6},  {x: 4, y: 6},{x: 5, y: 6},  {x: 6, y: 6}, {x: 7, y: 6} ] }
                        ]
                }

      expect(checkForShips(player,{x: 1,y:2 }, 2, "horiz")).toBe(false)
      expect(checkForShips(player,{x: 4,y:6 }, 2, "horiz")).toBe(false)
      
      expect(checkForShips(player,{x: 0,y:5 }, 5, "horiz")).toBe(false)
      expect(checkForShips(player,{x: 2,y:1 }, 3, "horiz")).toBe("left")
      expect(checkForShips(player,{x: 2,y:1 }, 4, "horiz")).toBe(false)
      // left checks 
      expect(checkForShips(player,{x: 3,y:3 }, 2, "horiz")).toBe("left")
      expect(checkForShips(player,{x: 2,y:3 }, 2, "horiz")).toBe("left")
      
      expect(checkForShips(player,{x: 1,y:3 }, 2, "horiz")).toBe("right")

      expect(checkForShips(player,{x: 3,y:2 }, 2, "horiz")).toBe(false)
      expect(checkForShips(player,{x: 2,y:3 }, 3, "horiz")).toBe(false)
      // right checks
      expect(checkForShips(player,{x: 1,y:3 }, 2, "horiz")).toBe("right")
      expect(checkForShips(player,{x: 0,y:1 }, 4, "horiz")).toBe("right")
      expect(checkForShips(player,{x: 0,y:1 }, 5, "horiz")).toBe(false)
      
      // up checks
      expect(checkForShips(player,{x: 2,y:1 }, 2, "vert")).toBe("up")
      expect(checkForShips(player,{x: 4,y:5 }, 2, "vert")).toBe("up")
      expect(checkForShips(player,{x: 4,y:5 }, 3, "vert")).toBe(false)
      expect(checkForShips(player,{x: 5,y:5 }, 6, "vert")).toBe("up")
      expect(checkForShips(player,{x: 5,y:5 }, 7, "vert")).toBe(false)
      
      
      // down checks. 
      expect(checkForShips(player,{x: 5,y:0 }, 7, "vert")).toBe(false)
      expect(checkForShips(player,{x: 5,y:0 }, 6, "vert")).toBe("down")
      
      expect(checkForShips(player,{x: 3,y:5 }, 2, "vert")).toBe(false)
      expect(checkForShips(player,{x: 8,y:5 }, 5, "vert")).toBe("up")
      expect(checkForShips(player,{x: 8,y:4 }, 7, "vert")).toBe(false)
      expect(checkForShips(player,{x: 0,y:7 }, 3, "vert")).toBe("down")
      expect(checkForShips(player,{x: 0,y:7 }, 4, "vert")).toBe(false)

})

test('build a ship from a start position in a certain direction', () => {
  const left = [{x: 1, y: 3},{x: 2, y: 3},{x: 3, y: 3},]
  const resultL = build({ coords: [ {x:3, y:3}] }, {x: 3, y: 3}, 3, "left")
  for (let i = 0; i < resultL.coords.length; i++) {
    const element = resultL.coords[i]
    const check = left[i]
    expect(element.x).toBe(check.x)
    expect(element.y).toBe(check.y)
  }

  const right = [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}]
  const resultR = build({ coords: [{x: 0, y: 1} ] }, {x:0, y:1}, 4, "right")

  for (let i = 0; i < resultR.coords.length; i++) {
    const element = resultR.coords[i]
    const check = right[i]
    expect(element.x).toBe(check.x)
    expect(element.y).toBe(check.y)
  }

  const up = [{x: 4, y: 4}, {x: 4, y: 5}]
  const resultU = build({coords: [{x:4,y:5} ] }, {x:4,y:5}, 2, "up")

  for (let i = 0; i < resultU.coords.length; i++) {
    const element = resultU.coords[i]
    const check = up[i]
    expect(element.x).toBe(check.x)
    expect(element.y).toBe(check.y)
  }
  const down = [{x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3},]
  const resultD = build({coords: [{x: 3, y: 1}, ] }, {x:3,y:1}, 3, "down")

  for (let i = 0; i < resultD.coords.length; i++) {
    const element = resultD.coords[i]
    const check = down[i]
    expect(element.x).toBe(check.x)
    expect(element.y).toBe(check.y)
  }

  
})

test('PlayerFactory should create a new player with everything they would need to start a game.', () => {
 let board = makeBoard()
 printBoard(board)
})

test("prints board to console", () => {

})




