# _A specialized finite state machine used for representing algorithms / data structures_
#
# A state is defined as a point where we want to stop and give explanations on what's happening.
# The state machine signals this as a [custom jQuery event](http://api.jquery.com/trigger/).
# Execution state ("variables" of the algorithm, for example) are stored in  `@_data`; a deep
# copy of this is passed as the `data` attribute of the jQuery event. States that are not `ready` and
# are not an entry point can be considered __breakpoints__ with regard to the modeled algorithm.
#
#### A StateMachine works as follows:
#
#  * **Starts** in the special `"ready"` state
#  * An **entry method** gets called (eg. `hashTable.add(key, value)`, where `add` is the entry method).
#    `step(state)` is called.
#  * Waits for a **step** or a **run** call (step runs until the next state is reached; run until the `ready` state is reached).
#
#### Properties:
#
#  * `_state`: The current state name
#  * `_data`: This is used to store data that persist between states
#  * `_opts`: The constructor parameter
#
# See [`HashTables/ChainedHashTable.coffe`](HashTables/ChainedHashTable.html) for an example StateMachine.

# StateMachine implementation
# ---------------------------
# The constructor takes a single object parameter with the following fields:
#
#  * `entryPoints`: an array of strings; the name of entry calls
#  * `transitions`; an array of objects like `{from: ['ready'], to: ['s1', 's2']}`
#     where `s1` and `s2` are states that are valid transitions from the `ready` state
#  * `guards`: an object like `{ready: {s2: -> @_data['number'] == 5}, ...}`. This means that
#    we can transition from state `s1` to `s2` only if `@_data['number']` is `5`.
#  * Methods with the name of a state will be run on the StateMachine when it transitions
#    into the state with the same name (before the event is fired).
define ['vendor/jquery', 'vendor/underscore'], ($, _) ->
  class StateMachine
    constructor: (opts) ->
      @_state = 'ready'
      @_data = {}
      @_opts = $.extend({entryPoints: [], transitions: [], guards: {}}, opts)

      @_opts.transitions.unshift {from: ['ready'], to: @_opts.entryPoints}

      # Create entry methods. They set the `@_data.params` property to the arguments they got, then start the machine.
      for name in @_opts.entryPoints
        do (name) =>
          this[name] = (params...) ->
            if @_state != 'ready'
              throw 'Entry call can only be made when in \'ready\' state'
            @_data.params = params
            @step {stepRequest: name}
            return this

    # Can we go from where we are to the `to` state, based on the guards we have?
    _guardCheck: (to) ->
      if @_opts.guards and @_opts.guards[@_state] and @_opts.guards[@_state][to]
        @_opts.guards[@_state][to].call(this)
      else
        true

    # **trigger**: Convinience method to fire a jQuery event
    trigger: (eventType, data=@_data) -> $(this).trigger 'transition', [$.extend({eventType:eventType}, data)]

    # **step**: Try to take a step in the algorithm.
    #
    # The `to` parameter is optional; only entry points pass it in. In any other event we need to be able
    # to determine where to go from where we are.
    #
    # Candidates for the next state are defined by `@_opts.transitions` and the current state.
    # These are then filtered with `@_opts.guards`, using `@_data`.
    #
    # If the next state could be determined, then the appropriate part of the modeled algorithm is run (`@_opts[state]`),
    # if such a method exists. The result of this is assigned to `@_data.result`. Finally an event is fired to notify
    # the rest of the application about what happened.
    step: (to) =>
      to = if _.isUndefined(to) or _.isUndefined(to.stepRequest) then null else to.stepRequest
      candidates = _.flatten (transition.to for transition in @_opts.transitions when @_state in transition.from)
      candidates = (c for c in candidates when @_guardCheck(c))
      if candidates.length == 1
        if to != null and to not in candidates
          throw "Couldn't transition into requested state"
        else
          @_state = candidates[0]
      else if candidates.length > 1
        if to != null
          if to in candidates
            @_state = to
          else
            throw "Couldn't transition into requested state #{to}. Candidates were #{candidates}"
        else
          throw "Couldn't figure out where to go from #{@_state}. Candidates were #{candidates}"
      @_data.result = @_opts[@_state]?.apply(this, @_data.params)
      @trigger @_state
      return this

    # Keep `step`ping until until the `ready` state is reached; return the result of the last algorithm-part.
    # Use this if you want to run the algorithm without the breakpoints.
    run: ->
      ret = null
      while @_state != 'ready'
        ret = @_data.result
        @step()
      return ret

    # Convenience method for binding to events fired on state changes
    # Handlers bound with this method will get the actual event type in event.type,
    # instead of 'transition'
    #
    # If type is 'transition', then handler will be called for all events
    bind: (type, handler) -> 
      $(this).bind 'transition', (event, data, others...) ->
        event.type = data.eventType
        if type.split('.')[0] == 'transition' or type == event.type
          handler event, data, others...
