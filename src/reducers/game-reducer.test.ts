import { describe, expect, it } from 'vitest'
import { gameReducer, initialState } from './game-reducer'

describe('gameReducer', () => {
  it('should handle MAKE_MOVE action', () => {
    const status: GameStatus = 'in_progress'
    const state: GameState = { ...initialState, status }
    const action: GameAction = { type: 'MAKE_MOVE', index: 0 }
    const newState = gameReducer(state, action)
    expect(newState.board[0]).toBe('X')
    expect(newState.currentPlayer).toBe('O')
    expect(newState.status).toBe('in_progress')
  })

  it('should handle MAKE_MOVE action and detect winner', () => {
    const state: GameState = {
      ...initialState,
      status: 'in_progress',
      board: ['X', 'X', null, null, null, null, null, null, null],
    }
    const action: GameAction = { type: 'MAKE_MOVE', index: 2 }
    const newState = gameReducer(state, action)
    expect(newState.board[2]).toBe('X')
    expect(newState.currentPlayer).toBe('O')
    expect(newState.winner).toBe('X')
    expect(newState.status).toBe('win')
  })

  it('should handle MAKE_MOVE action and detect tie', () => {
    const board: BoardState = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    const state: GameState = {
      ...initialState,
      board,
      currentPlayer: 'X',
      status: 'in_progress',
    }
    const action: GameAction = { type: 'MAKE_MOVE', index: 0 }
    const newState = gameReducer(state, action)
    expect(newState.status).toBe('tie')
    expect(newState.winner).toBe(null)
  })

  it('should handle START_GAME action', () => {
    let state: GameState = { ...initialState }
    const action: GameAction = {
      type: 'START_GAME',
      mode: 'multiplayer',
      player: 'O',
    }
    state = gameReducer(state, action)

    expect(state).toEqual({
      ...initialState,
      mode: 'multiplayer',
      player1Mark: 'O',
      status: 'in_progress',
    })

    const action2: GameAction = { type: 'START_GAME' }
    state = gameReducer(state, action2)
    expect(state).toEqual({
      ...initialState,
      mode: 'multiplayer',
      player1Mark: 'O',
      status: 'in_progress',
    })
  })
  it('should handle RESET_GAME action', () => {
    const state: GameState = {
      ...initialState,
      mode: 'solo',
      player1Mark: 'X',
      status: 'win',
      winner: 'X',
      board: ['X', null, null, null, null, null, null, null, null],
    }
    const action: GameAction = { type: 'RESET_GAME' }
    const newState = gameReducer(state, action)
    expect(newState).toEqual({
      ...initialState,
      mode: 'solo',
      player1Mark: 'X',
    })
  })
})
