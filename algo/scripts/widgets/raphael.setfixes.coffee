##
# Extend Set with methods that behave like an ordered set, plus add string-indexed sub-sets.
# The original API is left intact. (If not, that's a bug)
#
# The items are ordered as they were added.
# The performance is not optimal, but it's not intended to be.
# Subsets can be accessed as setObject.key
# Subsets are sets too.
##

define ['vendor/raphael', 'vendor/underscore'], (R, _) ->
  f = R::set
  R::set = (args...) ->
    s = f(args...)
    s.keys = []
    return s

  Set = R::set().constructor

  Set::splice = (args...) ->
    @items.splice args...
    @length = @items.length
    for v, i in @items
      @[i] = v

  # Is item in the set?
  Set::has = (item) -> _(@items).indexOf(item) > -1

  # Does a subset with the key exist?
  Set::hasSubset = (key) -> if @[key]? then (@[key] instanceof Set) else false

  # Add item to the set and its superset, if applicable
  Set::add = (item) ->
    if not @has item then @push item
    @superset?.add item
    return item

  # Remove item from the set and all subsets recursively
  Set::removeItem = (item, recursive=false) ->
    i = _(@).indexOf(item)
    if i > -1
      @splice i, 1
      for key in @keys
        @[key].removeItem item, true
      @superset?.removeItem item, true
      if not recursive then item.remove()

  # Remove the subset indexed by key, and all the items contained in it
  # Implicitly removes the items from subsets of the subset, recursively
  # Explicitly removes the subsets of the subset, recursively
  Set::removeSubset = (key, recursive=false) ->
    if @hasSubset key
      for subset in @[key].keys
        @[key].removeSubset subset, true
      for item in @[key].items
        @removeItem item, recursive
      @[key].remove()
      @keys.splice _(@keys).indexOf(key), 1
      delete @[key]

  Set::get = (keys...) ->
    key = keys.shift()
    if @hasSubset key
      if keys.length > 0 then return @[key].get keys...
      else return @[key]
    else if @items[key]? then return @items[key]
    else if not _.isNumber(key)
      @[key] = R::set()
      @[key].superset = @
      @keys.push key
      return @[key]
    else
      throw 'No item found with index ' + key + '. Subset names cannot be numbers.'

  # Simple override; original version accepts only Set and Element items
  Set::push = (items...) ->
    for item in items
      @items.push item
      @[@items.length-1] = item
    @length = @items.length


