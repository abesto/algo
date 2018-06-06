import { connect } from 'react-redux'
import { Map } from 'immutable'

import { changeGlobals, startAlgorithm, stepAlgorithm } from '../actions/algorithm'
import BinarySearchComponent from '../components/BinarySearch.js'
import { BINARY_SEARCH } from '../constants/AlgorithmNames'
import { GLOBALS_KEY_SEARCH } from '../constants/Globals'

const mapStateToProps = (state) => ({
  algoState: state.algorithm.getIn(['states', BINARY_SEARCH, 'value'], Map())
})

const mapDispatchToProps = (dispatch) => ({
  changeGlobals: (globals) => dispatch(changeGlobals(GLOBALS_KEY_SEARCH, globals)),
  startAlgorithm: () => dispatch(startAlgorithm(BINARY_SEARCH)),
  stepAlgorithm: () => dispatch(stepAlgorithm(BINARY_SEARCH))
})

const BinarySearch = connect(mapStateToProps, mapDispatchToProps)(BinarySearchComponent)
export default BinarySearch
