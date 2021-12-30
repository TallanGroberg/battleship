import React, {useState} from 'react';
import { makeBoard, playerFactory, winner, matrixAt } from "../helperfunctions";

const {Provider, Consumer} = React.createContext();

 function PlayerProvider(props) {

    const [player, setPlayer] = useState(playerFactory());
    const [opponent, setOpponent] = useState(playerFactory());
    const [board, setBoard] = useState(makeBoard(player));
    const [oppBoard, setOppBoard] = useState(makeBoard(opponent));

    const [carrier, setCarrier] = useState(player.ships[0])
    const [battleShip, setBattleShip] = useState(player.ships[1])
    const [cruiser1, setCruiser1] = useState(player.ships[2])
    const [cruiser2, setCruiser2] = useState(player.ships[3])
    const [destroyer, setDestroyer] = useState(player.ships[4])

    const carrierStart = carrier.coords[0].x
    console.log(carrierStart)

    var divs = [];

    for (var i = 1; i <= board.length; i++)
        divs.push('opponent-clear');

    const [oppDivs, setOppdivs] = useState(divs);





    return (
        <Provider value={{
            player,
            opponent,
            board,
            oppBoard,
            oppDivs,

            carrier,
            battleShip,
            cruiser1,
            cruiser2,
            destroyer,
            carrierStart,

            setPlayer,
            setOpponent,
            setBoard,
            setOppBoard,
            setOppdivs,
        }}>
            {props.children}
        </Provider>
    );
}

export const withPlayer = C => props =>  (
    <Consumer>
        {value => <C {...value} {...props} />}
    </Consumer>
)

export default PlayerProvider;