import { Map } from 'immutable'

export default function * BubbleSort (globals, mkStep) {
  let A = globals.get('A')
  const N = A.count()

  let i = null
  let done = null

  const step = mkStep(() => ({
    locals: Map({
      i,
      'i-1': i - 1,
      done,
      'A[i]': A.get(i),
      'A[i-1]': A.get(i - 1)
    }),
    globals: Map({A, N})
  }))

  yield step('init')

  while (!done) {
    yield step('while')

    done = true
    yield step('while-init')

    for (i = 1; i < N; i++) {
      yield step('for')
      yield step('if')
      if (A.get(i - 1) > A.get(i)) {
        done = false
        const tmp = A.get(i)
        A = A.set(i, A.get(i - 1)).set(i - 1, tmp)
        yield step('not-done')
      }
    }
  }

  return step('done')
}
