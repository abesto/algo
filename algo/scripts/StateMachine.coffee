define ['vendor/jquery'], ($) ->
    class StateMachine
        constructor: ->
            @_data = {}
            @_current = undefined
            @_$ = $(this)
            @_init()

        _trigger: ->
            @_$.trigger @_current, [$.extend({}, @_data)]

        _init: -> throw 'Not implemented'
        _next: -> throw 'Not implemented'

        _nextWrap: ->
            @_next()
            @_trigger()
            return @_current

        step: ->
            @['_'+@_current]()
            @_current = @_next()
            @_trigger()

