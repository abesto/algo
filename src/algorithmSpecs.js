import { BINARY_SEARCH, LINEAR_SEARCH } from './constants/AlgorithmNames'

import BinarySearchAlgo from './algorithms/BinarySearch'
import LinearSearchAlgo from './algorithms/LinearSearch'

import BinarySearchDescription from './components/description/BinarySearch'
import LinearSearchDescription from './components/description/LinearSearch'

import SearchControls from './components/controls/SearchControls'
import Array from './components/dataviz/Array'

import BinarySearchCode from './pseudocode/BinarySearch'
import LinearSearchCode from './pseudocode/LinearSearch'

import './styles/BinarySearch.css'
import './styles/LinearSearch.css'

const algorithmSpecs = {
  [BINARY_SEARCH]: {
    algorithm: BinarySearchAlgo,
    Description: BinarySearchDescription,
    Controls: SearchControls,
    Dataviz: Array,
    code: BinarySearchCode
  },
  [LINEAR_SEARCH]: {
    algorithm: LinearSearchAlgo,
    Description: LinearSearchDescription,
    Controls: SearchControls,
    Dataviz: Array,
    code: LinearSearchCode
  }
}

export default algorithmSpecs
