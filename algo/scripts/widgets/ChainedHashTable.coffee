define ['cs!widgets/LinkedList', 'vendor/jquery', 'loadcss'], (List, $, css) ->
  class ChainedHashTableWidget
    constructor: (@_paper, @model, @_x=0, @_y=0, @_padding=15) ->
      @_heads = {}
      @_lists = {}
      @_headWidth = 0
      @model.bind 'newHash', (e, d) => @_newHash d.hash
      @model.bind 'insertItem', (e, d) => @_insertItem d.hash, d.result, d.element

    _newHash: (hash) ->
      newHead = @_paper.rectext @_x, @_y, hash
      newHeadBox = newHead.getBBox()
      newHead.translate @_x - newHeadBox.x
      if @_headWidth < newHeadBox.width
        @_headWidth = newHeadBox.width
        for chash, chead of @_heads
          @_lists[chash].translate @_headWidth - chead.getBBox().width
          chead.attr 'width', @_headWidth
      else
        newHead.attr 'width', @_headWidth
      @_heads[hash] = newHead

      list = new List(@_paper, @_x + @_headWidth + @_padding * 2, @_y)
      @_lists[hash] = list
      b = @_lists[hash].getBBox()
      @_y = b.y + list.height() * 1.5

    _insertItem: (hash, index, element) ->
      @_lists[hash].insertBefore index, element.key, element.value