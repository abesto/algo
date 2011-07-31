(function() {
  define(['vendor/qunit', 'app/hashtables/Element', 'app/hashtables/OrderedUniqueList'], function(T, E, OUL) {
    T.module('Chained hash table: Ordered unique list', {
      setup: function() {
        this.l = new (OUL(function(x, y) {
          return x;
        }));
        return window.l = this.l;
      }
    });
    return T.test('toArray gives a sorted unique array of elements', function() {
      var a, b, c, _ref;
      _ref = [new E(1, 'a'), new E(2, 'b'), new E(1, 'c')], a = _ref[0], b = _ref[1], c = _ref[2];
      this.l.add(a);
      this.l.add(a);
      this.l.add(b);
      this.l.add(c);
      this.l.add(c);
      return T.deepEqual(this.l.toArray(), [a, c, b]);
    });
  });
}).call(this);
