import { connect } from 'react-redux'
import { Map } from 'immutable'

import { changeGlobals, startAlgorithm, stepAlgorithm } from '../actions/algorithm'
import AlgorithmComponent from '../components/Algorithm'

const mapStateToProps = (state, ownProps) => {
  const algoSpec = ownProps.algoSpec
  const algoName = algoSpec.name
  return ({
    algoState: state.algorithm.getIn(['states', algoName, 'value'], Map()),
    Description: algoSpec.Description,
    Controls: algoSpec.Controls,
    Dataviz: algoSpec.Dataviz,
    code: algoSpec.code,
    varStyles: algoSpec.varStyles
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const algoSpec = ownProps.algoSpec
  const algoName = algoSpec.name
  const globalsKey = algoSpec.globalsKey
  const algo = algoSpec.algorithm
  return {
    changeGlobals: (globals) => dispatch(changeGlobals(globalsKey, globals)),
    startAlgorithm: () => dispatch(startAlgorithm(algo)),
    stepAlgorithm: () => dispatch(stepAlgorithm(algoName))
  }
}

const Algorithm = connect(mapStateToProps, mapDispatchToProps)(AlgorithmComponent)
export default Algorithm
