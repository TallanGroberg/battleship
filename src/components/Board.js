import {useState} from "react";
import { makeBoard, matrixAt, random } from "../helperfunctions";
import { Coordinate } from "./Coordinate";
export const Board = ({board,
    setBoard,
    setOpponent,
    oppBoard,
    setOppBoard,
    player, setPlayer,
    oppDivs,
    setOppdivs
    
            }) => {

                



    return (
        <div className={"parent"}>
       {board.map( ( square, i) => {
           return   <Coordinate 
                        board={board}
                        coordinate={i}
                        setOpponent={setOpponent}
                        oppBoard={oppBoard[i]}
                        square={square}
                        setPlayer={setPlayer}
                        player={player}
                        oppDiv={oppDivs[i]}
                        setOppdivs={setOppdivs}
                    
                    />
       })}


     </div>
    )
}

