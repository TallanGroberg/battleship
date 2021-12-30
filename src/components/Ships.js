import React from "react";
import { withPlayer } from "../Providers/PlayerProvider";
import ShipCoords from "./ShipCoords";
function Ships({
    board,
    setBoard,
    setOpponent,
    opponent,
    oppBoard,
    setOppBoard,
    player, setPlayer,
    oppDivs,
    setOppdivs
            }) {
    return (
        <div className={"ship-grid"}>
        {board.map( (square, i) => {
            return <ShipCoords 
            board={board}
            coordinate={i}
            setOpponent={setOpponent}
            opponent={opponent}
            oppBoard={oppBoard[i]}
            square={square}
            setPlayer={setPlayer}
            player={player}
            oppDiv={oppDivs[i]}
            setOppdivs={setOppdivs}
                    />
        }) }
        

        </div>
    )
}

export default withPlayer(Ships)