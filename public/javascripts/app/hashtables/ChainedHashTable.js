(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  define(['vendor/jquery', '../StateMachine', './Element', './HashFunction', './UnorderedList'], function($, StateMachine, Element, HashFunction, UnorderedList) {
    var ChainedHashTable;
    return ChainedHashTable = (function() {
      __extends(ChainedHashTable, StateMachine);
      function ChainedHashTable(hashFunction, listClass) {
        ChainedHashTable.__super__.constructor.call(this);
        this._entryPoint('add', 'get', 'getFirst');
        this._hashFunction = hashFunction != null ? hashFunction : new HashFunction({
          hash: function(x) {
            return x;
          },
          inDomain: function() {
            return true;
          },
          inRange: function() {
            return true;
          }
        });
        this._listClass = listClass != null ? listClass : UnorderedList;
        this._heads = {};
      }
      ChainedHashTable.prototype._next = function(a, b) {
        switch (this._current) {
          case 'add':
            this._data.element = new Element(a, b);
            this._data.hash = this._hashFunction.hash(this._data.element.key);
            if (this._heads[this._data.hash] != null) {
              return 'insertItem';
            } else {
              return 'newHash';
            }
            break;
          case 'newHash':
            return 'insertItem';
          case 'insertItem':
          case 'got':
          case 'gotFirst':
            return 'ready';
          default:
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
        return (_ref = (_ref2 = this._heads[this._hashFunction.hash(key)]) != null ? _ref2.get(key) : void 0) != null ? _ref : [];
      };
      ChainedHashTable.prototype._getFirst = function(key) {
        var _ref;
        this._current = 'gotFirst';
        return (_ref = this._heads[this._hashFunction.hash(key)]) != null ? _ref.getFirst(key) : void 0;
      };
      return ChainedHashTable;
    })();
  });
}).call(this);
