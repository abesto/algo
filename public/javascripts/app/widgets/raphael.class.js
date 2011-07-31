(function() {
  var __slice = Array.prototype.slice;
  define(['vendor/raphael'], function(R) {
    return function(clazz) {
      return R.fn[clazz.name] = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return typeof result === "object" ? result : child;
        })(clazz, [this].concat(__slice.call(args)), function() {});
      };
    };
  });
}).call(this);
