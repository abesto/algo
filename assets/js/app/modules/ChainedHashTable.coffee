define ['vendor/jquery', 'app/common/EventLogger',
'./ChainedHashTable/model/ChainedHashTable', './ChainedHashTable/model/OrderedList',
'./ChainedHashTable/model/OrderedUniqueList', './ChainedHashTable/model/UnorderedList',
'app/common/i18n'
'./ChainedHashTable/raphael/ChainedHashTableWidget'
],
($, EventLogger, ChainedHashTable, OrderedList, OrderedUniqueList, UnorderedList, i18n) ->
  #EventLogger($)

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

  ($controlContainer, $statusContainer, paper) ->
    $controlContainer.load '/controls/ChainedHashTable', null, ->
      i18n.createUpdater('JqueryEventUpdater', $statusContainer, 'ChainedHashTable', model, 'transition')
      $('.i18n-simple').each -> i18n.createUpdater('SimpleUpdater', $(this), 'ChainedHashTable', this.id)
      i18n.setDataProvider 'AsyncJsonDataProvider'
      i18n.setLanguage('en')

      paper.ChainedHashTable model
      $('#add-button').click -> model.add($('#add-key').val(), $('#add-value').val())
      $('#list-implementation-select').change -> model.setListClass lists[$(this).val()]
      $('#hash-function-select').change -> model.setHashFunction hashes[$(this).val()]
    return model


