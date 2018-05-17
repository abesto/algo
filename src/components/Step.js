import React from 'react'
import classNames from 'classnames'

const MkStep = (current) => ({ name, children }) => (
  <span className={classNames('Step', {'current-step': name === current})}>{children}</span>
)

export default MkStep
