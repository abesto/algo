import React from 'react'
import classNames from 'classnames'

import '../styles/Var.css'

const Var = ({ value, inspect, clearInspector, children }) => (
  <span
    className={classNames('Var', children)}
    onMouseEnter={() => inspect(value)}
    onMouseLeave={clearInspector}
  >{children}</span>
)

export default Var
