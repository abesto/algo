(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  define(['vendor/jquery', '../StateMachine', './Element', './UnorderedList'], function($, StateMachine, Element, UnorderedList) {
    var ChainedHashTable;
    return ChainedHashTable = (function() {
      __extends(ChainedHashTable, StateMachine);
      function ChainedHashTable(hashFunction, listClass) {
        ChainedHashTable.__super__.constructor.call(this);
        this._entryPoint('add', 'get', 'getFirst');
        this._hashFunction = hashFunction != null ? hashFunction : function(x) {
          return x;
        };
        this._listClass = listClass != null ? listClass : UnorderedList;
        this._heads = {};
      }
      ChainedHashTable.prototype._next = function(a, b) {
        var f, r, _ref;
        r = ['insertItem', 'got', 'gotFirst'];
        f = {
          'add': __bind(function() {
            this._data.element = new Element(a, b);
            this._data.hash = this._hashFunction(this._data.element.key);
            if (this._heads[this._data.hash] != null) {
              return 'insertItem';
            } else {
              return 'newHash';
            }
          }, this),
          'newHash': __bind(function() {
            return 'insertItem';
          }, this)
        };
        if (f[this._current] != null) {
          return f[this._current]();
        } else if (_ref = this._current, __indexOf.call(r, _ref) >= 0) {
          return 'ready';
        } else {
          return this._current;
        }
      };
      ChainedHashTable.prototype._newHash = function() {
        return this._heads[this._data.hash] = new this._listClass();
      };
      ChainedHashTable.prototype._insertItem = function() {
        return this._heads[this._data.hash].add(this._data.element);
      };
      ChainedHashTable.prototype._get = function(key) {
        var _ref, _ref2;
        this._current = 'got';
        return (_ref = (_ref2 = this._heads[this._hashFunction(key)]) != null ? _ref2.get(key) : void 0) != null ? _ref : [];
      };
      ChainedHashTable.prototype._getFirst = function(key) {
        var _ref;
        this._current = 'gotFirst';
        return (_ref = this._heads[this._hashFunction(key)]) != null ? _ref.getFirst(key) : void 0;
      };
      return ChainedHashTable;
    })();
  });
}).call(this);
