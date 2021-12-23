
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

export function playerFactory() {
    var player = {}
    player['ships'] = []
    player["tries"] = []
    player['hasDestoyed'] = 0
    player['shipsLeft'] = 5

    for (let i = 0; i < 6; i++) {
        if(i === 3) {
            player.ships.push(makeShip({}, 3, player)) 
            player.ships.push(makeShip({}, 3, player)) 
        } else if(i >= 2) {
            player.ships.push(makeShip({}, i, player)) 
        }
        
    }

    return player

}


//REQUIRES row and col are less than ten. 
export function matrixAt(row, col) {
    const width = 10;
    const i = (width * row) + col;
    return i;
}

// generates random numbers between two and values.
 //min, max inclusive
 function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;

	return num;

}



// a ship is an object with the following properties. 
// coordinates follow these constraints
        // if the ship is horizontal x: + or - x prev position.
        // if the ship is vertical y: + or - y prev position.
        // all x and y >= 0
        // x and y do not overlap any other ships a player has.
        //first coord is randomly assigned.
        // horiz or vert is randomly assigned.

function makeShip(ship, size, player) {
    const start = placeShip(random(0,9), random(0,9));
    ship['horiz'] = random(0,1)
    ship["type"] = size;
    ship["coords"] = [start]
    ship["hits"] = 0
    
 
        // if 0 ship is horizontal else vertical

        if(ship.horiz === 0) {
            ship.coords = makeCol(ship, player)
        } else {
            ship.coords = makeRow(ship, player)
        }

        
        
    
    return ship
}

// ship has to have a type. 
// returns an array of coords that make up the ship. 
function makeCol(ship, player) {
    let start = ship.coords[0]
    for (let i = 0; i < ship.type - 1; i++) {

        if(inB(start.y + ship.type) ) {
            ship.coords.push(placeShip(start.x, start.y + i + 1)) 
        } else if( inB(start.y - ship.type) ) {
            ship.coords.push(placeShip(start.x, start.y - i - 1))
        } else {
            ship.coords = []
            makeShip(ship, ship.type)
        }

    }

    return ship.coords
}

// ship has to have a type 
function makeRow(ship, player) {
    let start = ship.coords[0]
    for (let i = 0; i < ship.type - 1; i++) {

        if(inB(start.x + ship.type) 
            && checkForShips(player, 
            placeShip(start.x + i + 1, start.y )) 
        ) {
            ship.coords.push(placeShip(start.x + i + 1, start.y )) 
        } else if( inB(start.x - ship.type) 
                && placeShip(start.x - i - 1, start.y)
                ) {
            ship.coords.push(placeShip(start.x - i - 1, start.y))
        } else {
            ship.coords = []
            makeShip(ship, ship.type, player)
        }
    }

    return ship.coords
    
}

// cases needed. 
    // checks if the type of ship fits between 2 spaces
        // returns false if the ship will be placed where an existing ship already is.

function checkForShips(player, coord) {
    for( var i = 0; i < player.ships.length; i++) {
        for (let j = 0; j < player.ships[i].length; j++) {
            if(player.ships[i].x === coord.x
                && 
                player.ships[i].y === coord.y) {
                    return false
                }
            
        }
        
    }
    return true;
}

// returns the starting position of a ship
function placeShip(row, col) {

    return {x: row, y: col}
}


// returns true if a ship is horizontal else false;
function isHoriz(ship) {
    if(ship["horiz"] === 0) 
        return true;
    else 
        return false;
}

// if a coord is < 0 or coord > 9 returns false else true
function inBounds(ship) {
    if(inB(ship.x) && inB(ship.y))
    return true;
        else
    return false;
}

function inB(num) {
    if(num >= 0 && num <= 9) 
        return true
    else 
        return false;
}

// checks to see if any other ship has same coords
function shipIsThere(fleet) {
 return false;
}

// returns a string with the type of ship based on how many coordinates it has.
export function whatType(ship) {
    if(ship.length === 5) return "C"
    if(ship.length === 4) return "Ba"
    if(ship.length === 3) return "Cru"
    if(ship.length === 2) return "D"
}

// module.exports = {  
//                 random, 
//                 placeShip,
//                 inBounds, 
//                 makeShip,
//                 shipIsThere,
//                 makeCol,
//                 makeRow,
//                 checkForShips,
//                 playerFactory
//                 };