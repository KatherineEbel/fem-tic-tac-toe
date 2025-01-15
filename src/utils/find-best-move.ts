import { minimax } from './mini-max.ts'

export function findBestMove(board: BoardState, aiPlayer: Player): number | null {
  let bestScore = -Infinity
  let bestMove = null
  const opponent = aiPlayer === 'X' ? 'O' : 'X'

  board.forEach((cell, index) => {
    if (cell === null) {
      board[index] = aiPlayer
      const score = minimax(board, 0, false, aiPlayer, opponent)
      board[index] = null

      if (score > bestScore) {
        bestScore = score
        bestMove = index
      }
    }
  })

  return bestMove
}


