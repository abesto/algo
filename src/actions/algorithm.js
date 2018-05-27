import { ALGORITHM_START, ALGORITHM_STEP } from '../constants/ActionTypes'

export const startAlgorithm = (algorithm) => ({
  type: ALGORITHM_START,
  algorithm
})

export const stepAlgorithm = (name) => ({
  type: ALGORITHM_STEP,
  name
})
