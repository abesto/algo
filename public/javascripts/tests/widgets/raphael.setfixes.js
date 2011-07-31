(function() {
  define(['vendor/qunit', 'vendor/raphael', 'app/widgets/raphael.setfixes'], function(T, R) {
    T.module('Raphael Set enhancements', {
      setup: function() {
        this.p = R('testpaper');
        this.s = this.p.set();
        this.r = this.p.rect(0, 0, 10, 10);
        this.t = this.p.text(0, 0, 'foo');
        return this.tt = this.p.text(0, 0, 'bar');
      },
      teardown: function() {
        return this.p.remove();
      }
    });
    T.test('Should satisfy set property', function() {
      this.s.add(this.r);
      this.s.add(this.r);
      T.equal(this.s.items.length, 1);
      T.ok(this.s.has(this.r));
      return T.equal(this.s.has(this.t), false);
    });
    T.test('Items should be retrievable', function() {
      this.s.add(this.r);
      this.s.add(this.t);
      T.ok(this.s.get(0) === this.r && this.s.get(1) === this.t);
      return T.ok(this.s.get(1) === this.t);
    });
    T.test('Undefined index should raise an exception', function() {
      return T.raises((function() {
        return this.s.get(0);
      }), 'No item found with index 0. Subset names cannot be numbers.');
    });
    T.test('Set#hasSubset should work', function() {
      this.s.get('a');
      T.strictEqual(this.s.hasSubset('a'), true);
      return T.strictEqual(this.s.hasSubset('b'), false);
    });
    T.test('Set#get should create and store empty retrievable subsets', function() {
      var r;
      r = this.s.get('r');
      T.equal(r.type, 'set');
      return T.equal(this.s.get('r'), r);
    });
    T.test('Set#add should add to supersets recursively, but not subsets', function() {
      this.s.get('a').get('b').add(this.r);
      T.ok(this.s.get('a').has(this.r, 'One deep'));
      T.ok(this.s.has(this.r, 'Two deep'));
      this.s.get('a').add(this.t);
      return T.equal(this.s.get('a').get('b').has(this.t), false, 'Not to subsets');
    });
    T.test('Set#removeItem should remove the item from the set and the paper', function() {
      this.s.add(this.r);
      this.s.removeItem(this.r);
      T.equal(this.s.has(this.r), false);
      return T.ok(this.r.removed, 'Removed from the paper Raphael');
    });
    return T.test('Set#removeItem should remove items from subsets and supersets', function() {
      this.s.get('a').get('b').add(this.t);
      this.s.get('a').removeItem(this.t);
      T.equal(this.s.has(this.t), false, 'Superset');
      return T.equal(this.s.get('a').get('b').has(this.t), false, 'Subset');
    });
  });
}).call(this);
