define ['vendor/qunit', 'vendor/jquery', 'cs!StateMachine'], (T, $, SM) ->
  class S extends SM
    constructor: ->
      super()
      @_entryPoint 's1', 's2', 's3'

    _next: ->
      switch @_current
        when 's1'  then return 's1a'
        when 's1a' then return 's1b'
        when 's1b' then return 'ready'
        when 's2'  then return 'ready'
        when 's3'  then return 's3a'
        when 's3a' then return 'ready'

    _s1a: -> return {test: 1}
    _s1b: -> return {test: 2}
    _s3a: -> return [1, 2]

  T.module 'State machine',
    setup: ->
      @s = new S()

  T.test 'Entry points are created', ->
    T.ok @s.s1
    T.ok @s.s2

  T.test 'Initial state is \'ready\'', ->
    T.equal @s._current, 'ready'

  T.test 'Entry point goes straight to an inner state as defined by _next', ->
    @s.s1()
    T.equal @s._current, 's1a'

  T.test 'Entry point can go straight to \'ready\' state', ->
    @s.s2()
    T.equal @s._current, 'ready'

  T.test 'Fuild interface: entry calls and step', ->
    T.strictEqual @s.s1(), @s
    T.strictEqual @s.step(), @s

  T.test 'Run returns data.result', ->
    T.deepEqual @s.s1().run(), @s._data.result
    T.deepEqual @s.s3().run(), @s._data.result

  T.test 'The return value of \'run\' is decoupled from the state machine', ->
    result = @s.s1().run()
    result.test = 3
    T.strictEqual @s._data.result.test, 2

    result = @s.s3().run()
    result.push 4
    T.deepEqual @s._data.result, [1,2]

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