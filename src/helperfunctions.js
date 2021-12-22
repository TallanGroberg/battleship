
// takes a row and column for a 2D array and gives the value as if it was 1D

/* 
 let ship = {
     type: 2,
     horiz: 0,
     coords: [
         {x: 1, y: 1},{x: 1, y:2}
     ],
     hits: [
         {x: 1, y:1}
     ]

 }
 
 let player = {
     ships: [   
         {...}, {...}, ...
    ]
    tries: [
        {...}, {...}, ...
    ]
    hasDestroyed: 1,
    shipsLeft: 2,
}
*/


//REQUIRES row and col are less than ten. 
function matrixAt(row, col) {
    const width = 10;
    const i = (width * row) + col;
    return i;
}

// generates random numbers between one and ten.
function random(min, max) {

	return Math.floor(Math.random() * (max - min + 1)) + min;

}



// a ship is an object with the following properties. 
// coordinates follow these constraints
        // if the ship is horizontal x: + or - x prev position.
        // if the ship is vertical y: + or - y prev position.
        // all x and y >= 0
        // x and y do not overlap any other ships a player has.
        //first coord is randomly assigned.
        // horiz or vert is randomly assigned.

function makeShip(size) {
    let ship = {};
    const start = placeShip(random(0,9), random(0,9));

    for (let i = 0; i < size; i++) {
        // if 0 ship is horizontal else vertical
        ship['horiz'] = random(0,1)

        if(ship.horiz === 0) {
            
        }
        
    }
    return {}
}

// returns the starting position of a ship
function placeShip(row, col) {

    return {x: row, y: col}
}


// returns true if a ship is horizontal else false;
function isHoriz(ship) {
    return true;
}

// if a coord is < 0 or coord > 9 returns false else true
function inBounds(ship) {
    if(ship.x > 0 && ship.x < 9) {return true}

    return false;
}

// checks to see if any other ship has same coords
function shipIsThere(fleet) {
 return false;
}

// returns a string with the type of ship based on how many coordinates it has.
function whatType(ship) {
    if(ship.length === 5) return "Carrier"
    if(ship.length === 4) return "Battleship"
    if(ship.length === 3) return "Cruiser"
    if(ship.length === 2) return "Destroyer"
}

module.exports = {  
                random, 
                placeShip,
                inBounds, 
                makeShip,
                shipIsThere
                };