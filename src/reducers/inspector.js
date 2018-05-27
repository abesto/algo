import { INSPECTOR_HIGHLIGHT, INSPECTOR_CLEAR } from '../constants/ActionTypes.js'

const initialState = {
  name: ''
}

const inspector = (state = initialState, action) => {
  switch (action.type) {
    case INSPECTOR_HIGHLIGHT:
      return {name: action.name}
    case INSPECTOR_CLEAR:
      if (state.name === action.name) {
        return initialState
      }
      return state
    default:
      return state
  }
}

export default inspector
