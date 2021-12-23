import react, {useState, useEffect} from "react";
import { playerFactory, matrixAt,whatType } from "../helperfunctions";

export const Board = () => {
    const [player, setPlayer] = useState(playerFactory())
    
    var count = -1;
    var board = Array(100).fill().map( a => "_");
    
    player.ships.map(ship => {
        let type = whatType(ship);
        
        return ship.coords.map( coord => {
            board[matrixAt(coord.x, coord.y)] = type
        })
    })
    count = 0;


    
    return (
        <div className={"parent"}>
       {board.map( ( square, i) => {
           return   <div key={i} className={"ocean"}>{square}</div> 
       })}


     </div>
    )
}

