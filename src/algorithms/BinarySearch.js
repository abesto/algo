import { Map } from 'immutable'

import { BINARY_SEARCH } from '../constants/AlgorithmNames'
import Algorithm from './Algorithm'
import { GLOBALS_KEY_SEARCH } from '../constants/Globals'

const BinarySearchAlgo = new Algorithm(
  BINARY_SEARCH, GLOBALS_KEY_SEARCH,
  function * (globals, mkStep) {
    // Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
    const A = globals.get('A').sort()
    const value = globals.get('value')

    const N = A.count()
    let mid = null
    let low = 0
    let high = N - 1

    const step = mkStep(() => ({
      locals: Map({N, low, mid, high}),
      globals: Map({A, value})
    }))

    yield step('init')

    while (low <= high) {
      yield step('loop')
      mid = Math.floor((low + high) / 2)
      yield step('mid')
      yield step('branch')
      if (A.get(mid) > value) {
        high = mid - 1
        yield step('branch-0')
      } else if (A.get(mid) < value) {
        low = mid + 1
        yield step('branch-1')
      } else {
        return step('done')
      }
    }

    return step('not-found')
  }
)

export default BinarySearchAlgo
