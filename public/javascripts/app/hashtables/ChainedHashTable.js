(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['vendor/jquery', 'vendor/underscore', '../StateMachine', './Element', './UnorderedList'], function($, _, StateMachine, Element, UnorderedList) {
    var ChainedHashTable;
    return ChainedHashTable = (function() {
      __extends(ChainedHashTable, StateMachine);
      function ChainedHashTable(hashFunction, listClass) {
        ChainedHashTable.__super__.constructor.call(this, {
          entryPoints: ['add', 'get', 'getFirst'],
          transitions: [
            {
              from: ['add'],
              to: ['insertItem', 'newHash']
            }, {
              from: ['newHash'],
              to: ['insertItem']
            }, {
              from: ['insertItem', 'get', 'getFirst'],
              to: ['ready']
            }
          ],
          guards: {
            add: {
              newHash: __bind(function() {
                return _.isUndefined(this._heads[this._data.hash]);
              }, this),
              insertItem: __bind(function() {
                return !_.isUndefined(this._heads[this._data.hash]);
              }, this)
            }
          },
          add: __bind(function(a, b) {
            this._data.element = new Element(a, b);
            return this._data.hash = this._hashFunction(this._data.element.key);
          }, this),
          newHash: __bind(function() {
            return this._heads[this._data.hash] = new this._listClass();
          }, this),
          insertItem: __bind(function() {
            return this._heads[this._data.hash].add(this._data.element);
          }, this),
          get: __bind(function(key) {
            this._data.hash = this._hashFunction(key);
            if (_.isUndefined(this._heads[this._data.hash])) {
              return [];
            } else {
              return this._heads[this._data.hash].get(key);
            }
          }, this),
          getFirst: __bind(function(key) {
            this._data.hash = this._hashFunction(key);
            if (_.isUndefined(this._heads[this._data.hash])) {
              return;
            } else {
              return this._heads[this._data.hash].getFirst(key);
            }
          }, this)
        });
        this._hashFunction = hashFunction != null ? hashFunction : function(x) {
          return x;
        };
        this._listClass = listClass != null ? listClass : UnorderedList;
        this._heads = {};
      }
      return ChainedHashTable;
    })();
  });
}).call(this);
