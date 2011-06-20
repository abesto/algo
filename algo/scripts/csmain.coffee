define ['cs!loadcss', 'vendor/jquery', 'vendor/raphael', 'cs!hashtables/ChainedHashTable', 'cs!widgets/ChainedHashTable', 'cs!hashtables/HashFunction', 'cs!hashtables/OrderedList']
, (css, $, Raphael, Model, View, HashFunction, OrderedList) ->
  css 'reset', 'main'
  $ ->

    hf = new HashFunction
      hash: (x) -> x % 10
    l = OrderedList( (x, y) -> x - y )

    $w = $(window)
    [h, w] = [$w.height(), $w.width()]
    $('#display').css
      width: w
      height: h

    paper = Raphael 'display'
    m = new Model(hf, l)
    v = new View(paper, m, 50, 50)

    m.add(21, 'twentyone').run()
    m.add(1, 'one').run()

    m.add(22, 'twentytwo').run()
    m.add(2, 'two').run()

    m.add(11, 'eleven').run()

    window.m = m
