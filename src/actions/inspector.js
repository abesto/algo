import { INSPECTOR_SHOW, INSPECTOR_CLEAR } from '../constants/ActionTypes.js'

export const inspect = (value) => ({
  type: INSPECTOR_SHOW,
  value
})

export const clearInspector = () => ({type: INSPECTOR_CLEAR})
