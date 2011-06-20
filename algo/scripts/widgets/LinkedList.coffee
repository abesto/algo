define ['vendor/underscore', 'cs!widgets/rectext', 'cs!widgets/raphael.setfixes', 'cs!widgets/raphael.line'], (_) ->
  class LinkedListWidget
    constructor: (@_paper, @_x, @_y, @_padding=20, @_pointer_width=15) ->
      @_items = []

    _createItem: (x, y, fields...) ->
      item = @_paper.set()
      last = item.addToSubset 'fields', @_paper.rectext(x, y, fields.shift())
      while fields.length > 0
        last = item.addToSubset 'fields', @_paper.rectextafter last, fields.shift()
      item.addToSubset 'pointer', @_paper.rectextafter last, @_pointer_width
      item.translate x - item.getBBox().x, 0
      return item
    #eof _createItem

    # Ensure exactly one of two things:
    #  The last (pointer) box is striked out
    #  An arrow points out of the last box
    _last: (item, bool) ->
      if not bool? then return item.hasSubset 'lstrike'
      b = item.get('pointer').getBBox()

      # bool=true: strike-out=true, arrow=false
      if bool
        item.removeSubset 'out'
        if not item.hasSubset 'lstrike'
          item.addToSubset('lstrike', @_paper.path "M#{b.x} #{b.y + b.height}L#{b.x + b.width} #{b.y}")

      # bool=false: strike-out=false, arrow=true
      else
        item.removeSubset 'lstrike'
        if not item.hasSubset 'out'
          item.addToSubset('out', @_paper.line b.x+b.width-@_pointer_width/2, b.y+(b.height/2), b.x+b.width+@_padding, b.y+(b.height/2), {
            size: @_padding/2.6
            angle: 20
          })
    # eof _createItem

    insertBefore: (position, fields...) ->
      if position > 0
        prev = @_items[position-1]
        if position == @_items.length then @_last prev, false
        b = prev.getBBox()
        item = @_createItem b.x + b.width, b.y + b.height/2, fields...
      else
        item = @_createItem @_x, @_y, fields...

      if position < @_items.length
        @_last item, false
        offset = item.getBBox().width
        for next in @_items[position..]
          next.translate offset, 0
      else
        @_last item, true

      @_items.splice position, 0, item

    push: (fields...) -> @insertBefore @_items.length, fields...
    unshift: (fields...) -> @insertBefore 0, fields...
    insertAfter: (position, fields...) -> @insertBefore position+1, fields...

    removeAt: (position) ->
      if position < 0 then position += @_items.length
      if position > @_items.length then return
      offset = -@_items[position].getBBox().width
      @_items[position].remove()
      @_items.splice position, 1
      if position == @_items.length
        @_last @_items[position-1], true
      for item in @_items[position .. @_items.length-1]
        item.translate offset, 0

    shift: -> @removeAt 0
    pop: -> @removeAt -1
