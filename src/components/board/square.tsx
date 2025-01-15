import { Button } from '../ui/button.tsx'
import React from 'react'
import IconX from '../ui/icon-x.tsx'
import IconO from '../ui/icon-o.tsx'
import { cn } from '../../utils.ts'
import IconXOutline from '../ui/icon-x-outline.tsx'
import IconOOutline from '../ui/icon-o-outline.tsx'
import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'

type SquareProps = Readonly<
  React.ComponentProps<'button'> & {
    player: Player | null
  }
>

export default function Square({ className, onClick, player }: SquareProps) {
  const { currentPlayer } = useTicTacToe()
  const [isActive, setIsActive] = React.useState(false)
  const icon =
    player === 'X' ? (
      <IconX className="size-10 text-blue sm:size-16" />
    ) : player === 'O' ? (
      <IconO className="size-10 text-yellow sm:size-16" />
    ) : null
  const currentPlayerIcon =
    currentPlayer === 'X' ? (
      <IconXOutline className="size-10 sm:size-16" />
    ) : currentPlayer === 'O' ? (
      <IconOOutline className="size-10 sm:size-16" />
    ) : null
  return (
    <Button
      className={cn('size-24 sm:size-36', className)}
      onClick={onClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      variant="square"
    >
      {!player && isActive ? currentPlayerIcon : icon}
    </Button>
  )
}
