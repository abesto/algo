(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  define(['vendor/qunit', 'vendor/jquery', 'app/StateMachine'], function(T, $, SM) {
    var S;
    S = (function() {
      __extends(S, SM);
      function S() {
        S.__super__.constructor.call(this);
        this._entryPoint('s1', 's2', 's3');
      }
      S.prototype._next = function() {
        switch (this._current) {
          case 's1':
            return 's1a';
          case 's1a':
            return 's1b';
          case 's1b':
            return 'ready';
          case 's2':
            return 'ready';
          case 's3':
            return 's3a';
          case 's3a':
            return 'ready';
        }
      };
      S.prototype._s1a = function() {
        return {
          test: 1
        };
      };
      S.prototype._s1b = function() {
        return {
          test: 2
        };
      };
      S.prototype._s3a = function() {
        return [1, 2];
      };
      return S;
    })();
    T.module('State machine', {
      setup: function() {
        return this.s = new S();
      }
    });
    T.test('Entry points are created', function() {
      T.ok(this.s.s1);
      return T.ok(this.s.s2);
    });
    T.test('Initial state is \'ready\'', function() {
      return T.equal(this.s._current, 'ready');
    });
    T.test('Entry point goes straight to an inner state as defined by _next', function() {
      this.s.s1();
      return T.equal(this.s._current, 's1a');
    });
    T.test('Entry point can go straight to \'ready\' state', function() {
      this.s.s2();
      return T.equal(this.s._current, 'ready');
    });
    T.test('Fuild interface: entry calls and step', function() {
      T.strictEqual(this.s.s1(), this.s);
      return T.strictEqual(this.s.step(), this.s);
    });
    T.test('Run returns data.result', function() {
      T.deepEqual(this.s.s1().run(), this.s._data.result);
      return T.deepEqual(this.s.s3().run(), this.s._data.result);
    });
    T.test('The return value of \'run\' is decoupled from the state machine', function() {
      var result;
      result = this.s.s1().run();
      result.test = 3;
      T.strictEqual(this.s._data.result.test, 2);
      result = this.s.s3().run();
      result.push(4);
      return T.deepEqual(this.s._data.result, [1, 2]);
    });
    T.test('State change triggers appropriate event', function() {
      T.expect(2);
      this.s.bind('s1a', function(event, data) {
        return T.strictEqual(event.type, 's1a');
      });
      this.s.bind('s1b', function(event, data) {
        return T.strictEqual(event.type, 's1b');
      });
      return this.s.s1().step().step();
    });
    T.test('Entry call when not in \'ready\' state raises exception', function() {
      this.s.s1();
      return T.raises((function() {
        return this.s.s1;
      }), 'Entry call can only be made when in \'ready\' state');
    });
    T.test('Run steps while not ready, and triggers \'ready\' exactly once', function() {
      T.expect(3);
      this.s.bind('s1a', function(event, data) {
        return T.strictEqual(event.type, 's1a');
      });
      this.s.bind('s1b', function(event, data) {
        return T.strictEqual(event.type, 's1b');
      });
      this.s.bind('ready', function(event) {
        return T.strictEqual(event.type, 'ready');
      });
      return this.s.s1().run();
    });
    T.test('State change event handler gets the data object', function() {
      this.s.bind('s1a', function(event, data) {
        return T.strictEqual(data.result.test, 1);
      });
      this.s.bind('s1b', function(event, data) {
        return T.strictEqual(data.result.test, 2);
      });
      return this.s.s1().run();
    });
    return T.test('The data object passed to state change event handlers is decoupled from the state machine', function() {
      this.s.bind('s1a', __bind(function(event, data) {
        data.result = 'foo';
        return T.deepEqual(this.s._data.result, {
          test: 1
        });
      }, this));
      return this.s.s1().run();
    });
  });
}).call(this);
