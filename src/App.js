import logo from './logo.svg';
import styled from "styled-components"
import {Board } from './components/Board'
function App() {
  var count = -1;
  var col = 0;
  var row = ["A", "B","C","D","E","F"," G", "H", "I", "J"]
  var board = Array(100).fill().map( a => count += 1);
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

        <Board />
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


  
`;

export default App;
