import { List, Map } from 'immutable'

import { LINEAR_SEARCH } from '../constants/AlgorithmNames'

export default function * linearSearch (A = List([1, 2, 5, 9, 13, 20, 42, 100, 250, 9000]), value = 20) {
  const N = A.count()
  let i
  const step = (step) => Map({
    variables: Map({A, N, value, i, 'A[i]': A.get(i)}),
    name: LINEAR_SEARCH,
    step
  })

  i = 0
  yield step('init')
  while (i < N && A.get(i) !== value)  {
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

