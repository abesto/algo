(function() {
  var __slice = Array.prototype.slice;
  define(['vendor/underscore', './raphael.class', 'vendor/jquery', './raphael.setfixes'], function(_, RC, $) {
    var RecText, defaults;
    defaults = {
      x: 0,
      y: 0,
      text: 'RecText',
      padding: 10,
      centerX: false,
      centerY: false
    };
    return RC(RecText = (function() {
      function RecText(_paper, opts) {
        var b, r, t, _ref;
        this._paper = _paper;
        opts = $.extend({}, defaults, opts);
        if (opts.text === null || opts.text === '') {
          t = this._paper.text(opts.x, opts.y, 'E');
          b = t.getBBox();
          _ref = [0, opts.x, opts.y], b.width = _ref[0], b.x = _ref[1], b.y = _ref[2];
          t.remove();
        } else {
          t = this._paper.text(opts.x, opts.y, opts.text);
          b = t.getBBox();
        }
        r = this._paper.rect(b.x - opts.padding, b.y - opts.padding, b.width + (2 * opts.padding), b.height + (2 * opts.padding));
        r.attr({
          fill: '#efefef'
        });
        r.toBack();
        this._set = this._paper.set();
        this._set.get('rect').add(r);
        this._set.get('text').add(t);
        b = this.getBBox();
        if (!opts.centerX) {
          this._set.translate(opts.x - b.x, 0);
        }
        if (!opts.centerY) {
          this._set.translate(0, opts.y - b.y);
        }
      }
      RecText.prototype.resizeX = function(width) {
        this._set.get('rect').attr('width', width);
        return this._set.get('text').attr('x', this.getBBox().x + this.getBBox().width / 2);
      };
      RecText.prototype.translate = function() {
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = this._set).translate.apply(_ref, args);
      };
      RecText.prototype.getBBox = function() {
        return this._set.get('rect').getBBox();
      };
      return RecText;
    })());
  });
}).call(this);
