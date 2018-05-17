import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import binarySearch from '../algorithms/binarySearch.js'
import '../styles/BinarySearch.css'

const BinarySearch = ({ numbers, target, algoState, startAlgorithm, stepAlgorithm }) => {
  const value = algoState.value
  const lo = value ? value.lo : null
  const hi = value ? value.hi : null
  const mid = value ? value.mid : null
  return (
    <div className='binary-search'>
      Looking for: {target}
      <div className='numbers'>
        {numbers.map((n, i) =>
          <div className={classNames('number', {lo: lo === i, hi: hi === i, mid: mid === i})} key={i}>{n}</div>)
        }
      </div>
      <pre>{JSON.stringify(algoState)}</pre>
      <button onClick={() => startAlgorithm(binarySearch(numbers, target))}>Start</button>
      <button onClick={() => stepAlgorithm()}>Step</button>
    </div>
  )
}

BinarySearch.propTypes = {
  numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
  target: PropTypes.number.isRequired,
  algoState: PropTypes.object.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired
}

export default BinarySearch
