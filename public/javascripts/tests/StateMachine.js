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
        S.__super__.constructor.call(this, {
          entryPoints: ['s1', 's2', 's3'],
          transitions: [
            {
              from: ['s1'],
              to: ['s1a']
            }, {
              from: ['s1a'],
              to: ['s1b']
            }, {
              from: ['s3'],
              to: ['s3a']
            }, {
              from: ['s1b', 's2', 's3a'],
              to: ['ready']
            }
          ],
          s1: function() {
            return [1];
          },
          s1a: function() {
            return {
              test: 1
            };
          },
          s1b: function() {
            return {
              test: 2
            };
          },
          s3a: function() {
            return [1, 2];
          }
        });
      }
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
      return T.equal(this.s._state, 'ready');
    });
    T.test('Entry point goes to state with the same name', function() {
      this.s.s1();
      return T.equal(this.s._state, 's1');
    });
    T.test('Fuild interface: entry calls and step', function() {
      T.strictEqual(this.s.s1(), this.s);
      return T.strictEqual(this.s.step(), this.s);
    });
    T.test('Run returns data.result (before switching to ready)', function() {
      T.deepEqual(this.s.s1().run(), {
        test: 2
      });
      return T.deepEqual(this.s.s3().run(), [1, 2]);
    });
    T.test('data.result is always the result of the last action; undefined in ready state', function() {
      T.strictEqual(this.s._data.result, void 0);
      T.deepEqual(this.s.s1()._data.result, [1]);
      T.deepEqual(this.s.step()._data.result, {
        test: 1
      });
      T.deepEqual(this.s.step()._data.result, {
        test: 2
      });
      return T.strictEqual(this.s.step()._data.result, void 0);
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
