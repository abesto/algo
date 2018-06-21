import foreach from 'foreach'

import { BINARY_SEARCH, BOGO_SORT, LINEAR_SEARCH } from './constants/AlgorithmNames'
import { GLOBALS_KEY_SEARCH, GLOBALS_KEY_SORT } from './constants/Globals'

import Algorithm from './algorithms/Algorithm'
import BinarySearchAlgo from './algorithms/BinarySearch'
import LinearSearchAlgo from './algorithms/LinearSearch'
import BogoSortAlgo from './algorithms/BogoSort'

import BinarySearchDescription from './components/description/BinarySearch'
import LinearSearchDescription from './components/description/LinearSearch'
import BogoSortDescription from './components/description/BogoSort'

import SearchControls from './components/controls/SearchControls'
import Array from './components/dataviz/Array'

import BinarySearchCode from './pseudocode/BinarySearch'
import LinearSearchCode from './pseudocode/LinearSearch'
import BogoSortCode from './pseudocode/BogoSort'

import './styles/BinarySearch.css'
import './styles/LinearSearch.css'
import './styles/BogoSort.css'

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
  },
  [BOGO_SORT]: {
    algorithm: BogoSortAlgo,
    globalsKey: GLOBALS_KEY_SORT,
    Description: BogoSortDescription,
    Controls: SearchControls,  // TODO change
    Dataviz: Array,
    code: BogoSortCode,
    route: routes.BOGO_SORT
  }
}

foreach(algorithmSpecs, (spec, name) => {
  spec.algorithm = new Algorithm(name, spec.globalsKey, spec.algorithm)
  spec.name = name
})

export default algorithmSpecs
