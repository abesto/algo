define ['vendor/qunit', 'vendor/raphael', 'cs!widgets/raphael.setfixes'], (T, R) ->
  T.module 'Raphael Set enhancements',
    setup: ->
      @p = R('testpaper')
      @s = @p.set()
      @r = @p.rect 0, 0, 10, 10
      @t = @p.text 0, 0, 'foo'
      @tt = @p.text 0, 0, 'bar'

    teardown: ->
      @p.remove()

  T.test 'Should satisfy set property', ->
    @s.add @r
    @s.add @r
    T.equal @s.items.length, 1
    T.ok @s.has @r
    T.equal @s.has(@t), false

  T.test 'Items should be retrievable', ->
    @s.add @r
    @s.add @t
    T.ok @s.get(0) == @r && @s.get(1) == @t
    T.ok @s.get(1) == @t

  T.test 'Undefined index should raise an exception', ->
    T.raises (-> @s.get(0)), 'No item found with index 0. Subset names cannot be numbers.'

  T.test 'Set::hasSubset should work', ->
    @s.get 'a'
    T.strictEqual @s.hasSubset('a'), true
    T.strictEqual @s.hasSubset('b'), false

  T.test 'Set::get should create and store empty retrievable subsets', ->
    r = @s.get 'r'
    T.equal r.type, 'set'
    T.equal @s.get('r'), r

  T.test 'Set::add should add to supersets recursively, but not subsets', ->
    @s.get('a').get('b').add(@r)
    T.ok @s.get('a').has @r, 'One deep'
    T.ok @s.has @r, 'Two deep'
    @s.get('a').add(@t)
    T.equal @s.get('a').get('b').has(@t), false, 'Not to subsets'

  T.test 'Set::removeItem should remove the item from the set and the paper', ->
    @s.add @r
    @s.removeItem @r
    T.equal @s.has(@r), false
    T.ok @r.removed, 'Removed from the paper Raphael'

  T.test 'Set::removeItem should remove items from subsets and supersets', ->
    @s.get('a').get('b').add(@t)
    @s.get('a').removeItem(@t)
    T.equal @s.has(@t), false, 'Superset'
    T.equal @s.get('a').get('b').has(@t), false, 'Subset'

