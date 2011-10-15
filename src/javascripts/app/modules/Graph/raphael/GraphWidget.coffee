define ['vendor/jquery', 'app/common/raphael/raphael.class'], ($, RC) ->
  RC class GraphWidget
    @default_options = {
      'background_color': '#fff'
      'node_radius': 20,
      'node_stroke_width': 2,
      'node_color': '#000'
    }

    constructor: (@_paper, @_display, opts) ->
      $(@_display).click (e) => $(this).trigger('clicked-background', [e.offsetX, e.offsetY])
      @_options = $.extend {}, @constructor.default_options, opts

    createNode: (x, y, model) ->
      view = @_paper.ellipse x, y, @_options.node_radius, @_options.node_radius
      view.attr
        stroke: @_options.node_color
        fill: @_options.node_color
        'fill-opacity': 0,
        'stroke-width': @_options.node_stroke_width
      view.model = model
      model.view = view
      view.click (e) => 
        $(this).trigger 'clicked-node', [view, model]
        e.stopPropagation()

    removeNode: (node) -> node.remove()