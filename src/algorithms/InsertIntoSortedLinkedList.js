import React from 'react'
import { Map } from 'immutable'

import Blockquote from '../components/html/Blockquote'
import AlgorithmDescription from '../components/AlgorithmDescription'

export { GLOBALS_KEY_SORTED_LINKED_LIST as globalsKey } from '../constants/Globals'
export { SearchControls as Controls } from '../components/controls'
export { LinkedList as Dataviz } from '../components/dataviz'

export const route = '/linked-list/sorted/insert'

export const title = 'Insert into sorted linked list'

export const Description = (
  <AlgorithmDescription title={title}>
    <Blockquote href='' title='TODO'>
      <p>TODO</p>
    </Blockquote>
  </AlgorithmDescription>
)

export const code = `
TODO
`

export const varStyles = {
  i: { backgroundColor: 'lightgreen' }
}

export function * generator (globals, mkStep) {
  const Head = globals.get('Head')
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
