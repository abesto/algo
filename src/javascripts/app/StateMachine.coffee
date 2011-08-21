##
# A specialized finite state machine used for representing algorithms / data structures
# Every state of the machine is a state in the execution of the algorithm
# Actions are run upon entry into a new state
# An event (type=state name) is triggered upon entering a new state
# The algorithm data is held in the _data private variable
# A deep copy of _data is passed to the event handlers of state changes
#
# There are two special state types:
#  Entry point: these states have no associated action or event. They are created with the
#               _entryPoint private function. These are the public API of the algorithm.
#  ready: The machine is ready for a new entry point. Entry point calls when not in this state
#         will throw an exception. This state can only be left when an entry point is called.
#
# The public interface has four parts:
#  entry points: The public API of the algorithm. See above.
#  step: Take one step in the algorithm. Exactly one state transition, returns 'this' (fluid interface)
#  run: Step until we reach the 'ready' state, firing the 'ready' event exactly once. Returns the
#       result of the operation.
#  bind: Convenience function, equivalent to jQuery(this).bind
##

define ['vendor/jquery', 'vendor/underscore'], ($, _) ->
  class StateMachine
    constructor: (opts) ->
      @_state = 'ready'
      @_data = {}
      @_opts = $.extend({entryPoints: [], transitions: [], guards: {}}, opts)
      
      @_opts.transitions.unshift {from: ['ready'], to: @_opts.entryPoints}
      for name in @_opts.entryPoints
        do (name) =>
          @[name] = (params...) ->
            if @_state != 'ready'
              throw 'Entry call can only be made when in \'ready\' state'
            @_data.params = params
            @step {stepRequest: name}
            return this
      
    _guardCheck: (to) ->
      if @_opts.guards and @_opts.guards[@_state] and @_opts.guards[@_state][to]
        @_opts.guards[@_state][to].call(this)
      else
        true
        
    trigger: (eventType, data=@_data) -> $(this).trigger eventType, [$.extend({}, data)]

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
      
    run: ->
      ret = null
      while @_state != 'ready'
        ret = @_data.result
        @step()
      return ret
      
    bind: (type, handler) -> $(@).bind type, handler
