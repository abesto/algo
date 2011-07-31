define [
  'vendor/qunit', 'vendor/jquery'
  'tests/StateMachine',
  'tests/hashtables/ChainedHashTable', 'tests/hashtables/UnorderedList', 'tests/hashtables/OrderedList', 'tests/hashtables/OrderedUniqueList'
  'tests/widgets/raphael.setfixes', 'tests/widgets/RecText', 'tests/widgets/LinkedList', 'tests/widgets/ChainedHashTable'
],
  (QUnit, $) ->
    QUnit.QUnit.done = -> $('#testpaper').remove()
    QUnit.start()
