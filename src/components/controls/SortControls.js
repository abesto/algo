import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import '../../styles/controls/SortControls.css'
import * as random from '../../random'

class SortControls extends React.Component {
  constructor () {
    super()
    this.state = {
      insertFieldValue: ''
    }
    this.handleInsertFieldChanged = this.handleInsertFieldChanged.bind(this)
    this.handleInsert = this.handleInsert.bind(this)
    this.handleShuffle = this.handleShuffle.bind(this)
  }

  handleInsertFieldChanged (event) {
    this.setState({
      insertFieldValue: event.target.value
    })
  }

  handleShuffle () {
    let A = this.props.variables.get('A')
    const N = A.count()
    for (let i = 0; i < N - 1; i++) {
      let j = random.intBetween(i, N)
      A = A.set(i, A.get(j)).set(j, A.get(i))
    }
    this.props.changeGlobals(Map({A}))
  }

  handleInsert () {
    const n = parseInt(this.state.insertFieldValue, 10)
    if (isNaN(n)) {
      return
    }
    const numbers = this.props.variables.get('A')
    this.props.changeGlobals(Map({A: numbers.push(n)}))
    this.setState({
      insertFieldValue: ''
    })
  }

  render () {
    return (
      <div className='controls SortControls'>
        <h3>Controls</h3>
        <div className='controls-grid'>
          <input
            className='insert-field'
            name='insert-field'
            value={this.state.insertFieldValue}
            onChange={this.handleInsertFieldChanged}
            placeholder='Enter number to insert...'
            type='number'
          />
          <button className='insert' onClick={this.handleInsert}>Insert number</button>
          <button className='shuffle' onClick={this.handleShuffle}>Shuffle</button>
          <button className='start' onClick={this.props.startAlgorithm}>Start</button>
          <button className='step' onClick={this.props.stepAlgorithm}>Step</button>
        </div>
      </div>

    )
  }
}

SortControls.propTypes = {
  variables: PropTypes.instanceOf(Map).isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired,
  changeGlobals: PropTypes.func.isRequired
}

export default SortControls
