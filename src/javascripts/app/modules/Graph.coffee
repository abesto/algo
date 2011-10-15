define ['vendor/jquery', 'app/modules/Graph/model/Graph', 'app/modules/Graph/raphael/GraphWidget', 'app/modules/Graph/raphael/GraphController'], ($, G, GW, GC) ->
  ($controlContainer, $statusContainer, paper, $display) ->
    model = new G
    view = paper.GraphWidget($display)
    controller = new GC model, view
    window.g = view