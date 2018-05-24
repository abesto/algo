import { INSPECTOR_HIGHLIGHT, INSPECTOR_CLEAR } from '../constants/ActionTypes'

export const highlight = (name) => ({
  type: INSPECTOR_HIGHLIGHT,
  name
})

export const clearHighlight = (name) => ({
  type: INSPECTOR_CLEAR,
  name
})
