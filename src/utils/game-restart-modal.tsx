import React from 'react'
import { Button } from '../components/ui/button.tsx'

export const getResetGameModalProps = (
  dispatch: React.Dispatch<GameAction>,
  setModalProps: (props: ModalProps | null) => void
): ModalProps => ({
  description: (
    <span className="text-2xl font-bold uppercase tracking-widest text-silver sm:text-4xl">
      Restart game?
    </span>
  ),
  actions: (
    <div className="space-x-4">
      <Button onClick={() => setModalProps(null)}>No, Cancel</Button>
      <Button
        variant="secondary"
        onClick={() => {
          dispatch({ type: 'START_GAME' })
          setModalProps(null)
        }}
      >
        Yes, Restart
      </Button>
    </div>
  ),
})
