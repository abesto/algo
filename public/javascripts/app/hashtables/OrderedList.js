(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['./UnorderedList'], function(UL) {
    var GenericOrderedList;
    GenericOrderedList = (function() {
      __extends(GenericOrderedList, UL);
      function GenericOrderedList(compare) {
        GenericOrderedList.__super__.constructor.call(this);
        this._compare = compare;
      }
      GenericOrderedList.prototype._insertIndex = function(element) {
        var i;
        i = 0;
        while (i < this._array.length && (this._compare(this._array[i].key, element.key) <= 0)) {
          i++;
        }
        return i;
      };
      GenericOrderedList.prototype.add = function(element) {
        var i;
        i = this._insertIndex(element);
        if (i === this._array.length) {
          this._array.push(element);
        } else if (i !== null) {
          this._array.splice(i, 0, element);
        }
        return i;
      };
      return GenericOrderedList;
    })();
    return function(compare) {
      var OrderedList;
      return OrderedList = (function() {
        __extends(OrderedList, GenericOrderedList);
        function OrderedList() {
          OrderedList.__super__.constructor.call(this, compare);
        }
        return OrderedList;
      })();
    };
  });
}).call(this);
