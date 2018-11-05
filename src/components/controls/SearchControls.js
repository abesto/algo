import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Map } from 'immutable'

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
      <div>
        <h3>Controls</h3>
        <div className={css(styles.grid)}>
          <label className={css(styles.label)}>Search for:</label>
          <input
            name='target'
            className={css(styles.input)}
            value={this.props.variables.get('value')}
            onChange={this.handleTargetChange}
            type='number'
          />
          <input
            name='insert-field'
            className={css(styles.input)}
            value={this.state.insertFieldValue}
            onChange={this.handleInsertFieldChanged}
            placeholder='Enter number to insert...'
            type='number'
          />
          <button onClick={this.handleInsert}>Insert number</button>
          <button className={css(styles.wide)} onClick={this.props.startAlgorithm}>Restart</button>
          <button className={css(styles.wide)} onClick={this.props.stepAlgorithm}>Step</button>
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

const styles = StyleSheet.create({
  input: {
    height: '20px'
  },
  label: {
    textAlign: 'right'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '30px 10px',
    marginTop: '20px',
    alignItems: 'center'
  },
  wide: {
    gridColumn: '1 / -1'
  }
})

export default SearchControls
