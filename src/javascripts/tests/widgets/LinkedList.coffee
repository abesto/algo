define ['vendor/qunit', 'vendor/raphael', 
'app/modules/ChainedHashTable/raphael/LinkedList'], (T, R) ->
  T.module 'Widgets: LinkedList',
    setup: ->
      @p = R('testpaper')
    teardown: ->
      @p.remove()

  T.test 'X, Y coordinates should be left and top, unless centerY', ->
    l = @p.LinkedList
      x: 30
      y: 40
    l.push 'a'
    T.equal l.getBBox().x, 30
    T.equal l.getBBox().y, 40

    l = @p.LinkedList
      x: 20
      y: 50
      centerY: true
    l.push 'a'
    T.equal l.getBBox().x, 20
    T.equal l.getBBox().y.toFixed(2), (50 - l.getBBox().height/2).toFixed(2)

  T.test 'Height should be the height of any RecText', ->
    l = @p.LinkedList
      x: 30
      y: 50
    l.push 3
    l.push 4, 5, 'a'
    l.push 2, 5
    T.equal l.getBBox().height, @p.RecText({x:10,y:30}).getBBox().height

  T.test 'fieldInnerPadding should be honored', ->
    l = @p.LinkedList
      fieldInnerPadding: 10
    k = @p.LinkedList
      y: 50
      fieldInnerPadding: 20
    l.push 1, 2; k.push 1, 2
    l.push 'a', 'aa'; k.push 'a', 'aa'
    T.equal l.getBBox().width + 10*8, k.getBBox().width

  T.test 'pointerArrowLength should be the distance between list items', ->
    l = @p.LinkedList
      pointerArrowLength: 50
    first = l.push 'foo', 'bar'
    second = l.push 'baz'
    firstPointerBox = first.get('pointer-box').getBBox()
    secondBox = second.getBBox()
    T.equal firstPointerBox.x + firstPointerBox.width + 50, secondBox.x

  T.test 'getBox(i, j) should return the j-th RecText of the i-th list item', ->
    l = @p.LinkedList()
    first = l.push 'foo', 'bar'
    second = l.push 'baz', 'bazooka'
    T.equal l.getBox(1, 1).id, second.get('fields', 1).id

  T.test 'resizeBox should resize the box', ->
    l = @p.LinkedList()
    first = l.push 'foo', 'bar'
    l.resizeBox 0, 0, 500
    T.equal l.getBox(0, 0).getBBox().width, 500

  T.test 'resizeBox(i, j, w) should translate the fields of item i after field j', ->
    l = @p.LinkedList()
    first = l.push 'foo', 'bar', 'baz', 'dag'

    before = (l.getBox(0, i).getBBox().x for i in [0..3])
    newWidth = 500
    offset = newWidth - l.getBox(0, 1).getBBox().width
    after = [before[0], before[1], before[2]+offset, before[3]+offset]

    l.resizeBox 0, 1, newWidth
    T.deepEqual (l.getBox(0, i).getBBox().x for i in [0..3]), after

  T.test 'removeAt(i) removes the item at i', ->
    l = @p.LinkedList()
    a = l.push 'a'
    b = l.push 'b'
    c = l.push 'c'
    d = l.push 'd'
    
    l.removeAt 1
    T.deepEqual (item.id for item in l._items), (item.id for item in [a, c, d])
    l.pop()
    T.deepEqual (item.id for item in l._items), (item.id for item in [a, c])
    l.shift()
    T.deepEqual (item.id for item in l._items), (item.id for item in [c])

  T.test 'resizeBox(i, j, w) should translate the pointer-box and the pointer or the strike-out', ->
    l = @p.LinkedList()
    l.push 'foo'

    # Pointer box and strike-out
    pointerBoxBefore = l._items[0].get('pointer-box', 0).getBBox().x
    strikeOutBefore = l._items[0].get('strike-out', 0).getBBox().x

    newWidth = 300
    offset = newWidth - l.getBox(0, 0).getBBox().width
    l.resizeBox 0, 0, newWidth

    T.equal l._items[0].get('pointer-box', 0).getBBox().x, pointerBoxBefore + offset, 'Pointer box'
    T.equal l._items[0].get('strike-out', 0).getBBox().x, strikeOutBefore + offset, 'Strike-out'

    # Pointer
    l.push 'bar'

    pointerBefore = l._items[0].get('pointer', 0).getBBox().x

    newWidth = 500
    offset = newWidth - l.getBox(0, 0).getBBox().width
    l.resizeBox 0, 0, newWidth

    T.equal l._items[0].get('pointer', 0).getBBox().x, pointerBefore + offset, 'Pointer'

  T.test 'truncate should truncate, still have to be able to insert', ->
    l = @p.LinkedList()
    l.push 'foo', 'bar'
    
    l.truncate()
    T.equal l._items.length, 0, 'No items'
  
    l.push 'foo'
    T.equal l._items.length, 1, 'Can add afterwards'
    





