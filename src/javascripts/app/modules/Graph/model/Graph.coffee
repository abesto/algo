define ['app/common/UID', 'app/common/UIDMap', 'vendor/jquery', 'vendor/underscore'], (UID, UIDMap, $, _) ->

  # An edge is an ordered pair of two Node instances with a weight and a UID
  class Edge
    constructor: (@from, @to, @weight) ->
      if @from not instanceof Node
        throw 'Edge can only connect Node instances; tried to pass in ' + @from + ' as from parameter'
      if @to not instanceof Node
        throw 'Edge can only connect Node instances; tried to pass in ' + @to + ' as to parameter'
      @UID = UID('edge')

    isLoopEdge: -> @from == @to

    toString: -> "Edge-#{@UID}"

  # A node is a UID with a list of in edges and out edges
  class Node
    constructor: -> 
      @UID = UID('node')
      @inEdges = new UIDMap
      @outEdges = new UIDMap

    addEdge: (edge) -> 
      if edge.from == this
        @outEdges.add edge
      if edge.to == this
        @inEdges.add edge
      if edge.from != this and edge.to != this
        throw "Tried to add edge #{edge.UID} to node #{@UID}, but the node is not an endpoint of the edge"

    removeEdge: (edge) -> 
      if edge.from == this
        @outEdges.remove edge
      if edge.to == this
        @inEdges.remove edge
      if edge.from != this and edge.to != this
        throw "Tried to remove edge #{edge.UID} to node #{@UID}, but the node is not an endpoint of the edge"

    toString: -> "Node-#{@UID}"



  # Represents a whole graph: a collection of nodes and edges
  # Fires events when the model changes
  class Graph

    # Default is the most generial graph
    @default_options = {
      'directed': true,
      'allow_loop_edges': true,
      'allow_parallel_edges': true,
      'weighted': false
    }

    constructor: (opts={}) ->
      @_options = $.extend {}, @constructor.default_options, opts
      if not @_options.allow_parallel_edges
        @_options.allow_loop_edges = false
      @_nodes = new UIDMap
      @_edges = new UIDMap

    _trigger: (type, data=[]) -> $(this).trigger type, data

    _checkNodeInGraph: (node) ->
      if not @_nodes.exists node
        throw "Can only work with nodes already in the graph; node #{node.UID} is not."
      
    _checkEdgeInGraph: (edge) ->
      if not @_edges.exists edge
        throw "Can only work with edges already in the graph; edge #{edge.UID} is not."

    createNode: (x, y) ->
      n = new Node
      @_nodes.add n
      @_trigger 'created-node', [x, y, n]
      return n

    createEdge: (from, to, weight=null) ->
      @_checkNodeInGraph node for node in [from, to]
      if @_options.weighted and weight is null
        throw "A weight parameter is required when creating an edge on a weighted graph"
      if not @_options.allow_parallel_edges
        check = @stronglyAdjacent if @_options.directed else @adjacent
        throw "Parallel edges are not allowed" if check.call(this, from, to)
      if not @_options.allow_loop_edges and from == to
        throw "Loop edges are not allowed"
      # The edge can be created

      e = new Edge(from, to, weight)
      @_edges.add e
      from.addEdge e
      to.addEdge e
      @_trigger 'created-edge', e

      if not @_options.directed
        e2 = new Edge(to, from, weight)
        @_edges.add e2
        from.addEdge e2
        to.addEdge e2
        @_trigger 'created-edge', e

      return e

    
    hasNode: (node) -> @_nodes.exists node
    hasEdge: (edge) -> @_edges.exists edge

    removeNode: (node) ->
      @_checkNodeInGraph node
      @removeEdge(edge) for edge in node.inEdges.items() + node.outEdges.items()
      @_nodes.remove node
      @_trigger 'removed-node', node

    removeEdge: (edge) ->
      @_checkEdgeInGraph edge
      node.removeEdge(edge) for node in [edge.from, edge.to]
      @_edges.remove edge
      @_trigger 'removed-edge', edge

    stronglyAdjacent: (from, to) -> (edge for edge in from.outEdges.items() when edge.to == to).length > 0
    adjacent: (a, b) -> @stronglyAdjacent(a, b) and @stronglyAdjacent(b, a)
