define ['vendor/jquery', 'app/EventLogger', 'app/HashTables', 'app/widgets/ChainedHashTable'],
($, EventLogger, HashTables, View) ->
  EventLogger($)
  
  lists =
    UnorderedList: HashTables.UnorderedList
    OrderedList: new HashTables.OrderedList( (x, y) -> x - y )
    ReversedList: new HashTables.OrderedList( (x, y) -> y - x )
    OrderedUniqueList: new HashTables.OrderedUniqueList( (x, y) -> x - y )
    
  hashes =
    'identity': (x) -> x
    'xmod10': (x) -> x % 10
    
  # Test
  model = new HashTables.ChainedHashTable(hashes['identity'])
  window.m = model  
  
  ($controlContainer, paper) ->
    $controlContainer.load '/controls/ChainedHashTable', null, ->
      paper.ChainedHashTable model
      $('#add-button').click -> model.add($('#add-key').val(), $('#add-value').val())
      $('#list-class').change -> model.setListClass lists[$(this).val()]
      $('#hash-function').change -> model.setHashFunction hashes[$(this).val()]
    return model.step
      
      