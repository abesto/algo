names = [
  'ChainedHashTable'
  'Element'
  'OrderedList'
  'OrderedUniqueList'
  'UnorderedList'
  ]

define ('app/hashtables/' + name for name in names), (CHT, E, HF, OL, OUL, UL) ->
  'ChainedHashTable': CHT
  'Element': E
  'OrderedList': OL
  'OrderedUniqueList': OUL
  'UnorderedList': UL