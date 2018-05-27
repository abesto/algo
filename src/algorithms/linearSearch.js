import { LINEAR_SEARCH } from '../constants/AlgorithmNames'

export default function * linearSearch (A = [1, 2, 5, 9, 13, 20, 42, 100, 250, 9000], value = 20) {
  let i
  const step = (step) => ({
    variables: {A, N: A.length, value, i, 'A[i]': A[i]},
    name: LINEAR_SEARCH,
    step
  })

  i = 0
  yield step('init')
  while (i < A.length && A[i] !== value)  {
    yield step('loop')
    i += 1
    yield step('inc')
  }

  yield step('branch')
  if (i < A.length) {
    return step('done')
  }

  return step('not-found')
}

