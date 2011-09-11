define [
  'app/common/loadcss', 'vendor/jquery', 'vendor/raphael', 'vendor/underscore',
  'app/common/i18n'
  ]
, (css, $, Raphael, _, i18n) ->
  css 'main'

  class Module
    constructor: (name, path) ->
      @name = name.replace('.', '_')
      @path = path[1..] + '/' + name

  $ ->
    i18n.createUpdater 'SimpleUpdater', '#step', 'index', 'step'
    i18n.createUpdater 'SimpleUpdater', '#en', 'index', 'en'
    i18n.createUpdater 'SimpleUpdater', '#hu', 'index', 'hu'
    require ['app/modules/ChainedHashTable'], (CHT) ->
      $display = $('#display')
      paper = Raphael 'display', $display.width(), $display.height()
      model = CHT($('#controls'), $('#bottom'), paper)
      $('#step').click(-> model.step())

