// libs
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

// React components, containers
import Inspector from '../containers/Inspector.js'
import MkStep from './Step.js'
import Pseudocode from './Pseudocode.js'

// Binary search specifics
import binarySearch from '../algorithms/binarySearch.js'
import '../styles/BinarySearch.css'

export default class BinarySearch extends React.Component {
  constructor () {
    super()
    this.state = {
      insertFieldValue: ''
    }
    this.restart = this.restart.bind(this)
    this.restartWithExtraNumber = this.restartWithExtraNumber.bind(this)
    this.handleInsertFieldChanged = this.handleInsertFieldChanged.bind(this)
  }

  handleInsertFieldChanged (event) {
    this.setState({
      insertFieldValue: event.target.value
    })
  }

  numberToInsert () {
    return parseInt(this.state.insertFieldValue, 10)
  }

  restart (numbers = this.algoVar('A'), target = this.algoVar('value')) {
    this.props.startAlgorithm(binarySearch(numbers, target))
  }

  restartWithExtraNumber () {
    const numberToInsert = this.numberToInsert()
    if (isNaN(numberToInsert)) {
      return
    }
    const numbers = this.algoVar('A')
    numbers.push(numberToInsert)
    numbers.sort((a, b) => a - b)
    this.setState({
      insertFieldValue: ''
    })
    this.restart(numbers)
  }

  restartWithout (index) {
    return () => {
      const numbers = this.algoVar('A')
      numbers.splice(index, 1)
      this.restart(numbers)
    }
  }

  algoVar (name) {
    return this.props.algoState.value.variables[name]
  }

  render () {
    const stepAlgorithm = this.props.stepAlgorithm
    const low = this.algoVar('low')
    const mid = this.algoVar('mid')
    const high = this.algoVar('high')
    const step = this.props.algoState.value.step
    const numbers = this.algoVar('A')
    const target = this.algoVar('value')

    const Step = MkStep(step)

    return (
      <div className='BinarySearch'>
        <div className='description'>
          <h2>Binary search</h2>
          <blockquote cite='https://rosettacode.org/wiki/Binary_search'>
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
            <footer className='blockquote-footer'><cite title='Binary Search - Rosetta Code'>
              – <a href='https://rosettacode.org/wiki/Binary_search'>Binary Search - Rosetta Code</a>
            </cite></footer>
          </blockquote>
          <p>This algorithm can be implemented both recursively and iteratively. This page showcases the iterative approach.</p>
        </div>
        <div className='controls'>
          <h3>Controls</h3>
          <div className='controls-grid'>
            <label className='target-label'>Search for:</label>
            <input
              className='target'
              name='target'
              value={target}
              onChange={(e) => this.restart(numbers, parseInt(e.target.value, 10))}
              type='number'
            />
            <input
              className='insert-field'
              name='insert-field'
              value={this.state.insertFieldValue}
              onChange={this.handleInsertFieldChanged}
              placeholder='Enter number to insert...'
              type='number'
            />
            <button className='insert' onClick={this.restartWithExtraNumber}>Insert number</button>
            <button className='start' onClick={() => this.restart()}>Start</button>
            <button className='step' onClick={() => stepAlgorithm()}>Step</button>
          </div>
        </div>
        <div className='numbers'>
          {numbers.map((n, i) =>
            <div
              className={classNames('number', {low: low === i, high: high === i, mid: mid === i})}
              key={i}
            >
              {n}
              <div
                className='number-delete'
                onClick={this.restartWithout(i)}
              />
            </div>)
          }
        </div>
        <Pseudocode
          Step={Step}
          vars={this.props.algoState.value.variables}
        >{`
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
        :    return not_found // {value} would be inserted at index "{low}"
        :}
`}</Pseudocode>
        <Inspector vars={this.props.algoState.value.variables} />
      </div>
    )
  }
}

BinarySearch.propTypes = {
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired
}
