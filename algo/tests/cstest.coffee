define [
  'vendor/qunit', 'vendor/jquery'
  'cs!t/StateMachine',
  'cs!t/hashtables/ChainedHashTable', 'cs!t/hashtables/UnorderedList', 'cs!t/hashtables/OrderedList', 'cs!t/hashtables/OrderedUniqueList'
  'cs!t/widgets/raphael.setfixes', 'cs!t/widgets/RecText', 'cs!t/widgets/LinkedList'
],
  (QUnit, $) ->
    QUnit.QUnit.done = -> $('#testpaper').remove()
    QUnit.start()




