import IconX from '../components/ui/icon-x.tsx'
import IconO from '../components/ui/icon-o.tsx'
import { cn } from '../utils.ts'
import { Button } from '../components/ui/button.tsx'

export const getGameResultModalProps = (
  state: GameState,
  onNextRound: () => void,
  onQuit: () => void
): ModalProps => ({
  heading:
    state.status === 'tie'
      ? ''
      : state.mode === 'solo'
        ? state.winner === state.player1Mark
          ? 'You win!'
          : 'Oh no, you lost...'
        : state.winner === state.player1Mark
          ? 'Player 1 Wins!'
          : 'Player 2 Wins!',
  description: (
    <>
      {state.winner === 'X' ? (
        <IconX className="size-16 text-blue" />
      ) : state.winner === 'O' ? (
        <IconO className="size-16 text-yellow" />
      ) : null}
      <span
        className={cn(
          'text-2xl font-bold tracking-widest sm:text-4xl',
          state.winner === 'X'
            ? 'text-blue'
            : state.winner === 'O'
              ? 'text-yellow'
              : 'text-silver'
        )}
      >
        {state.status === 'tie' ? 'Round tied' : 'Takes the round'}
      </span>
    </>
  ),
  actions: (
    <div className="space-x-4">
      <Button onClick={onQuit}>Quit</Button>
      <Button onClick={onNextRound} variant="secondary">
        Next Round
      </Button>
    </div>
  ),
})
