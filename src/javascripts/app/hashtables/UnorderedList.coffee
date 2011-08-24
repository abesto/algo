# _Store key-value pairs (`Element`s) in a simple unordered list_
#
# The API for all lists used by `ChainedHashTable` are exactly the same as this.

define ->
  class UnorderedList
    constructor: ->
      @_array = []

    # __add__: Add element, return the position where it was inserted.
    # Elements after it are shifted right.
    add: (element) ->
      @_array.push(element) - 1

    # __get__: Return the array of values associated with `key`
    get: (key) ->
      return (element.value for element in @_array when element.key == key)

    # __getFirst__: Return the value of the first item found with `key`
    getFirst: (key) ->
      return element.value for element in @_array when element.key == key

    # __@fromArray__: A method on the prototype of the list; build a list instance
    # from an array of `Element`s.
    @fromArray: (array) ->
      r = new this()
      for e in array
        r.add e
      return r

    toArray: -> @_array

