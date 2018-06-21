import { Map } from 'immutable'

export default function * LinearSearch (globals, mkStep) {
  const A = globals.get('A')
  const value = globals.get('value')
  const N = A.count()
  let i

  const step = mkStep(() => ({
    locals: Map({i, N, 'A[i]': A.get(i)}),
    globals: Map({A, value})
  }))

  i = 0
  yield step('init')
  while (i < N && A.get(i) !== value) {
    yield step('loop')
    i += 1
    yield step('inc')
  }

  yield step('branch')
  if (i < N) {
    return step('done')
  }

  return step('not-found')
}

