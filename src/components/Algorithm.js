import React from 'react'
import PropTypes from 'prop-types'

import Pseudocode from './pseudocode/Pseudocode'
import Inspector from '../containers/Inspector'

const Algorithm = ({algoState, Description, Controls, Dataviz, code, startAlgorithm, stepAlgorithm, changeGlobals}) => {
  const name = algoState.get('name')
  const variables = algoState.get('variables')
  const controlsProps = {variables, startAlgorithm, stepAlgorithm, changeGlobals}
  const datavizProps = {variables, changeGlobals}
  return (
    <div className={name}>
      <Description />
      <Controls {...controlsProps} />
      <Dataviz {...datavizProps} />
      <Pseudocode algoState={algoState}>{code}</Pseudocode>
      <Inspector variables={variables} />
    </div>
  )
}

Algorithm.propTypes = {
  algoState: PropTypes.object.isRequired,
  Description: PropTypes.func.isRequired,
  Controls: PropTypes.func.isRequired,
  Dataviz: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  startAlgorithm: PropTypes.func.isRequired,
  stepAlgorithm: PropTypes.func.isRequired,
  changeGlobals: PropTypes.func.isRequired
}

export default Algorithm
