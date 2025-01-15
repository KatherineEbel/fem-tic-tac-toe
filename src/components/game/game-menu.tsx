import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'
import Logo from '../ui/logo.tsx'
import IconX from '../ui/icon-x.tsx'
import IconO from '../ui/icon-o.tsx'
import React from 'react'
import { cn } from '../../utils.ts'
import { Button } from '../ui/button.tsx'

export default function GameMenu() {
  const {
    gameState: { status },
    startGame,
  } = useTicTacToe()
  const [player1, setPlayer1] = React.useState<Player>('X')

  if (status !== 'not_started') return null

  return (
    <div className="flex flex-col gap-8 uppercase">
      <header className="flex">
        <h1 className="mx-auto">
          <Logo className="h-8" />
          <span className="sr-only">Tic Tac Toe</span>
        </h1>
      </header>
      <main className="flex flex-col gap-6 rounded-2xl bg-semidark-navy py-6">
        <h2 className="text-center text-base font-bold uppercase text-silver">
          Pick Player 1's Mark
        </h2>
        <div className="relative mx-8 grid grid-cols-2 rounded-xl bg-dark-navy px-8 py-6">
          <div
            className={cn(
              'absolute bottom-0 mx-4 h-14 w-1/2 -translate-y-1/4 rounded-lg bg-silver transition-all duration-500 ease-in-out',
              player1 === 'X' ? 'left-0' : 'right-0'
            )}
          />
          <button
            className="z-10 grid w-full place-items-center"
            onClick={() => setPlayer1('X')}
          >
            <IconX
              className={cn(
                'size-8',
                player1 === 'X' ? 'text-dark-navy' : 'text-silver'
              )}
            />
          </button>
          <button
            className="z-10 mx-auto grid w-full place-items-center"
            onClick={() => setPlayer1('O')}
          >
            <IconO
              className={cn(
                'size-8',
                player1 === 'O' ? 'text-dark-navy' : 'text-silver'
              )}
            />
          </button>
        </div>
        <p className="text-center text-sm font-medium tracking-wide text-silver">
          Remember: X goes first
        </p>
      </main>
      <footer className="flex flex-col gap-y-6">
        <Button variant="secondary" onClick={() => startGame(player1, 'solo')}>
          New game (vs cpu)
        </Button>
        <Button
          variant="primary"
          onClick={() => startGame(player1, 'multiplayer')}
        >
          New game (vs player)
        </Button>
      </footer>
    </div>
  )
}
