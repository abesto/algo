(function() {
  var __slice = Array.prototype.slice;
  define(['vendor/jquery'], function($) {
    return function() {
      var urls;
      urls = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return $(function() {
        var url, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = urls.length; _i < _len; _i++) {
          url = urls[_i];
          _results.push((function(url) {
            return $('head').append($('<link>').attr({
              type: 'text/css',
              rel: 'stylesheet',
              href: "stylesheets/" + url + ".css"
            }));
          })(url));
        }
        return _results;
      });
    };
  });
}).call(this);
