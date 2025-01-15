export const updateScore = (
  score: Score,
  winner: Player | null,
  status: GameStatus
): Score => ({
  ...score,
  xWins: winner === 'X' ? score.xWins + 1 : score.xWins,
  oWins: winner === 'O' ? score.oWins + 1 : score.oWins,
  ties: status === 'tie' ? score.ties + 1 : score.ties,
})

