import {
  ALGORITHM_CHANGE_GLOBALS,
  ALGORITHM_INITIALIZE,
  ALGORITHM_START,
  ALGORITHM_STEP
} from '../constants/ActionTypes'

export const initialize = (algorithm) => ({
  type: ALGORITHM_INITIALIZE,
  algorithm
})

export const changeGlobals = (globalsKey, globals) => ({
  type: ALGORITHM_CHANGE_GLOBALS,
  globalsKey,
  globals
})

export const startAlgorithm = (algorithm) => ({
  type: ALGORITHM_START,
  algorithm
})

export const stepAlgorithm = (name) => ({
  type: ALGORITHM_STEP,
  name
})
