define ['vendor/jquery', 'app/common/i18n', 'app/modules/Graph/model/Graph', 'app/modules/Graph/raphael/GraphWidget', 'app/modules/Graph/raphael/GraphController'], ($, i18n, G, GW, GC) ->
  ($controlContainer, $statusContainer, paper, $display) ->
    model = new G
    view = paper.GraphWidget($display)
    controller = new GC model, view
    window.g = view

    $controlContainer.load '/controls/Graph', null, ->
      #i18n.createUpdater('JqueryEventUpdater', $statusContainer, 'Graph', model, 'transition')
      simple = [
        'graph', 'create-node', 'remove-node', 'move-node'
      ]
      for id in simple
        i18n.createUpdater('SimpleUpdater', '#' + id, 'Graph', id)
      i18n.setDataProvider 'AsyncJsonDataProvider'
      i18n.setLanguage('en')

      $('input[name="graph-action"]').click -> controller.action = @value


    return model
