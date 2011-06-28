define ['vendor/qunit', 'cs!hashtables/Element', 'cs!hashtables/OrderedUniqueList'], (T, E, OUL) ->
    T.module 'Chained hash table: Ordered unique list',
        setup: ->
            @l = new (OUL( (x, y) -> x ))
            window.l = @l

    T.test 'toArray gives a sorted unique array of elements', ->
        [a, b, c] = [
            new E(1, 'a')
            new E(2, 'b')
            new E(1, 'c')
        ]
        @l.add a
        @l.add a
        @l.add b
        @l.add c
        @l.add c

        T.deepEqual @l.toArray(), [a, c, b]

