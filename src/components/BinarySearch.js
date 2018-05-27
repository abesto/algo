// libs
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// React components, containers
import Inspector from '../containers/Inspector.js'
import SearchControls from './SearchControls'
import Pseudocode from './Pseudocode.js'
import Blockquote from './Blockquote'

// Binary search specifics
import binarySearch from '../algorithms/binarySearch.js'
import '../styles/BinarySearch.css'

const BinarySearch = ({ algoState, startAlgorithm, stepAlgorithm }) => {
  const algoVar = (name) => algoState.getIn(['variables', name])
  const numbers = algoVar('A')
  const target = algoVar('value')

  const restart = (A = numbers, value = target) => startAlgorithm(binarySearch(A, value))
  const restartWithExtraNumber = (numberToInsert) => restart(numbers.push(numberToInsert).sort())
  const restartWithout = (index) => () => restart(numbers.splice(index, 1))

  return (
    <div className='BinarySearch'>
      <div className='description'>
        <h2>Binary search</h2>
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
      </div>
      <SearchControls
        target={target}
        onInsert={restartWithExtraNumber}
        onStart={restart}
        onStep={stepAlgorithm}
        onTargetChanged={(target) => restart(numbers, target)}
      />
      <div className='numbers'>
        {numbers.map((n, i) =>
          <div
            className={classNames('number', {low: algoVar('low') === i, high: algoVar('high') === i, mid: algoVar('mid') === i})}
            key={i}
          >
            {n}
            <div
              className='number-delete'
              onClick={restartWithout(i)}
            />
          </div>)
        }
      </div>
      <Pseudocode algoState={algoState}>{`
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
`}</Pseudocode>
      <Inspector vars={algoState.get('variables')} />
    </div>
  )
}

BinarySearch.propTypes = {
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired
}

export default BinarySearch
