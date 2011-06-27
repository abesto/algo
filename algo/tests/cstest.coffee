define [
  'vendor/qunit', 'vendor/jquery'
  'cs!t/StateMachine', 'cs!t/ChainedHashTable'
  'cs!t/UnorderedList', 'cs!t/OrderedList', 'cs!t/OrderedUniqueList'
  'cs!t/raphael.setfixes'
  'cs!t/RecText'
],
  (QUnit, $) ->
    QUnit.QUnit.done = -> $('#testpaper').remove()
    QUnit.start()




