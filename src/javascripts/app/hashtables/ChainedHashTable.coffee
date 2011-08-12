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


define ['vendor/jquery', 'vendor/underscore'
'../StateMachine'
'./Element', './UnorderedList'],
($, _, StateMachine, Element, UnorderedList) ->
  class ChainedHashTable extends StateMachine
    constructor: (hashFunction, listClass) ->
      # State machine init
      super
        entryPoints: ['add', 'get', 'getFirst']  
        transitions: [
          {from: ['add'],        to: ['insertItem', 'newHash']}
          {from: ['newHash'],    to: ['insertItem']}
          {from: ['insertItem', 'get', 'getFirst'], to: ['ready']}          
        ]
        guards:
          add:
            newHash: => _.isUndefined @_heads[@_data.hash]
            insertItem: => not _.isUndefined @_heads[@_data.hash]
        add: (a, b) =>
          @_data.element = new Element a, b
          @_data.hash = @_hashFunction @_data.element.key
        newHash: => @_heads[@_data.hash] = new @_listClass()
        insertItem: => @_heads[@_data.hash].add @_data.element
        get: (key) =>
          @_data.hash = @_hashFunction key
          if _.isUndefined(@_heads[@_data.hash]) then [] else @_heads[@_data.hash].get key
        getFirst: (key) =>
          @_data.hash = @_hashFunction key
          if _.isUndefined(@_heads[@_data.hash]) then undefined else @_heads[@_data.hash].getFirst key          

      # Hash table init
      @_hashFunction = hashFunction ? (x) -> x
      @_listClass = listClass ? UnorderedList
      @_heads = {}
