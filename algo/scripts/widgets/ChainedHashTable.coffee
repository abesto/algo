define ['cs!widgets/LinkedList', 'vendor/jquery', 'loadcss'], (List, $, css) ->
  class ChainedHashTableWidget
    constructor: (@_paper, @model, @_x=0, @_y=0, @_padding=15) ->
      @_heads = {}    # Boxes for the hash values
      @_rect = @_paper.rect @_x, @_y, @_padding*2, @_padding*2   # Rect surrounding the hash boxes
      @_lists = {}    # Lists of values, one per hash
      @_headWidth = 0 # Maximal hash box width
      @model.bind 'newHash', (e, d) => @_newHash d.hash
      @model.bind 'insertItem', (e, d) => @_insertItem d.hash, d.result, d.element
      @_y += @_padding

    _newHash: (hash) ->
      # Create new rect with the hash value
      newHead = @_paper.rectext @_x, @_y + @_padding, hash
      newHeadBox = newHead.getBBox()
      # rectext works with center coordinates, we want to position it by the top-left pixel
      newHead.translate @_x - newHeadBox.x + @_padding

      # If this is the new widest box, then resize the others and the containing rect
      if @_headWidth < newHeadBox.width
        @_headWidth = newHeadBox.width
        center = @_x + @_padding + (@_headWidth / 2)
        for chash, chead of @_heads
          @_lists[chash].translate @_headWidth - chead.getBBox().width
          chead.attr 'width', @_headWidth
          chead.get('text').attr 'x', center  # Center the text
        @_rect.attr 'width', 2 * @_padding + @_headWidth
      # Otherwise give the new box the current greatest width
      else
        newHead.attr 'width', @_headWidth
        newHead.get('text').attr 'x', @_x + @_padding + (@_headWidth / 2)  # Center the text
      # And save it for later
      @_heads[hash] = newHead

      # We need the translated box from here on
      newHeadBox = newHead.getBBox()
      @_rect.attr 'height', newHeadBox.y
      # Arrow pointing to the list from the hash value
      newHead.add 'out', @_paper.line newHeadBox.x + newHeadBox.width, newHeadBox.y + newHeadBox.height/2, newHeadBox.x + newHeadBox.width + 2*@_padding, newHeadBox.y + newHeadBox.height/2, {size: @_padding/2.6, angle: 20}

      # Create the list of items for this hash
      list = new List(@_paper, @_x + @_headWidth + 3*@_padding, @_y + @_padding)
      @_lists[hash] = list
      b = @_lists[hash].getBBox()
      # For the next hash
      @_y = b.y + list.height() * 1.5
    # eof _newHash

    _insertItem: (hash, index, element) ->
      @_lists[hash].insertBefore index, element.key, element.value
