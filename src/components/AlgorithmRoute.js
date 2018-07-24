import React from 'react'
import { Route } from 'react-router-dom'

import Algorithm from '../containers/Algorithm'

const AlgorithmRoute = ({ spec }) => {
  return <Route
    path={spec.route}
    render={() => <Algorithm algoSpec={spec} />}
  />
}

export default AlgorithmRoute
