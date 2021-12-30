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
    const battleShip = JSON.stringify(player.ships[1].coords[0]) === JSON.stringify(coord)
    const cruiser1 = JSON.stringify(player.ships[2].coords[0]) === JSON.stringify(coord)
    const cruiser2 = JSON.stringify(player.ships[3].coords[0]) === JSON.stringify(coord)
    const destroyer = JSON.stringify(player.ships[4].coords[0]) === JSON.stringify(coord)

    function placement() {
        if(carrier) {
            return <div className={"coord"} id={carrier ? 'carrier' : null}> <div></div>  </div>
        } else if(battleShip) {
            return <div className={"coord"} id={battleShip ? 'battleShip' : null}> <div></div>  </div>
        } else if(cruiser1) {
            return <div className={"coord"} id={ cruiser1 ? 'cruiser1' : null}> <div></div>  </div>
        } else if(cruiser2) {
            return <div className={"coord"} id={ cruiser2 ? 'cruiser2' : null}> <div></div>  </div>
        } else if(destroyer) {
            return <div className={"coord"} id={ destroyer ? 'destroyer' : null}> <div></div>  </div>
        }

        return <div className={"coord"}> <div></div>  </div>
    }


    return (
       placement()
    )
}

export default ShipCoords