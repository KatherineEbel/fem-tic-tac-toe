import React from 'react'
import { gameReducer, initialState } from '../reducers/game-reducer.ts'
import { findBestMove } from '../utils/find-best-move.ts'
import { getResetGameModalProps } from '../utils/game-restart-modal.tsx'
import { getGameResultModalProps } from '../utils/game-result-modal.tsx'

type TicTacToeContextValue = GameState & {
  makeMove: (index: number) => void
  reset: () => void
  startGame: (player?: Player, mode?: GameMode) => void
}

export const TicTacToeContext =
  React.createContext<TicTacToeContextValue | null>(null)

export function TicTacToeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(gameReducer, initialState)
  const [modalProps, setModalProps] = React.useState<ModalProps | null>(null)

  const makeMove = React.useCallback(
    (index: number) => {
      if (state.status !== 'in_progress' || state.board[index]) return
      dispatch({ type: 'MAKE_MOVE', index })
    },
    [state.status, state.board]
  )

  const makeAiMove = React.useCallback(() => {
    const move = findBestMove(state.board, state.currentPlayer)
    if (move !== null) {
      setTimeout(() => makeMove(move), 300)
    }
  }, [state.board, state.currentPlayer, makeMove])

  React.useEffect(() => {
    if (
      state.mode === 'solo' &&
      state.currentPlayer !== state.player1Mark &&
      state.status === 'in_progress'
    ) {
      console.log('useEffect makeAiMove - makeAiMove')
      makeAiMove()
    }
  }, [state, makeAiMove])

  React.useEffect(() => {
    if (['win', 'tie'].includes(state.status)) {
      setModalProps(
        getGameResultModalProps(
          state,
          () => {
            dispatch({ type: 'START_GAME' })
            setModalProps(null)
          },
          () => {
            dispatch({ type: 'RESET_GAME' })
            setModalProps(null)
          }
        )
      )
    }
  }, [state, state.status])

  const value = {
    ...state,
    modalProps,
    makeMove,
    startGame: (player?: Player, mode?: GameMode) => {
      dispatch({ type: 'START_GAME', player, mode })
      setModalProps(null)
    },
    reset: () => setModalProps(getResetGameModalProps(dispatch, setModalProps)),
  }

  return (
    <TicTacToeContext.Provider value={value}>
      {children}
    </TicTacToeContext.Provider>
  )
}
