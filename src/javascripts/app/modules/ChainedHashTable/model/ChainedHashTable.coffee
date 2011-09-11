# _A chained hash table implemented in terms of a StateMachine_
#
# This class delegates hashing to a hash function and list operations
# to a list class; these can be switched at runtime, resulting in a rehashing
# of all data.
#
# States
# ------
#
#### Entry points
#
#  * __add(key, value)__: a new item is to be added
#  * __get(key)__: find the values added with a key
#  * __getFirst(key)__: find the 'first' value with a key. This is not the item that was the
#  first in, but rather the one at the first position as ordered by the current list implementation.
#  * __setListClass(clazz)__: set the class with the list implementation. Triggers a rehashing.
#  * __setHashFunction(fun)__: set the hash function. Triggers a rehashing.
#
#### Breakpoint states
#
#  * __newHash__: a new hash value has been found, resulting in the creation of a new list
#  * __insertItem__: a new item has been inserted into an already existing list
#
#### Data fields set in states
#
#  * __add, newHash, insertItem__
#   * hash: actual hash
#   * element: Element instance
#   * params: key, value
#  * __insertItem__
#   * result: index where the item was inserted (determined by the list type)
#  * __get__
#   * result: array of values
#  * __getFirst__
#   * result: value
#
# A special `clear` event is fired before the data is rehashed; normal `newHash` and `insertItem`
# events follow it, representing the rehashing procedure..
#

#
define ['vendor/jquery', 'vendor/underscore'
'app/common/StateMachine'
'./Element', './UnorderedList'],
($, _, StateMachine, Element, UnorderedList) ->
  class ChainedHashTable extends StateMachine
    @StateMachineDefinition:
      entryPoints: ['add', 'get', 'getFirst', 'setListClass', 'setHashFunction']
      transitions: [
        {from: ['add'],        to: ['willInsertItem', 'newHash']}
        {from: ['newHash'],    to: ['willInsertItem']}
        {from: ['willInsertItem'], to: ['insertItem']},
        {
          from: ['insertItem', 'get', 'getFirst'],
          to: ['ready']
        }
      ]

      # A new list needs to be created for the item if a list for the appropriate hash doesn't yet exist
      guards:
        add:
          newHash: -> _.isUndefined @_heads[@_data.hash]
          willInsertItem: -> not _.isUndefined @_heads[@_data.hash]

      add: (a, b) ->
        @_data.element = new Element a, b
        @_data.hash = @_hashFunction @_data.element.key

      newHash:    -> @_heads[@_data.hash] = new @_listClass()
      willInsertItem: ->
        list = @_heads[@_data.hash]
        @_chain list, list.add, @_data.element

      get: (key) ->
        @_data.hash = @_hashFunction key
        if _.isUndefined(@_heads[@_data.hash]) then @result [] else
          list = @_heads[@_data.hash]
          @_chain list, list.get, key

      getFirst: (key) ->
        @_data.hash = @_hashFunction key
        if _.isUndefined(@_heads[@_data.hash]) then @result 'undefined' else
          list = @_heads[@_data.hash]
          @_chain list, list.getFirst, key

      setListClass: (@_listClass) -> @_rebuild()
      setHashFunction: (@_hashFunction) -> @_rebuild()

    # First set data specific to this data structure, then initialize the StateMachine
    constructor: (@_hashFunction = ((x) -> x), @_listClass = UnorderedList) ->
      @_heads = {}
      super()

    # Re-hash the data by removing everything, and running the elements through the normal add->(newHash)->insertItem flow.
    # Fast forward for now, probably not exciting enough to step through manually. All the events are fired normally, so
    # the application knows exactly what's happening.
    _rebuild: ->
      @trigger 'clear'
      @_state = 'ready'
      for hash, list of @_heads
        delete @_heads[hash]
        for element in list.toArray()
          @add(element.key, element.value).run()


