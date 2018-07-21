//@flow strict
import { Map, Record, List } from 'immutable'
import type { RecordFactory, RecordOf } from 'immutable'

type GlobalsProps = {A: List<number>, value: number}
export const makeGlobals: RecordFactory<GlobalsProps> = Record({A: List(), value: 0})
export type Globals = RecordOf<GlobalsProps>

function unsafeGet<V> (map: List<V>, index: number): V {
  const value: V | void = map.get(index)
  if (typeof(value) === 'undefined') {
    throw 'foobar'
  }
  return value
}

export default function * BinarySearch (globals: Globals, mkStep: (() => {}) => (string) => {}): Iterable<{}> {
  // Algorithm originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
  const A: List<number> = globals.get('A').sort()
  const value: number = globals.get('value')

  const N = A.count()
  let low = 0
  let high = N - 1
  let mid = high / 2

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
    if (unsafeGet(A, mid) > value) {
      high = mid - 1
      yield step('branch-0')
    } else if (unsafeGet(A, mid) < value) {
      low = mid + 1
      yield step('branch-1')
    } else {
      yield step('done')
      return
    }
  }

  yield step('not-found')
}
