import { expect, test } from 'vitest'
import { calculateWinner } from './calculate-winner' // Assuming you've extracted this function

test('calculateWinner detects horizontal win for X', () => {
  const board: Array<Player | null> = [
    'X',
    'X',
    'X',
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  expect(calculateWinner(board)).toBe('X')
})

test('calculateWinner detects horizontal win for O', () => {
  const board: Array<Player | null> = [
    'O',
    'O',
    'O',
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  expect(calculateWinner(board)).toBe('O')
})

test('calculateWinner detects vertical win for X', () => {
  const board: Array<Player | null> = [
    'X',
    null,
    null,
    'X',
    null,
    null,
    'X',
    null,
    null,
  ]
  expect(calculateWinner(board)).toBe('X')
})

test('calculateWinner detects vertical win for O', () => {
  const board: Array<Player | null> = [
    'O',
    null,
    null,
    'O',
    null,
    null,
    'O',
    null,
    null,
  ]
  expect(calculateWinner(board)).toBe('O')
})

test('calculateWinner detects diagonal win for X', () => {
  const board: Array<Player | null> = [
    'X',
    null,
    null,
    null,
    'X',
    null,
    null,
    null,
    'X',
  ]
  expect(calculateWinner(board)).toBe('X')
})

test('calculateWinner detects diagonal win for O', () => {
  const board: Array<Player | null> = [
    'O',
    null,
    null,
    null,
    'O',
    null,
    null,
    null,
    'O',
  ]
  expect(calculateWinner(board)).toBe('O')
})

test('calculateWinner returns null with mixed players, no winner', () => {
  const board: Array<Player | null> = [
    'X',
    'O',
    'X',
    'O',
    null,
    'X',
    'X',
    'O',
    null,
  ]
  expect(calculateWinner(board)).toBe(null)
})

test('calculateWinner returns null when no winner', () => {
  const board: Array<Player | null> = [
    'X',
    'O',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  expect(calculateWinner(board)).toBe(null)
})

test('calculateWinner returns null on a tie game', () => {
  const board: Array<Player | null> = [
    'X',
    'O',
    'X',
    'O',
    'X',
    'O',
    'O',
    'X',
    'O',
  ]
  expect(calculateWinner(board)).toBe(null)
})
