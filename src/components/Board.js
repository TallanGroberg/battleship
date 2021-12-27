import {useState} from "react";
import { makeBoard, matrixAt, random } from "../helperfunctions";
import { Coordinate } from "./Coordinate";
export const Board = ({board,
    setBoard,
    opponent,
    setOpponent,
    player, setPlayer
            }) => {

    return (
        <div className={"parent"}>
       {board.map( ( square, i) => {
           return   <Coordinate 
                        coordinate={i}
                        opponent={opponent[i]}
                        square={square}
                        setPlayer={setPlayer}
                        player={player}
                    />
       })}


     </div>
    )
}

