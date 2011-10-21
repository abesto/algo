define ['vendor/jquery', 'vendor/underscore'], ($, _) ->
  actions = {
    noop: {},
    createNode: {
      'clicked-paper': (event, x, y) -> @model.createNode x, y
    },
    removeNode: {
      'clicked-node': (event, nodeview, nodemodel) -> @model.removeNode nodemodel
    },
    moveNode: {
      'grabbed-node': ($event, x, y, view, revent) -> {cx: @ox, cy: @oy} = view.attr ['cx', 'cy']
      'moved-node': ($event, dx, dy, x, y, view, revent) -> 
        view.attr
          cx: @ox + dx
          cy: @oy + dy
    }
  }

  class GraphController
    constructor: (@model, @view) ->
      @action = 'noop'
      $model = $(model)
      $view = $(view)
      view.setModel model

      @_bind $view, type for type in ['clicked-paper', 'clicked-node', 'grabbed-node', 'moved-node', 'dropped-node']

    _bind: ($view, type) ->
      $view.bind type, =>
        if not _.isUndefined(actions[@action][type])
          actions[@action][type].apply this, _(arguments).toArray()

