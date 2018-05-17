import { connect } from 'react-redux'
import { startAlgorithm, stepAlgorithm } from '../actions/algorithm.js'

import BinarySearchComponent from '../components/BinarySearch.js'

const mapStateToProps = (state, ownProps) => ({
  numbers: state.binarySearch.numbers,
  target: state.binarySearch.target,
  algoState: state.algorithm.state
})

const mapDispatchToProps = {startAlgorithm, stepAlgorithm}

const BinarySearch = connect(mapStateToProps, mapDispatchToProps)(BinarySearchComponent)
export default BinarySearch
