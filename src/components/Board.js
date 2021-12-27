import react, {useState, useEffect} from "react";
import { playerFactory, matrixAt,whatType } from "../helperfunctions";

export const Board = () => {
    const [player, setPlayer] = useState(playerFactory())
    
    var count = -1;

    count = 0;


    
    return (
        <div className={"parent"}>
       {board.map( ( square, i) => {
           return   <div key={i} className={"ocean"}>{square}</div> 
       })}


     </div>
    )
}

