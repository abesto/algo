define ['vendor/qunit',
'app/modules/ChainedHashTable/model/Element',
'app/modules/ChainedHashTable/model/OrderedUniqueList'], (T, E, OUL) ->
    T.module 'Chained hash table: Ordered unique list',
        setup: ->
            @l = new (OUL( (x, y) -> x ))

    T.test 'toArray gives a sorted unique array of elements', ->
        [a, b, c] = [
            new E(1, 'a')
            new E(2, 'b')
            new E(1, 'c')
        ]
        @l.add(x).run() for x in [a,a,b,c,c]

        T.deepEqual @l.toArray(), [a, c, b]

