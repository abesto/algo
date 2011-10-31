define ['app/common/StateMachine'], (StateMachine) ->
  class Dijkstra extends StateMachine
    @StateMachineDefinition:
      entryPoints: ['init']
      transitions: [
        {from: ['loop'], to: ['all-nodes-processed', 'select-min']}
        {from: ['select-min'], to: ['remaining-nodes-inaccessible', 'relax-init']}
        {from: ['relax-init', 'relax'], to: ['relax', 'loop']}
        {from: ['all-nodes-processed', 'remaining-nodes-inaccessible'], to: ['ready']}
      ]

      skip: ['loop']

      guards:
        loop:
          'all-nodes-processed': -> @_data.q.length == 0
          'select-min': -> @_data.q.length > 0
        'select-min':
          'remaining-nodes-inaccessible': -> @_data.dist[@_data.min.UID] == Infinity
          'relax-init': -> @_data.dist[@_data.min.UID] != Infinity
        'relax-init':
          'loop': -> @_data['relax-edges'].length == 0
          'relax': -> @_data['relax-edges'].length > 0
        'relax':
          'loop': -> @_data['relax-edges'].length == 0
          'relax': -> @_data['relax-edges'].length > 0

      init: ->
        for node in @graph.nodes()
          @_setDistPrev(node, Infinity, null)
          node.color 'none'
        for edge in @graph.edges()
          edge.color 'none'
        @['clicked-node'] = (event, nodeview, nodemodel) =>
          @_setDistPrev nodemodel, 0, null
          @_state = 'loop'
          @step()
          delete @['clicked-node']

      loop: ->
        @_data.min?.color 'none'

      'select-min': ->
        @_data.min = @_data.q[0]
        for n in @_data.q[1..]
          if @_data.dist[n.UID] < @_data.dist[@_data.min.UID]
            @_data.min = n
        @_data.min.color 'blue'

      'relax-init': ->
        @_data.q.splice @_data.q.indexOf(@_data.min), 1
        @_data['relax-edges'] = @_data.min.outEdges.items()
        edge.to.color 'yellow' for edge in @_data['relax-edges']

      'relax': ->
        @_data.e = @_data['relax-edges'].pop()
        @_data.v = @_data.e.to
        @_data.v.color 'orange'        
        @_data.alt = @_data.dist[@_data.min.UID] + @_data.e.weight
        if @_data.alt < @_data.dist[@_data.v.UID]
          @_setDistPrev @_data.v, @_data.alt, @_data.e

      'relax-out': ->
        @_data.v.color 'none'

        
    _setDistPrev: (node, dist, prev) ->
      @_data.previous[node.UID]?.color? 'none'
      prev?.color? 'green'

      @_data.dist[node.UID] = dist
      @_data.previous[node.UID] = prev
      if dist == Infinity then dist = 'INF'
      prev = if prev == null then 'NIL' else prev.from.UID
      node.label("#{dist}\n#{prev}")

    constructor: (@graph) ->
      super()
      @_data.dist = {}
      @_data.previous = {}
      @_data.q = (node for node in @graph.nodes())
      