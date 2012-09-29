# _Store key-value pairs (`Element`s) in a simple unordered list_
#
# The API for all lists used by `ChainedHashTable` are exactly the same as this.

define ['app/common/StateMachine'], (StateMachine) ->
  class UnorderedList extends StateMachine
    @StateMachineDefinition:
      entryPoints: ['add', 'get', 'getFirst']
      transitions: [
        {from: ['add'], to: ['unordered-append']},
        {from: ['unordered-append', 'get', 'getFirst'], to: ['ready']}
      ]
      # __add__: Add element, return the position where it was inserted.
      # Elements after it are shifted right.
      add: (element) ->
        @step()

      'unordered-append': (element) ->
        @result @_array.push(element) - 1

      # __get__: Return the array of values associated with `key`
      get: (key) ->
        @result (element.value for element in @_array when element.key == key)

      # __getFirst__: Return the value of the first item found with `key`
      getFirst: (key) ->
        for e in @_array
          if e.key == key
            @result e.value
            return

    constructor: ->
      @_array = []
      super

    # End of StateMachine definition

    # __@fromArray__: A method on the prototype of the list; build a list instance
    # from an array of `Element`s.
    @fromArray: (array) ->
      r = new this()
      for e in array
        r.add(e).run()
      return r

    toArray: -> @_array

