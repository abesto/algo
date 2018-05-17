import React from 'react'
import PropTypes from 'prop-types'

const Inspector = ({ value }) => (
  <div className='Inspector'>Inspector: {JSON.stringify(value)}</div>
)

Inspector.propTypes = {
  value: PropTypes.any
}

export default Inspector
