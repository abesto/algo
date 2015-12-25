define ['raphael'], (R) ->
  (name, clazz) ->
    R.fn[name] = (args...) ->
      new clazz(@, args...)