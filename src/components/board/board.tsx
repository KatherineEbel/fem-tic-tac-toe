import Square from './square.tsx'
import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'

export default function Board() {
  const { board, makeMove } = useTicTacToe()
  return (
    <main className="grid grid-cols-3 grid-rows-3 gap-5">
      {board.map((row, rowIdx) =>
        row.map((square, colIdx) => (
          <Square
            key={`${rowIdx}-${colIdx}`}
            player={square}
            onClick={makeMove.bind(null, rowIdx, colIdx)}
          />
        ))
      )}
    </main>
  )
}
