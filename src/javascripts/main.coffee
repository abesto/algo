define [
  'vendor/jquery', 'vendor/raphael', 'vendor/underscore',
  'app/common/i18n'
  ]
, ($, Raphael, _, i18n) ->

  class Module
    constructor: (name, path) ->
      @name = name.replace('.', '_')
      @path = path[1..] + '/' + name

  $ ->
    i18n.createUpdater 'SimpleUpdater', '#step', 'index', 'step'
    i18n.createUpdater 'SimpleUpdater', '#en', 'index', 'en'
    i18n.createUpdater 'SimpleUpdater', '#hu', 'index', 'hu'
    require ['app/modules/Graph'], (G) ->
      $display = $('#display')
      paper = Raphael 'display', $display.width(), $display.height()
      model = G($('#controls'), $('#bottom'), paper, $display)
      $('#step').click(-> model.step())

