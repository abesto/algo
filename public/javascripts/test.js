(function() {
  define(['vendor/qunit', 'vendor/jquery', 'tests/StateMachine', 'tests/hashtables/ChainedHashTable', 'tests/hashtables/UnorderedList', 'tests/hashtables/OrderedList', 'tests/hashtables/OrderedUniqueList', 'tests/widgets/raphael.setfixes', 'tests/widgets/RecText', 'tests/widgets/LinkedList', 'tests/widgets/ChainedHashTable'], function(QUnit, $) {
    QUnit.QUnit.done = function() {
      return $('#testpaper').remove();
    };
    return QUnit.start();
  });
}).call(this);
