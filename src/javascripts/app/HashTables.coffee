names = [
  'ChainedHashTable'
  'Element'
  'HashFunction'
  'OrderedList'
  'OrderedUniqueList'
  'UnorderedList'
  ]

define ('app/hashtables/' + name for name in names), (CHT, E, HF, OL, OUL, UL) ->
  'ChainedHashTable': CHT
  'Element': E
  'HashFunction': HF
  'OrderedList': OL
  'OrderedUniqueList': OUL
  'UnorderedList': UL