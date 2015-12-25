define ['jquery', 'underscore'], ($, _) ->
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
        {cx: @ox, cy: @oy} = view[0].attr ['cx', 'cy']
        @view.highlightNode view, '#000'
      'dropped-node': ($event, view, revent) ->
        @view.highlightNode view, '#000'
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
        toelement = @view._paper.getElementByPoint @x, @y
        delete @x
        delete @y        
        if toelement isnt null and toelement.view != fromview
          @model.createEdge fromview.model, toelement.view.model, 0
    removeEdge:
      'entered-edge': ($event, view, revent) -> @view.highlightEdge view, '#ff0000'
      'left-edge': ($event, view, revent) -> @view.unhighlightEdge view
      'clicked-edge': ($event, view) -> @model.removeEdge view.model

  cursors = 
    removeEdge:
      edge: 'crosshair'
    moveNode:
      node: 'move'

  noopAlgorithm = (controller) ->
    step: -> true
    run: -> true
    _state: 'ready'

  class GraphController
    constructor: (@model, @view) ->
      @_action = 'noop'
      @_algorithm = noopAlgorithm()
      @_algorithmEventHandlers = []
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

    algorithm: (type) ->
      edge.color 'none' for edge in @model.edges()
      node.color('none') && node.label('') for node in @model.nodes()
      @_algorithm._state = '__disabled'  # Disables actions until the below callback fires
      require ['app/modules/Graph/model/' + type], (AlgorithmClass) =>
        @_algorithm = new AlgorithmClass(@model)
        for {type: type, handler: handler, algorithm: algorithm} in @_algorithmEventHandlers
          if algorithm == 'any' or @_algorithm instanceof algorithm
            @_algorithm.bind type, handler
        @_algorithm.step()

    step: -> 
      @_algorithm.step()
      if @_algorithm._state == 'ready'
        @_algorithm = noopAlgorithm()

    run: -> 
      @_algorithm.run()
      if @_algorithm._state == 'ready'
        @_algorithm = noopAlgorithm()

    # Bind to the current algorithms transition events, same as StateMachine.bind
    # If algorithm is given, then the handler will be called only if the current
    # algorithm is `instanceof algorithm`
    bind: (type, handler, algorithm='any') ->
      @_algorithmEventHandlers.push({type: type, handler: handler, algorithm: algorithm})
      @_algorithm?.bind? type, handler

    # Private helper, unrelated to bind above
    _bind: ($view, type) ->
      $view.bind type, =>
        actor = if @_algorithm._state == 'ready' then actions[@_action] else @_algorithm
        if not _.isUndefined(actor[type])
          actor[type].apply this, _(arguments).toArray()



