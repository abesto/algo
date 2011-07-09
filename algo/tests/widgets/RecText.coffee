define ['vendor/qunit', 'vendor/raphael', 'cs!widgets/RecText'], (T, R) ->
  T.module 'RecText',
    setup: ->
      @p = R('testpaper')
    teardown: ->
      @p.remove()

  T.test 'Should have a set with "rect" and "text" fields', ->
    r = @p.RecText()
    T.equal r._set.type, 'set'
    T.equal r._set.get('rect', 0).type, 'rect'
    T.equal r._set.get('text', 0).type, 'text'

  T.test 'Should be able to create with top-left coordinates', ->
    r = @p.RecText
      x: 20
      y: 30
    b = r.getBBox()
    T.equal b.x, 20
    T.equal b.y, 30

  T.test 'Should be able to create with center coordinates', ->
    x = @p.RecText
      x: 20
      y: 30
      padding: 7
      centerX: true
    b = x.getBBox()
    T.equal b.y, 30
    T.equal b.x, (20 - b.width/2), 'centerX'

    y = @p.RecText
      x: 20
      y: 30
      padding: 90
      centerY: true
    b = y.getBBox()
    T.equal b.x, 20
    T.equal b.y, (30 - b.height/2), 'centerY'

  T.test 'Translate should move the RecText', ->
    r = @p.RecText
      x: 30
      y: 35
    r.translate 40, 50
    b = r.getBBox()
    T.equal b.x, 70
    T.equal b.y, 85

  T.test 'Padding should be the distance between text and rect', ->
    r = @p.RecText
      padding: 23
    tb = r._set.get('text').getBBox()
    rb = r._set.get('rect').getBBox()
    T.equal tb.x - rb.x, 23, 'Left'
    T.equal tb.y - rb.y, 23, 'Top'
    T.equal (tb.x + tb.width) - (rb.x + rb.width), -23, 'Right'
    T.equal (tb.y + tb.height) - (rb.y + rb.height), -23, 'Bottom'

  T.test 'RecTexts with the same padding should have uniform height', ->
    r = @p.RecText
      text: 'a'
    q = @p.RecText
      text: null
    T.equal r.getBBox().height, q.getBBox().height

  T.test 'RecText with text null should have width 2*padding, and the same height as other RecTexts; x and y should be honored', ->
    r = @p.RecText
      padding: 7
      text: null
      x: 30
      y: 50
    q = @p.RecText
      text: 'fooA'
      padding: 7
    T.equal r.getBBox().width, 14
    T.equal r.getBBox().height, q.getBBox().height
    T.equal r.getBBox().x, 30
    T.equal r.getBBox().y, 50

  T.test 'RecText should be addable to Set', ->
    s = @p.set()
    r = s.add(@p.RecText())
    T.ok s.has(r)