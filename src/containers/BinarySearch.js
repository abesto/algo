import { connect } from 'react-redux'
import { startAlgorithm, stepAlgorithm } from '../actions/algorithm.js'

import BinarySearchComponent from '../components/BinarySearch.js'
import { BINARY_SEARCH } from '../constants/AlgorithmNames'

const mapStateToProps = (state) => ({
  algoState: state.algorithm.states[BINARY_SEARCH]
})

const mapDispatchToProps = (dispatch) => ({
  startAlgorithm: (numbers, target) => dispatch(startAlgorithm(numbers, target)),
  stepAlgorithm: () => dispatch(stepAlgorithm(BINARY_SEARCH))
})

const BinarySearch = connect(mapStateToProps, mapDispatchToProps)(BinarySearchComponent)
export default BinarySearch
