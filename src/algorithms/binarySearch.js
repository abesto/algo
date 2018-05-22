// Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
export default function * binarySearch (A, value) {
  let mid = null
  let low = 0
  let high = A.length - 1

  const step = (step) => ({
    variables: {A, N: A.length, value, low, mid, high},
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
