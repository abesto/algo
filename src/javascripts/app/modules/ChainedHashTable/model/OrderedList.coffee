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
define ['./UnorderedList'], (UL) ->
    class GenericOrderedList extends UL
        constructor: (@_compare) ->
            super()

        # Find the index where the new item will be inserted.
        _insertIndex: (element) ->
            i = 0
            while i < @_array.length and (@_compare(@_array[i].key, element.key) <= 0)
                i++
            return i

        add: (element) ->
            i = @_insertIndex element
            if i == @_array.length
                @_array.push element
            else if i != null
                @_array.splice i, 0, element
            return i

    return (compare) ->
        class OrderedList extends GenericOrderedList
            constructor: ->
                super compare
