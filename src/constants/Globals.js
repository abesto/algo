import { List, Map } from 'immutable'

export const GLOBALS_KEY_SEARCH = 'search'

export const DEFAULTS = Map({
  [GLOBALS_KEY_SEARCH]: Map({
    value: 20,
    A: List([1, 2, 5, 9, 13, 20, 42, 100, 250, 9000])
  })
})
