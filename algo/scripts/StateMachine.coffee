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
# The transition function is called _next. This must be implemented in the subclasses.
# It receives the parameters of the last entry point call as arguments. The current
# state name is accessible via this._current. It must return the name of the state
# we must transition into.
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
    constructor: ->
      @_data = {params: []}
      @_current = 'ready'

    _trigger: ->
      $(@).trigger @_current, [$.extend({}, @_data)]

    _next: -> throw 'Not implemented'
    _ready: -> return @_data.result

    _entryPoint: (names...) ->
      for name in names
        do (name) =>
          @[name] = (args...) ->
            if @_current != 'ready'
              throw 'Entry call can only be made when in \'ready\' state'
            @_data.params = args
            @_current = name
            @step()
            return @

    step: ->
      @_current = @_next(@_data.params...)
      @_data.result = @['_'+@_current](@_data.params...)
      @_trigger()
      return @

    run: ->
      while @_current != 'ready'
        @step()

      result = @_data.result
      if typeof result == 'object'
        if _.isArray result
          return $.extend(true, [], result)
        else
          return $.extend({}, result)
      else
        return result

    bind: (type, handler) -> $(@).bind type, handler
