import foreach from 'foreach'

import { BINARY_SEARCH, LINEAR_SEARCH } from './constants/AlgorithmNames'

import Algorithm from './algorithms/Algorithm'
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
import { GLOBALS_KEY_SEARCH } from './constants/Globals'
import * as routes from './constants/Routes'

const algorithmSpecs = {
  [BINARY_SEARCH]: {
    algorithm: BinarySearchAlgo,
    globalsKey: GLOBALS_KEY_SEARCH,
    Description: BinarySearchDescription,
    Controls: SearchControls,
    Dataviz: Array,
    code: BinarySearchCode,
    route: routes.BINARY_SEARCH
  },
  [LINEAR_SEARCH]: {
    algorithm: LinearSearchAlgo,
    globalsKey: GLOBALS_KEY_SEARCH,
    Description: LinearSearchDescription,
    Controls: SearchControls,
    Dataviz: Array,
    code: LinearSearchCode,
    route: routes.LINEAR_SEARCH
  }
}

foreach(algorithmSpecs, (spec, name) => {
  spec.algorithm = new Algorithm(name, spec.globalsKey, spec.algorithm)
  spec.name = name
})

export default algorithmSpecs
