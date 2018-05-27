import _ from 'lodash'

import binarySearch from '../algorithms/binarySearch'
import linearSearch from '../algorithms/linearSearch'
import { ALGORITHM_START, ALGORITHM_STEP } from '../constants/ActionTypes.js'

const nextStateFragment = (algorithm) => {
  const state = algorithm.next()
  return {
    algorithms: {
      [state.value.name]: algorithm
    },
    states: {
      [state.value.name]: state
    }
  }
}

const initialState = _.merge(
  {
    algorithms: {},
    states: {}
  },
  nextStateFragment(binarySearch()),
  nextStateFragment(linearSearch())
)

console.log(initialState)

const algorithm = (state = initialState, action) => {
  switch (action.type) {
    case ALGORITHM_START:
      return _.merge({}, state, nextStateFragment(action.algorithm))
    case ALGORITHM_STEP:
      const name = action.name
      if (state.states[name].done) {
        return state
      }
      return _.merge({}, state, nextStateFragment(state.algorithms[name]))
    default:
      return state
  }
}

export default algorithm
