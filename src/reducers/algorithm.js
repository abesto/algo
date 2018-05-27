import { Map } from 'immutable'

import binarySearch from '../algorithms/binarySearch'
import linearSearch from '../algorithms/linearSearch'
import { ALGORITHM_START, ALGORITHM_STEP } from '../constants/ActionTypes.js'

const nextFragment = (algorithm) => {
  const state = Map(algorithm.next())
  const name = state.getIn(['value', 'name'])
  return Map({
    algorithms: Map([[name, algorithm]]),
    states: Map([[name, state]])
  })
}

const initialState = Map().mergeDeep(
  nextFragment(binarySearch()),
  nextFragment(linearSearch())
)

const algorithm = (state = initialState, action) => {
  const next = (algorithm) => state.mergeDeep(nextFragment(algorithm))

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
