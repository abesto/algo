import React from 'react'
import classNames from 'classnames'

import '../../styles/Step.css'

const Step = ({ name, currentStepName, children }) => (
  <div className={classNames('Step', {'current-step': name === currentStepName})}>
    <div className='placeholder'>{children}</div>{children}{'\n'}</div>
)

export default Step
