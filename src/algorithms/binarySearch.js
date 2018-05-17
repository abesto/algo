// Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
export default function * binarySearch (a, value) {
  var mid = null
  var low = 0
  var high = a.length - 1
  var result = null
  yield {low, high, step: 'init'}

  while (low <= high) {
    yield {low, mid, high, step: 'loop'}
    mid = Math.floor((low + high) / 2)
    yield {low, mid, high, step: 'mid'}
    yield {low, mid, high, step: 'branch'}
    if (a[mid] > value) {
      high = mid - 1
      yield {low, mid, high, step: 'branch-0'}
    } else if (a[mid] < value) {
      low = mid + 1
      yield {low, mid, high, step: 'branch-1'}
    } else {
      result = mid
      yield {low, mid, high, result, step: 'done'}
      return {low, mid, high, result, found: true}
    }
  }

  return {low, mid, high, found: false}
}
