define ['vendor/jquery'], ($) ->
  class GraphController
    constructor: (@model, @view) ->
      $model = $(model)
      $view = $(view)
      $view.bind 'clicked-background', (event, x, y) => 
        console.log "Paper clicked at (#{x},#{y})"      
        nodemodel = @model.createNode()

        @view.createNode x, y, nodemodel
        console.log "Created node #{nodemodel.UID} at (#{x},#{y})"

      $view.bind 'clicked-node', (event, nodeview, nodemodel) =>
        console.log "Clicked node #{nodemodel.UID}"
        @model.removeNode nodemodel

      $model.bind 'removed-node', (event, nodemodel) =>
        @view.removeNode nodemodel.view
        console.log "Removed node #{nodemodel.UID}"


