import { connect } from 'react-redux'
import { startAlgorithm, stepAlgorithm } from '../actions/algorithm.js'

import BinarySearchComponent from '../components/BinarySearch.js'

const mapStateToProps = (state, ownProps) => ({
  algoState: state.algorithm.state
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  startAlgorithm: (numbers, target) => dispatch(startAlgorithm(numbers, target)),
  stepAlgorithm: () => dispatch(stepAlgorithm())
})

const BinarySearch = connect(mapStateToProps, mapDispatchToProps)(BinarySearchComponent)
export default BinarySearch
