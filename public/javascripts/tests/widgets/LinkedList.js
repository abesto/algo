(function() {
  define(['vendor/qunit', 'vendor/raphael', 'app/widgets/LinkedList'], function(T, R) {
    T.module('Widgets: LinkedList', {
      setup: function() {
        return this.p = R('testpaper');
      },
      teardown: function() {
        return this.p.remove();
      }
    });
    T.test('X, Y coordinates should be left and top, unless centerY', function() {
      var l;
      l = this.p.LinkedList({
        x: 30,
        y: 40
      });
      l.push('a');
      T.equal(l.getBBox().x, 30);
      T.equal(l.getBBox().y, 40);
      l = this.p.LinkedList({
        x: 20,
        y: 50,
        centerY: true
      });
      l.push('a');
      T.equal(l.getBBox().x, 20);
      return T.equal(l.getBBox().y, 50 - l.getBBox().height / 2);
    });
    T.test('Height should be the height of any RecText', function() {
      var l;
      l = this.p.LinkedList({
        x: 30,
        y: 50
      });
      l.push(3);
      l.push(4, 5, 'a');
      l.push(2, 5);
      return T.equal(l.getBBox().height, this.p.RecText({
        x: 10,
        y: 30
      }).getBBox().height);
    });
    T.test('fieldInnerPadding should be honored', function() {
      var k, l;
      l = this.p.LinkedList({
        fieldInnerPadding: 10
      });
      k = this.p.LinkedList({
        y: 50,
        fieldInnerPadding: 20
      });
      l.push(1, 2);
      k.push(1, 2);
      l.push('a', 'aa');
      k.push('a', 'aa');
      return T.equal(l.getBBox().width + 10 * 8, k.getBBox().width);
    });
    T.test('pointerArrowLength should be the distance between list items', function() {
      var first, firstPointerBox, l, second, secondBox;
      l = this.p.LinkedList({
        pointerArrowLength: 50
      });
      first = l.push('foo', 'bar');
      second = l.push('baz');
      firstPointerBox = first.get('pointer-box').getBBox();
      secondBox = second.getBBox();
      return T.equal(firstPointerBox.x + firstPointerBox.width + 50, secondBox.x);
    });
    T.test('getBox(i, j) should return the j-th RecText of the i-th list item', function() {
      var first, l, second;
      l = this.p.LinkedList();
      first = l.push('foo', 'bar');
      second = l.push('baz', 'bazooka');
      return T.equal(l.getBox(1, 1).id, second.get('fields', 1).id);
    });
    T.test('resizeBox should resize the box', function() {
      var first, l;
      l = this.p.LinkedList();
      first = l.push('foo', 'bar');
      l.resizeBox(0, 0, 500);
      return T.equal(l.getBox(0, 0).getBBox().width, 500);
    });
    T.test('resizeBox(i, j, w) should translate the fields of item i after field j', function() {
      var after, before, first, i, l, newWidth, offset;
      l = this.p.LinkedList();
      first = l.push('foo', 'bar', 'baz', 'dag');
      before = (function() {
        var _results;
        _results = [];
        for (i = 0; i <= 3; i++) {
          _results.push(l.getBox(0, i).getBBox().x);
        }
        return _results;
      })();
      newWidth = 500;
      offset = newWidth - l.getBox(0, 1).getBBox().width;
      after = [before[0], before[1], before[2] + offset, before[3] + offset];
      l.resizeBox(0, 1, newWidth);
      return T.deepEqual((function() {
        var _results;
        _results = [];
        for (i = 0; i <= 3; i++) {
          _results.push(l.getBox(0, i).getBBox().x);
        }
        return _results;
      })(), after);
    });
    return T.test('resizeBox(i, j, w) should translate the pointer-box and the pointer or the strike-out', function() {
      var l, newWidth, offset, pointerBefore, pointerBoxBefore, strikeOutBefore;
      l = this.p.LinkedList();
      l.push('foo');
      pointerBoxBefore = l._items[0].get('pointer-box', 0).getBBox().x;
      strikeOutBefore = l._items[0].get('strike-out', 0).getBBox().x;
      newWidth = 300;
      offset = newWidth - l.getBox(0, 0).getBBox().width;
      l.resizeBox(0, 0, newWidth);
      T.equal(l._items[0].get('pointer-box', 0).getBBox().x, pointerBoxBefore + offset, 'Pointer box');
      T.equal(l._items[0].get('strike-out', 0).getBBox().x, strikeOutBefore + offset, 'Strike-out');
      l.push('bar');
      pointerBefore = l._items[0].get('pointer', 0).getBBox().x;
      newWidth = 500;
      offset = newWidth - l.getBox(0, 0).getBBox().width;
      l.resizeBox(0, 0, newWidth);
      return T.equal(l._items[0].get('pointer', 0).getBBox().x, pointerBefore + offset, 'Pointer');
    });
  });
}).call(this);
