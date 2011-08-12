##
# Chained hash table
#
# Constructor parameters:
#  hashFunction: a function, defaults to (x) -> x
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
'../StateMachine'
'./Element', './UnorderedList'],
($, StateMachine, Element, UnorderedList) ->

  class ChainedHashTable extends StateMachine
    constructor: (hashFunction, listClass) ->
      # State machine init
      super()
      @_entryPoint 'add', 'get', 'getFirst'

      # Hash table init
      @_hashFunction = hashFunction ? (x) -> x
      @_listClass = listClass ? UnorderedList
      @_heads = {}
    # eof constructor

    _next: (a, b) ->
      r = ['insertItem', 'got', 'gotFirst']
      
      f =
        'add': =>
          @_data.element = new Element a, b
          @_data.hash = @_hashFunction @_data.element.key
          if @_heads[@_data.hash]?
            return 'insertItem'
          else
            return 'newHash'
        'newHash': => 'insertItem'
      
      if f[@_current]?
        f[@_current]()
      else if @_current in r
        return 'ready'
      else
        return @_current

    _newHash: -> @_heads[@_data.hash] = new @_listClass()
    _insertItem: -> @_heads[@_data.hash].add @_data.element

    _get: (key) ->
      @_current = 'got'
      return (@_heads[ @_hashFunction key ]?.get key) ? []

    _getFirst: (key) ->
      @_current = 'gotFirst'
      return @_heads[ @_hashFunction key ]?.getFirst key


