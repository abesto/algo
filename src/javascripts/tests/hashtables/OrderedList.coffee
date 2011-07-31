define ['vendor/qunit', 'app/hashtables/Element', 'app/hashtables/OrderedList'], (T, E, OL) ->
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
    @l.add a
    @l.add b
    @l.add c

    T.deepEqual @l.toArray(), [a, c, b]

  T.test 'fromArray(l.toArray()) == l', ->
    @l.add new E(1, 'a')
    @l.add new E(1, 'b')
    @l.add new E(1, 'c')
    @l.add new E(2, 'd')

    lc = @L.fromArray @l.toArray()
    T.deepEqual lc, @l

  T.test 'Inverting the compare function inverts the sort order (assuming unique keys)', ->
    LI = OL( (x, y) -> y - x )
    li = new LI()

    [a, b, c] = [
      new E(2, 'a')
      new E(1, 'b')
      new E(3, 'c')
    ]
    @l.add a; @l.add b; @l.add c
    li.add a; li.add b; li.add c

    T.deepEqual @l.toArray(), li.toArray().reverse()