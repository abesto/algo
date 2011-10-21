define ['vendor/jquery', 'vendor/raphael', 'app/common/raphael/raphael.class'], ($, Raphael, RC) ->
  RC class GraphWidget
    @default_options = {
      'background_color': '#fff'
      'node_radius': 20,
      'node_stroke_width': 2,
      'node_color': '#000',
      'node_fill_opacity': 0,
      'node_highlighted_fill_opacity': 0.3
    }

    constructor: (@_paper, @_display, opts) ->
      $(@_display).click (e) => $(this).trigger('clicked-paper', [e.offsetX, e.offsetY])
      @_options = $.extend {}, @constructor.default_options, opts
      @_highlight = Raphael.animation {'fill-opacity': @_options.node_highlighted_fill_opacity}, 100
      @_unhighlight = Raphael.animation {'fill-opacity': @_options.node_fill_opacity}, 100

    setModel: (model) ->
      $model = $(model)
      $model.bind 'created-node', (event, x, y, model) => @createNode(x, y, model)
      $model.bind 'removed-node', (event, model) => @removeNode(model.view)

    createNode: (x, y, model) ->
      view = @_paper.ellipse x, y, @_options.node_radius, @_options.node_radius
      view.attr
        stroke: @_options.node_color
        fill: @_options.node_color
        'fill-opacity': @_options.node_fill_opacity
        'stroke-width': @_options.node_stroke_width
      view.model = model
      model.view = view

      view.click (e) => 
        $(this).trigger 'clicked-node', [view, model]
        e.stopPropagation()

      view.drag(
        # onmove
        (dx, dy, x, y, e) -> $(this).trigger('moved-node', [dx, dy, x, y, view, e]),
        # onstart
        (x, y, e) -> 
          view.animate @_highlight
          $(this).trigger('grabbed-node', [x, y, view, e])
        #onend
        (e) -> 
          view.animate @_unhighlight
          $(this).trigger('dropped-node', [view, e])
        #contexts
        this, this, this
      )

    removeNode: (node) -> node.remove()