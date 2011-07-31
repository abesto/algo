(function() {
  define(function() {
    var HashFunction;
    return HashFunction = (function() {
      function HashFunction(opts) {
        var _ref, _ref2, _ref3;
                if ((_ref = this.hash) != null) {
          _ref;
        } else {
          this.hash = opts.hash;
        };
                if ((_ref2 = this.inDomain) != null) {
          _ref2;
        } else {
          this.inDomain = opts.inDomain;
        };
                if ((_ref3 = this.inRange) != null) {
          _ref3;
        } else {
          this.inRange = opts.inRange;
        };
      }
      return HashFunction;
    })();
  });
}).call(this);
