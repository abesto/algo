import React from 'react'
import classNames from 'classnames'

import '../styles/Step.css'

const MkStep = (current) => ({ name, children }) => (
  <span className={classNames('Step', {'current-step': name === current})}>{children}</span>
)

export default MkStep
