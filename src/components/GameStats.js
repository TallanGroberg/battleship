import React, {useState} from "react";
import {shipIsThere, whatType} from '../helperfunctions'

export const GameStats = ({player, playerStats, opponent}) => {
    const [carrier, setCarrier] = useState(playerStats.ships[0])
    const [battleShip, setBattleShip] = useState(playerStats.ships[1])
    const [cruiser1, setCruiser1] = useState(playerStats.ships[2])
    const [cruiser2, setCruiser2] = useState(playerStats.ships[3])
    const [destroyer, setDestroyer] = useState(playerStats.ships[4])

    console.log(carrier.type, "carrier")
    console.log(battleShip.type, "battleShip")
    console.log(cruiser1.type, "cruiser1")
    console.log(cruiser2.type, "cruiser2")
    console.log(destroyer.type, "destroyer")


    function convertMove(move) {
        var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        return <p>(  {letters[move.x]}, {move.y + 1}  )</p>
    }

    function playerstats() {
        
        if(player === "player") {
            return (<>
                <p>Carrier:  {carrier.hits}</p>
                <p>Battle ship:  {battleShip.hits}</p>
                <p>Cruiser 1:  {cruiser1.hits}</p>
                <p>Cruiser 2:  {cruiser2.hits}</p>
                <p>Destroyer:  {destroyer.hits}</p>
            </>)
        } else {
            return (<>
                <p>{carrier.hits !== carrier.type ? null : carrier.type } : Carrier  </p>
                <p>{battleShip.hits !== battleShip.type ? null : battleShip.type } : Battle ship  </p>
                <p>{cruiser1.hits !== cruiser1.type ? null : cruiser1.type } : Cruiser 1  </p>
                <p>{cruiser2.hits !== cruiser2.type ? null : cruiser2.type } : Cruiser 2  </p>
                <p>{destroyer.hits !== destroyer.type ? null : destroyer.type } : Destroyer  </p>
            </>)
        }
    }

    function displayMoves() {
        if(player === 'player') {

            return playerStats.tries.length === 0 ? <p>0</p> : playerStats.tries.map( (move) => convertMove(move))
        }

         if(player === "opponent") {

            return  opponent.tries.map( (move) => convertMove(move))
        }
    }

    

    return (
        <div className={player}>
            <h3>{player}</h3>
            <p>{player === "player" ? "you" : "opponent"} destroyed: {playerStats.hasDestoyed}</p>
            <p>ships Remaining: {playerStats.shipsLeft}</p>
            {playerstats()}

            
            
            <p>Moves Tried:</p>
            <div className={"moves-list-" + player}>

            

            { displayMoves() }
            </div>



        </div>
    )
}