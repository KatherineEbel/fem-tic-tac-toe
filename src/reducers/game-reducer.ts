import { calculateWinner } from '../utils/calculate-winner.ts'
import { boardIsFull } from '../utils/board-is-full.ts'
import { updateScore } from '../utils/update-score.ts'

export const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  status: 'not_started',
  mode: 'solo',
  score: { xWins: 0, oWins: 0, ties: 0 },
  player1Mark: 'X',
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const newBoard = [...state.board]
      newBoard[action.index] = state.currentPlayer

      const nextPlayer = state.currentPlayer === 'X' ? 'O' : 'X'
      const winner = calculateWinner(newBoard)
      const isBoardFull = boardIsFull(newBoard)
      const status = winner ? 'win' : isBoardFull ? 'tie' : 'in_progress'

      return {
        ...state,
        board: newBoard,
        currentPlayer: nextPlayer,
        winner,
        status,
        score: updateScore(state.score, winner, status),
      }
    }
    case 'START_GAME':
      return {
        ...initialState,
        mode: action.mode ?? state.mode,
        player1Mark: action.player ?? state.player1Mark,
        score: state.score,
        status: 'in_progress',
      }

    case 'RESET_GAME':
      return {
        ...initialState,
        mode: state.mode,
        player1Mark: state.player1Mark,
      }

    default:
      return state
  }
}
