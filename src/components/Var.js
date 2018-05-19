import React from 'react'
import classNames from 'classnames'

import '../styles/Var.css'

const Var = ({ name, highlight, clearHighlight }) => (
  <span
    className={classNames('Var', name)}
    onMouseEnter={() => highlight(name)}
    onMouseLeave={() => clearHighlight(name)}
  >{name}</span>
)

export default Var
