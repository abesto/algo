define ['vendor/qunit', 'vendor/jquery', 'app/modules/Graph/model/Graph'], (T, $, G) ->
  T.module 'Graph model',
    setup: ->
      @g = new G
        directed: true
        allow_parallel_edges: true
        allow_loop_edges: true
        weighted: false

  T.test 'Nodes can be added and removed', ->
    n1 = @g.createNode()
    n2 = @g.createNode()
    T.ok (@g.hasNode n1)
    T.ok (@g.hasNode n2)
    @g.removeNode n1
    T.ok not (@g.hasNode n1)
    T.ok (@g.hasNode n2)

  T.test 'Directed edges can be added and removed', ->
    n1 = @g.createNode()
    n2 = @g.createNode()
    e1 = @g.createEdge(n1, n2)
    e2 = @g.createEdge(n2, n1)
    T.ok (@g.hasEdge e1)
    T.ok (@g.hasEdge e2)
    @g.removeEdge e1
    T.ok not (@g.hasEdge e1)
    T.ok (@g.hasEdge e2)

  T.test 'stronglyAdjacent', ->
    n1 = @g.createNode()
    n2 = @g.createNode()
    @g.createEdge(n1, n2)
    T.ok (@g.stronglyAdjacent n1, n2), 'First'
    T.ok not (@g.stronglyAdjacent n2, n1), 'Second'

  T.test 'adjacent', ->
    n1 = @g.createNode()
    n2 = @g.createNode()
    @g.createEdge(n1, n2)
    T.ok not (@g.adjacent n2, n1)
    @g.createEdge(n2, n1)
    T.ok (@g.adjacent n2, n1)

  T.test 'Undirected graphs create edges both ways', ->
    n1 = @g.createNode()
    n2 = @g.createNode()
    @g.options.directed = false
    @g.createEdge(n1, n2)
    T.ok (@g.adjacent n1, n2)