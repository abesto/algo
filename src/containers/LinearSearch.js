import { connect } from 'react-redux'
import { Map } from 'immutable'

import { changeGlobals, startAlgorithm, stepAlgorithm } from '../actions/algorithm'
import LinearSearchComponent from '../components/LinearSearch'
import { LINEAR_SEARCH } from '../constants/AlgorithmNames'
import { GLOBALS_KEY_SEARCH } from '../constants/Globals'

const mapStateToProps = (state) => ({
  algoState: state.algorithm.getIn(['states', LINEAR_SEARCH, 'value'], Map())
})

const mapDispatchToProps = (dispatch) => ({
  changeGlobals: (globals) => dispatch(changeGlobals(GLOBALS_KEY_SEARCH, globals)),
  startAlgorithm: () => dispatch(startAlgorithm(LINEAR_SEARCH)),
  stepAlgorithm: () => dispatch(stepAlgorithm(LINEAR_SEARCH))
})

const LinearSearch = connect(mapStateToProps, mapDispatchToProps)(LinearSearchComponent)
export default LinearSearch
