import { combineReducers } from 'redux'

import algorithm from './algorithm.js'
import binarySearch from './binarySearch.js'
import inspector from './inspector.js'

const app = combineReducers({
  algorithm,
  binarySearch,
  inspector
})

export default app
