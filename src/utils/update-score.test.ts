import { describe, expect, it } from 'vitest'
import { updateScore } from './update-score.ts'

describe('updateScore', () => {
  it('should increment xWins if X wins', () => {
    const score = { xWins: 1, oWins: 2, ties: 3 }
    const newScore = updateScore(score, 'X', 'win')
    expect(newScore.xWins).toBe(2)
    expect(newScore.oWins).toBe(2)
    expect(newScore.ties).toBe(3)
  })

  it('should increment oWins if O wins', () => {
    const score = { xWins: 1, oWins: 2, ties: 3 }
    const newScore = updateScore(score, 'O', 'win')
    expect(newScore.xWins).toBe(1)
    expect(newScore.oWins).toBe(3)
    expect(newScore.ties).toBe(3)
  })

  it('should increment ties if there is a tie', () => {
    const score = { xWins: 1, oWins: 2, ties: 3 }
    const newScore = updateScore(score, null, 'tie')
    expect(newScore.xWins).toBe(1)
    expect(newScore.oWins).toBe(2)
    expect(newScore.ties).toBe(4)
  })

  it('should not change score if there is no winner and is not tie', () => {
    const score = { xWins: 1, oWins: 2, ties: 3 }
    const newScore = updateScore(score, null, 'in_progress')
    expect(newScore.xWins).toBe(1)
    expect(newScore.oWins).toBe(2)
    expect(newScore.ties).toBe(3)
  })

  it('should return a new object', () => {
    const score = { xWins: 1, oWins: 2, ties: 3 }
    const newScore = updateScore(score, 'X', 'win')
    expect(newScore).not.toBe(score)
  })
})
