define ['vendor/raphael', 'vendor/jquery'], (R, $) ->
  (callback) ->
    r = R('testpaper')
    callback(r, -> r.remove())
