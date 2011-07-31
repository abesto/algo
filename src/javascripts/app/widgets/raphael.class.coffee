define ['vendor/raphael'], (R) ->
  (clazz) ->
    R.fn[clazz.name] = (args...) ->
      new clazz(@, args...)