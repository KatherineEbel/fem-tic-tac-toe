declare type Player = 'X' | 'O'
declare type BoardState = (Player | null)[]
declare type GameMode = 'solo' | 'multiplayer'

declare type Score = {
  xWins: number
  oWins: number
  ties: number
}

declare type GameStatus = 'win' | 'tie' | 'in_progress' | 'not_started'

declare type GameState = {
  board: BoardState
  currentPlayer: Player
  mode: GameMode
  player1Mark: Player
  score: Score
  status: GameStatus
  winner: Player | null
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

type GameAction =
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'START_GAME'; player?: Player; mode?: GameMode }
  | { type: 'RESET_GAME' }
