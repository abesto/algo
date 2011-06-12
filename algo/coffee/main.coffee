 require ['lib/jquery', 'loadcss', 'StateMachine', 'hashtables/ChainedHashTable', 'widgets/ChainedHashTable'], ($, loadcss, S, H, W) ->
     loadcss('reset', 'main')

     $ ->
        h = new H()
        new W($('#main'), h)
        h.add 1, 'a'

        class ST extends S
            _init: ->
                @_current = 'a'
                @_data.x = 0

            _next: ->
                if @_data.x < 5
                    return 'a'
                else
                    return 'b'

            _a: ->
                @_data.x++

            _b: ->
                @_data.y = 1

        s = new ST()
        $s = $(s)
        $s.bind 'a b', (e, x) -> console.log x

        s.step()
        s.step()
        s.step()
        s.step()
        s.step()
        s.step()
        s.step()

