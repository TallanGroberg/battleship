import {useState} from "react";
import { makeBoard } from "../helperfunctions";

export const Board = () => {
    const [board, setBoard] = useState(makeBoard())
    const [opponent, setOpponent] = useState(makeBoard())

    
    
    return (
        <div className={"parent"}>
       {board.map( ( square, i) => {
           return   <div onClick={() => }
                        key={i} 
                        className={"ocean"}>
                            {square}
                    </div> 
       })}


     </div>
    )
}

