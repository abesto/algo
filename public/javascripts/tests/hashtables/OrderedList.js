(function() {
  define(['vendor/qunit', 'app/hashtables/Element', 'app/hashtables/OrderedList'], function(T, E, OL) {
    T.module('Chained hash table: Ordered list', {
      setup: function() {
        this.L = OL(function(x, y) {
          return x - y;
        });
        return this.l = new this.L();
      }
    });
    T.test('toArray gives the sorted array of elements', function() {
      var a, b, c, _ref;
      _ref = [new E(1, 'a'), new E(2, 'b'), new E(1, 'c')], a = _ref[0], b = _ref[1], c = _ref[2];
      this.l.add(a);
      this.l.add(b);
      this.l.add(c);
      return T.deepEqual(this.l.toArray(), [a, c, b]);
    });
    T.test('fromArray(l.toArray()) == l', function() {
      var lc;
      this.l.add(new E(1, 'a'));
      this.l.add(new E(1, 'b'));
      this.l.add(new E(1, 'c'));
      this.l.add(new E(2, 'd'));
      lc = this.L.fromArray(this.l.toArray());
      return T.deepEqual(lc, this.l);
    });
    return T.test('Inverting the compare function inverts the sort order (assuming unique keys)', function() {
      var LI, a, b, c, li, _ref;
      LI = OL(function(x, y) {
        return y - x;
      });
      li = new LI();
      _ref = [new E(2, 'a'), new E(1, 'b'), new E(3, 'c')], a = _ref[0], b = _ref[1], c = _ref[2];
      this.l.add(a);
      this.l.add(b);
      this.l.add(c);
      li.add(a);
      li.add(b);
      li.add(c);
      return T.deepEqual(this.l.toArray(), li.toArray().reverse());
    });
  });
}).call(this);
