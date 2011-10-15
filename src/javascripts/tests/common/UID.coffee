define ['vendor/qunit', 'app/common/UID'], (T, U) ->
  T.module 'UID'
  
  T.test 'Global series from 0', ->
    T.equal U(), 0
    T.equal U(), 1
    T.equal U(), 2
    
  T.test 'Named series', ->
    T.equal U('a'), 0
    T.equal U('b'), 0
    T.equal U('a'), 1
    T.equal U('a'), 2
    T.equal U('b'), 1