// import React from "react";

import { useState } from 'react';

export default function Board() {
  const [boardState, setBoardState] = useState((new Array(9)).fill(null))
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null)

  function checkWinner(currentState) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i=0; i < lines.length; i++) {
      const [x, y, z] = lines[i];
      const [a, b, c] = [currentState[x], currentState[y], currentState[z]]
      if (a && a === b && b === c) {
        console.log(`Player '${a}' Wins!`)
        setWinner(a);
        setWinningLine(lines[i]);
      }
    }
  }

  function handleSquareClick(pos) {
    // debugger;
    if (!boardState[pos] && !winner) {
      const newBoardState = [...boardState];
      newBoardState[pos] = xTurn ? 'X' : 'O';
      setXTurn(!xTurn);
      setBoardState(newBoardState);
      checkWinner(newBoardState);
    }
  }
  return (
    <>
      <div className="board-row">
        <Square pos={0} red={winningLine?.includes(0)} value={boardState[0]} onSquareClick={handleSquareClick} />
        <Square pos={1} red={winningLine?.includes(1)} value={boardState[1]} onSquareClick={handleSquareClick} />
        <Square pos={2} red={winningLine?.includes(2)} value={boardState[2]} onSquareClick={handleSquareClick} />
      </div>
      <div className="board-row">
        <Square pos={3} red={winningLine?.includes(3)} value={boardState[3]} onSquareClick={handleSquareClick} />
        <Square pos={4} red={winningLine?.includes(4)} value={boardState[4]} onSquareClick={handleSquareClick} />
        <Square pos={5} red={winningLine?.includes(5)} value={boardState[5]} onSquareClick={handleSquareClick} />
      </div>
      <div className="board-row">
        <Square pos={6} red={winningLine?.includes(6)} value={boardState[6]} onSquareClick={handleSquareClick} />
        <Square pos={7} red={winningLine?.includes(7)} value={boardState[7]} onSquareClick={handleSquareClick} />
        <Square pos={8} red={winningLine?.includes(8)} value={boardState[8]} onSquareClick={handleSquareClick} />
      </div>
    </>
  );
}

function Square({ pos, red, value, onSquareClick }) {
  return (
    <>
      <button
        className={red ? "square red" : "square"}
        onClick={ () => onSquareClick(pos) }
      >
        { value }
      </button>
    </>
  )
}