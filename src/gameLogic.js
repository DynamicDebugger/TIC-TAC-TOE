export const calculateWinner = (squares) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  // Check for a draw (no null values in the squares array)
  const isBoardFull = squares.every((square) => square !== null);
  if (isBoardFull) {
    return "Draw";
  }

  return null; // No winner and the game is not a draw
};

const minimax = (board, player) => {
  const opponent = player === "X" ? "O" : "X";

  const checkWinner = (board, player) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of winLines) {
      const [a, b, c] = line;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  };

  const availSpots = board.reduce(
    (acc, val, index) => (val === null ? [...acc, index] : acc),
    []
  );

  if (checkWinner(board, "O")) {
    return { score: -10 };
  } else if (checkWinner(board, "X")) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  const moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    const move = {};
    move.index = availSpots[i];
    board[availSpots[i]] = player;

    const result = minimax(board, opponent);
    move.score = result.score;

    board[availSpots[i]] = null;
    moves.push(move);
  }

  let bestMove;
  if (player === "X") {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};

export const getAIMove = (board) => {
  return minimax(board, "O").index;
};
