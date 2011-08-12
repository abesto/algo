(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  define(['vendor/jquery', 'vendor/underscore'], function($, _) {
    var StateMachine;
    return StateMachine = (function() {
      function StateMachine(_opts) {
        var name, _fn, _i, _len, _ref;
        this._opts = _opts;
        this.step = __bind(this.step, this);
        this._state = 'ready';
        this._data = {};
        this._opts.transitions.unshift({
          from: ['ready'],
          to: this._opts.entryPoints
        });
        _ref = this._opts.entryPoints;
        _fn = __bind(function(name) {
          return this[name] = function() {
            var params;
            params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (this._state !== 'ready') {
              throw 'Entry call can only be made when in \'ready\' state';
            }
            this._data.params = params;
            this.step({
              stepRequest: name
            });
            return this;
          };
        }, this);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          _fn(name);
        }
      }
      StateMachine.prototype._guardCheck = function(to) {
        if (this._opts.guards && this._opts.guards[this._state] && this._opts.guards[this._state][to]) {
          return this._opts.guards[this._state][to]();
        } else {
          return true;
        }
      };
      StateMachine.prototype.step = function(to) {
        var c, candidates, transition, _base, _name;
        to = _.isUndefined(to) || _.isUndefined(to.stepRequest) ? null : to.stepRequest;
        candidates = _.flatten((function() {
          var _i, _len, _ref, _ref2, _results;
          _ref = this._opts.transitions;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            transition = _ref[_i];
            if (_ref2 = this._state, __indexOf.call(transition.from, _ref2) >= 0) {
              _results.push(transition.to);
            }
          }
          return _results;
        }).call(this));
        candidates = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = candidates.length; _i < _len; _i++) {
            c = candidates[_i];
            if (this._guardCheck(c)) {
              _results.push(c);
            }
          }
          return _results;
        }).call(this);
        if (candidates.length === 1) {
          if (to !== null && __indexOf.call(candidates, to) < 0) {
            throw "Couldn't transition into requested state";
          } else {
            this._state = candidates[0];
          }
        } else if (candidates.length > 1) {
          if (to !== null) {
            if (__indexOf.call(candidates, to) >= 0) {
              this._state = to;
            } else {
              throw "Couldn't transition into requested state " + to + ". Candidates were " + candidates;
            }
          } else {
            throw "Couldn't figure out where to go from " + this._state + ". Candidates were " + candidates;
          }
        }
        this._data.result = typeof (_base = this._opts)[_name = this._state] === "function" ? _base[_name].apply(_base, this._data.params) : void 0;
        $(this).trigger(this._state, [$.extend({}, this._data)]);
        return this;
      };
      StateMachine.prototype.run = function() {
        var ret;
        ret = null;
        while (this._state !== 'ready') {
          ret = this._data.result;
          this.step();
        }
        return ret;
      };
      StateMachine.prototype.bind = function(type, handler) {
        return $(this).bind(type, handler);
      };
      return StateMachine;
    })();
  });
}).call(this);
