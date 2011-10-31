define ['vendor/jquery', 'vendor/raphael', 'vendor/underscore', 'app/common/raphael/raphael.class', 'app/common/Geometry', 'app/common/raphael/raphael.line', 'app/common/raphael/RecText'], ($, Raphael, _, RC, G) ->
  RC class GraphWidget
    @default_options = {
      'background_color': '#fff'

      'node_radius': 25
      'node_border_width': 2
      'node_color': '#000'
      'node_opacity': 0
      'node_highlight_opacity': 0.2

      'edge_width': 2
      'edge_color': '#000'
      'edge_weight_is_length': true
      'edge_arrow_size': 5
    }

    constructor: (@_paper, @_display, opts) ->
      $(@_display).click (e) => $(this).trigger('clicked-paper', [e.layerX, e.layerY])
      @_options = $.extend {}, @constructor.default_options, opts
      @_nodes = @_paper.set()
      @_edges = @_paper.set()
      @$ = $(this)

    setModel: (model) ->
      @model = model
      $model = $(model)
      $model.bind 'created-node', (event, x, y, model) => @createNode(x, y, model)
      $model.bind 'removed-node', (event, model) => @removeNode(model.view)
      $model.bind 'created-edge', (event, model) => @createEdge(model)
      $model.bind 'removed-edge', (event, model) => @removeEdge(model.view)
      $model.bind 'colored-edge', (event, model, color) => @highlightEdge(model.view, color)
      $model.bind 'uncolored-edge', (event, model) => @unhighlightEdge(model.view)
      $model.bind 'colored-node', (event, model, color) => @highlightNode(model.view, color)
      $model.bind 'uncolored-node', (event, model) => @unhighlightNode(model.view)
      $model.bind 'labeled-node', (event, model, label) -> model.view[1].attr('text', label)

    createNode: (x, y, model) ->
      # The node circle
      circle = @_paper.ellipse x, y, @_options.node_radius, @_options.node_radius
      circle.attr
        stroke: @_options.node_color
        fill: @_options.node_color
        'fill-opacity': @_options.node_opacity
        'stroke-width': @_options.node_border_width
      # Node label text
      text = @_paper.text x, y, ''
      text.attr 'stroke-width', 0
      # Node UID text
      uid = @_paper.RecText
        x: x
        y: y
        centerX: true
        centerY: true
        text: model.UID
        padding: 4
        fill_color: '#fff'
        opacity: 1

      uid._set.translate 0, -@_options.node_radius
      uid._set.toFront()

      view = @_paper.set(circle, text, uid._set)
      i.view = view for i in [model, circle, text, uid._set.get('rect', 0), uid._set.get('text', 0)]
      view.model = model
      @_nodes.push view

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
        (dx, dy, x, y, e) -> @$.trigger('moved-node', [dx, dy, x, y, view, e]),
        # onstart
        (x, y, e) -> 
          @$.trigger('grabbed-node', [x, y, view, e])
        #onend
        (e) -> 
          @$.trigger('dropped-node', [view, e])
        #contexts
        this, this, this
      )

    createEdge: (model) ->
      {x1: x1, x2: x2, y1: y1, y2: y2} = @edgeEndPoints model
      view = @_paper.line x1, y1, x2, y2, if @model.options.directed then {size: @_options.edge_arrow_size} else {}
      @_edges.push view
      view.attr
        stroke: @_options.edge_color
        'stroke-width': @_options.edge_width

      if @model.options.weighted
        if @_options.edge_weight_is_length
          model.weight = Math.round(G.pythagoras(x2-x1, y2-y1))

        view.label = @_paper.RecText(
          $.extend {}, G.middlepoint(x1, y1, x2, y2), {
            centerX: true
            centerY: true
            text: model.weight
            padding: 4
            fill_color: '#fff'
          }
        )
        view.label._set.toFront()
        view.push view.label._set

      model.view = view 
      view.model = model

      view.hover(
        (e) -> @$.trigger('entered-edge', [view, e]),
        (e) -> @$.trigger('left-edge', [view, e]),
        this, this
      )

      view.click(
        (e) -> @$.trigger('clicked-edge', [view, e]),
        this
      )

    edgeEndPoints: (model) ->
      {cx: x1, cy: y1} = model.from.view[0].attr ['cx', 'cy']
      {cx: x2, cy: y2} = model.to.view[0].attr ['cx', 'cy']
      [x, y] = [x2 - x1, y2 - y1]
      ratio = @_options.node_radius / G.pythagoras(x, y)
      return {
        x1: x1 + ratio * x
        x2: x2 - ratio * x
        y1: y1 + ratio * y
        y2: y2 - ratio * y
      }      

    updateEdges: (nodeview) ->
      for edgemodel in nodeview.model.inEdges.items().concat( nodeview.model.outEdges.items() )
        if _.isUndefined(edgemodel.view) then continue
        {x1: x1, x2: x2, y1: y1, y2: y2} = @edgeEndPoints edgemodel
        @_paper.line x1, y1, x2, y2, {}, edgemodel.view

        if @model.options.weighted
          {x: x, y: y} = G.middlepoint(x1, y1, x2, y2)
          edgemodel.view.label.moveTo(x, y)
          if @_options.edge_weight_is_length
            w = Math.round(G.pythagoras(x2-x1, y2-y1))
            edgemodel.weight = w
            edgemodel.view.label._set.get('text').attr('text', w)

    temporaryEdge: (nodeview, x2, y2) ->
      if _.isUndefined(@_paper.tempedge)
        @_paper.tempedge = null
      {cx: x1, cy: y1} = nodeview[0].attr ['cx', 'cy']
      if x1 != x2 and y1 != y2
        @_paper.tempedge = @_paper.line(x1, y1, x2, y2, 
          if @model.options.directed then {size: @_options.edge_arrow_size} else {}, 
          @_paper.tempedge
        )

    removeTemporaryEdge: -> 
      if not _.isUndefined(@_paper.tempedge)
        @_paper.tempedge.remove()
        delete @_paper.tempedge

    highlightNode: (nodeview, color, ms=100, opacity=@_options.node_highlight_opacity) -> 
      nodeview[0].animate {'stroke': color, 'fill': color, 'fill-opacity': opacity}, ms
    unhighlightNode: (nodeview, color, ms=100) -> 
      nodeview[0].animate {'stroke': @_options.node_color, 'fill': @_options.node_color, 'fill-opacity': @_options.node_opacity}, ms

    highlightEdge: (edgeview, color, ms=100) -> edgeview.animate {'stroke': color}, ms
    unhighlightEdge: (edgeview, color, ms=100) -> edgeview.animate {'stroke': @_options.edge_color}, ms

    removeEdge: (edge) -> edge.remove()
    removeNode: (node) -> node.remove()

    setNodeCursor: (cursor) -> @_nodes.attr 'cursor', cursor
    setEdgeCursor: (cursor) -> @_edges.attr 'cursor', cursor