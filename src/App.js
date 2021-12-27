import logo from './logo.svg';
import { useState } from 'react';
import styled from "styled-components"
import {Board } from './components/Board'
import {GameStats} from './components/GameStats'
import { makeBoard, playerFactory, random } from "./helperfunctions";

function App() {
  const [player, setPlayer] = useState(playerFactory())
  const [opponent, setOpponent] = useState(playerFactory())
  const [board, setBoard] = useState(makeBoard(player))
  const [oppBoard, setOppBoard] = useState(makeBoard(opponent))
  const [moves, setMoves] = useState([])

  var col = 0;
  var row = ["A", "B","C","D","E","F"," G", "H", "I", "J"]
  var column = Array(10).fill().map( a => col += 1);
  

  return (
    <Container className="board">
      <h1>Battle Ship</h1>



      <div className={"column-label"}>
      { column.map( i => <div key= {i} className={"colunm"}>{i}</div> )
        }
      </div>
      <div className={"row-label"}>
        {row.map(i => <div key={i} className={'row'}>{i}</div>)}
      </div>

        <Board 
              board={board}
              setBoard={setBoard}
              opponent={oppBoard}
              setOpponent={setOppBoard}
              player={player}
              setPlayer={setPlayer}
        />

<GameStats player={"player"}
                    playerStats={player}
                    moves={moves}
                    
      />
      <GameStats player={"opponent"}
                    playerStats={opponent}
                    moves={moves}
      />

    </Container>
  );
}

const Container = styled.div`
margin: auto;
height: 100vh;
width: 55vw;
background-color: green;
padding: 5px;
position: relative;
overflow: none;

 > .column-label {
   max-width: 50vw;
  
    text-align: center;
    padding-left: 30px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

}

> .row-label {
  width: 4vw;
  height: 4vw;
  position: absolute;
  left: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 2px;
}

.row {
  width: 4vw;
  height: 4vw;
}



.parent {
  
    /* border: 1px solid #4e1f9d; */
    > .ocean {
      background-color: #ADD8E6;
      text-align: center;
      width: 4vw;
      height: 4vw;
    }

  padding-left: 30px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  }

  .hit {
    background-color: red;
  }

  .miss {
    background-color: yellow;
  }

  .player {
    text-align: left;
}
.opponent {
    text-align: right;
}
.player, .opponent {
    display: inline-block;
    width: 50%; /* change width of each one to determine the width gap */
}
  
`;

export default App;
