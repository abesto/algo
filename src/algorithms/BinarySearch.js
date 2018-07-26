import React from 'react'
import { Map } from 'immutable'

import AlgorithmDescription from '../components/AlgorithmDescription'
import Blockquote from '../components/html/Blockquote'
import { colorVariables } from './helpers'

export { GLOBALS_KEY_SEARCH as globalsKey } from '../constants/Globals'
export { SearchControls as Controls } from '../components/controls'
export { Arrayviz as Dataviz } from '../components/dataviz'

export const route = '/search/binary'

export const title = 'Binary Search'

export const Description = (
  <AlgorithmDescription title={title}>
    <Blockquote href='https://rosettacode.org/wiki/Binary_search' title='Binary Search - Rosetta Code'>
      <p>A binary search divides a range of values into halves, and continues to narrow down the field of search
        until the unknown value is found. It is the classic example of a "divide and conquer" algorithm.</p>
      <p>As an analogy, consider the children's game "guess a number." The scorer has a secret number, and will
        only tell the player if their guessed number is higher than, lower than, or equal to the secret number.
        The player then uses this information to guess a new number.</p>
      <p>As the player, an optimal strategy for the general case is to start by choosing the range's midpoint as
        the guess, and then asking whether the guess was higher, lower, or equal to the secret number. If the
        guess was too high, one would select the point exactly between the range midpoint and the beginning of
        the range. If the original guess was too low, one would ask about the point exactly between the range
        midpoint and the end of the range. This process repeats until one has reached the secret number.</p>
    </Blockquote>
    <p>This algorithm can be implemented both recursively and iteratively. This page showcases the iterative approach.</p>
  </AlgorithmDescription>
)

export const code = `
         :BinarySearch({A}[0..{N}-1], {value}) {
     init:    {low} = 0
     init:    {high} = {N} - 1
     loop:    while ({low} <= {high}) {
         :        // invariants: {value} > {A}[i] for all i < {low}
         :        //             {value} < {A}[i] for all i > {high}
      mid:        {mid} = ({low} + {high}) / 2
   branch:        if ({A}[{mid}] > {value})
 branch-0:            {high} = {mid} - 1
   branch:        else if ({A}[{mid}] < {value})
 branch-1:            {low} = {mid} + 1
   branch:        else
     done:            return {mid}
     loop:    }
not-found:    return not_found // {value} would be inserted at index "{low}"
        :}
`

export const varStyles = colorVariables({
  low: 'lightblue',
  high: 'lightgreen',
  mid: 'yellow'
})
console.log(varStyles)

export function * generator (globals, mkStep) {
  // originally taken from https://rosettacode.org/wiki/Binary_search#JavaScript
  const A = globals.get('A').sort()
  const value = globals.get('value')

  const N = A.count()
  let mid = null
  let low = 0
  let high = N - 1

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
    if (A.get(mid) > value) {
      high = mid - 1
      yield step('branch-0')
    } else if (A.get(mid) < value) {
      low = mid + 1
      yield step('branch-1')
    } else {
      return step('done')
    }
  }

  return step('not-found')
}
