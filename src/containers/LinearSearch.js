import { connect } from 'react-redux'
import { startAlgorithm, stepAlgorithm } from '../actions/algorithm.js'

import LinearSearchComponent from '../components/LinearSearch.js'
import { LINEAR_SEARCH } from '../constants/AlgorithmNames'

const mapStateToProps = (state) => ({
  algoState: state.algorithm.states[LINEAR_SEARCH]
})

const mapDispatchToProps = (dispatch) => ({
  startAlgorithm: (numbers, target) => dispatch(startAlgorithm(numbers, target)),
  stepAlgorithm: () => dispatch(stepAlgorithm(LINEAR_SEARCH))
})

const LinearSearch = connect(mapStateToProps, mapDispatchToProps)(LinearSearchComponent)
export default LinearSearch
