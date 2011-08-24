define [
  'app/loadcss', 'vendor/jquery', 'vendor/raphael',
  'app/modules/ChainedHashTable']
, (css, $, Raphael, Module) ->
  css 'main'
  
  $ ->
    $display = $('#display')
    paper = Raphael 'display', $display.width(), $display.height() 
    $('#step').click(Module $('#controls'), paper)

