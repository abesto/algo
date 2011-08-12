(function() {
  define(['app/loadcss', 'vendor/jquery', 'vendor/raphael', 'app/modules/ChainedHashTable'], function(css, $, Raphael, Module) {
    css('main');
    return $(function() {
      var $display, paper;
      $display = $('#display');
      paper = Raphael('display', $display.width(), $display.height());
      return $('#step').click(Module($('#controls'), paper));
    });
  });
}).call(this);
