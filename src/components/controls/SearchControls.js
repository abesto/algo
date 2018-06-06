import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import '../../styles/SearchControls.css'

class SearchControls extends React.Component {
  constructor () {
    super()
    this.state = {
      insertFieldValue: ''
    }
    this.handleInsertFieldChanged = this.handleInsertFieldChanged.bind(this)
    this.handleInsert = this.handleInsert.bind(this)
    this.handleTargetChange = this.handleTargetChange.bind(this)
  }

  handleInsertFieldChanged (event) {
    this.setState({
      insertFieldValue: event.target.value
    })
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

  handleTargetChange (event) {
    const value = parseInt(event.target.value, 10)
    this.props.changeGlobals(Map({value}))
  }

  render () {
    return (
      <div className='SearchControls'>
        <h3>Controls</h3>
        <div className='controls-grid'>
          <label className='target-label'>Search for:</label>
          <input
            className='target'
            name='target'
            value={this.props.variables.get('value')}
            onChange={this.handleTargetChange}
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
          <button className='insert' onClick={this.handleInsert}>Insert number</button>
          <button className='start' onClick={this.props.startAlgorithm}>Start</button>
          <button className='step' onClick={this.props.stepAlgorithm}>Step</button>
        </div>
      </div>

    )
  }
}

SearchControls.propTypes = {
  variables: PropTypes.instanceOf(Map).isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired,
  changeGlobals: PropTypes.func.isRequired
}

export default SearchControls
