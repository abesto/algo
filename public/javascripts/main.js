(function() {
  define(['app/loadcss', 'vendor/jquery', 'vendor/raphael', 'app/hashtables/ChainedHashTable', 'app/widgets/ChainedHashTable', 'app/hashtables/HashFunction', 'app/hashtables/OrderedList'], function(css, $, Raphael, Model, View, HashFunction, OrderedList) {
    css('reset', 'main');
    return $(function() {
      var $w, h, hf, l, m, paper, v, w, _ref;
      hf = new HashFunction({
        hash: function(x) {
          return x;
        }
      });
      l = OrderedList(function(x, y) {
        return x - y;
      });
      $w = $(window);
      _ref = [$w.height(), $w.width()], h = _ref[0], w = _ref[1];
      $('#display').css({
        width: w,
        height: h
      });
      paper = Raphael('display');
      m = new Model(hf, l);
      v = paper.ChainedHashTable(m);
      m.add(21, 'twentyone').run();
      m.add(1, 'one').run();
      m.add(22222222222222, 'twentytwo').run();
      m.add(2, 'two').run();
      m.add(11, 'eleven').run();
      window.m = m;
      return window.paper = paper;
    });
  });
}).call(this);
