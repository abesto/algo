(function() {
  define(['vendor/qunit', 'app/hashtables/Element', 'app/hashtables/UnorderedList'], function(T, E, L) {
    T.module('Chained hash table: Unordered list', {
      setup: function() {
        return this.l = new L();
      }
    });
    T.test('Three elements, same key', function() {
      this.l.add(new E(1, 'a'));
      this.l.add(new E(1, 'b'));
      this.l.add(new E(1, 'c'));
      T.deepEqual(this.l.get(1), ['a', 'b', 'c']);
      return T.strictEqual(this.l.getFirst(1), 'a');
    });
    T.test('Two elements, two keys', function() {
      this.l.add(new E(1, '1'));
      this.l.add(new E(2, '2'));
      T.strictEqual(this.l.getFirst(1), '1');
      T.strictEqual(this.l.getFirst(2), '2');
      T.deepEqual(this.l.get(1), ['1']);
      return T.deepEqual(this.l.get(2), ['2']);
    });
    T.test('get(k) is empty array if no elements exist with the key', function() {
      return T.deepEqual(this.l.get(3), []);
    });
    T.test('getFirst(k) is undefined if no elements exist with the key', function() {
      return T.strictEqual(this.l.getFirst(3), void 0);
    });
    T.test('toArray gives the array of elements', function() {
      var a, b, c, _ref;
      _ref = [new E(1, 'a'), new E(2, 'b'), new E(1, 'c')], a = _ref[0], b = _ref[1], c = _ref[2];
      this.l.add(a);
      this.l.add(b);
      this.l.add(c);
      return T.deepEqual(this.l.toArray(), [a, b, c]);
    });
    return T.test('fromArray(l.toArray()) == l', function() {
      var lc;
      this.l.add(new E(1, 'a'));
      this.l.add(new E(1, 'b'));
      this.l.add(new E(1, 'c'));
      this.l.add(new E(2, 'd'));
      lc = L.fromArray(this.l.toArray());
      return T.deepEqual(lc, this.l);
    });
  });
}).call(this);
