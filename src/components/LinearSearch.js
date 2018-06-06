// libs
import React from 'react'
import PropTypes from 'prop-types'
import { Map, List } from 'immutable'

// React components, containers
import Inspector from '../containers/Inspector.js'
import SearchControls from './SearchControls'
import Array from './Array'
import Pseudocode from './Pseudocode.js'
import Blockquote from './Blockquote'

// Linear search specifics
import '../styles/LinearSearch.css'

const LinearSearch = ({ algoState, changeGlobals, startAlgorithm, stepAlgorithm }) => {
  const variables = algoState.get('variables', Map())
  const numbers = variables.get('A', List())
  const target = variables.get('value', 0)

  const restartWithTarget = (value) => changeGlobals(Map({value}))
  const restartWithExtraNumber = (numberToInsert) => changeGlobals(Map({A: numbers.push(numberToInsert)}))
  const restartWithout = (index) => changeGlobals(Map({A: numbers.delete(index)}))

  return (
    <div className='LinearSearch'>
      <div className='description'>
        <h2>Linear search</h2>
        <Blockquote href='https://en.wikipedia.org/wiki/Brute-force_search' title='Linear search - Wikipedia'>
          <p>Linear search or sequential search is a method for finding a target value within a list. It sequentially
            checks each element of the list for the target value until a match is found or until all the elements have
            been searched.</p>
        </Blockquote>
      </div>
      <SearchControls
        target={target}
        onInsert={restartWithExtraNumber}
        onStart={startAlgorithm}
        onStep={stepAlgorithm}
        onTargetChanged={restartWithTarget}
      />
      <Array
        items={numbers}
        variables={variables}
        onRemove={restartWithout}
      />
      <Pseudocode algoState={algoState}>{`
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
`}</Pseudocode>
      <Inspector variables={variables} />
    </div>
  )
}

LinearSearch.propTypes = {
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired,
  changeGlobals: PropTypes.func.isRequired
}

export default LinearSearch
