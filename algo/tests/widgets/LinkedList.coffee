define ['vendor/qunit', 'vendor/raphael', 'cs!widgets/LinkedList'], (T, R, L) ->
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
    T.equal l.getBBox().y, 50 - l.getBBox().height/2

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