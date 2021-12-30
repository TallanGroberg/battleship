import React, {useState} from "react";

function ShipCoords({
    player,
    board,
    coordinate,
    setOpponent,
    opponent,
    oppBoard,
    square,
    setPlayer,
    oppDiv,
    setOppdivs,
                    }) {
     const [coord, setCoord] = useState({x: ((coordinate) - coordinate % 10) / 10, y: coordinate % 10})

    const carrier = JSON.stringify(player.ships[0].coords[0]) === JSON.stringify(coord)


    return (
        <div className={"coord"} id={carrier ? 'carrier' : null}> <div></div>  </div>
    )
}

export default ShipCoords