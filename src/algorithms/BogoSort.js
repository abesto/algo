import { Map } from 'immutable'

import * as random from '../random'

export default function * BogoSort (globals, mkStep) {
  let A = globals.get('A')
  const N = A.count()

  let i = null
  let j = null
  let sorted = false

  const step = mkStep(() => ({
    locals: Map({
      i,
      j,
      sorted,
      'A[i]':A.get(i),
      'A[i+1]': A.get(i+1),
      'A[j]': A.get(j)
    }),
    globals: Map({A, N})
  }))

  yield step('init')

  while (true) {
    yield step('loop')

    // Is the list sorted?
    yield step('issorted-loop')
    for (i = 0; i < N - 1; i++) {
      yield step('issorted-if')
      if (A.get(i) > A.get(i + 1)) {
        yield step('notsorted')
        break
      }
      yield step('issorted-loop')
    }
    yield step('issorted-post')
    if (i === N - 1) {
      return step('done')
    }

    // If not, shuffle it using Knuth's shuffle algorithm
    for (i = 0; i < N - 1; i++) {
      yield step('shuffle-for')
      j = random.intBetween(i, N)
      yield step('shuffle-j')
      A = A.set(i, A.get(j)).set(j, A.get(i))
      yield step('shuffle-swap')
      j = null
    }
    yield step('shuffle-done')
  }
}
