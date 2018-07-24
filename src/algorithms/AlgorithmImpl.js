import { Map, is } from 'immutable'

import { initialize, startAlgorithm } from '../actions/algorithm'

export default class AlgorithmImpl {
  constructor (name, globalsKey, algoFn) {
    this.name = name
    this.globalsKey = globalsKey
    this.store = null
    this.algoFn = algoFn
    this.globals = null
    this.generator = null

    this.handleStateChange = this.handleStateChange.bind(this)
    this.mkStep = this.mkStep.bind(this)

    this.start()
  }

  register (store) {
    this.store = store
    this.store.subscribe(this.handleStateChange)
    this.store.dispatch(initialize(this))
  }

  mkStep (fn) {
    const algo = this
    return function (stepName) {
      const {locals, globals} = fn()
      return Map({
        step: stepName,
        name: algo.name,
        globalsKey: algo.globalsKey,
        globals,
        locals,
        variables: globals.merge(locals)
      })
    }
  }

  handleStateChange () {
    const oldGlobals = this.globals
    const newGlobals = this.store.getState().algorithm.getIn(['globals', this.globalsKey])
    if (!is(oldGlobals, newGlobals)) {
      this.globals = newGlobals
      this.store.dispatch(startAlgorithm(this))
    }
  }

  start () {
    this.generator = this.algoFn(this.globals, this.mkStep)
  }

  next () {
    const retval = Map(this.generator.next())
    this.globals = retval.getIn(['value', 'globals'])
    return retval
  }
}
