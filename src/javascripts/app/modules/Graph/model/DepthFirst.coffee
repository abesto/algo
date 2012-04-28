define ['app/common/StateMachine'], (StateMachine) ->
  current = 'blue'
  unexplored = 'none'
  explored = 'green'
  back = 'red'

  class DepthFirst extends StateMachine
    currentEdge: -> @_data.node.outEdges.items()[@_data.edgeIndex]

    @StateMachineDefinition:
      entryPoints: ['init']
      transitions: [
        {from: ['loop'], to: ['edge-explored', 'edge-unexplored', 'ready']}
        {from: ['edge-unexplored'], to: ['discovery-edge', 'back-edge']}
        {from: ['edge-explored', 'discovery-edge', 'back-edge'], to: ['loop']}
      ]

      guards:
        'loop':
          'ready': -> not @currentEdge()?
          'edge-explored': -> @currentEdge()?.color() == explored
          'edge-unexplored': -> @currentEdge()?.color() == unexplored
        'edge-unexplored':
          'discovery-edge': -> @currentEdge().to.color() == unexplored
          'back-edge': -> @currentEdge().to.color() == explored

      #skip: ['loop']


      init: (node) ->
        @['clicked-node'] = (event, nodeview, nodemodel) =>
          @_state = 'loop'
          @_data.node = nodemodel
          @_data.node.color current
          @_data.edgeIndex = 0
          @step()
          delete @['clicked-node']
        if node?
          @['clicked-node'](null, null, node)

      loop: -> 
        @_data.edgeIndex++
        #@currentEdge()?.color current

      'discovery-edge': ->
        @currentEdge().color explored
        recursive = new DepthFirst @graph
        @_chain recursive, recursive.init, @currentEdge().to

      'back-edge': ->
        @currentEdge().color back

      'ready': ->
        @_data.node.color explored
