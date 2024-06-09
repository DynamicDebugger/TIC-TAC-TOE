import React, { useState, useEffect } from "react";
import Board from "./Board.jsx";
import { calculateWinner, getAIMove } from "../gameLogic.js"; // Adjust the import as necessary

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [mode, setMode] = useState(null); // null, 'single', or 'multi'

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squaresCopy[i] = isXNext ? "X" : "O";
    setSquares(squaresCopy);
    setIsXNext(!isXNext);
  };

  const handleAIMove = () => {
    const squaresCopy = squares.slice();
    const aiMove = getAIMove(squaresCopy);
    squaresCopy[aiMove] = "O";
    setSquares(squaresCopy);
    setIsXNext(true);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
    handleRestart();
  };

    const winner = calculateWinner(squares);
    let status;
    if (winner === "X" || winner === "O") {
    status = "Winner: " + winner;
    } else if (winner === "Draw") {
    status = "It's a draw!";
    } else {
    status = "Next player: " + (isXNext ? "X" : "O");
    }


  useEffect(() => {
    if (mode === "single" && !isXNext && !calculateWinner(squares)) {
      handleAIMove();
    }
  }, [isXNext, mode]);

  if (!mode) {
    return (
      <div className="game">
        <h1>Choose Game Mode</h1>
        <button onClick={() => handleModeSelection("single")}>
          Single Player (vs AI)
        </button>
        <button onClick={() => handleModeSelection("multi")}>
          Multiplayer (vs Human)
        </button>
      </div>
    );
  }

  return (
    <div className="game">
        <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={handleRestart}>Restart</button>
        <button onClick={() => setMode(null)}>Change Mode</button>
      </div>
    </div>
  );
}

export default Game;
