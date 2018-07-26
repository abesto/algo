import { List, Map } from 'immutable'
import LinkedList from '../datastructures/LinkedList'

export const GLOBALS_KEY_SEARCH = 'search'
export const GLOBALS_KEY_SORT = 'sort'
export const GLOBALS_KEY_SORTED_LINKED_LIST = 'sorted-linked-list'

export const DEFAULTS = Map({
  [GLOBALS_KEY_SEARCH]: Map({
    value: 20,
    A: List([1, 2, 5, 9, 13, 20, 42, 100, 250, 9000])
  }),
  [GLOBALS_KEY_SORT]: Map({
    A: List([28, 47, 16, 30, 98, 58, 86, 75, 25, 71, 19, 54, 1, 57, 39])
  }),
  [GLOBALS_KEY_SORTED_LINKED_LIST]: Map({
    value: 40,
    Head: LinkedList.fromArray([1, 16, 28, 30, 47, 59])
  })
})
