##
# Chained hash table
#
# Constructor parameters:
#  hashFunction: a HashFunction instance, defaults to (x) -> x
#  listClass: a class implementing the interface of UnorderedList, defaults to UnorderedList
#
# Entry points and states:
#  add(key, value) -> newHash -> insertItem -> ready
#          |                                     ^
#          ---------------------------------------
#  *get(key) -> got -> ready
#  *getFirst(key) -> got -> ready
#
# Entry points marked with a * set the 'result' property of the data object
#
# Data fields set in states:
#  add, newHash, insertItem
#   hash: actual hash
#   element: Element instance
#   params: key, value
#  insertItem
#   result: index where the item was inserted (determined by the list type)
#  got
#   result: array of values
#  gotFirst
#   result: value
##

define ['vendor/jquery'
'cs!StateMachine'
'cs!./Element', 'cs!./HashFunction', 'cs!./UnorderedList'],
($, StateMachine, Element, HashFunction, UnorderedList) ->

  class ChainedHashTable extends StateMachine
    constructor: (hashFunction, listClass) ->
      # State machine init
      super()
      @_entryPoint 'add', 'get', 'getFirst'

      # Hash table init
      @_hashFunction = hashFunction ? new HashFunction
         hash: (x) -> x
         inDomain: -> true
         inRange: -> true
      @_listClass = listClass ? UnorderedList
      @_heads = {}
    # eof constructor

    _next: (a, b) ->
      switch @_current
        when 'add'
          @_data.element = new Element a, b
          @_data.hash = @_hashFunction.hash @_data.element.key
          if @_heads[@_data.hash]?
            return 'insertItem'
          else
            return 'newHash'
        when 'newHash'
          return 'insertItem'
        when 'insertItem', 'got', 'gotFirst'
          return 'ready'
        else
          return @_current

    _newHash: -> @_heads[@_data.hash] = new @_listClass()
    _insertItem: -> @_heads[@_data.hash].add @_data.element

    _get: (key) ->
      @_current = 'got'
      return (@_heads[ @_hashFunction.hash key ]?.get key) ? []

    _getFirst: (key) ->
      @_current = 'gotFirst'
      return @_heads[ @_hashFunction.hash key ]?.getFirst key


