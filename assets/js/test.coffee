define [].concat(
  ['/qunit', '/jquery'],

  'tests/common/' + m for m in \
  ['StateMachine', 'UID', 'UIDMap', 'raphael/raphael.setfixes'],

  'tests/modules/ChainedHashTable/model/' + m for m in \
  ['ChainedHashTable', 'OrderedList', 'OrderedUniqueList', 'UnorderedList'],

  'tests/modules/ChainedHashTable/raphael/' + m for m in \
  ['ChainedHashTable', 'LinkedList', 'RecText'],

  'tests/modules/Graph/model/' + m for m in \
  ['Graph']
), (QUnit, $) ->
  QUnit.QUnit.done = -> $('#testpaper').remove()
  QUnit.start()
