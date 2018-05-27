// libs
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// React components, containers
import Inspector from '../containers/Inspector.js'
import MkStep from './Step.js'
import Pseudocode from './Pseudocode.js'

// Linear search specifics
import linearSearch from '../algorithms/linearSearch'
import '../styles/LinearSearch.css'

export default class LinearSearch extends React.Component {
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
    this.props.startAlgorithm(linearSearch(numbers, target))
  }

  restartWithExtraNumber () {
    const numberToInsert = this.numberToInsert()
    if (isNaN(numberToInsert)) {
      return
    }
    const numbers = this.algoVar('A')
    numbers.push(numberToInsert)
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
    const current = this.algoVar('i')
    const step = this.props.algoState.value.step
    const numbers = this.algoVar('A')
    const target = this.algoVar('value')

    const Step = MkStep(step)

    return (
      <div className='LinearSearch'>
        <div className='description'>
          <h2>Linear search</h2>
          <blockquote cite='https://en.wikipedia.org/wiki/Brute-force_search'>
            <p>Linear search or sequential search is a method for finding a target value within a list. It sequentially
              checks each element of the list for the target value until a match is found or until all the elements have
              been searched.</p>
            <footer className='blockquote-footer'><cite title='Linear search - Wikipedia'>
              – <a href='https://en.wikipedia.org/wiki/Linear_search'>Linear search - Wikipedia</a>
            </cite></footer>
          </blockquote>
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
              className={classNames('number', {i: current === i})}
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
        <Inspector vars={this.props.algoState.value.variables} />
      </div>
    )
  }
}

LinearSearch.propTypes = {
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired
}
