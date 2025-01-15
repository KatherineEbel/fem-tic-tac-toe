import React from 'react'
import { gameReducer } from '../reducers/game-reducer.ts'

const GAME_STATE_KEY = 'tic-tac-toe-game-state'

export function useStoredGameState(initialState: GameState): [GameState, React.Dispatch<GameAction>] {
  const [state, dispatch] = React.useReducer(gameReducer, loadState() || initialState)

  React.useEffect(() => {
    saveState(state)
  }, [state])

  return [state, dispatch]

}

const loadState = (): GameState | null => {
  try {
    const storedState = localStorage.getItem(GAME_STATE_KEY)
    if (storedState === null) return null
    return JSON.parse(storedState)
  } catch (error) {
    console.error('Error loading game state', error)
    return null
  }
}

const saveState = (state: GameState) => {
  try {
    const storedState = JSON.stringify(state)
    localStorage.setItem(GAME_STATE_KEY, storedState)
  } catch (error) {
    console.error('Error saving game state', error)
  }
}
