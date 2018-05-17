import { combineReducers } from 'redux'

import algorithm from './algorithm.js'
import binarySearch from './binarySearch.js'

const app = combineReducers({
  algorithm,
  binarySearch
})

export default app
