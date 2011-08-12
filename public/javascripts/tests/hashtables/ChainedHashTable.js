(function() {
  define(['vendor/qunit', 'vendor/jquery', 'app/hashtables/ChainedHashTable', 'app/hashtables/UnorderedList'], function(T, $, CHT, UL) {
    T.module('Chained hash table', {
      setup: function() {
        this.h = new CHT();
        this.$ = $(this.h);
        this.h.add(1, '1a').run();
        this.h.add(1, '1b').run();
        return this.h.add(2, '2a').run();
      }
    });
    T.test('Default hash function is f(x) = x', function() {
      var i, lin, lout, r;
      lin = [];
      lout = [];
      i = 0;
      while (i < 100) {
        r = Math.random();
        lin.push(r);
        lout.push(this.h._hashFunction(r));
        i++;
      }
      return T.deepEqual(lout, lin);
    });
    T.test('Default list type is UnorderedList', function() {
      return T.strictEqual(UL, this.h._listClass);
    });
    T.test('Added elements are found', function() {
      this.h.get(1).run();
      T.deepEqual(this.h.get(1).run(), ['1a', '1b']);
      T.deepEqual(this.h.get(2).run(), ['2a']);
      return T.strictEqual(this.h.getFirst(1).run(), '1a');
    });
    T.test('get(k) is empty array if no elements exist with the key', function() {
      return T.deepEqual(this.h.get(4).run(), []);
    });
    return T.test('getFirst(k) is undefined if no elements exist with the key', function() {
      return T.strictEqual(this.h.getFirst(4).run(), void 0);
    });
  });
}).call(this);
