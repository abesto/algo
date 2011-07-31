(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['./OrderedList'], function(OL) {
    return function(compare) {
      var L, OrderedUniqueList;
      L = new OL(compare);
      return OrderedUniqueList = (function() {
        __extends(OrderedUniqueList, L);
        function OrderedUniqueList() {
          OrderedUniqueList.__super__.constructor.apply(this, arguments);
        }
        OrderedUniqueList.prototype._insertIndex = function(element) {
          var i, _ref;
          i = 0;
          while (i < this._array.length && this._array[i].key <= element.key) {
            i++;
          }
          if (((_ref = this._array[i - 1]) != null ? _ref.value : void 0) === element.value) {
            return null;
          }
          return i;
        };
        return OrderedUniqueList;
      })();
    };
  });
}).call(this);
