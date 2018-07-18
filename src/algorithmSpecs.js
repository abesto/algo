import foreach from 'foreach'
import { StyleSheet } from 'aphrodite/no-important'

import { BINARY_SEARCH, BOGO_SORT, LINEAR_SEARCH, BUBBLE_SORT } from './constants/AlgorithmNames'
import { GLOBALS_KEY_SEARCH, GLOBALS_KEY_SORT } from './constants/Globals'
import { BinarySearchAlgo, BogoSortAlgo, LinearSearchAlgo, BubbleSortAlgo } from './algorithms'
import { LinearSearchCode, BinarySearchCode, BogoSortCode, BubbleSortCode } from './pseudocode'
import { BinarySearchDescription, LinearSearchDescription, BogoSortDescription, BubbleSortDescription } from './components/description'
import { SearchControls, SortControls } from './components/controls'
import * as routes from './constants/Routes'

import Array from './components/dataviz/Array'

import Algorithm from './algorithms/Algorithm'

const algorithmSpecs = {
  [BINARY_SEARCH]: {
    algorithm: BinarySearchAlgo,
    globalsKey: GLOBALS_KEY_SEARCH,
    Description: BinarySearchDescription,
    Controls: SearchControls,
    Dataviz: Array,
    code: BinarySearchCode,
    route: routes.BINARY_SEARCH,
    varStyles: {
      low: { backgroundColor: 'lightblue' },
      high: { backgroundColor: 'lightgreen' },
      mid: { backgroundColor: 'yellow'}
    }
  },
  [LINEAR_SEARCH]: {
    algorithm: LinearSearchAlgo,
    globalsKey: GLOBALS_KEY_SEARCH,
    Description: LinearSearchDescription,
    Controls: SearchControls,
    Dataviz: Array,
    code: LinearSearchCode,
    route: routes.LINEAR_SEARCH,
    varStyles: {
      i: { backgroundColor: 'lightgreen' }
    }
  },
  [BOGO_SORT]: {
    algorithm: BogoSortAlgo,
    globalsKey: GLOBALS_KEY_SORT,
    Description: BogoSortDescription,
    Controls: SortControls,
    Dataviz: Array,
    code: BogoSortCode,
    route: routes.BOGO_SORT,
    varStyles: {
      i: { backgroundColor: 'lightblue' },
      j: { backgroundColor: 'lightgreen' },
      'i,j': { backgroundColor: 'lightcyan' }
    }
  },
  [BUBBLE_SORT]: {
    algorithm: BubbleSortAlgo,
    globalsKey: GLOBALS_KEY_SORT,
    Description: BubbleSortDescription,
    Controls: SortControls,
    Dataviz: Array,
    code: BubbleSortCode,
    route: routes.BUBBLE_SORT,
    varStyles: {
      i: { backgroundColor: 'lightblue' },
      'i-1': { backgroundColor: 'lightcyan' },
      done: { backgroundColor: 'lightgreen' }
    }
  }
}

foreach(algorithmSpecs, (spec, name) => {
  spec.algorithm = new Algorithm(name, spec.globalsKey, spec.algorithm)
  spec.name = name
  spec.varStyles = StyleSheet.create(spec.varStyles)
})

export default algorithmSpecs
