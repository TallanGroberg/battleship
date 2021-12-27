import React, {useState} from "react";

export const GameStats = ({player, playerStats, moves}) => {

console.log(playerStats)

    return (
        <div className={player}>
            <div>{player}</div>
            <p>Enemy ships destroyed: {playerStats.hasDestoyed}</p>
            <p>ships Remaining: {playerStats.shipsLeft}</p>

            <p>Moves Tried:</p>
            {  playerStats.tries.length === 0 ? <p>0</p> : playerStats.tries.map( (move) => <p>{move.x}, {move.y}</p>)}

        </div>
    )
}