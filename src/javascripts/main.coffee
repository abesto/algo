define [
  'app/common/loadcss', 'vendor/jquery', 'vendor/raphael', 'vendor/underscore'
  ]
, (css, $, Raphael, _) ->
  css 'main'

  class Module
    constructor: (name, path) ->
      @name = name.replace('.', '_')
      @path = path[1..] + '/' + name

  $ ->
    require ['app/modules/ChainedHashTable'], (CHT) ->
      $display = $('#display')
      paper = Raphael 'display', $display.width(), $display.height()
      $('#step').click(CHT $('#controls'), paper)

