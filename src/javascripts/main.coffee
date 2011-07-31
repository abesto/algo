define ['app/loadcss', 'vendor/jquery', 'vendor/raphael', 'app/hashtables/ChainedHashTable', 'app/widgets/ChainedHashTable', 'app/hashtables/HashFunction', 'app/hashtables/OrderedList']
, (css, $, Raphael, Model, View, HashFunction, OrderedList) ->
  css 'reset', 'main'
  $ ->

    hf = new HashFunction
      hash: (x) -> x #% 300
    l = OrderedList( (x, y) -> x - y )

    $w = $(window)
    [h, w] = [$w.height(), $w.width()]
    $('#display').css
      width: w
      height: h

    paper = Raphael 'display'
    m = new Model(hf, l)
    v = paper.ChainedHashTable(m)

    m.add(21, 'twentyone').run()
    m.add(1, 'one').run()

    m.add(22222222222222, 'twentytwo').run()
    m.add(2, 'two').run()

    m.add(11, 'eleven').run()

    window.m = m
    window.paper = paper
