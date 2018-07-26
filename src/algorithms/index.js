import * as BinarySearch from './BinarySearch'
import * as LinearSearch from './LinearSearch'
import * as BogoSort from './BogoSort'
import * as BubbleSort from './BubbleSort'

import AlgorithmImpl from './AlgorithmImpl'
import { StyleSheet } from 'aphrodite/no-important'

const algorithmSpecs = {
  BinarySearch, LinearSearch, BogoSort, BubbleSort
}

const algorithms = {}

for (const [name, spec] of Object.entries(algorithmSpecs)) {
  algorithms[name] = {
    ...spec,
    name,
    implementation: new AlgorithmImpl(name, spec.globalsKey, spec.generator),
    varStyles: StyleSheet.create(spec.varStyles)
  }
}

export default algorithms
