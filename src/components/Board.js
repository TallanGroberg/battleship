import {useState} from "react";
import { makeBoard, matrixAt, random } from "../helperfunctions";
import  Coordinate  from "./Coordinate";
import { withPlayer } from "../Providers/PlayerProvider";


function Board ({
                    board,
                    setBoard,
                    setOpponent,
                    opponent,
                    oppBoard,
                    setOppBoard,
                    player, setPlayer,
                    oppDivs,
                    setOppdivs,
                    setUpdates,
                    setOppUpdates
                }) {

                



    return (
        <div className={"parent"}>
       {board.map( ( square, i) => {
           return   <Coordinate 
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
                        setUpdates={setUpdates}
                        setOppUpdates={setOppUpdates}
                    
                    />
       })}


     </div>
    )
}

export default withPlayer(Board)

