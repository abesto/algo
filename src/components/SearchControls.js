import React from 'react'
import PropTypes from 'prop-types'

import '../styles/SearchControls.css'

class SearchControls extends React.Component {
  constructor () {
    super()
    this.state = {
      insertFieldValue: ''
    }
    this.handleInsertFieldChanged = this.handleInsertFieldChanged.bind(this)
    this.handleInsert = this.handleInsert.bind(this)
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
    this.props.onInsert(n)
    this.setState({
      insertFieldValue: ''
    })
  }

  render() {
    return (
      <div className='SearchControls'>
        <h3>Controls</h3>
        <div className='controls-grid'>
          <label className='target-label'>Search for:</label>
          <input
            className='target'
            name='target'
            value={this.props.target}
            onChange={(e) => this.props.onTargetChanged(parseInt(e.target.value, 10))}
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
          <button className='start' onClick={() => this.props.onStart()}>Start</button>
          <button className='step' onClick={() => this.props.onStep()}>Step</button>
        </div>
      </div>

    )
  }
}

SearchControls.propTypes = {
  target: PropTypes.number.isRequired,
  onTargetChanged: PropTypes.func,
  onInsert: PropTypes.func,
  onStep: PropTypes.func,
  onStart: PropTypes.func
}


export default SearchControls
