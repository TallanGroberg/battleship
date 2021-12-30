import React, {useState} from "react";
import { matrixAt, random, alreadyChose, playerFactory, convertMove, whatType } from "../helperfunctions";
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
                            setUpdates,
                            setOppUpdates
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
            console.log(coord)
            if(oppBoard !== ' ') {
                hitShip(coord, setOpponent, setUpdates)
                setDivName(divClassifier[1])
                setHide(divClassifier[1])
                setUpdates("You hit at " + convertMove(coord) +" \n" )
            } else {
                setDivName(divClassifier[2])
                setHide(divClassifier[2])
                setUpdates( "you missed at " + convertMove(coord) )
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
                hitShip(move, setPlayer, setOppUpdates)
                setOppUpdates("opponent hits at: " + convertMove(move))
            } 
            else {
                setOppdivs(prev => {
                    prev[matrixAt(move.x,move.y)] = "opponent-miss"
                    return prev
                })
                setOppUpdates("\nopponent misses at: " + convertMove(move))
            }
        
    }

    function hitShip(move, setPlay, setUpdate) {
       
        setPlay(prev => {
            prev.ships.map(ship => {
                
                ship.coords.map(c => (c.x === move.x && c.y === move.y) 
                    
                    ? ship.hits += 0.5
                    : 
                    null
                )
                if(ship.hits === ship.type && ship.type !== "sunk") {
                    setUpdate(prevUpdate => prevUpdate + " and sunk a ship")
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
                            

                            <div 
                                className={oppDiv}
                            >
                                {oppDiv === 'opponent-hit' ? 'X' : 'x'}
                            </div>
                </div> 
       
       
    )
}

export default Coordinate