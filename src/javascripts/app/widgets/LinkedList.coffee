define [
  'vendor/underscore', 'vendor/jquery', './raphael.class', './RecText'
  './raphael.setfixes', './raphael.line'
], (_, $, RC) ->
  defaults =
    x: 0
    y: 0
    centerY: false
    fieldInnerPadding: 10  # Space between text and rectangle of fields
    pointerBoxWidth: 15    # Width of the last box, where the pointer arrow starts if there's a next item
    pointerArrowLength: 20

  RC class LinkedList
    constructor: (@_paper, opts) ->
      @_items = @_paper.set()
      @_options = $.extend {}, defaults, opts

    _createItem: (x, y, fieldstrings...) ->
      item = @_paper.set()
      fields = item.get('fields')

      # Create the fields - first field
      last = fields.add @_paper.RecText
        x: x
        y: y
        text: fieldstrings.shift()
        padding: @_options.fieldInnerPadding
        centerY: @_options.centerY and (@_items.length == 0)

      # Create fields - rest of the fields with text
      while fieldstrings.length > 0
        b = last.getBBox()
        last = fields.add @_paper.RecText
          x: b.x+b.width
          y: b.y
          text: fieldstrings.shift()
          padding: @_options.fieldInnerPadding

      # Create fields - pointer box
      b = last.getBBox()
      item.get('pointer-box').add @_paper.rect(b.x+b.width, b.y, @_options.pointerBoxWidth, b.height)

      return item
    #eof _createItem

    # Ensure exactly one of two things:
    #  The last (pointer) box is striked out
    #  An arrow points out of the last box
    _last: (item, bool) ->
      if not bool? then return item.hasSubset 'strike-out'
      b = item.get('pointer-box', 0).getBBox()

      # bool=true: strike-out=true, arrow=false
      if bool
        item.removeSubset 'pointer'
        if not item.hasSubset 'strike-out'
          item.get('strike-out').add(@_paper.path "M#{b.x} #{b.y + b.height}L#{b.x + b.width} #{b.y}")

      # bool=false: strike-out=false, arrow=true
      else
        item.removeSubset 'strike-out'
        if not item.hasSubset 'pointer'
          item.get('pointer').add(@_paper.line b.x+b.width-@_options.pointerBoxWidth/2, b.y+(b.height/2), b.x+b.width+@_options.pointerArrowLength, b.y+(b.height/2), {
            size: @_options.pointerArrowLength/2.6
            angle: 20
          })
    # eof _createItem

    insertBefore: (position, fields...) ->
      if position > 0
        prev = @_items[position-1]
        if position == @_items.length then @_last prev, false
        b = prev.getBBox()
        item = @_createItem b.x + b.width, b.y, fields...
      else
        item = @_createItem @_options.x, @_options.y, fields...

      if position < @_items.length
        @_last item, false
        offset = item.getBBox().width
        for next in _(@_items).toArray()[position..]
          next.translate offset, 0
      else
        @_last item, true

      @_items.splice position, 0, item
      return item

    push: (fields...) -> @insertBefore @_items.length, fields...
    unshift: (fields...) -> @insertBefore 0, fields...
    insertAfter: (position, fields...) -> @insertBefore position+1, fields...

    removeAt: (position) ->
      if position < 0 then position += @_items.length
      if position > @_items.length then return
      offset = -@_items[position].getBBox().width
      @_items[position].remove()
      @_items.splice position, 1
      if position == @_items.length && @_items.length > 0
        @_last @_items[position-1], true
      for item in @_items[position .. @_items.length-1]
        item.translate offset, 0

    shift: -> @removeAt 0
    pop: -> @removeAt -1

    getBox: (position, index) -> @_items[position].get('fields', index)
    resizeBox: (position, index, width) ->
      offset = width - @_items[position].get('fields', index).getBBox().width
      @_items[position].get('fields', index).resizeX width

      # Other fields of this item
      for box in _(@_items[position].get('fields'))[index+1..]
        box.translate offset
      # Special shapes of this item
      for subset in ['pointer-box', 'pointer', 'strike-out']
        if @_items[position].hasSubset(subset)
          @_items[position].get(subset, 0).translate offset
      # Other items of the list
      for item in _(@_items)[position+1..]
        item.translate offset

    truncate: ->
      while @_items.length > 0
        @pop()

    getBBox: ->
      if @_items.length == 0 then return {x:@_x, y:@_y, width:0, height:0}
      else return @_items.getBBox()
    translate: (args...) -> @_items.translate args...
    
    remove: -> @_items.remove()

  return {
    'class': LinkedList,
    'defaults': defaults
  }