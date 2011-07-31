(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['./LinkedList', 'vendor/jquery', './raphael.class'], function(List, $, RC) {
    var ChainedHashTable, defaults;
    defaults = {
      x: 0,
      y: 0,
      hashContainerPadding: 15,
      verticalInnerPadding: 15,
      linkedListOptions: {}
    };
    return RC(ChainedHashTable = (function() {
      function ChainedHashTable(_paper, model, opts) {
        this._paper = _paper;
        this.model = model;
        this._options = $.extend({}, defaults, opts);
        $.extend(this._options.linkedListOptions, List.defaults);
        this._x = this._options.x;
        this._y = this._options.y;
        this._heads = {};
        this._lists = {};
        this._headWidth = 0;
        this._y += this._options.hashContainerPadding;
        this.model.bind('newHash', __bind(function(e, d) {
          return this._newHash(d.hash);
        }, this));
        this.model.bind('insertItem', __bind(function(e, d) {
          return this._insertItem(d.hash, d.result, d.element);
        }, this));
      }
      ChainedHashTable.prototype._newHash = function(hash) {
        var b, chash, clist, list, newHead, newHeadBox, _ref;
        list = this._paper.LinkedList($.extend({}, this._options.linkedListOptions, {
          x: this._x + this._options.hashContainerPadding,
          y: this._y + this._options.hashContainerPadding
        }));
        list.push(hash);
        this._lists[hash] = list;
        b = this._lists[hash].getBBox();
        this._y = b.y + b.height * 1.5;
        newHead = list.getBox(0, 0);
        newHead._set.get('rect').attr('fill', 'yellow');
        newHeadBox = newHead.getBBox();
        if (this._headWidth < newHeadBox.width) {
          _ref = this._lists;
          for (chash in _ref) {
            clist = _ref[chash];
            clist.resizeBox(0, 0, newHeadBox.width);
          }
          return this._headWidth = newHeadBox.width;
        } else {
          return list.resizeBox(0, 0, this._headWidth);
        }
      };
      ChainedHashTable.prototype._insertItem = function(hash, index, element) {
        return this._lists[hash].insertBefore(index + 1, element.key, element.value);
      };
      return ChainedHashTable;
    })());
  });
}).call(this);
