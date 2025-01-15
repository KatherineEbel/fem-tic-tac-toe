export const boardIsFull = (board: BoardState): boolean =>
  board.every((square) => square !== null)

