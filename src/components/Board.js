import react, {useState} from "react";
import { matrixAt } from "../helperfunctions";

export const Board = () => {
    
    var count = -1;
    var board = Array(100).fill().map( a => count += 1);

    return (
        <div className={"parent"}>
        {board.map(i => 
             matrixAt(1,1) === i ? <div className={"box" + i.toString()}>0</div> 
            : <div className={"box" + i.toString()}>1</div>
            )}
     </div>
    )
}

