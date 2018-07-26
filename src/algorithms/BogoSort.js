import React from 'react'
import { Map } from 'immutable'

import AlgorithmDescription from '../components/AlgorithmDescription'
import Blockquote from '../components/html/Blockquote'
import * as random from '../random'
import { colorVariables } from './helpers'

export { SortControls as Controls } from '../components/controls'
export { ArrayViz as Dataviz } from '../components/dataviz'
export { GLOBALS_KEY_SORT as globalsKey } from '../constants/Globals'

export const route = '/search/bogo'

export const title = 'Bogosort'

export const Description = (
  <AlgorithmDescription title={title}>
    <Blockquote href='https://en.wikipedia.org/wiki/Bogosort' title='Bogosort - Wikipedia'>
      Bogosort is a highly ineffective sorting function based on the generate and test paradigm. The function
      successively generates permutations of its input until it finds one that is sorted. It is not useful for sorting,
      but may be used for educational purposes, to contrast it with more efficient algorithms.
    </Blockquote>
    <p>In other words: bogosort shuffles the array it's sorting, until it's sorted.</p>
  </AlgorithmDescription>
)

export const code = `
         init:BogoSort({A}[0..{N}-1]) {
         loop:    while (true) {
             :        // First check if the list is sorted
issorted-loop:        for ({i} = 0; {i} < {N - 1}; {i}++) {
  issorted-if:            if ({A[i]} > {A[i+1]}) {
    notsorted:                // Not sorted
    notsorted:                break
  issorted-if:            }
issorted-loop:        }
issorted-post:        if ({i} == {N} - 1) {
         done:            // Sorted
         done:            return
issorted-post:        }
             :        // The array is not sorted. Let's shuffle it using Knuth's shuffle algorithm! 
  shuffle-for:        for ({i} = 0; {i} < {N} - 1; {i}++) {
    shuffle-j:            {j} = randomIntegerBetween({i}, {N})   // including {i}, excluding {N}
 shuffle-swap:            {A[i]}, {A[j]} = {A[j]}, {A[i]}          // Swap {A[i]} and {A[j]}
  shuffle-for:        }
 shuffle-done:        // Shuffle is done, let's start over
         loop:    }
         init:}
`

export const varStyles = colorVariables({
  i: 'lightblue',
  j: 'lightgreen'
})

export function * generator (globals, mkStep) {
  let A = globals.get('A')
  const N = A.count()

  let i = null
  let j = null

  const step = mkStep(() => ({
    locals: Map({
      i,
      j,
      'A[i]': A.get(i),
      'A[i+1]': A.get(i + 1),
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
