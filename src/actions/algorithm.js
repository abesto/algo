import { ALGORITHM_START, ALGORITHM_STEP } from '../constants/ActionTypes.js'

export const startAlgorithm = (algorithm) => ({
  type: ALGORITHM_START,
  algorithm
})

export const stepAlgorithm = () => ({type: ALGORITHM_STEP})
