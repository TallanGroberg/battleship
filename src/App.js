import logo from './logo.svg';
import { useState } from 'react';
import styled from "styled-components"
import { withPlayer } from './Providers/PlayerProvider';
import Board  from './components/Board'
import Ships from './components/Ships'
import {GameStats} from './components/GameStats'
import { makeBoard, playerFactory, winner } from "./helperfunctions";

function App({
  player,
  opponent,
  carrier,
  battleShip,
  board,
  oppBoard,
  oppDivs,
  updates,
  oppUpdates,
  setPlayer,
  setOpponent,
  setBoard,
  setOppBoard,
  setOppdivs,
  setUpdates,
}) {
 
 console.log("battleShip", battleShip.coords)

  var col = 0;
  var row = ["A", "B","C","D","E","F"," G", "H", "I", "J"]
  var column = Array(10).fill().map( a => col += 1);




  

  return (<>
    <Container  >
      <div className={"game"}>

        <h1>Battle Ship</h1>
        <h1>{winner(player,opponent)}</h1>
        <h4>{updates}</h4>
        <h4>{oppUpdates}</h4>



        <div className={"column-label"}>
        { column.map( i => <div key= {i} className={"colunm"}>{i}</div> )
          }
        </div>
        <div className={"row-label"}>
          {row.map(i => <div key={i} className={'row'}>{i}</div>)}
        </div>

          <Board />
          <Ships />
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

const Container = withPlayer(styled.div`

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
          cursor: pointer
        }

      padding-left: 30px ;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(10, 1fr);
      grid-column-gap: 2px;
      grid-row-gap: 2px;
      
      > .hit {
        background-color: grey;
        border-radius: 50%;
        opacity: 75%;
      }
      
      > .miss {
         border-radius: 50%;
        background-color: lightblue;
        opacity: 50%;
      }


      
    }
    
    
  }
  .hide {
  opacity: 100%;
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
  /* height:50vh;
  overflow-y:auto */
  /* display: grid; */
  /* overflow-y:auto
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px; */
}
.moves-list-opponent {
  height:50vh;
  overflow-y:auto
  
  /* grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;  */
}
.moves-list-player {
  height: 50vh;
  overflow-y:auto
  /* display: grid; */
  /* max-width: 20vw; */
  /* grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px; */
}

.opponent-hit {
  color: red;
  text-align: center;
  vertical-align: middle;
}

.opponent-miss {
  color: blue;
}
.opponent-clear {
  display: none;
}




.ship-grid {
  z-index: -1;
  position: relative;
  top: -42.35vw;
  padding-left: 30px ;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;

  > .coord {
    width: 4vw;
    height: 4vw;
  }
  
  #carrier {
    background: blue;
    grid-column-start: ${props => props.carrier.coords[0].y + 1 };
    grid-column-end: ${props => props.carrier.coords[4].y + 2 };
    grid-row-start: ${props => props.carrier.coords[0].x + 1 };
    grid-row-end: ${props => props.carrier.coords[4].x + 2 };
    width: auto;
    height: auto;
    border-radius: 50%;
    
   
  }
  
  #battleShip {
    background: blue;
    grid-column-start: ${props => props.battleShip.coords[0].y + 1 };
    grid-column-end: ${props => props.battleShip.coords[3].y + 2 };
    grid-row-start: ${props => props.battleShip.coords[0].x + 1 };
    grid-row-end: ${props => props.battleShip.coords[3].x + 2 };
    width: auto;
    height: auto;
    border-radius: 50%;
  }
  #cruiser1 {
    background: blue;
    grid-column-start: ${props => props.cruiser1.coords[0].y + 1 };
    grid-column-end: ${props => props.cruiser1.coords[2].y + 2 };
    grid-row-start: ${props => props.cruiser1.coords[0].x + 1 };
    grid-row-end: ${props => props.cruiser1.coords[2].x + 2 };
    width: auto;
    height: auto;
    border-radius: 50%;
  }
  #cruiser2 {
    background: blue;
    grid-column-start: ${props => props.cruiser2.coords[0].y + 1 };
    grid-column-end: ${props => props.cruiser2.coords[2].y + 2 };
    grid-row-start: ${props => props.cruiser2.coords[0].x + 1 };
    grid-row-end: ${props => props.cruiser2.coords[2].x + 2 };
    width: auto;
    height: auto;
    border-radius: 50%;
  }
  #destroyer {
    background: blue;
    grid-column-start: ${props => props.destroyer.coords[0].y + 1 };
    grid-column-end: ${props => props.destroyer.coords[1].y + 2 };
    grid-row-start: ${props => props.destroyer.coords[0].x + 1 };
    grid-row-end: ${props => props.destroyer.coords[1].x + 2 };
    width: auto;
    height: auto;
    border-radius: 50%;
  }
}
  
`);

export default withPlayer(App);
