define ['vendor/jquery', 'vendor/underscore'], ($, _) ->
  actions =
    noop: {}
    createNode:
      'clicked-paper': (event, x, y) -> @model.createNode x, y
    removeNode:
      'entered-node': (event, nodeview) -> @view.highlightNode nodeview, '#f00'
      'left-node': (event, nodeview) -> @view.unhighlightNode nodeview
      'clicked-node': (event, nodeview, nodemodel) -> @model.removeNode nodemodel
    moveNode:
      'entered-node': (event, nodeview) -> @view.highlightNode nodeview, '#000', 100, 0.1
      'left-node': (event, nodeview) -> @view.unhighlightNode nodeview
      'grabbed-node': ($event, x, y, view, revent) -> 
        @view.highlightNode view, '#000', 0.1
        {cx: @ox, cy: @oy} = view[0].attr ['cx', 'cy']
        @view.highlightNode view, '#000'
      'dropped-node': ($event, view, revent) ->
        @view.highlightNode view, '#000', 100, 0.1
        delete @ox
        delete @oy
      'moved-node': ($event, dx, dy, x, y, view, revent) -> 
        view.attr
          cx: @ox + dx
          cy: @oy + dy
          x: @ox + dx
          y: @oy + dy
        @view.updateEdges view
    createEdge:
      'moved-node': ($event, dx, dy, x, y, view, revent) ->
        @view.temporaryEdge view, revent.layerX, revent.layerY
        [@x, @y] = [x, y]
      'dropped-node': ($event, fromview, revent) ->
        @view.removeTemporaryEdge()
        toview = (@view._paper.getElementByPoint @x, @y).view
        delete @x
        delete @y        
        if toview isnt null and toview != fromview
          @model.createEdge fromview.model, toview.model, 0
    removeEdge:
      'entered-edge': ($event, view, revent) -> @view.highlightEdge view, '#ff0000'
      'left-edge': ($event, view, revent) -> @view.unhighlightEdge view
      'clicked-edge': ($event, view) -> @model.removeEdge view.model

  cursors = 
    removeEdge:
      edge: 'crosshair'
    moveNode:
      node: 'move'

  class GraphController
    constructor: (@model, @view) ->
      @_action = 'noop'
      $model = $(model)
      $view = $(view)
      view.setModel model

      @_bind $view, type for type in ['clicked-paper', 'entered-node', 'left-node', 'clicked-node', 'grabbed-node', 'moved-node', 'dropped-node', 'entered-edge', 'left-edge', 'clicked-edge']

    setAction: (action) ->
      @_action = action
      @view.setEdgeCursor(
        if _.isUndefined(cursors[action]) or _.isUndefined(cursors[action]['edge'])
          'default' 
        else 
          cursors[action]['edge']
      )
      @view.setNodeCursor(
        if _.isUndefined(cursors[action]) or _.isUndefined(cursors[action]['node'])
          'default' 
        else 
          cursors[action]['node']
      )

    _bind: ($view, type) ->
      $view.bind type, =>
        if not _.isUndefined(actions[@_action][type])
          actions[@_action][type].apply this, _(arguments).toArray()



