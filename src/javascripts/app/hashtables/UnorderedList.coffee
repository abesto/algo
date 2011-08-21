define ->
  class UnorderedList
    constructor: ->
      @_array = []

    add: (element) ->
      @_array.push(element) - 1

    get: (key) ->
      return (element.value for element in @_array when element.key == key)

    getFirst: (key) ->
      return element.value for element in @_array when element.key == key
            
    @fromArray: (array) ->
      r = new this()
      for e in array
        r.add e
      return r

    toArray: -> @_array

