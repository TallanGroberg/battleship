import React, {useState} from "react";


export const Coordinate  = ({coordinate,
                            opponent,
                            square,
                            setPlayer}) => {
    const divClassifier = ["ocean", "hit", "miss"]
    
    const [coord, setCoord] = useState({x: ((coordinate) - coordinate % 10) / 10, y: coordinate % 10})
    const [divName, setDivName] = useState(divClassifier[0])

    function move() {
        setPlayer(prev => ({...prev, tries: [...prev.tries, coord]}))
        
        if(opponent !== ' ') {
            setDivName(divClassifier[1])
        } else {
            setDivName(divClassifier[2])
        }
    }

    return ( <div onClick={() => move()}
                        key={coordinate} 
                        className={divName}>
                            {square}
            </div> 
       
       
    )
}