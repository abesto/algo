import { Map } from 'immutable'

import {
  ALGORITHM_START,
  ALGORITHM_STEP,
  ALGORITHM_INITIALIZE,
  ALGORITHM_CHANGE_GLOBALS
} from '../constants/ActionTypes'
import { DEFAULTS } from '../constants/Globals'

const withNextFragment = (state, algorithm) => {
  const algoState = algorithm.next()
  const globals = algoState.getIn(['value', 'globals'])
  const globalsKey = algoState.getIn(['value', 'globalsKey'])
  const name = algorithm.name
  return state
    .setIn(['algorithms', name], algorithm)
    .setIn(['states', name], algoState)
    .setIn(['globals', globalsKey], globals)
}

const algorithm = (state = Map(), action) => {
  const next = (algorithm) => withNextFragment(state, algorithm)

  switch (action.type) {
    case ALGORITHM_INITIALIZE:
      return state
        .setIn(['algorithms', action.algorithm.name], action.algorithm)
        .setIn(['globals', action.algorithm.globalsKey], DEFAULTS.get(action.algorithm.globalsKey))
    case ALGORITHM_CHANGE_GLOBALS:
      return state.mergeIn(['globals', action.globalsKey], action.globals)
    case ALGORITHM_START:
      action.algorithm.start()
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
