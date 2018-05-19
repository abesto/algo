import { combineReducers } from 'redux'

import algorithm from './algorithm.js'
import inspector from './inspector.js'

const app = combineReducers({
  algorithm,
  inspector
})

export default app
