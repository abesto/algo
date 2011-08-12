define ['./LinkedList', 'vendor/jquery', './raphael.class'], (List, $, RC) ->
  defaults =
    x: 0
    y: 0
    hashContainerPadding: 15  # Between containing rectangle and list heads
    verticalInnerPadding: 15  # Between lists
    linkedListOptions: {}     # Passed on to linked lists

  RC class ChainedHashTable
    constructor: (@_paper, @model, opts) ->
      @_options = $.extend {}, defaults, opts
      $.extend @_options.linkedListOptions, List.defaults
      @_x = @_options.x
      @_y = @_options.y

      @_heads = {}    # Boxes for the hash values
      @_lists = {}    # Lists of values, one per hash
      @_headWidth = 0 # Maximal hash box width
      @_y += @_options.hashContainerPadding

      @model.bind 'newHash', (e, d) => @_newHash d.hash
      @model.bind 'insertItem', (e, d) => @_insertItem d.hash, d.result, d.element
    # eof constructor

    _newHash: (hash) ->
      # Create the list of items for this hash
      list = @_paper.LinkedList $.extend({}, @_options.linkedListOptions,
        x: @_x + @_options.hashContainerPadding,
        y: @_y + @_options.hashContainerPadding
      )
      list.push hash
      @_lists[hash] = list
      b = @_lists[hash].getBBox()
      @_y = b.y + b.height * 1.5

      newHead = list.getBox(0, 0)
      newHead._set.get('rect').attr('fill', 'yellow')
      newHeadBox = newHead.getBBox()

      # If this is the new widest box, then resize the others
      if @_headWidth < newHeadBox.width
        for chash, clist of @_lists
          clist.resizeBox 0, 0, newHeadBox.width
        @_headWidth = newHeadBox.width
      # Otherwise give the new box the current greatest width
      else
        list.resizeBox 0, 0, @_headWidth
     # eof _newHash

    _insertItem: (hash, index, element) ->
      @_lists[hash].insertBefore index, element.key, element.value
