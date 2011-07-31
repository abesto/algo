(function() {
  var __slice = Array.prototype.slice;
  define(['vendor/raphael', 'vendor/underscore'], function(R, _) {
    var Set, f;
    f = R.prototype.set;
    R.prototype.set = function() {
      var args, s;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      s = f.apply(null, args);
      s.keys = [];
      return s;
    };
    Set = R.prototype.set().constructor;
    Set.prototype.splice = function() {
      var args, i, v, _len, _ref, _ref2, _results;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      (_ref = this.items).splice.apply(_ref, args);
      this.length = this.items.length;
      _ref2 = this.items;
      _results = [];
      for (i = 0, _len = _ref2.length; i < _len; i++) {
        v = _ref2[i];
        _results.push(this[i] = v);
      }
      return _results;
    };
    Set.prototype.has = function(item) {
      return _(this.items).indexOf(item) > -1;
    };
    Set.prototype.hasSubset = function(key) {
      if (this[key] != null) {
        return this[key] instanceof Set;
      } else {
        return false;
      }
    };
    Set.prototype.add = function(item) {
      var _ref;
      if (!this.has(item)) {
        this.push(item);
      }
      if ((_ref = this.superset) != null) {
        _ref.add(item);
      }
      return item;
    };
    Set.prototype.removeItem = function(item, recursive) {
      var i, key, _i, _len, _ref, _ref2;
      if (recursive == null) {
        recursive = false;
      }
      i = _(this).indexOf(item);
      if (i > -1) {
        this.splice(i, 1);
        _ref = this.keys;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          this[key].removeItem(item, true);
        }
        if ((_ref2 = this.superset) != null) {
          _ref2.removeItem(item, true);
        }
        if (!recursive) {
          return item.remove();
        }
      }
    };
    Set.prototype.removeSubset = function(key, recursive) {
      var item, subset, _i, _j, _len, _len2, _ref, _ref2;
      if (recursive == null) {
        recursive = false;
      }
      if (this.hasSubset(key)) {
        _ref = this[key].keys;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subset = _ref[_i];
          this[key].removeSubset(subset, true);
        }
        _ref2 = this[key].items;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          item = _ref2[_j];
          this.removeItem(item, recursive);
        }
        this[key].remove();
        this.keys.splice(_(this.keys).indexOf(key), 1);
        return delete this[key];
      }
    };
    Set.prototype.get = function() {
      var key, keys, _ref;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      key = keys.shift();
      if (this.hasSubset(key)) {
        if (keys.length > 0) {
          return (_ref = this[key]).get.apply(_ref, keys);
        } else {
          return this[key];
        }
      } else if (this.items[key] != null) {
        return this.items[key];
      } else if (!_.isNumber(key)) {
        this[key] = R.prototype.set();
        this[key].superset = this;
        this.keys.push(key);
        return this[key];
      } else {
        throw 'No item found with index ' + key + '. Subset names cannot be numbers.';
      }
    };
    return Set.prototype.push = function() {
      var item, items, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this.items.push(item);
        this[this.items.length - 1] = item;
      }
      return this.length = this.items.length;
    };
  });
}).call(this);
