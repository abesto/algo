# _Store key-value pairs (`Element`s) in an ordered list_
#
# This class only implements insertion sort; the comparison function
# is given as the parameter to the exported class' constructor. The
# comparison function is expected to return a number such that
#
#  * f(a,b) < 0 if a < b,
#  * f(a,b) == 0 if a == b, and
#  * f(a,b) > 0 if a > b

#
define ['vendor/jquery', 'app/common/StateMachine', './UnorderedList'], ($, StateMachine, UL) ->
  class GenericOrderedList extends UL
    @StateMachineDefinition = $.extend {}, UL.StateMachineDefinition
    @StateMachineDefinition.add = (element) ->
      @result @_insertIndex element
      @step()

    @StateMachineDefinition['ordered-append'] = (element) -> @_array.push element
    @StateMachineDefinition['ordered-prepend'] = (element) -> @_array.unshift element
    @StateMachineDefinition['ordered-insert'] = (element) -> @_array.splice @result(), 0, element

    @StateMachineDefinition.transitions = [
      {from: ['add'], to: ['ordered-append', 'ordered-prepend', 'ordered-insert']},
      {from: ['ordered-append', 'ordered-prepend', 'ordered-insert'], to: ['ready']}
    ]

    @StateMachineDefinition.guards = {
      add:
        'ordered-append': -> @result() == @_array.length
        'ordered-prepend': -> @result() == 0 and @_array.length > 0
        'ordered-insert': -> 0 < @result() < @_array.length
    }

    constructor: (@_compare) ->
      super()

    # Find the index where the new item will be inserted.
    _insertIndex: (element) ->
      i = 0
      while i < @_array.length and (@_compare(@_array[i].key, element.key) <= 0)
        i++
      return i

  return (compare) ->
    class OrderedList extends GenericOrderedList
      constructor: ->
        super compare
