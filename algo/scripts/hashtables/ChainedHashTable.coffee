define ['vendor/jquery'
'cs!StateMachine'
'cs!./Element', 'cs!./HashFunction', 'cs!./UnorderedList'],
($, StateMachine, Element, HashFunction, UnorderedList) ->
  class ChainedHashTable
    constructor: (hashFunction, listClass) ->
      @_hashFunction = hashFunction ? new HashFunction
         hash: (x) -> x
         inDomain: -> true
         inRange: -> true
      @_listClass = listClass ? UnorderedList
      @_heads = {}

    add: (key, value) ->
      element = if key instanceof Element then key else new Element(key, value)
      hash = @_hashFunction.hash element.key
      if not @_heads[hash]?
        @_heads[hash] = new @_listClass()
        $(this).trigger 'new-hash', [hash]
      @_heads[hash].add element

    get: (key) ->
      return (@_heads[ @_hashFunction.hash key ]?.get key) ? []

    getFirst: (key) ->
      return @_heads[ @_hashFunction.hash key ]?.getFirst key


