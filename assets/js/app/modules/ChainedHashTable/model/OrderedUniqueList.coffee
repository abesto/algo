# _Store key-value pairs (`Element`s) in a unique ordered list_
#
# Each key can only appear once in this list. The API is accordingly modified:
# `add` will return `null` if the key was already present.

define ['vendor/jquery', './OrderedList'], ($, OL) ->
  return (compare) ->
    L = new OL(compare)
    class OrderedUniqueList extends L
      @StateMachineDefinition = $.extend {}, L.StateMachineDefinition

      @StateMachineDefinition.transitions = [
        {from: ['add'], to: ['unique-ordered-append', 'unique-ordered-prepend', 'unique-ordered-insert', 'unique-ordered-noop']},
        {from: ['unique-ordered-append', 'unique-ordered-prepend', 'unique-ordered-insert', 'unique-ordered-noop'], to: ['ready']}
      ]

      @StateMachineDefinition.guards = {
        add:
          'unique-ordered-noop': -> @result() == null
          'unique-ordered-append': -> @result() != null and @result() == @_array.length
          'unique-ordered-prepend': -> @result() != null and @result() == 0 and @_array.length > 0
          'unique-ordered-insert': -> @result() != null and 0 < @result() < @_array.length
      }

      @StateMachineDefinition['unique-ordered-append'] = (element) -> @_array.push element
      @StateMachineDefinition['unique-ordered-prepend'] = (element) -> @_array.unshift element
      @StateMachineDefinition['unique-ordered-insert'] = (element) -> @_array.splice @_data.result, 0, element

      _insertIndex: (element) ->
        i = 0
        while i < @_array.length && @_array[i].key <= element.key
          i++
        if @_array[i-1]?.value == element.value
          return null
        return i
