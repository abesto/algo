define ['vendor/qunit', 'vendor/jquery', 'app/common/StateMachine'], (T, $, SM) ->
  class S extends SM
    constructor: ->
      super
        entryPoints: ['s1', 's2', 's3'],
        transitions: [
          {from: ['s1'], to: ['s1a']}
          {from: ['s1a'], to: ['s1b']}
          {from: ['s3'], to: ['s3a']}
          {from: ['s1b', 's2', 's3a'], to: ['ready']}
        ]
        s1: -> [1]
        s1a: -> {test: 1}
        s1b: -> {test: 2}
        s3a: -> [1, 2]

  T.module 'State machine',
    setup: ->
      @s = new S()

  T.test 'Entry points are created', ->
    T.ok @s.s1
    T.ok @s.s2

  T.test 'Initial state is \'ready\'', ->
    T.equal @s._state, 'ready'

  T.test 'Entry point goes to state with the same name', ->
    @s.s1()
    T.equal @s._state, 's1'

  T.test 'Fuild interface: entry calls and step', ->
    T.strictEqual @s.s1(), @s
    T.strictEqual @s.step(), @s

  T.test 'Run returns data.result (before switching to ready)', ->
    T.deepEqual @s.s1().run(), {test: 2}
    T.deepEqual @s.s3().run(), [1, 2]
    
  T.test 'data.result is always the result of the last action; undefined in ready state', ->
    T.strictEqual @s._data.result, undefined
    T.deepEqual @s.s1()._data.result, [1]
    T.deepEqual @s.step()._data.result, {test: 1}
    T.deepEqual @s.step()._data.result, {test: 2}
    T.strictEqual @s.step()._data.result, undefined

  T.test 'State change triggers appropriate event', ->
    T.expect 2
    @s.bind 's1a', (event, data) -> T.strictEqual event.type, 's1a'
    @s.bind 's1b', (event, data) -> T.strictEqual event.type, 's1b'
    @s.s1().step().step()

  T.test 'Entry call when not in \'ready\' state raises exception', ->
    @s.s1()
    T.raises (-> @s.s1), 'Entry call can only be made when in \'ready\' state'

  T.test 'Run steps while not ready, and triggers \'ready\' exactly once', ->
    T.expect 3
    @s.bind 's1a', (event, data) -> T.strictEqual event.type, 's1a'
    @s.bind 's1b', (event, data) -> T.strictEqual event.type, 's1b'
    @s.bind 'ready', (event) -> T.strictEqual event.type, 'ready'
    @s.s1().run()

  T.test 'State change event handler gets the data object', ->
    @s.bind 's1a', (event, data) -> T.strictEqual data.result.test, 1
    @s.bind 's1b', (event, data) -> T.strictEqual data.result.test, 2
    @s.s1().run()

  T.test 'The data object passed to state change event handlers is decoupled from the state machine', ->
    @s.bind 's1a', (event, data) =>
      data.result = 'foo'
      T.deepEqual @s._data.result, {test: 1}
    @s.s1().run()
    
  T.test 'Guards are checked at transition', ->
    s = new SM
      entryPoints: ['a']
      transitions: [
        {from: ['a'], to: ['b', 'c']},
        {from: ['b', 'c'], to: ['ready']}
      ]
      guards:
        a:
          b: -> @x == 0
          c: -> @x == 1
          
    s.x = 0
    s.a().step()
    T.equal s._state, 'b'
    s.step()
    
    s.x = 1
    s.a().step()
    T.equal s._state, 'c'