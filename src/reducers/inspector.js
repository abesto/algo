import { INSPECTOR_SHOW, INSPECTOR_CLEAR } from '../constants/ActionTypes.js'

const initialState = {
  value: null
}

const inspector = (state = initialState, action) => {
  switch (action.type) {
    case INSPECTOR_SHOW:
      return {value: action.value}
    case INSPECTOR_CLEAR:
      return initialState
    default:
      return state
  }
}

export default inspector
