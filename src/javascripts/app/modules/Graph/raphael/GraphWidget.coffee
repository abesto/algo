define ['vendor/jquery', 'vendor/raphael', 'vendor/underscore', 'app/common/raphael/raphael.class', 'app/common/raphael/raphael.line'], ($, Raphael, _, RC) ->
  RC class GraphWidget
    @default_options = {
      'background_color': '#fff'

      'node_radius': 20
      'node_border_width': 2
      'node_color': '#000'
      'node_opacity': 0
      'node_highlight_opacity': 0.2

      'edge_width': 2
      'edge_color': '#000'
    }

    constructor: (@_paper, @_display, opts) ->
      $(@_display).click (e) => $(this).trigger('clicked-paper', [e.layerX, e.layerY])
      @_options = $.extend {}, @constructor.default_options, opts
      @_nodes = @_paper.set()
      @_edges = @_paper.set()

    setModel: (model) ->
      $model = $(model)
      $model.bind 'created-node', (event, x, y, model) => @createNode(x, y, model)
      $model.bind 'removed-node', (event, model) => @removeNode(model.view)
      $model.bind 'created-edge', (event, model) => @createEdge(model)
      $model.bind 'removed-edge', (event, model) => @removeEdge(model.view)

    createNode: (x, y, model) ->
      view = @_paper.ellipse x, y, @_options.node_radius, @_options.node_radius
      @_nodes.push view
      view.attr
        stroke: @_options.node_color
        fill: @_options.node_color
        'fill-opacity': @_options.node_opacity
        'stroke-width': @_options.node_border_width
      view.model = model
      model.view = view

      view.hover(
        (e) -> $(this).trigger('entered-node', [view, e]),
        (e) -> $(this).trigger('left-node', [view, e]),
        this, this
      )

      view.click(
        (e) ->
          $(this).trigger 'clicked-node', [view, model]
          e.stopPropagation()
        this
      )

      view.drag(
        # onmove
        (dx, dy, x, y, e) -> $(this).trigger('moved-node', [dx, dy, x, y, view, e]),
        # onstart
        (x, y, e) -> 
          $(this).trigger('grabbed-node', [x, y, view, e])
        #onend
        (e) -> 
          $(this).trigger('dropped-node', [view, e])
        #contexts
        this, this, this
      )

    createEdge: (model) ->
      {x1: x1, x2: x2, y1: y1, y2: y2} = @edgeEndPoints model
      view = @_paper.line x1, y1, x2, y2, {size: 5}
      @_edges.push view
      view.attr
        stroke: @_options.edge_color
        'stroke-width': @_options.edge_width
      model.view = view
      view.model = model

      view.hover(
        (e) -> $(this).trigger('entered-edge', [view, e]),
        (e) -> $(this).trigger('left-edge', [view, e]),
        this, this
      )

      view.click(
        (e) -> $(this).trigger('clicked-edge', [view, e]),
        this
      )

    edgeEndPoints: (model) ->
      {cx: x1, cy: y1} = model.from.view.attr ['cx', 'cy']
      {cx: x2, cy: y2} = model.to.view.attr ['cx', 'cy']
      [x, y] = [x2 - x1, y2 - y1]
      d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
      ratio = @_options.node_radius / d
      return {
        x1: x1 + ratio * x
        x2: x2 - ratio * x
        y1: y1 + ratio * y
        y2: y2 - ratio * y
      }      

    updateEdges: (nodeview) ->
      for edgemodel in nodeview.model.inEdges.items().concat( nodeview.model.outEdges.items() )
        {x1: x1, x2: x2, y1: y1, y2: y2} = @edgeEndPoints edgemodel
        @_paper.line x1, y1, x2, y2, {}, edgemodel.view

    temporaryEdge: (nodeview, x2, y2) ->
      if _.isUndefined(@_paper.tempedge)
        @_paper.tempedge = null
      {cx: x1, cy: y1} = nodeview.attr ['cx', 'cy']
      if x1 != x2 and y1 != y2
        @_paper.tempedge = @_paper.line x1, y1, x2, y2, {size: 5}, @_paper.tempedge

    removeTemporaryEdge: -> 
      if not _.isUndefined(@_paper.tempedge)
        @_paper.tempedge.remove()
        delete @_paper.tempedge

    highlightNode: (nodeview, color, ms=100, opacity=@_options.node_highlight_opacity) -> 
      nodeview.animate {'stroke': color, 'fill': color, 'fill-opacity': opacity}, ms
    unhighlightNode: (nodeview, color, ms=100) -> 
      nodeview.animate {'stroke': @_options.node_color, 'fill': @_options.node_color, 'fill-opacity': @_options.node_opacity}, ms

    highlightEdge: (edgeview, color, ms=100) -> edgeview.animate {'stroke': color}, ms
    unhighlightEdge: (edgeview, color, ms=100) -> edgeview.animate {'stroke': '#000000'}, ms

    removeEdge: (edge) -> edge.remove()
    removeNode: (node) -> node.remove()

    setNodeCursor: (cursor) -> @_nodes.attr 'cursor', cursor
    setEdgeCursor: (cursor) -> @_edges.attr 'cursor', cursor