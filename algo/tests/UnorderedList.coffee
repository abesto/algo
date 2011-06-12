define ['vendor/qunit', 'cs!s/hashtables/Element', 'cs!s/hashtables/UnorderedList'], (T, E, L) ->
    T.module 'Chained hash table: Unordered list',
        setup: ->
            @l = new L()

    T.test 'Three elements, same key', ->
        @l.add new E(1, 'a')
        @l.add new E(1, 'b')
        @l.add new E(1, 'c')
        T.deepEqual @l.get(1), ['a', 'b', 'c']
        T.strictEqual @l.getFirst(1), 'a'

    T.test 'Two elements, two keys', ->
        @l.add new E(1, '1')
        @l.add new E(2, '2')
        T.strictEqual @l.getFirst(1), '1'
        T.strictEqual @l.getFirst(2), '2'
        T.deepEqual @l.get(1), ['1']
        T.deepEqual @l.get(2), ['2']

    T.test 'get(k) is empty array if no elements exist with the key', ->
        T.deepEqual @l.get(3), []

    T.test 'getFirst(k) is undefined if no elements exist with the key', ->
        T.strictEqual @l.getFirst(3), undefined

    T.test 'toArray gives the array of elements', ->
        [a, b, c] = [
            new E(1, 'a')
            new E(2, 'b')
            new E(1, 'c')
        ]
        @l.add a
        @l.add b
        @l.add c

        T.deepEqual @l.toArray(), [a, b, c]


    T.test 'fromArray(l.toArray()) == l', ->
        @l.add new E(1, 'a')
        @l.add new E(1, 'b')
        @l.add new E(1, 'c')
        @l.add new E(2, 'd')

        lc = L.fromArray @l.toArray()
        T.deepEqual lc, @l

