# _Store key-value pairs (`Element`s) in a unique ordered list_
#
# Each key can only appear once in this list. The API is accordingly modified:
# `add` will return `null` if the key was already present.

define ['./OrderedList'], (OL) ->
    return (compare) ->
        L = new OL(compare)
        class OrderedUniqueList extends L
            _insertIndex: (element) ->
                i = 0
                while i < @_array.length && @_array[i].key <= element.key
                    i++
                if @_array[i-1]?.value == element.value
                    return null
                return i
