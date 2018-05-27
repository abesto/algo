import { Map, List } from 'immutable'

import binarySearch from '../algorithms/binarySearch'
import linearSearch from '../algorithms/linearSearch'
import { ALGORITHM_START, ALGORITHM_STEP } from '../constants/ActionTypes.js'

const withNextFragment = (state, algorithm) => {
  const algoState = Map(algorithm.next())
  const name = algoState.getIn(['value', 'name'])
  return state
    .setIn(['algorithms', name], algorithm)
    .setIn(['states', name], algoState)
}

const initialState = List([
  binarySearch(), linearSearch()
]).reduce(withNextFragment, Map())

const algorithm = (state = initialState, action) => {
  const next = (algorithm) => withNextFragment(state, algorithm)

  switch (action.type) {
    case ALGORITHM_START:
      return next(action.algorithm)
    case ALGORITHM_STEP:
      const name = action.name
      if (state.getIn(['states', name, 'done'])) {
        return state
      }
      return next(state.getIn(['algorithms', name]))
    default:
      return state
  }
}

export default algorithm
