(function() {
  define(function() {
    var UnorderedList;
    return UnorderedList = (function() {
      function UnorderedList() {
        this._array = [];
      }
      UnorderedList.prototype.add = function(element) {
        return this._array.push(element);
      };
      UnorderedList.prototype.get = function(key) {
        var element, _i, _len, _ref, _results;
        _ref = this._array;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          if (element.key === key) {
            _results.push(element.value);
          }
        }
        return _results;
      };
      UnorderedList.prototype.getFirst = function(key) {
        var element, _i, _len, _ref;
        _ref = this._array;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          if (element.key === key) {
            return element.value;
          }
        }
      };
      UnorderedList.fromArray = function(array) {
        var e, r, _i, _len;
        r = new this();
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          e = array[_i];
          r.add(e);
        }
        return r;
      };
      UnorderedList.prototype.toArray = function() {
        return this._array;
      };
      return UnorderedList;
    })();
  });
}).call(this);
