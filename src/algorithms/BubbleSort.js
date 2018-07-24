import React from 'react'
import { Map } from 'immutable'

import Blockquote from '../components/html/Blockquote'
import AlgorithmDescription from '../components/AlgorithmDescription'

export { GLOBALS_KEY_SORT as globalsKey } from '../constants/Globals'
export { SortControls as Controls } from '../components/controls'
export { Array as Dataviz } from '../components/dataviz'

export const route = '/sort/bubble'

export const title = 'Bubble Sort'

export const Description = (
  <AlgorithmDescription title={title}>
    <Blockquote href='https://rosettacode.org/wiki/Sorting_algorithms/Bubble_sort' title='Bubble sort - Rosetta Code'>
      <p>
        The bubble sort is generally considered to be the simplest sorting algorithm.
      </p>
      <p>
        Because of its simplicity and ease of visualization, it is often taught in introductory computer science courses.
      </p>
      <p>
        Because of its abysmal O(n2) performance, it is not used often for large (or even medium-sized) datasets.
      </p>
      <p>
        The bubble sort works by passing sequentially over a list, comparing each value to the one immediately after it.
        If the first value is greater than the second, their positions are switched.   Over a number of passes, at most
        equal to the number of elements in the list, all of the values drift into their correct positions (large values
        "bubble" rapidly toward the end, pushing others down around them). Because each pass finds the maximum item and
        puts it at the end, the portion of the list to be sorted can be reduced at each pass.   A boolean variable is
        used to track whether any changes have been made in the current pass; when a pass completes without changing
        anything, the algorithm exits.
      </p>
    </Blockquote>
  </AlgorithmDescription>
)

export const code = `
      init:BubbleSort({A}[0..{N}-1]) {
     while:    while (!{done}) {
while-init:        {done} = true
       for:        for ({i} = 1; {i} < {N - 1}; {i}++) {
        if:            if ({A[i-1]} > {A[i]}) {
  not-done:                {done} = false
  not-done:                A[{i}], A[{i-1}] = {A[i-1]}, {A[i]}
        if:            }
       for:        }
     while:    }
      done:    // Done, list is sorted
      init:}
`

export const varStyles = {
  i: {backgroundColor: 'lightblue'},
  'i-1': {backgroundColor: 'lightcyan'},
  done: {backgroundColor: 'lightgreen'}
}

export function * generator (globals, mkStep) {
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
