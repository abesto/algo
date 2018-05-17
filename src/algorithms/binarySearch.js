// Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
export default function * binarySearch (a, value) {
  var state = {mid: null, lo: 0, hi: a.length - 1, result: null}
  yield state

  while (state.lo <= state.hi) {
    state.mid = Math.floor((state.lo + state.hi) / 2)
    yield state

    if (a[state.mid] > value) {
      state.hi = state.mid - 1
      yield state
    } else if (a[state.mid] < value) {
      state.lo = state.mid + 1
      yield state
    } else {
      state.result = state.mid
      return state
    }
  }

  return state
}
