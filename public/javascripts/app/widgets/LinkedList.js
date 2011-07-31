(function() {
  var __slice = Array.prototype.slice;
  define(['vendor/underscore', 'vendor/jquery', './raphael.class', './RecText', './raphael.setfixes', './raphael.line'], function(_, $, RC) {
    var LinkedList, defaults;
    defaults = {
      x: 0,
      y: 0,
      centerY: false,
      fieldInnerPadding: 10,
      pointerBoxWidth: 15,
      pointerArrowLength: 20
    };
    RC(LinkedList = (function() {
      function LinkedList(_paper, opts) {
        this._paper = _paper;
        this._items = this._paper.set();
        this._options = $.extend({}, defaults, opts);
      }
      LinkedList.prototype._createItem = function() {
        var b, fields, fieldstrings, item, last, x, y;
        x = arguments[0], y = arguments[1], fieldstrings = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        item = this._paper.set();
        fields = item.get('fields');
        last = fields.add(this._paper.RecText({
          x: x,
          y: y,
          text: fieldstrings.shift(),
          padding: this._options.fieldInnerPadding,
          centerY: this._options.centerY && (this._items.length === 0)
        }));
        while (fieldstrings.length > 0) {
          b = last.getBBox();
          last = fields.add(this._paper.RecText({
            x: b.x + b.width,
            y: b.y,
            text: fieldstrings.shift(),
            padding: this._options.fieldInnerPadding
          }));
        }
        b = last.getBBox();
        item.get('pointer-box').add(this._paper.rect(b.x + b.width, b.y, this._options.pointerBoxWidth, b.height));
        return item;
      };
      LinkedList.prototype._last = function(item, bool) {
        var b;
        if (!(bool != null)) {
          return item.hasSubset('strike-out');
        }
        b = item.get('pointer-box', 0).getBBox();
        if (bool) {
          item.removeSubset('pointer');
          if (!item.hasSubset('strike-out')) {
            return item.get('strike-out').add(this._paper.path("M" + b.x + " " + (b.y + b.height) + "L" + (b.x + b.width) + " " + b.y));
          }
        } else {
          item.removeSubset('strike-out');
          if (!item.hasSubset('pointer')) {
            return item.get('pointer').add(this._paper.line(b.x + b.width - this._options.pointerBoxWidth / 2, b.y + (b.height / 2), b.x + b.width + this._options.pointerArrowLength, b.y + (b.height / 2), {
              size: this._options.pointerArrowLength / 2.6,
              angle: 20
            }));
          }
        }
      };
      LinkedList.prototype.insertBefore = function() {
        var b, fields, item, next, offset, position, prev, _i, _len, _ref;
        position = arguments[0], fields = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (position > 0) {
          prev = this._items[position - 1];
          if (position === this._items.length) {
            this._last(prev, false);
          }
          b = prev.getBBox();
          item = this._createItem.apply(this, [b.x + b.width, b.y].concat(__slice.call(fields)));
        } else {
          item = this._createItem.apply(this, [this._options.x, this._options.y].concat(__slice.call(fields)));
        }
        if (position < this._items.length) {
          this._last(item, false);
          offset = item.getBBox().width;
          _ref = _(this._items).toArray().slice(position);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            next = _ref[_i];
            next.translate(offset, 0);
          }
        } else {
          this._last(item, true);
        }
        this._items.splice(position, 0, item);
        return item;
      };
      LinkedList.prototype.push = function() {
        var fields;
        fields = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.insertBefore.apply(this, [this._items.length].concat(__slice.call(fields)));
      };
      LinkedList.prototype.unshift = function() {
        var fields;
        fields = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.insertBefore.apply(this, [0].concat(__slice.call(fields)));
      };
      LinkedList.prototype.insertAfter = function() {
        var fields, position;
        position = arguments[0], fields = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this.insertBefore.apply(this, [position + 1].concat(__slice.call(fields)));
      };
      LinkedList.prototype.removeAt = function(position) {
        var item, offset, _i, _len, _ref, _results;
        if (position < 0) {
          position += this._items.length;
        }
        if (position > this._items.length) {
          return;
        }
        offset = -this._items[position].getBBox().width;
        this._items[position].remove();
        this._items.splice(position, 1);
        if (position === this._items.length) {
          this._last(this._items[position - 1], true);
        }
        _ref = this._items.slice(position, (this._items.length - 1 + 1) || 9e9);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.translate(offset, 0));
        }
        return _results;
      };
      LinkedList.prototype.shift = function() {
        return this.removeAt(0);
      };
      LinkedList.prototype.pop = function() {
        return this.removeAt(-1);
      };
      LinkedList.prototype.getBox = function(position, index) {
        return this._items[position].get('fields', index);
      };
      LinkedList.prototype.resizeBox = function(position, index, width) {
        var box, item, offset, subset, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3, _results;
        offset = width - this._items[position].get('fields', index).getBBox().width;
        this._items[position].get('fields', index).resizeX(width);
        _ref = _(this._items[position].get('fields')).slice(index + 1);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          box = _ref[_i];
          box.translate(offset);
        }
        _ref2 = ['pointer-box', 'pointer', 'strike-out'];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          subset = _ref2[_j];
          if (this._items[position].hasSubset(subset)) {
            this._items[position].get(subset, 0).translate(offset);
          }
        }
        _ref3 = _(this._items).slice(position + 1);
        _results = [];
        for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
          item = _ref3[_k];
          _results.push(item.translate(offset));
        }
        return _results;
      };
      LinkedList.prototype.getBBox = function() {
        if (this._items.length === 0) {
          return {
            x: this._x,
            y: this._y,
            width: 0,
            height: 0
          };
        } else {
          return this._items.getBBox();
        }
      };
      LinkedList.prototype.translate = function() {
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = this._items).translate.apply(_ref, args);
      };
      return LinkedList;
    })());
    return {
      'class': LinkedList,
      'defaults': defaults
    };
  });
}).call(this);
