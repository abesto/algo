define ['app/common/StateMachine'], (StateMachine) ->
  current = 'blue'
  unexplored = 'none'
  explored = 'green'
  back = 'red'

  order = 0
  depth = 0

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
        # If we got parameters, this is already a recursive call
        if node?
          @_data.node = node
          @_data.node.label "D:#{depth}\nO:#{order}"
          @_data.node.color explored, 'vertex'
          @_data.edgeIndex = -1
        # If not, this is the top-level call initiated by the user
        else
          @['clicked-node'] = (event, nodeview, nodemodel) =>
            order = 1
            depth = 1
            @_state = 'loop'
            @_data.node = nodemodel
            @_data.node.label "D:#{depth}\nO:#{order}"
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
        depth++
        order++
        recursive = new DepthFirst @graph
        @_chain recursive, recursive.init, @currentEdge().to

      'back-edge': ->
        @currentEdge().color back

      'ready': ->
        @_data.node.color explored, 'vertex'
        depth--
