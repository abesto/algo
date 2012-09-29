define ['vendor/qunit',
'app/modules/ChainedHashTable/model/Element',
'app/modules/ChainedHashTable/model/OrderedList'],
(T, E, OL) ->
  T.module 'Chained hash table: Ordered list',
    setup: ->
      @L = OL( (x, y) -> x - y )
      @l = new @L()

  T.test 'toArray gives the sorted array of elements', ->
    [a, b, c] = [
      new E(1, 'a')
      new E(2, 'b')
      new E(1, 'c')
    ]
    @l.add(a).run()
    @l.add(b).run()
    @l.add(c).run()

    T.deepEqual (e.value for e in @l.toArray()), (e.value for e in [a,c,b])

  T.test 'fromArray(l.toArray()) == l', ->
    @l.add(new E(1, 'a')).run()
    @l.add(new E(1, 'b')).run()
    @l.add(new E(1, 'c')).run()
    @l.add(new E(2, 'd')).run()

    lc = @L.fromArray @l.toArray()
    T.deepEqual (e.value for e in lc.toArray()), (e.value for e in @l.toArray())

  T.test 'Inverting the compare function inverts the sort order (assuming unique keys)', ->
    LI = OL( (x, y) -> y - x )
    li = new LI()

    [a, b, c] = [
      new E(2, 'a')
      new E(1, 'b')
      new E(3, 'c')
    ]
    for x in [a, b, c]
      @l.add(x).run()
      li.add(x).run()

    T.deepEqual (e.value for e in @l.toArray()), (e.value for e in li.toArray().reverse())
