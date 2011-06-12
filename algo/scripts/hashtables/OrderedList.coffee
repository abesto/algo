define ['cs!./UnorderedList'], (UL) ->
    class GenericOrderedList extends UL
        constructor: (compare) ->
            super()
            @_compare = compare

        _insertIndex: (element) ->
            i = 0
            while i < @_array.length && @_array[i].key <= element.key
                i++
            return i

        add: (element) ->
            i = @_insertIndex element
            if i == @_array.length
                @_array.push element
            else if i != null
                @_array.splice i, 0, element

    return (compare) ->
        class OrderedList extends GenericOrderedList
            constructor: ->
                super compare
