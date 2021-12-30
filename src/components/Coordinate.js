import React, {useState} from "react";
import { matrixAt, random, alreadyChose, playerFactory } from "../helperfunctions";
import { withPlayer } from "../Providers/PlayerProvider";

function Coordinate ({
                            player,
                            board,
                            coordinate,
                            setOpponent,
                            opponent,
                            oppBoard,
                            square,
                            setPlayer,
                            oppDiv,
                            setOppdivs,
                        }) {
    const divClassifier = ["ocean", "hit", "miss"]
    
    const [coord, setCoord] = useState({x: ((coordinate) - coordinate % 10) / 10, y: coordinate % 10})
    const [divName, setDivName] = useState(divClassifier[0])
    const [hide, setHide] = useState("hide")
        
        const carrier = JSON.stringify(player.ships[0].coords[0]) === JSON.stringify(coord)

        
    

    function move() {
        
        
        if(divName === 'ocean') yourMove()
            
        if(oppDiv === 'opponent-clear') oppMove()
        
    }

    function yourMove() {

            setPlayer(prev => ({...prev, tries: [...prev.tries, coord]}))
            
            if(oppBoard !== ' ') {
                hitShip(coord, setOpponent)
                setDivName(divClassifier[1])
                setHide(divClassifier[1])
            } else {
                setDivName(divClassifier[2])
                setHide(divClassifier[2])
            }
        
    }

    function oppMove() {
        
        var move = {x: random(0,9), y: random(0,9)}

            while(alreadyChose(opponent.tries, move)) {
                debugger
                move = {x: random(0,9), y: random(0,9)}
            }
        
            
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

    return ( 
                <div onClick={() => move()}
                    
                        key={coordinate} 
                        
                        className={ square === ' ' ? divName : hide  }
                         >
                            {oppDiv === 'opponent-hit' ? null : square}

                            <div 
                                className={oppDiv}
                            >
                                {oppDiv === 'opponent-hit' ? 'X' : 'o'}
                            </div>
            </div> 
       
       
    )
}

export default Coordinate