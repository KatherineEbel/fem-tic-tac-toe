import Square from './square.tsx'
import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'

export default function Board() {
  const { board, makeMove } = useTicTacToe()
  return (
    <main className="grid grid-cols-3 grid-rows-3 gap-5">
      {board.map((square, index) => (
        <Square
          key={index}
          player={square}
          onClick={makeMove.bind(null, index)}
        />
      ))}
    </main>
  )
}
