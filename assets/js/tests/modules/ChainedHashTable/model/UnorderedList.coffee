define ['qunit',
'app/modules/ChainedHashTable/model/Element',
'app/modules/ChainedHashTable/model/UnorderedList'], (T, E, L) ->
    T.module 'Chained hash table: Unordered list',
        setup: ->
            @l = new L()

    T.test 'Three elements, same key', ->
        @l.add(new E(1, 'a')).run()
        @l.add(new E(1, 'b')).run()
        @l.add(new E(1, 'c')).run()
        T.deepEqual @l.get(1).run(), ['a', 'b', 'c']
        T.strictEqual @l.getFirst(1).run(), 'a'

    T.test 'Two elements, two keys', ->
        @l.add(new E(1, '1')).run()
        @l.add(new E(2, '2')).run()
        T.strictEqual @l.getFirst(1).run(), '1'
        T.strictEqual @l.getFirst(2).run(), '2'
        T.deepEqual @l.get(1).run(), ['1']
        T.deepEqual @l.get(2).run(), ['2']

    T.test 'get(k) is empty array if no elements exist with the key', ->
        T.deepEqual @l.get(3).run(), []

    T.test 'getFirst(k) is undefined if no elements exist with the key', ->
        T.strictEqual @l.getFirst(3).run(), undefined

    T.test 'toArray gives the array of elements', ->
        [a, b, c] = [
            new E(1, 'a')
            new E(2, 'b')
            new E(1, 'c')
        ]
        @l.add(a).run()
        @l.add(b).run()
        @l.add(c).run()

        T.deepEqual @l.toArray(), [a, b, c]


    T.test 'fromArray(l.toArray()) == l', ->
        @l.add(new E(1, 'a')).run()
        @l.add(new E(1, 'b')).run()
        @l.add(new E(1, 'c')).run()
        @l.add(new E(2, 'd')).run()

        lc = L.fromArray @l.toArray()
        T.deepEqual lc._array, @l._array

