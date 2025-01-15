import React from 'react'
import { TicTacToeContext } from '../providers/tic-tac-toe-provider.tsx'

export const useTicTacToe = () => {
  const context = React.useContext(TicTacToeContext)
  if (context === null) {
    throw new Error('useTicTacToe must be used within a TicTacToeProvider')
  }
  return context
}
