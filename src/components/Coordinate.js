import React, {useState} from "react";
import { matrixAt, random } from "../helperfunctions";


export const Coordinate  = ({
                            board,
                            coordinate,
                            setOpponent,
                            oppBoard,
                            square,
                            setPlayer,
                            oppDiv,
                            setOppdivs,
                        }) => {
    const divClassifier = ["ocean", "hit", "miss"]
    
    const [coord, setCoord] = useState({x: ((coordinate) - coordinate % 10) / 10, y: coordinate % 10})
    const [divName, setDivName] = useState(divClassifier[0])


    function move() {
        
        
            yourMove()
            oppMove()
        
    }

    function yourMove() {
        if(divName === 'ocean') {

            setPlayer(prev => ({...prev, tries: [...prev.tries, coord]}))
            
            if(oppBoard !== ' ') {
                hitShip(coord, setOpponent)
                setDivName(divClassifier[1])
            } else {
                setDivName(divClassifier[2])
            }
        }
    }

    function oppMove() {
        if(oppDiv === 'opponent-clear') {

            
            var move = {x: random(0,9), y: random(0,9)}
            
            setOpponent(prev => ( {...prev, tries: [...prev.tries, move] } ) )
            
            
            if(board[matrixAt(move.x,move.y)] !== ' ') {
                setOppdivs(prev => {
                    prev[matrixAt(move.x,move.y)] = "opponent-hit"
                    return prev
                })
                hitShip(move, setPlayer)
                
            } 
            else {
                setOppdivs(prev => {
                    prev[matrixAt(move.x,move.y)] = "opponent-miss"
                    return prev
                })
            }
        }
    }

    function hitShip(move, setPlay) {
       
        setPlay(prev => {
            prev.ships.map(ship => {
                
                ship.coords.map(c => (c.x === move.x && c.y === move.y) 
                    
                    ? ship.hits += 0.5
                    : 
                    null
                )
                if(ship.hits === ship.type && ship.type !== "sunk") {
                    ship.hits = "sunk"
                    ship.type = "sunk"
                    prev.shipsLeft--;
                }
            })
            

            return prev
        })
    }

    return ( <div onClick={() => move()}
                        key={coordinate} 
                        className={divName}>
                            {square}
                            <div 
                                className={oppDiv}
                                
                                >{oppDiv === 'opponent-hit' ? 'X' : 'o'}</div>
            </div> 
       
       
    )
}