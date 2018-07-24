import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'
import { Map } from 'immutable'

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
      <div>
        <h3>Controls</h3>
        <div className={css(styles.grid)}>
          <input
            className={css(styles.input)}
            name='insert-field'
            value={this.state.insertFieldValue}
            onChange={this.handleInsertFieldChanged}
            placeholder='Enter number to insert...'
            type='number'
          />
          <button onClick={this.handleInsert}>Insert number</button>
          <button className={css(styles.wide)} onClick={this.handleShuffle}>Shuffle</button>
          <button className={css(styles.wide)} onClick={this.props.startAlgorithm}>Restart</button>
          <button className={css(styles.wide)} onClick={this.props.stepAlgorithm}>Step</button>
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

export default SortControls
