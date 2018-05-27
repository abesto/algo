import { List, Map } from 'immutable'

import { BINARY_SEARCH } from '../constants/AlgorithmNames'

// Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
export default function * binarySearch (A = List([1, 2, 5, 9, 13, 20, 42, 100, 250, 9000]), value = 20) {
  const N = A.count()
  let mid = null
  let low = 0
  let high = N - 1

  const step = (step) => Map({
    variables: Map({A, N, value, low, mid, high}),
    name: BINARY_SEARCH,
    step
  })

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
