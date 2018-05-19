// Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
export default function * binarySearch (a, value) {
  let mid = null
  let low = 0
  let high = a.length - 1
  let result = null

  const step = (step) => ({a, value, low, mid, high, step})

  yield step('init')

  while (low <= high) {
    yield step('loop')
    mid = Math.floor((low + high) / 2)
    yield step('mid')
    yield step('branch')
    if (a[mid] > value) {
      high = mid - 1
      yield step('branch-0')
    } else if (a[mid] < value) {
      low = mid + 1
      yield step('branch-1')
    } else {
      result = mid
      return step('done')
    }
  }

  return step('not-found')
}
