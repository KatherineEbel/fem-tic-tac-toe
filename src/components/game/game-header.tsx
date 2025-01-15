import Logo from '../ui/logo.tsx'
import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'
import { cn } from '../../utils.ts'
import { Button, buttonVariants } from '../ui/button.tsx'
import IconX from '../ui/icon-x.tsx'
import IconO from '../ui/icon-o.tsx'
import IconRestart from '../ui/icon-restart.tsx'

export default function GameHeader() {
  const { currentPlayer, reset } = useTicTacToe()
  const player =
    currentPlayer === 'X' ? (
      <IconX className="size-4" />
    ) : (
      <IconO className="size-4" />
    )
  return (
    <header className="flex items-center justify-between">
      <Logo className="h-8" />
      <div
        className={cn(
          buttonVariants({ variant: 'square' }),
          'text-sm text-silver'
        )}
      >
        {player} turn
      </div>
      <Button size="icon" variant="default" onClick={reset}>
        <IconRestart className="size-4" />
      </Button>
    </header>
  )
}
