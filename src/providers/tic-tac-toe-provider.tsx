import React from 'react'
import { cn } from '../utils.ts'
import { Button } from '../components/ui/button.tsx'
import IconX from '../components/ui/icon-x.tsx'
import IconO from '../components/ui/icon-o.tsx'

export type TicTacToeContextValue = {
  board: BoardState
  currentPlayer: Player
  gameState: GameState
  player1Mark: Player
  makeMove: (row: number, col: number) => void
  reset: () => void
  quit: () => void
  startGame: (player?: Player, mode?: GameMode) => void
  modalProps: ModalProps | null
}

export const TicTacToeContext =
  React.createContext<TicTacToeContextValue | null>(null)
const startingScore = { xWins: 0, oWins: 0, ties: 0 }

const createEmptyBoard = (): BoardState =>
  Array(3)
    .fill(null)
    .map(() => Array(3).fill(null))

export function TicTacToeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [board, setBoard] = React.useState<BoardState>(createEmptyBoard())
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X')
  const [player1Mark, setPlayer1Mark] = React.useState<Player>('X')
  const [gameState, setGameState] = React.useState<GameState>({
    winner: null,
    status: 'not_started',
    mode: 'solo',
    score: startingScore,
  })
  const [modalProps, setModalProps] = React.useState<ModalProps | null>(null)

  const minimax = React.useCallback(
    (
      board: BoardState,
      depth: number,
      isMaximizing: boolean,
      aiPlayer: Player,
      opponent: Player
    ): number => {
      const winner = calculateWinner(board)

      // Terminal states
      if (winner === aiPlayer) return 10 - depth
      if (winner === opponent) return depth - 10
      if (boardIsFull(board)) return 0

      if (isMaximizing) {
        let bestScore = -Infinity
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (board[row][col] === null) {
              board[row][col] = aiPlayer
              bestScore = Math.max(
                bestScore,
                minimax(board, depth + 1, false, aiPlayer, opponent)
              )
              board[row][col] = null
            }
          }
        }
        return bestScore
      } else {
        let bestScore = Infinity
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (board[row][col] === null) {
              board[row][col] = opponent
              bestScore = Math.min(
                bestScore,
                minimax(board, depth + 1, true, aiPlayer, opponent)
              )
              board[row][col] = null
            }
          }
        }
        return bestScore
      }
    },
    []
  )

  const bestMove = React.useCallback(
    (
      board: BoardState,
      aiPlayer: Player
    ): { row: number; col: number } | null => {
      let bestScore = -Infinity
      let move: { row: number; col: number } | null = null
      const opponent = aiPlayer === 'X' ? 'O' : 'X'

      // Try each available move
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            // Make the move
            board[row][col] = aiPlayer
            const score = minimax(board, 0, false, aiPlayer, opponent)
            // Undo the move
            board[row][col] = null

            if (score > bestScore) {
              bestScore = score
              move = { row, col }
            }
          }
        }
      }

      return move
    },
    [minimax]
  )

  const startGame = React.useCallback(
    (player?: Player, mode?: GameMode) => {
      console.log(gameState.score)
      setModalProps(null)
      setBoard(createEmptyBoard())
      setPlayer1Mark(player ?? player1Mark)
      setCurrentPlayer('X')
      setGameState((prev) => ({
        ...prev,
        winner: null,
        status: 'in_progress',
        mode: mode ?? gameState.mode,
      }))
    },
    [gameState, player1Mark]
  )

  const reset = () => {
    setModalProps({
      description: (
        <>
          <span
            className={cn(
              'text-4xl font-bold uppercase tracking-widest text-silver'
            )}
          >
            Restart game?
          </span>
        </>
      ),
      actions: (
        <div className="space-x-4">
          <Button
            onClick={() => {
              setModalProps(null)
            }}
          >
            No, Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              startGame()
            }}
          >
            Yes, Restart
          </Button>
        </div>
      ),
    })
  }

  const quit = React.useCallback(() => {
    setModalProps(null)
    setBoard(createEmptyBoard())
    setCurrentPlayer('X')
    setGameState({
      ...gameState,
      winner: null,
      score: startingScore,
      status: 'not_started',
      mode: 'solo',
    })
  }, [gameState])

  const updateGameResult = React.useCallback(
    (board: BoardState): GameState => {
      const winner = calculateWinner(board)
      let status: GameStatus = 'in_progress'
      let heading = ''
      let description = ''
      if (winner) {
        status = 'win'
        if (gameState.mode === 'solo') {
          heading = winner === player1Mark ? 'You win!' : 'Oh no, you lost...'
        } else {
          heading = winner === player1Mark ? 'Player 1 Wins!' : 'Player 2 Wins!'
        }
        description = 'Takes the round'
      } else if (boardIsFull(board)) {
        status = 'tie'
        description = 'Round tied'
      }
      if (['win', 'tie'].includes(status)) {
        setModalProps({
          heading,
          description: (
            <>
              {winner === 'X' ? (
                <IconX className="size-16 text-blue" />
              ) : winner === 'O' ? (
                <IconO className="size-16 text-yellow" />
              ) : null}
              <span
                className={cn(
                  'text-4xl font-bold tracking-widest',
                  winner === 'X'
                    ? 'text-blue'
                    : winner === 'O'
                      ? 'text-yellow'
                      : 'text-silver'
                )}
              >
                {description}
              </span>
            </>
          ),
          actions: (
            <div className="space-x-4">
              <Button onClick={quit}>Quit</Button>
              <Button onClick={() => startGame()} variant="secondary">
                Next Round
              </Button>
            </div>
          ),
        })
      }
      return { ...gameState, status, winner }
    },
    [gameState, player1Mark, quit, startGame]
  )

  const makeAiMove = React.useCallback(() => {
    setTimeout(() => {
      const aiMove = bestMove(board, currentPlayer)
      if (aiMove) {
        const newBoard = board.map((r) => [...r])
        newBoard[aiMove.row][aiMove.col] = currentPlayer
        setBoard(newBoard)

        const result = updateGameResult(newBoard)
        setGameState(result)

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
      }
    }, 300)
  }, [bestMove, board, currentPlayer, updateGameResult])

  const updateScore = React.useCallback(() => {
    setGameState((prev) => {
      console.log(prev)
      switch (prev.status) {
        case 'win':
          return {
            ...prev,
            score: {
              ...prev.score,
              xWins:
                prev.winner === 'X' ? prev.score.xWins + 1 : prev.score.xWins,
              oWins:
                prev.winner === 'O' ? prev.score.oWins + 1 : prev.score.oWins,
            },
          }
        case 'tie':
          return {
            ...prev,
            score: {
              ...prev.score,
              ties: prev.score.ties + 1,
            },
          }
        default:
          return prev
      }
    })
  }, [])

  React.useEffect(() => {
    if (['win', 'tie'].includes(gameState.status)) {
      console.log('updating score', gameState.status)
      updateScore()
    }
  }, [gameState.status, updateScore])

  // Handle AI moves
  React.useEffect(() => {
    if (
      gameState.mode === 'solo' &&
      currentPlayer !== player1Mark &&
      gameState.status === 'in_progress'
    ) {
      makeAiMove()
    }
  }, [currentPlayer, gameState.mode, player1Mark, gameState.status, makeAiMove])

  const makeMove = (row: number, col: number) => {
    if (gameState.status !== 'in_progress' || board[row][col]) return

    const newBoard = board.map((r) => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const result = updateGameResult(newBoard)
    setGameState(result)

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const boardIsFull = (board: BoardState) => {
    return board.every((row) => row.every((cell) => cell !== null))
  }

  const calculateWinner = (board: BoardState): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const [a, b, c] of lines) {
      const row1 = Math.floor(a / 3)
      const col1 = a % 3
      const value = board[row1][col1]

      if (
        value &&
        value === board[Math.floor(b / 3)][b % 3] &&
        value === board[Math.floor(c / 3)][c % 3]
      ) {
        return value
      }
    }
    return null
  }

  const contextValue: TicTacToeContextValue = {
    board,
    modalProps,
    currentPlayer,
    gameState,
    player1Mark,
    quit,
    makeMove,
    reset,
    startGame,
  }

  return (
    <TicTacToeContext.Provider value={contextValue}>
      {children}
    </TicTacToeContext.Provider>
  )
}
