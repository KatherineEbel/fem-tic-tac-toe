import { calculateWinner } from './calculate-winner.ts'
import { boardIsFull } from './board-is-full.ts'

export function minimax(
  board: BoardState,
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  opponent: Player
): number {
  const newBoard = [...board]
  const winner = calculateWinner(newBoard)

  if (winner === aiPlayer) return 10 - depth
  if (winner === opponent) return depth - 10
  if (boardIsFull(newBoard)) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    newBoard.forEach((cell, index) => {
      if (cell === null) {
        newBoard[index] = aiPlayer
        bestScore = Math.max(
          bestScore,
          minimax(newBoard, depth + 1, false, aiPlayer, opponent)
        )
        newBoard[index] = null
      }
    })
    return bestScore
  } else {
    let bestScore = Infinity
    newBoard.forEach((cell, index) => {
      if (cell === null) {
        newBoard[index] = opponent
        bestScore = Math.min(
          bestScore,
          minimax(newBoard, depth + 1, true, aiPlayer, opponent)
        )
        newBoard[index] = null
      }
    })
    return bestScore
  }
}

