import React from "react";

function Square({ value, onClick, index }) {
  return (
    <>
      <button className="square" onClick={onClick}>
        {value}
      </button>
      {/* {(index + 1) % 3 === 0 && <br />} */}
    </>
  );
}

export default Square;
