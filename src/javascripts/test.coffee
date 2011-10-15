define Array.concat(
  ['vendor/qunit', 'vendor/jquery'],

  'tests/common/' + m for m in \
  ['StateMachine', 'UID', 'raphael/raphael.setfixes'],

  'tests/modules/ChainedHashTable/model/' + m for m in \
  ['ChainedHashTable', 'OrderedList', 'OrderedUniqueList', 'UnorderedList'],

  'tests/modules/ChainedHashTable/raphael/' + m for m in \
  ['ChainedHashTable', 'LinkedList', 'RecText']
), (QUnit, $) ->
  QUnit.QUnit.done = -> $('#testpaper').remove()
  QUnit.start()
