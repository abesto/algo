define ['qunit', 'jquery',
'app/modules/ChainedHashTable/model/ChainedHashTable',
'app/modules/ChainedHashTable/model/UnorderedList'],
(T, $, CHT, UL) ->
    T.module 'Chained hash table',
      setup: ->
        @h = new CHT()
        @$ = $(@h)
        @h.add(1, '1a').run()
        @h.add(1, '1b').run()
        @h.add(2, '2a').run()

    T.test 'Default hash function is f(x) = x', ->
      lin = []
      lout = []
      i = 0
      while i < 10
        r = Math.random()
        lin.push r
        lout.push @h._hashFunction(r)
        i++
      T.deepEqual lout, lin

    T.test 'Default list type is UnorderedList', ->
      T.strictEqual UL, @h._listClass

    T.test 'Added elements are found', ->
      @h.get(1).run()
      T.deepEqual @h.get(1).run(), ['1a', '1b']
      T.deepEqual @h.get(2).run(), ['2a']
      T.strictEqual @h.getFirst(1).run(), '1a'

    T.test 'get(k) is empty array if no elements exist with the key', ->
      T.deepEqual @h.get(4).run(), []

    T.test 'getFirst(k) is undefined if no elements exist with the key', ->
      T.strictEqual @h.getFirst(4).run(), undefined
