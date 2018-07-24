import React from 'react'
import { Map } from 'immutable'

import Blockquote from '../components/html/Blockquote'
import AlgorithmDescription from '../components/AlgorithmDescription'

export { GLOBALS_KEY_SEARCH as globalsKey } from '../constants/Globals'
export { SearchControls as Controls } from '../components/controls'
export { Array as Dataviz } from '../components/dataviz'

export const route = '/search/linear'

export const title = 'Linear Search'

export const Description = (
  <AlgorithmDescription title={title}>
    <Blockquote href='https://en.wikipedia.org/wiki/Brute-force_search' title='Linear search - Wikipedia'>
      <p>Linear search or sequential search is a method for finding a target value within a list. It sequentially
        checks each element of the list for the target value until a match is found or until all the elements have
        been searched.</p>
    </Blockquote>
  </AlgorithmDescription>
)

export const code = `
         :LinearSearch({A}[0..{N}-1], {value}) {
     init:    {i} = 0
     loop:    while ({i} < {N} and {A[i]} != {value}) {
      inc:        i += 1
     loop:    }
   branch:    if (i < N) {
     done:        return {i}
   branch:    }
not-found:    return not_found
        :}
`

export const varStyles = {
  i: { backgroundColor: 'lightgreen' }
}

export function * generator (globals, mkStep) {
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
