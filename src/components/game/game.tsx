import Board from '../board/board.tsx'
import GameHeader from './game-header.tsx'
import Stats from './stats.tsx'
import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'

export default function Game() {
  const { status } = useTicTacToe()
  if (status === 'not_started') return null
  return (
    <>
      <GameHeader />
      <Board />
      <Stats />
    </>
  )
}
