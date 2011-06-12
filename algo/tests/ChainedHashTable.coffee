define ['vendor/qunit', 'cs!s/hashtables/ChainedHashTable', 'cs!s/hashtables/UnorderedList'], (T, CHT, UL) ->
    T.module 'Chained hash table',
        setup: ->
            @h = new CHT()
            @h.add 1, '1a'
            @h.add 1, '1b'
            @h.add 2, '2a'

    T.test 'Default hash function is f(x) = x', ->
        lin = []
        lout = []
        i = 0
        while i < 100
            r = Math.random()
            lin.push r
            lout.push @h._hashFunction.hash(r)
            i++
        T.deepEqual lout, lin

    T.test 'Default list type is UnorderedList', ->
        T.strictEqual UL, @h._listClass

    T.test 'Added elements are found', ->
        T.deepEqual @h.get(1), ['1a', '1b']
        T.deepEqual @h.get(2), ['2a']
        T.strictEqual @h.getFirst(1), '1a'

    T.test 'get(k) is empty array if no elements exist with the key', ->
        T.deepEqual @h.get(4), []

    T.test 'getFirst(k) is undefined if no elements exist with the key', ->
        T.strictEqual @h.getFirst(4), undefined
