import '@fontsource-variable/outfit/wght.css'
import TicTacToeGame from './components/game/tic-tac-toe-game.tsx'
import { TicTacToeProvider } from './providers/tic-tac-toe-provider.tsx'

function App() {
  return (
    <div className="grid min-h-svh">
      <TicTacToeProvider>
        <div className="max-w-screen-[1440px] container grid min-h-svh w-full items-center">
          <TicTacToeGame />
        </div>
      </TicTacToeProvider>
    </div>
  )
}

export default App
