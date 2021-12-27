
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

// returns the starting position of a ship
function placeShip(row, col) {

    return {x: row, y: col}
}

//REQUIRES row and col are less than ten. 
function matrixAt(row, col) {
    const width = 10;
    const i = (width * col) + row;
    return i;
}

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

  function playerFactory() {
    var player = {}
    player['ships'] = []
    player["tries"] = []
    player['hasDestoyed'] = 0
    player['shipsLeft'] = 5

    for (let i = 2; i < 6; i++) {
        if(i === 3) {
            player.ships.push(makeShip({}, 3, player)) 
            player.ships.push(makeShip({}, 3, player)) 
        } else if(i >= 2) {
            player.ships.push(makeShip({}, i, player)) 
        }
        
    }
    return player
}



function makeBoard(player) {

let board = Array(100).fill(" ")
    
    for (let i = 0; i < player.ships.length; i++) {
        for (let j = 0; j < player.ships[i].coords.length; j++) {
            var coord = matrixAt(
                player.ships[i].coords[j].x, 
                player.ships[i].coords[j].y
                )
            board[ coord ] = whatType(player.ships[i])
            
        }
        
    }

    return board
}

function printBoard(board) {
    // for (let i = 0; i < 10; i++) {
    //     for (let j = 0; j < 10; j++) {
    //         console.log(board[matrixAt(i,j)])
            
    //     }
        console.log(board)
    // }
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
    const size = ship.type
    let direction = checkForShips(player,start, ship.type, false)
    if(typeof(direction) !== "string") {
        makeShip({}, ship.type, player)
    }


    if(direction == "up") {
        for (let i = start.y - size + 1; i < start.y; i++) {
            ship.coords.push( {x: start.x, y: i}) 
        }
    } else {
        for (let i = start.y; i < start.y + size - 1; i++) {
            ship.coords.push({x: start.x, y: i}) 
        }
    }

    return ship.coords
}

// ship has to have a type 
function makeRow(ship, player) {
    let start = ship.coords[0]
    let size = ship.type
    let direction = checkForShips(player,start, ship.type, true)
    if(typeof(direction) !== "string") {
        makeShip({}, ship.type, player)
    }
    
    if(direction == "left") {
        for (let i = start.x - size + 1; i < start.x; i++) {
            ship.coords.push({x: i, y: start.y})
        }
    } else {
        for (let i = start.x; i < start.x + size - 1; i++) {
            ship.coords.push( {x: i, y: start.y })
        }
    }



    return ship.coords
}



// cases needed. 
    // checks if the type of ship fits between 2 spaces
        // returns false if the ship will be placed where an existing ship already is or is out of bounds.
        // returns which direction to build if you can build there
        // does this for the whole interval from where a ship starts to ends and ever value in between.

function checkForShips(player, start, size, isHoriz) {
    var canBuild = false;
    // case 0
        // ship is at the start pos. 
        if(shipIsThere(player.ships, start)) return false;
    // case 1 horizontal
        // sub case check left. 
    // case 2 horizontal
        // subcase check right
            // if one is true return true
    if(isHoriz) {
        var left = checkLeft(player, start, size)
        var right = checkright(player, start, size);
        if(left) return "left"
        if(right) return "right"
        return false
    }

    // case 3 !horiz
        // subcase check up
    // case 4 !horiz
        // subcase check down. 
            // if one is true return true
    if(!isHoriz) {
        var up = checkUp(player, start, size);
        var down = checkDown(player, start, size) 
        if(up) return "up"
        if(down) return "down"
        return false
    }

    return canBuild;
}

function checkLeft(player, start, size) {
    for (let i = start.x - size + 1; i < start.x; i++) {
        if(shipIsThere(player.ships, {x: i, y: start.y }) || !inB(i)) {
            return false;
        }
    }
    return true;
}
function checkright(player, start, size) {
    for (let i = start.x; i < start.x + size; i++) {
        if(shipIsThere(player.ships, {x: i, y: start.y }) || !inB(i)) {
            return false
        }
    }
    return true

}
function checkUp(player, start, size) {
        for (let i = start.y - size + 1; i < start.y; i++) {
            var colision = shipIsThere(player.ships, {x: start.x, y: i})
            var inbounds = inB(i)
            if(colision || !inbounds) {
                return false
            }
        }
    return true
}
function checkDown(player, start, size) {
    for (let i = start.y; i < start.y + size; i++) {
        var colision = shipIsThere(player.ships, {x: start.x, y: i})
        if(colision || !inB(i)) {
            return false
        }
    }
    return true;
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
function shipIsThere(fleet, coord) {
    for (let i = 0; i < fleet.length; i++){
        for (let j = 0; j < fleet[i].coords.length; j++) {
            var fleetCoord = JSON.stringify(fleet[i].coords[j])
            var potentialCord = JSON.stringify(coord)
            if(fleetCoord === potentialCord) {
                return true;
            }
            
        }
    }

 return false;
}

// returns a string with the type of ship based on how many coordinates it has.
  function whatType(ship) {
    if(ship.type === 5) return "C"
    if(ship.type === 4) return "Ba"
    if(ship.type === 3) return "Cru"
    if(ship.type === 2) return "D"
}

module.exports = {  
                random, 
                placeShip,
                inBounds, 
                makeShip,
                shipIsThere,
                makeCol,
                makeRow,
                checkForShips,
                playerFactory,
                makeBoard, 
                printBoard,
                };