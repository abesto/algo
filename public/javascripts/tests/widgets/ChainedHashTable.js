(function() {
  define(['vendor/qunit', 'vendor/raphael', 'app/widgets/ChainedHashTable'], function(T, R) {
    return T.module('Widgets: ChainedHashTable', {
      setup: function() {
        return this.p = R('testpaper');
      },
      teardown: function() {
        return this.p.remove();
      }
    });
  });
}).call(this);
