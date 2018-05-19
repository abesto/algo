import { ALGORITHM_START, ALGORITHM_STEP } from '../constants/ActionTypes.js'
import binarySearch from '../algorithms/binarySearch.js'

const initialState = () => {
  const algo = binarySearch([1, 2, 5, 9, 13, 20, 42, 100, 250, 9000], 20)
  const state = algo.next()
  return {
    currentAlgorithm: algo,
    state
  }
}

const algorithm = (state = initialState(), action) => {
  switch (action.type) {
    case ALGORITHM_START:
      return {
        currentAlgorithm: action.algorithm,
        state: action.algorithm.next()
      }
    case ALGORITHM_STEP:
      console.log(state)
      if (state.state.done) {
        return state
      }
      return {
        currentAlgorithm: state.currentAlgorithm,
        state: state.currentAlgorithm.next()
      }
    default:
      return state
  }
}

export default algorithm
