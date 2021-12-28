import logo from './logo.svg';
import { useState } from 'react';
import styled from "styled-components"
import {Board } from './components/Board'
import {GameStats} from './components/GameStats'
import { makeBoard, playerFactory, winner } from "./helperfunctions";

function App() {
  const [player, setPlayer] = useState(playerFactory())
  const [opponent, setOpponent] = useState(playerFactory())
  const [board, setBoard] = useState(makeBoard(player))
  const [oppBoard, setOppBoard] = useState(makeBoard(opponent))
  var divs = [];

  for (var i = 1; i <= board.length; i++) divs.push('opponent-clear');
  
  const [oppDivs, setOppdivs] = useState(divs)

  var col = 0;
  var row = ["A", "B","C","D","E","F"," G", "H", "I", "J"]
  var column = Array(10).fill().map( a => col += 1);


  

  return (<>
    <Container>
      <div className={"game"}>

        <h1>Battle Ship</h1>
        <h1>{winner(player, opponent)}</h1>



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
                oppBoard={oppBoard}
                setOpponent={setOpponent}
                opponent={opponent}
                setOppBoard={setOppBoard}
                player={player}
                setPlayer={setPlayer}
                oppDivs={oppDivs} 
                setOppdivs={setOppdivs}
     
                />
</div>

<GameStats player={"player"}
                    playerStats={player}
                    opponent={opponent}
                    
                    />
<GameStats player={"opponent"}
                    playerStats={opponent}
                    opponent={opponent}
                    />

    </Container>
  </>);
}

const Container = styled.div`

  .game {
      z-index: 1;
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
      
      > .hit {
        background-color: grey;
        border-radius: 50%;
      }
      
      > .miss {
         border-radius: 50%;
        background-color: lightblue;
      }
    }

  }

.player {
    text-align: left;
    position: fixed;
    top: 0;

  }
  .opponent {
    text-align: right;
    position: fixed;
    top: 0;
    right: 0;
    margin: 1vw;
    /* border-left: 1px solid black; */
  }
  .player, .opponent {
    font-size: 2vw;
    display: inline-block;
    width: 50%; /* change width of each one to determine the width gap */
}

.moves-list {
  overflow:auto
  display: grid;
  max-width: 20vw;
  /* height: 100vh; */
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
}
.moves-list-opponent {
  overflow:auto
  display: grid;

  /* height: 100vh; */
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
}
.moves-list-player {
  overflow:auto
  display: grid;
  max-width: 20vw;
  /* height: 100vh; */
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
}

.opponent-hit {
  color: pink;
}

.opponent-miss {
  color: blue;
}
.opponent-clear {
  display: none;
}
  
`;

export default App;
