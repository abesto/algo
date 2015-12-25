define [
  'jquery', 'raphael', 'underscore',
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

    $containers = $ '#display, #controls, #bottom'
    $display = $ '#display'

    $('#header span').click ->
      require ['app/modules/' + $(this).data 'module'], (M) ->
        # Clean up after previous module
        $containers.off()
        $containers.children().remove()
        # And start the new one
        paper = Raphael 'display', $display.width(), $display.height()
        model = M($('#controls'), $('#bottom'), paper, $display)
        $('#step').click(-> model.step())

