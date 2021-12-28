

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
export function matrixAt(row, col) {
    const width = 10;
    const i = (width * row) + col;
    return i;
}

export function fromMatrix(coordinate) {
    return {x: ((coordinate) - coordinate % 10) / 10, y: coordinate % 10}
}

 export function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

  export function playerFactory() {
    var player = {}
    player['ships'] = []
    player["tries"] = []
    player['hasDestoyed'] = 0
    player['shipsLeft'] = 5

    for (let i = 2; i < 6; i++) {
        if(i === 3) {
            player.ships.unshift(makeShip({}, 3, player))
            player.ships.unshift(makeShip({}, 3, player))
        } else {
            player.ships.unshift(makeShip({}, i, player))
        }
        
    }

    return player
}



export function makeBoard(player) {
    

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

        console.log(board)
   
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
    
    ship['direction'] = assignDirection(random(0,1))
    ship["type"] = size;
    ship["coords"] = [placeShip(random(0,9), random(0,9))]
    ship["hits"] = 0
    let direction = checkForShips(player, ship.coords[0], size, ship.direction)

    while(direction === false) {
        ship["coords"] = [placeShip(random(0,9), random(0,9))]
        direction = checkForShips(player, ship.coords[0], size, ship.direction)
    }

    build(ship, ship.coords[0], size, direction)



    return ship
}

function build(ship, start, size, direction) {

    if(direction === "left") {
        ship.coords = left(ship, start, size)
    }
    if(direction === "right") {
        ship.coords = right(ship,start, size)
    }

    if(direction === "up") {
        ship.coords = up(ship, start, size)
    }

    if(direction === "down") {
        ship.coords = down(ship,start,size)
    }

return ship
}


    function left(ship, start, size) {
        for (let i = start.x - size + 1 ; i < start.x; i++) {
            var coord = {x: i, y:start.y }
            ship.coords.unshift(coord)
        }
        ship.coords.sort((a, b) => (a.x > b.x ? 1 : -1));
        return ship.coords
    }
    function right(ship, start, size) {
            for (let i = start.x + 1; i <  start.x + size; i++) {
                var coord = {x: i, y:start.y }
                ship.coords.push(coord)
            }
            ship.coords.sort((a, b) => (a.x > b.x ? 1 : -1));
            return ship.coords
    }
    function up(ship, start, size) {

        for (let i = start.y - size + 1; i <  start.y; i++) {
            var coord = {x: start.x, y: i }
            ship.coords.push(coord)
            
        }
        ship.coords.sort((a, b) => (a.y > b.y ? 1 : -1));
        return ship.coords

    }
    function down(ship, start, size) {

        for (let i = start.y + 1; i <  start.y + size; i++) {
            var coord = {x: start.x, y: i }
            ship.coords.push(coord)
            }
        

        ship.coords.sort((a, b) => (a.y > b.y ? 1 : -1));
        return ship.coords
    }




function assignDirection(num) {
    if(num === 0) {
        return "horiz"
    }
    if(num === 1) {
        return "vert"
    }
    return "NOT ASSIGNED"
}





// cases needed. 
    // checks if the type of ship fits between 2 spaces
        // returns false if the ship will be placed where an existing ship already is or is out of bounds.
        // returns which direction to build if you can build there
        // does this for the whole interval from where a ship starts to ends and ever value in between.

function checkForShips(player, start, size, direction) {
    var canBuild = false;
    // case 0
        // ship is at the start pos. 
        if(shipIsThere(player.ships, start)) return false;

    // case 1 horizontal
        // sub case check left. 
    // case 2 horizontal
        // subcase check right
            // if one is true return true
    if(direction === "horiz") {
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
    if(direction === "vert") {
        var up = checkUp(player, start, size);
        var down = checkDown(player, start, size) 
        if(up) return "up"
        if(down) return "down"
        return false
    }

    return canBuild;
}

function checkLeft(player, start, size) {

    for (let i = start.x - size + 1 ; i < start.x; i++) {
        var coord = {x: i, y:start.y }
        if(shipIsThere(player.ships, coord) || !inBounds(coord) ) {
            // cant build here
            return false
        }
        
    }
  
    return true;
}
function checkright(player, start, size) {
    for (let i = start.x; i <  start.x + size; i++) {
        var coord = {x: i, y:start.y }
        if(shipIsThere(player.ships, coord) || !inBounds(coord) ) {
            // cant build here
            return false
        }
        
    }
    
    return true

}
function checkUp(player, start, size) {
    for (let i = start.y - size + 1; i <  start.y; i++) {
        var coord = {x: start.x, y: i }
        if(shipIsThere(player.ships, coord) || !inBounds(coord) ) {
            // cant build here
            return false
        }
        
    }
    return true
}
function checkDown(player, start, size) {
    for (let i = start.y; i <  start.y + size; i++) {
        var coord = {x: start.x, y: i }
        if(shipIsThere(player.ships, coord) || !inBounds(coord) ) {
            // cant build here
            return false
        }
        
    }
    return true;
}




// if a coord is < 0 or coord > 9 returns false else true
function inBounds(coord) {
    if(inB(coord.x) && inB(coord.y))
    return true;
        else
    return false;
}

function inB(num) {
    if(num >= 0 && num <= 9) 
        return true;
    else 
        return false;
}



// checks to see if any other ship has same coords
export function shipIsThere(fleet, coord) {
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

export function winner(player, opponent) {
 

    if(player.shipsLeft === 0) {
        return "opponent wins"
    } 

    if(opponent.shipsLeft === 0) {
        return "You win!"
    }
}

// module.exports = {  
//                 random, 
//                 matrixAt,
//                 assignDirection,
//                 build,
//                 placeShip,
//                 inBounds, 
//                 makeShip,
//                 shipIsThere,
//                 checkForShips,
//                 playerFactory,
//                 makeBoard, 
//                 printBoard,
//                 };

