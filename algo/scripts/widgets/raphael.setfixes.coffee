##
# Extend the set to actualy behave like an ordered set, plus add string-indexed sub-sets.
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

  # Is item in the set?
  Set::has = (item) -> _(@items).indexOf(item) > -1

  # Does a subset with the key exist?
  Set::hasSubset = (key) -> @[key]?

  # Add item to the set
  Set::add = (item) ->
    if not @has item then @items.push item
    return item

  # Add item to the set and to the subset indexed by key, creating it if needed
  Set::addToSubset = (key, item) ->
    if not @keys? then @keys = []
    if not @hasSubset key
      @[key] = R::set()
      @keys.push key
    @[key].add item
    @add item
    return item

  # Remove item from the set and all subsets, and their subsets, and ...
  Set::removeItem = (item) ->
    i = _(@items).indexOf(item)
    if i > -1
      @items.splice i, 1
      for key in @keys
        @[key].removeItem item
      item.remove()

  # Remove the subset indexed by key, and all the items contained in it
  Set::removeSubset = (key) ->
    if @hasSubset key
      for item in @[key].items
        @removeItem item
      @[key].remove()
      @keys.splice _(@keys).indexOf(key), 1
      delete @[key]

  # If key is defined, return the count of items in the subset indexed
  # by key (possibly zero). If key is not defineed, return the count of
  # items in the set.
  Set::count = (key) ->
    if key?
      if @hasSubset key then return @[key].count() else return 0
    else
      return @items.length

  # Retrieve an item by index, possibly recursing into subsets.
  # If the first argument is the index of an element, that element is returned.
  # If the first argument is the key of a subset, we recurse into that subset with the rest of the arguments.
  # If the last argument is a subset, then the first (index 0) element of that subset is returned
  # If none of these conditions is met, this[key] is returned.
  Set::get = (keys...) ->
    key = keys.shift()
    if @hasSubset key
      if keys.length > 0 then return @[key].get keys...
      else return @[key].get 0
    else if @items[key]? then return @items[key]
    else return @[key]