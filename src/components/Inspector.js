import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Inspector.css'

const Inspector = ({ value }) => (
  <div className='Inspector'>
    <h4>Inspector</h4>
    {JSON.stringify(value, null, 4)}</div>
)

Inspector.propTypes = {
  value: PropTypes.any
}

export default Inspector
