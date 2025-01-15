declare type Player = 'X' | 'O'
declare type BoardState = (Player | null)[][]
declare type GameMode = 'solo' | 'multiplayer'

declare type Score = {
  xWins: number
  oWins: number
  ties: number
}

declare type GameStatus = 'win' | 'tie' | 'in_progress' | 'not_started'

declare type GameState = {
  winner: Player | null
  mode: GameMode
  status: GameStatus
  score: Score
}

declare type LabelConfig = {
  x: string
  o: string
}

declare type ModalProps = {
  heading?: string
  description: string | React.ReactNode
  actions: React.ReactNode
}
