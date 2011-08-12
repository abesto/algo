define ['vendor/jquery', 'app/HashTables', 'app/widgets/ChainedHashTable'],
($, HashTables, View) ->
  lists =
    UnorderedList: new HashTables.UnorderedList
    OrderedList: new HashTables.OrderedList( (x, y) -> x - y )
    ReversedList: new HashTables.OrderedList( (x, y) -> y - x )
    OrderedUniqueList: new HashTables.OrderedUniqueList( (x, y) -> y - x )
    
  hashes =
    'identity': (x) -> x
    'xmod100': (x) -> x % 100
    
  # Test
  model = new HashTables.ChainedHashTable
  window.m = model  
  
  ($controlContainer, paper) ->
    $controlContainer.load '/controls/ChainedHashTable', null, ->
      paper.ChainedHashTable model
      $('#add-button').click ->
        model.add($('#add-key').val(), $('#add-value').val())
    return model.step
      
      