import { expect, test } from 'vitest'
import { boardIsFull } from './board-is-full.ts'

test('should return true when board is full', () => {
  const board: Array<Player | null> = ['X', 'O', 'X', 'X', 'O', 'X']
  const actual = boardIsFull(board)
  expect(actual).toBe(true)
})

test('should return false when board is not full', () => {
  const board: Array<Player | null> = ['X', 'O', 'X', 'X', null, 'X']
  const actual = boardIsFull(board)
  expect(actual).toBe(false)
})
