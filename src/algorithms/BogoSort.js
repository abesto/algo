import { BOGO_SORT } from '../constants/AlgorithmNames'
import Algorithm from './Algorithm'
import { GLOBALS_KEY_SORT } from '../constants/Globals'
import * as random from '../random'

const BogoSortAlgo = new Algorithm(
  BOGO_SORT, GLOBALS_KEY_SORT,
  function * (globals, mkStep) {
    let L = globals.get('L')
    const N = L.count()

    let i = N - 1
    let j = 0
    let sorted = false

    const step = mkStep(() => ({
      locals: Map(i, j, sorted),
      globals: Map({L, N})
    }))

    yield step('init')

    while (true) {
      yield step('while')

      // Is the list sorted?
      yield step('issorted-loop')
      for (i = 0; i < N - 1; i++) {
        yield step('issorted-if')
        if (L.get(i) > L.get(i + 1)) {
          yield step('notsorted')
          break
        }
        yield step('issorted-loop')
      }
      if (i === N - 1) {
        return step('done')
      }

      // If not, shuffle it using Knuth's shuffle algorithm
      for (i = 0; i < N - 1; i--) {
        yield step('shuffle-for')
        j = random.intBetween(i, N)
        yield step('shuffle-j')
        L = L.set(i, L.get(j)).set(j, L.get(i))
        yield step('shuffle-swap')
      }
      yield step('shuffle-done')
    }
  }
)

export default BogoSortAlgo
