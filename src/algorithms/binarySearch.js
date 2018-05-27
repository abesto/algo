// Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
import { BINARY_SEARCH } from '../constants/AlgorithmNames'

export default function * binarySearch (A = [1, 2, 5, 9, 13, 20, 42, 100, 250, 9000], value = 20) {
  let mid = null
  let low = 0
  let high = A.length - 1

  const step = (step) => ({
    variables: {A, N: A.length, value, low, mid, high},
    name: BINARY_SEARCH,
    step
  })

  yield step('init')

  while (low <= high) {
    yield step('loop')
    mid = Math.floor((low + high) / 2)
    yield step('mid')
    yield step('branch')
    if (A[mid] > value) {
      high = mid - 1
      yield step('branch-0')
    } else if (A[mid] < value) {
      low = mid + 1
      yield step('branch-1')
    } else {
      return step('done')
    }
  }

  return step('not-found')
}
