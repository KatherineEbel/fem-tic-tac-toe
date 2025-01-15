import Game from './game.tsx'
import GameMenu from './game-menu.tsx'
import GameModal from './game-modal.tsx'
import { useTicTacToe } from '../../hooks/use-tic-tac-toe.tsx'

export default function TicTacToeGame() {
  const { modalProps } = useTicTacToe()
  return (
    <>
      <div className="mx-auto my-auto flex w-full max-w-[328px] flex-col gap-y-5 sm:max-w-[460px]">
        <GameMenu />
        <Game />
      </div>
      {modalProps ? <GameModal {...modalProps} /> : null}
    </>
  )
}
