import ScoreCard from './score-card.tsx'
import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'

const generateLabels = (
  gameMode: GameMode,
  player1Mark: Player
): LabelConfig => {
  if (gameMode === 'multiplayer') {
    return {
      x: 'X (P1)',
      o: 'O (P2)',
    }
  }

  // Solo mode
  return {
    x: `X (${player1Mark === 'X' ? 'YOU' : 'CPU'})`,
    o: `O (${player1Mark === 'O' ? 'YOU' : 'CPU'})`,
  }
}

export default function Stats() {
  const { mode, score, player1Mark } = useTicTacToe()

  const labels = generateLabels(mode, player1Mark)
  return (
    <footer className="grid grid-cols-3 items-center gap-5">
      <ScoreCard label={labels.x} value={score.xWins} color="bg-blue" />
      <ScoreCard label="Ties" value={score.ties} color="bg-silver" />
      <ScoreCard label={labels.o} value={score.oWins} color="bg-yellow" />
    </footer>
  )
}
