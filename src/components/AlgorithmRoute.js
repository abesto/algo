import React from 'react'
import { Route } from 'react-router-dom'

import algorithmSpecs from '../algorithmSpecs'
import Algorithm from '../containers/Algorithm'

const AlgorithmRoute = ({ name }) => {
  const spec = algorithmSpecs[name]
  return <Route
    path={spec.route}
    render={() => <Algorithm algoSpec={spec} />}
  />
}

export default AlgorithmRoute