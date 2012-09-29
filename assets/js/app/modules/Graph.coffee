define ['vendor/jquery'
'app/common/i18n'
'app/modules/Graph/model/Graph', 'app/modules/Graph/model/Dijkstra'
'app/modules/Graph/raphael/GraphWidget', 'app/modules/Graph/widgets/GraphCodeListing'
'app/modules/Graph/raphael/GraphController'
], ($, i18n, Graph, Dijkstra, GraphWidget, GraphCodeListing, GraphController) ->
  ($controlContainer, $statusContainer, paper, $display) ->

    graph = new Graph
    graphWidget = paper.GraphWidget $display
    controller = new GraphController graph, graphWidget

    listing = new GraphCodeListing $statusContainer, graph
    listing.setStateMachine controller

    # For debugging
    window.g = graph
    window.c = controller

    #i18n.createUpdater('JqueryEventUpdater', $statusContainer, 'Graph', controller, 'transition')
    i18n.setDataProvider 'AsyncJsonDataProvider'
    i18n.setLanguage('en')

    $controlContainer.load '/controls/Graph', null, ->
      $('.i18n-simple').each -> i18n.createUpdater('SimpleUpdater', $(this), 'Graph', this.id)
      $('input[name="graph-action"]').click -> controller.setAction(@value)
      $('input[class="algorithm"]').click -> 
        algorithm = $(this).data 'class'
        listing.display 'Graph/' + algorithm
        controller.algorithm algorithm

    return controller
