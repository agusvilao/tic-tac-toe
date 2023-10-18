import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Square({value, onSquareClick}){
  return (
    <button className='square-btn' onClick={onSquareClick}>{value}</button>
  )
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i){
    if(calculateWinner(squares) || squares[i]){
      return;
    }

    const nextSquares = squares.slice();
          if(xIsNext)
          {nextSquares[i]="X";
           }else{
            nextSquares[i]="0";
           }       
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  return (
    <>
     <div className='board-row'>
        <Square value={squares[0]} onSquareClick ={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick ={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick ={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick ={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick ={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick ={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick ={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick ={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick ={() => handleClick(8)}/>
      </div>
  </>
  )
}

export default function Game(){
  const[history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); 
  const currentSquares = history[currentMove];
  const xIsNext = (currentMove %2 === 0);

  function handlePlay(nextSquares){
      const nextHistory =  [...history.slice(0, currentMove +1), nextSquares ];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length -1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    // if(nextMove%2){
    //   setXIsNext(true);
    // }else{
    //   setXIsNext(false);
    // }
  }

  function restart()
  {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if(winner){
    status = "The winner is " + winner;
}else{
  status = "Is the turn of " + (xIsNext?"X":"O");
}

  const moves = history.map((squares, move) => {
  let description;
  if(move>0)
  {
    description = "Go to the " + move + "° Movement";
  }else{
    description = "Origin";
  }

  return(
    <li key={move}>
      <button className='list-btn' onClick={() => jumpTo(move)}>{description}</button>
    </li>

  )

  }
  )
  return (
    <>
    <div className='title-section'>
      <h1>Tic - Tac - Toe</h1>
    </div>
    <div className='status-section'>
      <h3 className={status.startsWith('The winner')?"winner-label":"game-label"}>{status}</h3>
    </div>
    <div className='restart-section'>
      <button className='restart-btn' onClick={restart}>Restart</button>
    </div>
    <div className='game-section'>
      <div className='moves-section'>
        {moves}
      </div>
      <div className='board-section'>
        <Board squares = {currentSquares} xIsNext = {xIsNext} onPlay = {handlePlay} ></Board>
      </div>
    </div>
    </>
  )

}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


