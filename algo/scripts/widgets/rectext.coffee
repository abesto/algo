define ['vendor/raphael', 'vendor/underscore'], (R, _) ->
  R.fn.rectext = (x, y, text, padding=5) ->
    t = @text x, y, text
    b = t.getBBox()
    r = @rect b.x-padding, b.y-padding, b.width+(2*padding), b.height+(2*padding)
    r.attr(fill: '#efefef')
    r.toBack()
    s = @set()
    s.push t, r
    return s

  R.fn.rectextHeight = (padding=5) ->
    r = @rectext 0, 0, 'x', padding
    b = r.getBBox()
    r.remove()
    return b.height

  R.fn.rectextafter = (rect, text) ->
    b = rect.getBBox()
    if not _.isNumber text
      r = @rectext(b.x + b.width, b.y + (b.height / 2), text)
      r.translate r.getBBox().width/2, 0
    else
      r = @rect b.x + b.width, b.y, text, b.height
      r.attr(fill: '#efefef')
    return r
