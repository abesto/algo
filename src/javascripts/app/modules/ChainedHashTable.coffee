define ['vendor/jquery', 'app/common/EventLogger',
'./ChainedHashTable/model/ChainedHashTable', './ChainedHashTable/model/OrderedList',
'./ChainedHashTable/model/OrderedUniqueList', './ChainedHashTable/model/UnorderedList',
'./ChainedHashTable/raphael/ChainedHashTableWidget'
],
($, EventLogger, ChainedHashTable, OrderedList, OrderedUniqueList, UnorderedList) ->
  EventLogger($)

  lists =
    UnorderedList: UnorderedList
    OrderedList: new OrderedList( (x, y) -> x - y )
    ReversedList: new OrderedList( (x, y) -> y - x )
    OrderedUniqueList: new OrderedUniqueList( (x, y) -> x - y )

  hashes =
    'identity': (x) -> x
    'xmod10': (x) -> x % 10

  # Test
  model = new ChainedHashTable(hashes['identity'])
  window.m = model

  ($controlContainer, paper) ->
    $controlContainer.load '/controls/ChainedHashTable', null, ->
      paper.ChainedHashTable model
      $('#add-button').click -> model.add($('#add-key').val(), $('#add-value').val())
      $('#list-class').change -> model.setListClass lists[$(this).val()]
      $('#hash-function').change -> model.setHashFunction hashes[$(this).val()]
    return model.step


