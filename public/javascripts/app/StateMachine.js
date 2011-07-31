(function() {
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['vendor/jquery', 'vendor/underscore'], function($, _) {
    var StateMachine;
    return StateMachine = (function() {
      function StateMachine() {
        this._data = {
          params: []
        };
        this._current = 'ready';
      }
      StateMachine.prototype._trigger = function() {
        return $(this).trigger(this._current, [$.extend({}, this._data)]);
      };
      StateMachine.prototype._next = function() {
        throw 'Not implemented';
      };
      StateMachine.prototype._ready = function() {
        return this._data.result;
      };
      StateMachine.prototype._entryPoint = function() {
        var name, names, _i, _len, _results;
        names = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _results = [];
        for (_i = 0, _len = names.length; _i < _len; _i++) {
          name = names[_i];
          _results.push(__bind(function(name) {
            return this[name] = function() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              if (this._current !== 'ready') {
                throw 'Entry call can only be made when in \'ready\' state';
              }
              this._data.params = args;
              this._current = name;
              this.step();
              return this;
            };
          }, this)(name));
        }
        return _results;
      };
      StateMachine.prototype.step = function() {
        this._current = this._next.apply(this, this._data.params);
        this._data.result = this['_' + this._current].apply(this, this._data.params);
        this._trigger();
        return this;
      };
      StateMachine.prototype.run = function() {
        var result;
        while (this._current !== 'ready') {
          this.step();
        }
        result = this._data.result;
        if (typeof result === 'object') {
          if (_.isArray(result)) {
            return $.extend(true, [], result);
          } else {
            return $.extend({}, result);
          }
        } else {
          return result;
        }
      };
      StateMachine.prototype.bind = function(type, handler) {
        return $(this).bind(type, handler);
      };
      return StateMachine;
    })();
  });
}).call(this);
