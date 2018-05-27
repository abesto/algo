import React from 'react'
import classNames from 'classnames'

import '../styles/Step.css'

const MkStep = (current) => ({ name, children }) => (
  <div className={classNames('Step', {'current-step': name === current})}>
    <div className='placeholder'>{children}</div>{children}{'\n'}</div>
)

export default MkStep
