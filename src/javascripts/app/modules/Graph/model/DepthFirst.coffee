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
        {from: ['init'], to: ['loop']}
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

      skip: ['loop']


      init: (node) ->
        if node?
          @_data.node = node
          @_data.node.color explored, 'vertex'
          @_data.edgeIndex = -1
        else
          @['clicked-node'] = (event, nodeview, nodemodel) =>
            @_state = 'loop'
            @_data.node = nodemodel
            @_data.node.color explored, 'vertex'
            @_data.edgeIndex = 0
            delete @['clicked-node']

      loop: -> 
        @_data.edgeIndex++
        @currentEdge()?.color @currentEdge().color(), 'outedge'  # Refreshes code listing colors

      'edge-unexplored': ->
        @currentEdge()?.color current, 'outedge'

      'discovery-edge': ->
        @currentEdge().color explored, 'outedge'
        recursive = new DepthFirst @graph
        @_chain recursive, recursive.init, @currentEdge().to

      'back-edge': ->
        @currentEdge().color back

      'ready': ->
        @_data.node.color explored, 'vertex'