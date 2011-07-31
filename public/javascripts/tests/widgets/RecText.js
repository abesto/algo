(function() {
  define(['vendor/qunit', 'vendor/raphael', 'app/widgets/RecText'], function(T, R) {
    T.module('Widgets: RecText', {
      setup: function() {
        return this.p = R('testpaper');
      },
      teardown: function() {
        return this.p.remove();
      }
    });
    T.test('Should have a set with "rect" and "text" fields', function() {
      var r;
      r = this.p.RecText();
      T.equal(r._set.type, 'set');
      T.equal(r._set.get('rect', 0).type, 'rect');
      return T.equal(r._set.get('text', 0).type, 'text');
    });
    T.test('Should be able to create with top-left coordinates', function() {
      var b, r;
      r = this.p.RecText({
        x: 20,
        y: 30
      });
      b = r.getBBox();
      T.equal(b.x, 20);
      return T.equal(b.y, 30);
    });
    T.test('Should be able to create with center coordinates', function() {
      var b, x, y;
      x = this.p.RecText({
        x: 20,
        y: 30,
        padding: 7,
        centerX: true
      });
      b = x.getBBox();
      T.equal(b.y, 30);
      T.equal(b.x, 20 - b.width / 2, 'centerX');
      y = this.p.RecText({
        x: 20,
        y: 30,
        padding: 90,
        centerY: true
      });
      b = y.getBBox();
      T.equal(b.x, 20);
      return T.equal(b.y, 30 - b.height / 2, 'centerY');
    });
    T.test('Translate should move the RecText', function() {
      var b, r;
      r = this.p.RecText({
        x: 30,
        y: 35
      });
      r.translate(40, 50);
      b = r.getBBox();
      T.equal(b.x, 70);
      return T.equal(b.y, 85);
    });
    T.test('Padding should be the distance between text and rect', function() {
      var r, rb, tb;
      r = this.p.RecText({
        padding: 23
      });
      tb = r._set.get('text').getBBox();
      rb = r._set.get('rect').getBBox();
      T.equal(tb.x - rb.x, 23, 'Left');
      T.equal(tb.y - rb.y, 23, 'Top');
      T.equal((tb.x + tb.width) - (rb.x + rb.width), -23, 'Right');
      return T.equal((tb.y + tb.height) - (rb.y + rb.height), -23, 'Bottom');
    });
    T.test('RecTexts with the same padding should have uniform height', function() {
      var q, r;
      r = this.p.RecText({
        text: 'a'
      });
      q = this.p.RecText({
        text: null
      });
      return T.equal(r.getBBox().height, q.getBBox().height);
    });
    T.test('RecText with text null should have width 2*padding, and the same height as other RecTexts; x and y should be honored', function() {
      var q, r;
      r = this.p.RecText({
        padding: 7,
        text: null,
        x: 30,
        y: 50
      });
      q = this.p.RecText({
        text: 'fooA',
        padding: 7
      });
      T.equal(r.getBBox().width, 14);
      T.equal(r.getBBox().height, q.getBBox().height);
      T.equal(r.getBBox().x, 30);
      return T.equal(r.getBBox().y, 50);
    });
    T.test('RecText should be addable to Set', function() {
      var r, s;
      s = this.p.set();
      r = s.add(this.p.RecText());
      return T.ok(s.has(r));
    });
    return T.test('RecText#resizeX should resize and keep the text centered', function() {
      var r, rb;
      r = this.p.RecText({
        text: 'foo'
      });
      r.resizeX(300);
      rb = r._set.get('rect', 0).getBBox();
      T.equal(rb.width, 300);
      return T.equal(r._set.get('text', 0).attr('x'), rb.x + rb.width / 2);
    });
  });
}).call(this);
