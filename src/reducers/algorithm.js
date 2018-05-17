import { ALGORITHM_START, ALGORITHM_STEP } from '../constants/ActionTypes.js'

const initialState = {
  currentAlgorithm: null,
  state: {}
}

const algorithm = (state = initialState, action) => {
  switch (action.type) {
    case ALGORITHM_START:
      return {
        currentAlgorithm: action.algorithm,
        state: action.algorithm.next()
      }
    case ALGORITHM_STEP:
      return {
        currentAlgorithm: state.currentAlgorithm,
        state: state.currentAlgorithm.next()
      }
    default:
      return state
  }
}

export default algorithm
