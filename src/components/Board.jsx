import React from "react";
import Square from "./Square.jsx";

function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} index={i} />
      ))}
    </div>
  );
}

export default Board;
